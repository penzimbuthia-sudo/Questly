// src/routes/ContributorRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ContributorLayout from "../../contributor/ContributorLayout";

// Import all your pages
import Dashboard from "../../feature/your-name/contributor-workspace/Dashboard";
import MyContent from "../../feature/your-name/contributor-workspace/MyContent";
import Community from "../../feature/your-name/contributor-workspace/Community";
import Challenges from "../../feature/your-name/contributor-workspace/Challenges";
import Analytics from "../../feature/your-name/contributor-workspace/Analytics";
import Rewards from "../../feature/your-name/contributor-workspace/Rewards";
import Profile from "../../feature/your-name/contributor-workspace/Profile";
import Settings from "../../feature/your-name/contributor-workspace/Settings";

console.log("ContributorRoutes loaded!"); // Debug log

export default function ContributorRoutes() {
  console.log("ContributorRoutes rendering!"); // Debug log
  
  return (
    <Routes>
      {/* Redirect /contributor to /contributor/dashboard */}
      <Route path="/" element={<Navigate to="/contributor/dashboard" replace />} />
      
      {/* All routes with the layout */}
      <Route element={<ContributorLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="content" element={<MyContent />} />
        <Route path="community" element={<Community />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* 404 for contributor routes */}
      <Route path="*" element={
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>404</h1>
          <p style={{ color: "#666" }}>Page not found in contributor area</p>
          <a href="/contributor/dashboard" style={{ color: "#8B5CF6" }}>Go to Dashboard</a>
        </div>
      } />
    </Routes>
  );
}