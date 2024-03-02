import z from 'zod';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  hello: publicProcedure.query(async () => {
    return 'hello how are you';
  }),
  users: publicProcedure.query(async () => {
    return [
      {
        name: 'jay',
      },
      {
        name: 'bipin',
      },
    ];
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async () => {
      console.log('users bn gya');
      return true;
    }),
});

export type AppRouter = typeof appRouter;
