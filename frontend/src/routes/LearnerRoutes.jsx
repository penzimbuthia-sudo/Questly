import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Home from '../pages/learner/Home';
import Explore from '../pages/learner/Explore';
import Paths from '../pages/learner/Paths';
import PathDetail from '../pages/learner/PathDetail';
import Challenges from '../pages/learner/Challenges';
import Community from '../pages/learner/Community';
import Leaderboard from '../pages/learner/Leaderboard';
import Achievements from '../pages/learner/Achievements';
import Profile from '../pages/learner/Profile';
import Settings from '../pages/learner/Settings';

function LearnerPlaceholder() {
  return (
    <div className="p-8 text-sm text-[#8B93A7]">
      Learner routes go here — Home, Explore, Paths, PathDetail, Challenges,
      Community, Leaderboard, Achievements, Profile, Settings.
    </div>
  );
}

export default function LearnerRoutes() {
  return (
    <Routes>
      <Route index element={<LearnerPlaceholder />} />
    </Routes>
  );
}