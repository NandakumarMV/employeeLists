import React, { useEffect } from "react";
import UserTable from "./UserTable.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-5 font-semibold mt-5">USERS </h1>
      <UserTable />
    </div>
  );
};

export default HomePage;
