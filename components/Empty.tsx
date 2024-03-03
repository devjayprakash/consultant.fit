import Image from 'next/image';

const Empty = ({ title, sub_title }: { title: string; sub_title?: string }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-3 h-[300px]">
      <Image src={'/empty.png'} width={128} height={128} alt="empty box" />
      <div className="text-2xl text-gray-700 mt-4">{title}</div>
      {sub_title && <div className="text-gray-400">{sub_title}</div>}
    </div>
  );
};

export default Empty;
