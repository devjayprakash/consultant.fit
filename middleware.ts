import { authMiddleware } from '@clerk/nextjs';

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default authMiddleware({
  publicRoutes: ['/', '/sign-up', '/sign-in', '/api/clerk'],
});
