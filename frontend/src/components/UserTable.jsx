import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setusers } from "../slices/usersSlice";
import { useGetUsersMutation } from "../slices/userApiSlice";
// import { gettingUsers } from "../utils/backendCalls.js";

const UserTable = () => {
  const [getUsers] = useGetUsersMutation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const gettingUsers = async () => {
    try {
      const res = await getUsers().unwrap();

      dispatch(setusers(res.userDetails));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettingUsers();
  }, []);
  const usersDetails = useSelector((state) => state.users.usersDetails);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const userfilter = usersDetails.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[75%] flex flex-col mt-6">
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border w-full sm:w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mx-auto border-collapse table-auto">
          <thead className="bg-slate-400">
            <tr>
              <th className="px-4 py-2 sm:px-6 lg:px-8">Index</th>
              <th className="px-4 py-2 sm:px-6 lg:px-8">Name</th>
              <th className="px-4 py-2 sm:px-6 lg:px-8">Email</th>
              <th className="px-4 py-2 sm:px-6 lg:px-8">Address</th>
            </tr>
          </thead>
          <tbody>
            {userfilter.map((user, index) => (
              <tr key={user._id} className="hover:bg-slate-100">
                <td className="border px-4 py-2 sm:px-6 lg:px-8">
                  {index + 1}
                </td>
                <td className="border px-4 py-2 sm:px-6 lg:px-8">
                  {user.name?.toUpperCase()}
                </td>
                <td className="border px-4 py-2 sm:px-6 lg:px-8">
                  {user.email}
                </td>
                <td className="border px-4 py-2 sm:px-6 lg:px-8">
                  {user.address?.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
