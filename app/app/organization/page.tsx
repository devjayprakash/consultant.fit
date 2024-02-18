import { OrganizationProfile } from '@clerk/nextjs';

function Organization() {
  return (
    <div className="mt-12">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              width: '100%',
            },
          },
        }}
      />
    </div>
  );
}

export default Organization;
