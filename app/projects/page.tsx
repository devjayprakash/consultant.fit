'use client';

import PageWrapper from '@/components/PageWrapper';
import { trpc } from '../api/_trpc/client';

const ProjectsPage: React.FC = () => {
  const result = trpc.hello.useQuery();
  const users = trpc.users.useQuery();
  const { mutate } = trpc.createUser.useMutation();

  return (
    <PageWrapper>
      <div className="text-3xl">{result.data}</div>
      <div>{JSON.stringify(users.data)}</div>
      <button
        onClick={() => {
          mutate({
            name: 'this is great',
          });
        }}
      >
        create user
      </button>
    </PageWrapper>
  );
};

export default ProjectsPage;
