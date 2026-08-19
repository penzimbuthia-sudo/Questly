import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/learner/Home";
import Explore from "./pages/learner/Explore";
import Paths from "./pages/learner/Paths";
import PathDetail from "./pages/learner/PathDetail";
import Challenges from "./pages/learner/Challenges";
import Community from "./pages/learner/Community";
import Leaderboard from "./pages/learner/Leaderboard";
import Achievements from "./pages/learner/Achievements";
import Profile from "./pages/learner/Profile";
import Settings from "./pages/learner/Settings";

/**
 * Reference wiring only — drop into the app's real router setup if one
 * already exists (this file isn't one of the 21 owned files).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/paths/:pathId" element={<PathDetail />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/community" element={<Community />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
