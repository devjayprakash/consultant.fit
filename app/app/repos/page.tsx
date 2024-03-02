import { buttonVariants } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { Octokit } from '@octokit/core';
import ReposList from './ReposList';

const Repos: React.FC = async () => {
  const generateGithubOauthLink = () => {
    const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string;
    const redirect_uri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI as string;
    const scope = 'user:email repo';

    const url = new URL('https://github.com/login/oauth/authorize');

    url.searchParams.append('client_id', client_id);
    url.searchParams.append('redirect_uri', redirect_uri);
    url.searchParams.append('scope', scope);

    return url.toString();
  };

  const c_auth = auth();

  const data = await prisma.user.findFirst({
    where: {
      clerkId: c_auth.userId || 'invalid_id',
    },
    select: {
      github_access_token: true,
    },
  });

  if (!data?.github_access_token) {
    return (
      <div>
        <div className="text-xl">Repositories</div>
        <a href={generateGithubOauthLink()} className={buttonVariants()}>
          Link your github account
        </a>
      </div>
    );
  }

  if (c_auth.orgRole !== 'org:admin') {
    return (
      <div>
        <div className="text-xl">Repositories</div>
        <div className="text-red-600">
          You are not authorized to view this page <br />
          To add a repo to this org please contact your organization admin
        </div>
      </div>
    );
  }

  const octokit = new Octokit({ auth: data.github_access_token });
  const user_details = await octokit.request('GET /user');

  return (
    <div className="mt-2">
      <div className="flex justify-between">
        <div className="text-xl">Repositories</div>
      </div>
      <div>
        <ReposList github_user_id={user_details.data.login} />
      </div>
    </div>
  );
};

export default Repos;
