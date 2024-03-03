'use client';

import PageWrapper from '@/components/PageWrapper';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

function Layout({ children, ...rest }: PropsWithChildren) {
  const location = usePathname();

  return (
    <PageWrapper>
      <div className="container">
        <div className="flex gap-3">
          <Link
            className={buttonVariants({
              variant: location === '/app/dashboard' ? 'default' : 'secondary',
            })}
            href={'/app/dashboard'}
          >
            Dashboard
          </Link>
          <Link
            className={buttonVariants({
              variant: location === '/app/tasks' ? 'default' : 'secondary',
            })}
            href={'/app/tasks'}
          >
            Tasks
          </Link>
          <Link
            className={buttonVariants({
              variant: location === '/app/profile' ? 'default' : 'secondary',
            })}
            href={'/app/repos'}
          >
            Repositories
          </Link>
          <Link
            className={buttonVariants({
              variant:
                location === '/app/organization' ? 'default' : 'secondary',
            })}
            href={'/app/organization'}
          >
            Organization
          </Link>
          <Link
            className={buttonVariants({
              variant: location === '/app/profile' ? 'default' : 'secondary',
            })}
            href={'/app/profile'}
          >
            Profile
          </Link>
        </div>
        {children}
      </div>
    </PageWrapper>
  );
}

export default Layout;
