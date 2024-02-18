import Image from 'next/image';
import Link from 'next/link';

// Logo from https://www.flaticon.com/free-icons/rocket

const Logo = () => {
  return (
    <Link href={'/'}>
      <div className="flex gap-3 items-center">
        <Image
          src={'/rocket.png'}
          alt="delivery plan logo"
          width={40}
          height={40}
        />
        <div className="font-bold">Delivery plan</div>
      </div>
    </Link>
  );
};
export default Logo;
