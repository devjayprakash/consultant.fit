import PageWrapper from '@/components/PageWrapper';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

function Dashboard() {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/create-organization');
  } else {
    redirect('/app/dashboard');
  }

  return (
    <PageWrapper>
      <div className="mt-12 container">
        <h1>you should have not seen this</h1>
      </div>
    </PageWrapper>
  );
}

export default Dashboard;
