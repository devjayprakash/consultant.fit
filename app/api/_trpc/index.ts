import { appRouter } from '@/server';
import { t } from '@/server/trpc';
import { auth } from '@clerk/nextjs/server';

const caller = t.createCallerFactory(appRouter);

export const trpcServer = () => {
  const c_auth = auth();
  return caller({
    clerk_id: c_auth.userId || '',
  });
};
