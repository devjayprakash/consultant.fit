'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GithubIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllRepos, linkRepoToProject } from './reposAction';

interface ReposListProps {
  github_user_id: string;
}

const ReposList = ({ github_user_id }: ReposListProps) => {
  const [repos, setRepos] = useState<any>([]);
  const [search_term, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllRepos('', github_user_id);
      setRepos(data.data || []);
      setLoading(false);
    })();
  }, [github_user_id, search_term]);

  const linkRepo = async (repo_name: string, repo_owner: string) => {
    try {
      console.log('Linking repo', repo_name, repo_owner);

      await linkRepoToProject(repo_name, repo_owner);
    } catch (error) {
      console.error(error);
      toast({
        title: 'There was an error linking the repository',
        description:
          'There was some issue linking the repository. Please try again later',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {repos.length === 0 ? (
        <div>No Repositories found</div>
      ) : (
        <div>
          {repos.map((repo: any) => (
            <div key={repo.full_name} className="mt-4 flex justify-between">
              <div>
                <div className="flex gap-3">
                  <GithubIcon />
                  {repo.full_name}
                </div>
                <div className="text-sm text-gray-500">{repo.description}</div>
              </div>
              <Button onClick={() => linkRepo(repo.name, repo.owner.login)}>
                Link
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReposList;
