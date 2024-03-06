import { trpcServer } from '@/app/api/_trpc';
import Sprints from './Sprints';

async function Jobs(args: { params: { project_id: string } }) {
  const sprints = await trpcServer().sprints.getAllSprints(
    args.params.project_id
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl">Sprints</h1>
      <Sprints project_id={args.params.project_id} initial_sprints={sprints} />
    </div>
  );
}

export default Jobs;
