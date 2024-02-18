import PageWrapper from '@/components/PageWrapper';
import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
  return (
    <PageWrapper classNames="flex justify-center items-center">
      <SignUp />
    </PageWrapper>
  );
}

export default SignUpPage;
