import { projectsRouter } from './projects';
import { sprintsRouter } from './sprints';
import { router } from './trpc';

export const appRouter = router({
  project: projectsRouter,
  sprints: sprintsRouter,
});

export type AppRouter = typeof appRouter;
