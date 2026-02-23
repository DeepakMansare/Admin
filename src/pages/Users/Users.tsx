import { getUsers } from "@api/api";
import { useEffect, useState } from "react";

import type { User } from "./User.types";

export const Users = () => {
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [inpValue, setInpValue] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isAsc, setIsAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const activeData = filteredData.length > 0 ? filteredData : userInfo;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentUsers = activeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(activeData.length / itemsPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUserInfo(res.data);
    };
    fetchUsers();
  }, []);

  const handleClick = () => {
    const matched = userInfo.filter(
      (user) =>
        user.name.toLowerCase().includes(inpValue.toLowerCase()) ||
        user.username.toLowerCase().includes(inpValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inpValue.toLowerCase()) ||
        user.address.street.toLowerCase().includes(inpValue.toLowerCase()) ||
        user.address.city.toLowerCase().includes(inpValue.toLowerCase()) ||
        user.address.zipcode.toLowerCase().includes(inpValue.toLowerCase()),
    );

    setFilteredData(matched);
  };

  const handleSort = () => {
    setIsAsc((prev) => {
      const newOrder = !prev;

      const dataToSort = filteredData.length > 0 ? filteredData : userInfo;

      const sorted = [...dataToSort].sort((a, b) =>
        newOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
      );

      if (filteredData.length > 0) {
        setFilteredData(sorted);
      } else {
        setUserInfo(sorted);
      }

      return newOrder;
    });
  };

  return (
    <div className="p-8">
      <div className="text-3xl mb-3">
        <h1>Users</h1>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="border border-gray-300 mb-3 w-sm flex ">
          <input
            type="text"
            placeholder="search here"
            className="w-sm p-3"
            value={inpValue}
            onChange={(e) => {
              setInpValue(e.target.value);
            }}
          />
          <button
            className="bg-gray-200 px-5 cursor-pointer"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
        <div>
          <button
            onClick={handleSort}
            className="p-3 cursor-pointer bg-gray-200"
          >
            {isAsc ? "Sort Z-A" : "Sort A-Z"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Id</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Username
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                City
              </th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">{user.name}</td>
                <td className="px-4 py-2 text-sm">{user.username}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm">{user.address?.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-3 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            Prev
          </button>

          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
