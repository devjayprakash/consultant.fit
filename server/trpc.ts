import { getAuth } from '@clerk/nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';
import superjson from 'superjson';

export const createContext = async (args: FetchCreateContextFnOptions) => {
  const auth = getAuth(args.req as NextRequest);
  return {
    clerk_id: auth.userId || '',
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape }) => {
    return shape;
  },
});

const isAuthorized = t.middleware(({ next, ctx }) => {
  if (ctx.clerk_id === null || ctx.clerk_id === '') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }
  return next({
    ctx,
  });
});

export const protectedProcedure = t.procedure.use(isAuthorized);
export const router = t.router;
export const publicProcedure = t.procedure;
