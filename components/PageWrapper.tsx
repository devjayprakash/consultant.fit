function PageWrapper({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <div className={'container mx-auto pt-24 min-h-screen'}>{children}</div>
  );
}

export default PageWrapper;
