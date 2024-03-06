import Image from 'next/image';

const Loading = ({ title }: { title?: string }) => {
  return (
    <div className="w-full h-[100px] flex justify-center items-center flex-col">
      <Image src="/loading.svg" alt="Loading" width={50} height={50} />
      {title && <div className="ml-2">{title}</div>}
    </div>
  );
};

export default Loading;
