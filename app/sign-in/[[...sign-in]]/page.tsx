import PageWrapper from '@/components/PageWrapper';
import { SignIn } from '@clerk/nextjs';

function SignInPage() {
  return (
    <PageWrapper classNames="flex justify-center items-center">
      <SignIn />
    </PageWrapper>
  );
}

export default SignInPage;
