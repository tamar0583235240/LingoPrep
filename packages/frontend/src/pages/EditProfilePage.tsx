import ProfileList from '../features/profile/components/ProfileList';

const ProfilePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
      <ProfileList />
    </div>
  );
};

export default ProfilePage;
