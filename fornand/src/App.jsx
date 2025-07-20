import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MultiStepForm from "./MultiStepForm";
import Invoice from "./Invoice";
import UsersList from "./UsersList";
import AllUsers from "./all-users";
// import AddUser from "./AddUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <MultiStepForm />
            </div>
          }
        />
        <Route
          path="/invoice"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <Invoice />
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <UsersList />
            </div>
          }
        />
        <Route path="/all-users" element={<AllUsers />} />
        {/* <Route path="/add-user" element={<AddUser />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
