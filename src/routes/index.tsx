import { Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "@components/Sidebar";
import { Dashboard } from "@pages/Dashboard/Dashboard";
import { Login } from "@pages/Login/Login";
import { Posts } from "@pages/Posts";
import { Users } from "@pages/Users";

const isAuthenticated = true;

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
      <Route path="/login" element={<Login />} />

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

      <Route
        path="/users"
        element={
          <ProtectedLayout>
            <Users />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
