import { appRouter } from '@/server';
import { t } from '@/server/trpc';
import { auth } from '@clerk/nextjs/server';

const caller = t.createCallerFactory(appRouter);

const c_auth = auth();

export const trpcServer = caller({
  clerk_id: c_auth.userId || '',
});
