import { buttonVariants } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import { BarChart4, Database, PersonStanding, RocketIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const features_data = [
  {
    title: 'Plan your delivery',
    logo: RocketIcon,
    description: 'Plan your delivery with our easy to use interface',
  },
  {
    title: 'Collaborate with your team',
    logo: PersonStanding,
    description: 'Collaborate with your team to deliver faster',
  },
  {
    title: 'Track your progress',
    logo: BarChart4,
    description: 'Track your progress and make better decisions',
  },
  {
    title: 'Get insights',
    logo: Database,
    description: 'Get insights to improve your delivery process',
  },
];

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/app');
  }

  return (
    <main className="container flex flex-col justify-center items-center min-h-screen mx-auto py-20">
      {/* hero section */}
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl py-6 text-center">
          Supercharge your software delivery with <br />
          <span className="text-blue-600 font-bold">Delivery planner</span>
        </h1>
        <p className="text-muted-foreground max-w-prose text-center md:text-xl text-base">
          Delivery plan helps you to plan and deliver your software faster and
          more efficiently.
        </p>
        <div className="flex my-4 gap-3">
          <Link href={'/sign-up'} className={buttonVariants()}>
            Create your delivery plan
          </Link>
          <Link
            href={'#'}
            className={buttonVariants({
              variant: 'secondary',
            })}
          >
            Learn More
          </Link>
        </div>
      </section>
      <section className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 divide-x-0 md:divide-x-3 mt-12">
        {features_data.map((data) => (
          <div
            key={data.title}
            className="flex flex-col justify-center items-center text-center bg-blue-100 p-6 rounded-md hover:shadow-2xl duration-200 cursor-pointer"
          >
            <data.logo size={48} />
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-sm">{data.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
