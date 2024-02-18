import { UserProfile } from '@clerk/nextjs';

function Profile() {
  return (
    <div className="mt-12 flex justify-center">
      <UserProfile />
    </div>
  );
}

export default Profile;
