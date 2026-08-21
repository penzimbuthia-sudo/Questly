import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout({
  theme,
  sidebarProps = {},
  topBarProps = {},
  children,
}) {
  const themeClass = theme ? `theme-${theme}` : "";

  return (
    <div className={`${themeClass} flex min-h-screen bg-page`}>
      <Sidebar {...sidebarProps} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar {...topBarProps} />
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  );
}