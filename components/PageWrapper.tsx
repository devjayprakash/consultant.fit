function PageWrapper({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return <div className={'container mx-auto mt-16'}>{children}</div>;
}

export default PageWrapper;
