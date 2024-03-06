import { trpcServer } from '@/app/api/_trpc';
import Empty from '@/components/Empty';
import PageWrapper from '@/components/PageWrapper';
import { randomUUID } from 'crypto';
import {
  BookCopy,
  LayoutDashboard,
  ListChecks,
  RussianRuble,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

const projects_details_options = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    go_to: '',
    id: randomUUID(),
  },
  {
    label: 'Sprints',
    icon: RussianRuble,
    go_to: 'sprints',
    id: randomUUID(),
  },
  {
    label: 'Tasks',
    icon: ListChecks,
    go_to: 'tasks',
    id: randomUUID(),
  },
  {
    label: 'Settings',
    icon: Settings,
    go_to: 'settings',
    id: randomUUID(),
  },
];

async function ProjectsDetailedLayout(args: {
  params: {
    project_id: string;
  };
  children: React.ReactNode;
}) {
  const project_info = await trpcServer().project.getProjectDetails(
    args.params.project_id
  );

  if (!project_info) {
    return (
      <PageWrapper>
        <Empty
          title="Could not find the project"
          sub_title="Please make sure you selected the right project"
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="flex items-center gap-3">
        <div>
          <BookCopy className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl">{project_info.name}</h1>
          <p className="text-muted-foreground">{project_info.description}</p>
        </div>
      </div>
      <div className="flex h-[80vh] mt-6 gap-6">
        <div className="h-full w-[300px]">
          {projects_details_options.map((option) => (
            <Link
              href={`/projects/${args.params.project_id}/${option.go_to}`}
              key={option.id}
            >
              <div
                className={
                  'w-full p-3 hover:underline bg-gray-100 rounded-md flex items-center gap-3 mb-2'
                }
              >
                <option.icon className="w-6 h-6" />
                {option.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="overflow-y-auto flex-grow w-full bg-white rounded-xl">
          {args.children}
        </div>
      </div>
    </PageWrapper>
  );
}

export default ProjectsDetailedLayout;
