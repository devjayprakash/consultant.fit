import PageWrapper from '@/components/PageWrapper';
import { CreateOrganization } from '@clerk/nextjs';

function CreateOrganizationPage() {
  return (
    <PageWrapper classNames="flex justify-center items-center">
      <CreateOrganization />
    </PageWrapper>
  );
}

export default CreateOrganizationPage;
