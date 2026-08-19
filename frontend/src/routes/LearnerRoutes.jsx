import { Routes, Route } from 'react-router-dom';

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