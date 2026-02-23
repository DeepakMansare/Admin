import { Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "@components/Sidebar";
import { Dashboard } from "@pages/Dashboard/Dashboard";
import { Posts } from "@pages/Posts";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-offwhite">{children}</div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/posts"
        element={
          <ProtectedLayout>
            <Posts />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
