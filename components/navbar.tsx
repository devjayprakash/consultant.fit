import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Logo from './Logo';
import { buttonVariants } from './ui/button';

const Navbar = () => {
  return (
    <div className="fixed  bg-white top-0 left-0 right-0">
      <nav className="flex justify-between items-center py-4 container mx-auto">
        <Logo />
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="space-x-3">
              <Link
                href={'/sign-in'}
                className={buttonVariants({
                  variant: 'secondary',
                })}
              >
                Sign In
              </Link>
              <Link href={'/sign-up'} className={buttonVariants()}>
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
