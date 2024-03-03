import { projectsRouter } from './projects';
import { router } from './trpc';

export const appRouter = router({
  project: projectsRouter,
});

export type AppRouter = typeof appRouter;
