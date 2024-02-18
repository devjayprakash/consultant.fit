import { cn } from '@/lib/utils';

function PageWrapper({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <div className={cn('w-full min-h-screen', classNames)}>{children}</div>
  );
}

export default PageWrapper;
