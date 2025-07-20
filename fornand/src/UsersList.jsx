import React from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 flex justify-center space-x-6">
      <button
        onClick={() => navigate("/all-users")}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition text-lg font-semibold"
      >
        All Users
      </button>

      <button
        onClick={() => navigate("/add-user")}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition text-lg font-semibold"
      >
        Add User
      </button>
    </div>
  );
};

export default UsersList;
