'use client';

import AppNewProjectDialog from '@/components/AddNewProjectDialog';
import Empty from '@/components/Empty';
import PageWrapper from '@/components/PageWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ForwardIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { trpc } from '../api/_trpc/client';

interface PartialProject {
  id: string;
  name: string;
  description: string;
}

const ProjectsPage = ({ initialData }: { initialData: PartialProject[] }) => {
  const {
    data: projects,
    error: projectsError,
    refetch,
  } = trpc.project.getProjects.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const [showAddDialog, setAddDialogOpen] = useState(false);

  return (
    <PageWrapper>
      <div className="text-3xl font-bold">Projects</div>
      <div className="flex justify-end">
        <Button
          className="gap-2"
          size={'lg'}
          onClick={() => setAddDialogOpen(true)}
        >
          Add projects
          <Plus />
        </Button>
        <AppNewProjectDialog
          refetchProjects={refetch}
          show={showAddDialog}
          setShow={setAddDialogOpen}
        />
      </div>
      <div>
        {projectsError && (
          <div className="bg-red-100 text-red-900 p-4 rounded-lg mt-4 mb-4">
            {projectsError.message}
          </div>
        )}
        {projects?.length === 0 && (
          <Empty
            title="No projects found"
            sub_title="Please add a new project to get started"
          />
        )}
        <div className="mt-6 space-y-3">
          {projects?.map((project) => (
            <div
              className="border-[0.5px] p-3 flex justify-between items-center rounded-xl bg-white"
              key={project.id}
            >
              <div>
                <div className="text-xl">{project.name}</div>
                <div className="text-gray-500">{project.name}</div>
              </div>
              <Link
                href={`/projects/${project.id}`}
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                  }),
                  'gap-2'
                )}
              >
                View <ForwardIcon />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
