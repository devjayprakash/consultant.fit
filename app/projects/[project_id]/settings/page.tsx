'use client';

import { trpc } from '@/app/api/_trpc/client';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useId } from 'react';

function Settings(args: { params: { project_id: string } }) {
  const { data: statues, isLoading: statuesLoading } =
    trpc.project.getAllTasksStatues.useQuery(args.params.project_id);

  const project_description = useId();
  const sprint_duration = useId();
  const sprint_auto_name_enabled = useId();
  const sprint_auto_name_disabled = useId();

  return (
    <div className="p-3">
      <div className="text-3xl">Settings</div>
      <div className="border-[1px] rounded-xl px-3 pb-3 mt-6">
        <div className="mt-3 text-sm text-gray-400">Projects</div>
        <div className="mt-3">
          <Label htmlFor="project_name">Name of project</Label>
          <Input id="project_name" placeholder="Name of project" />
        </div>
        <div className="mt-3">
          <Label htmlFor={project_description}>Project Description</Label>
          <Input id={project_description} placeholder="Project Description" />
        </div>
      </div>

      <div className="border-[1px] rounded-xl px-3 pb-3 mt-6">
        <div className="mt-3 text-sm text-gray-400">Sprints</div>
        <div className="mt-3">
          <Label htmlFor={sprint_duration}>Sprint Duration</Label>
          <Input id={sprint_duration} placeholder="Sprint Duration" />
        </div>
        <div className="mt-3">
          <div className="font-semibold text-sm mb-2">
            Enable auto sprint naming
          </div>
          <RadioGroup defaultValue="disabled">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enabled" id={sprint_auto_name_enabled} />
              <Label htmlFor={sprint_auto_name_enabled}>Enabled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="disabled" id={sprint_auto_name_disabled} />
              <Label htmlFor={sprint_auto_name_disabled}>Disabled</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="border-[1px] rounded-xl px-3 pb-3 mt-6">
        <div className="mt-3 text-sm text-gray-400">Tasks</div>
        {statues?.length === 0 && (
          <Empty title="No statues have been created for this project" />
        )}
        {statuesLoading && <Loading title="Loading status..." />}
      </div>
    </div>
  );
}

export default Settings;
