import { publicProcedure, router } from './trpc';

export const projectsRouter = router({
  hello: publicProcedure.query(async () => {}),
});
