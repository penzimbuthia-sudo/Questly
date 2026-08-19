import { Routes, Route } from 'react-router-dom';

function ContributorPlaceholder() {
  return (
    <div className="p-8 text-sm text-[#8B93A7]">
      Contributor routes go here — Dashboard, MyContent, Community,
      Challenges, Analytics, Rewards, Profile, Settings.
    </div>
  );
}

export default function ContributorRoutes() {
  return (
    <Routes>
      <Route index element={<ContributorPlaceholder />} />
    </Routes>
  );
}