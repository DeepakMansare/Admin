import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-midnightBlue text-white p-6 flex flex-col">
      <div className="mb-5">
        <h1 className="text-2xl">Admin Panel</h1>
      </div>

      <div className="space-y-4 text-sm">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block p-3 rounded-lg cursor-pointer ${
              isActive ? "bg-steelBlueGray font-medium" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `block p-3 rounded-lg cursor-pointer ${
              isActive ? "bg-steelBlueGray font-medium" : "hover:bg-gray-800"
            }`
          }
        >
          Posts
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `block p-3 rounded-lg cursor-pointer ${
              isActive ? "bg-steelBlueGray font-medium" : "hover:bg-gray-800"
            }`
          }
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};
