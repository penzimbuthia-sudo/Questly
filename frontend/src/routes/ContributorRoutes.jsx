import { Routes, Route } from 'react-router-dom';
import ContributorLayout from '../components/layout/ContributorLayout';
import Dashboard from "../pages/contributor/Dashboard";
import MyContent from "../pages/contributor/MyContent";
import Community from "../pages/contributor/Community";
import Challenges from "../pages/contributor/Challenges";
import Analytics from "../pages/contributor/Analytics";
import Rewards from "../pages/contributor/Rewards";
import Profile from "../pages/contributor/Profile";
import Settings from "../pages/contributor/Settings";


export default function ContributorRoutes() {
  return (
    <Routes>
      <Route element={<ContributorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-content" element={<MyContent />} />
        <Route path="community" element={<Community />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}