// src/routes/contributorRoutes.jsx

import { Route } from "react-router-dom";

// Contributor workspace pages
import Dashboard from "../../feature/your-name/contributor-workspace/Dashboard";
import MyContent from "../../feature/your-name/contributor-workspace/MyContent";
import Community from "../../feature/your-name/contributor-workspace/Community";
import Challenges from "../../feature/your-name/contributor-workspace/Challenges";
import Analytics from "../../feature/your-name/contributor-workspace/Analytics";
import Rewards from "../../feature/your-name/contributor-workspace/Rewards";
import Profile from "../../feature/your-name/contributor-workspace/Profile";
import Settings from "../../feature/your-name/contributor-workspace/Settings";

// Optional: If you add contributor layout later
// import ContributorLayout from "../../feature/your-name/contributor-workspace/ContributorLayout";

export const contributorRoutes = (
  <>
    <Route path="/contributor/dashboard" element={<Dashboard />} />
    <Route path="/contributor/content" element={<MyContent />} />
    <Route path="/contributor/community" element={<Community />} />
    <Route path="/contributor/challenges" element={<Challenges />} />
    <Route path="/contributor/analytics" element={<Analytics />} />
    <Route path="/contributor/rewards" element={<Rewards />} />
    <Route path="/contributor/profile" element={<Profile />} />
    <Route path="/contributor/settings" element={<Settings />} />
  </>
);
