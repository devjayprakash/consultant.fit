'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { Octokit } from '@octokit/core';

export const linkRepoToProject = async (
  repo_name: string,
  repo_owner: string
) => {
  try {
    const c_auth = auth();
    const clerkId = c_auth.userId || 'invalid_id';

    if (clerkId === 'invalid_id') {
      return {
        error: 'Unauthorized',
        result: false,
      };
    }

    const user_details = await prisma.user.findFirst({
      where: {
        clerkId,
      },
      select: {
        github_access_token: true,
      },
    });

    if (!user_details?.github_access_token) {
      return {
        error: 'Github not linked',
        result: false,
      };
    }

    const octokit = new Octokit({
      auth: user_details.github_access_token,
    });

    // const repos = await octokit.request(`POST /repos/{owner}/{repo}/hooks`, {
    //   owner: repo_owner,
    //   repo: repo_name,
    //   config: {
    //     url : ''
    //   }
    // });

    console.log(repos.data);

    return {
      error: null,
      result: true,
      data: repos.data,
    };
  } catch (error) {
    return {
      result: false,
      error: error,
    };
  }
};

export const getAllRepos = async (search_term: string, user_id: string) => {
  const c_auth = auth();
  const clerkId = c_auth.userId || 'invalid_id';

  if (clerkId === 'invalid_id') {
    return {
      error: 'Unauthorized',
      result: false,
    };
  }

  const user_details = await prisma.user.findFirst({
    where: {
      clerkId,
    },
    select: {
      github_access_token: true,
    },
  });

  if (!user_details?.github_access_token) {
    return {
      error: 'Github not linked',
      result: false,
    };
  }

  const octokit = new Octokit({
    auth: user_details.github_access_token,
  });

  const repos = await octokit.request('GET /search/repositories', {
    q: `user:${user_id} ${search_term}`,
  });

  return {
    error: null,
    result: true,
    data: repos.data.items,
  };
};
