'use client';

import { trpc } from '@/app/api/_trpc/client';
import AddNewSprintModal from '@/components/AddNewSprintModal';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Plus, RussianRuble } from 'lucide-react';
import { useState } from 'react';

const Sprints = ({
  project_id,
  initial_sprints,
}: {
  project_id: string;
  initial_sprints: any;
}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const {
    data: sprints,
    error: sprintError,
    isLoading,
    refetch,
  } = trpc.sprints.getAllSprints.useQuery(project_id, {
    initialData: initial_sprints,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <Loading title="Loading sprints ..." />;

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setAddModalOpen(true)} className="gap-2">
          Create new sprint
          <Plus />
        </Button>
      </div>
      {sprints?.length === 0 && (
        <Empty
          title="No sprints found"
          sub_title="Create a sprint to get started"
        />
      )}
      <AddNewSprintModal
        onSprintAdded={() => {
          refetch();
        }}
        open={addModalOpen}
        setOpen={setAddModalOpen}
        project_id={project_id}
      />
      {sprintError && (
        <div className="bg-red-100 text-red-900 p-4 rounded-lg mt-4 mb-4">
          {sprintError.message}
        </div>
      )}
      <div className="space-y-3 mt-3">
        {sprints?.map((sprint) => (
          <div key={sprint.id} className="border-2 rounded-lg p-3">
            <div className="text-xl flex gap-3">
              <RussianRuble className="w-6 h-6" />
              {sprint.name}
            </div>
            <div>
              <div className="text-gray-500">
                {sprint.start_date.toDateString()} -{' '}
                {sprint.end_date.toDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sprints;
