import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "@components/Sidebar";
import { Users } from "@pages/Users";

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
      <Route path="/" element={<Navigate to="/users" replace />} />

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
