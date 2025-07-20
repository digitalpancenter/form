import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/forms");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditForm({
      fullName: user.fullName || "",
      userId: user.userId || "",
      mobile: user.mobile || "",
      email: user.email || "",
      companyEmail: user.companyEmail || "",
      city: user.city || "",
      amount: user.amount || "",
      utr: user.utr || "",
      digitalIndiaText: user.digitalIndiaText || "DIGITAL INDIA",
      address: user.address || "Eros Corporate Tower, Nehru Place, Delhi\nINDIA",
      phone: user.phone || "(91+) 7061805159",
      authorizedSignature: user.authorizedSignature || "",
      isEnabled: user.isEnabled ?? true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "utr" && value.length > 12) return;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/forms/${editUserId}`, editForm);
      alert("User updated successfully");
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete user");
    }
  };

  const toggleEnable = async (user) => {
    try {
      await axios.put(`http://localhost:5000/api/forms/${user._id}`, {
        ...user,
        isEnabled: !user.isEnabled,
      });
      fetchUsers();
    } catch (error) {
      alert("Failed to toggle status");
    }
  };

  const handleHide = () => {
    localStorage.setItem("showAllUsersButton", "false");
    alert("All Users button is now hidden.");
  };

  const handleBlock = () => {
    localStorage.setItem("showAllUsersButton", "true");
    alert("All Users button is now visible.");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 overflow-x-auto">
      {/* Top Buttons */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={handleBlock}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Block
        </button>
        <button
          onClick={handleHide}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Hide
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white border shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border">Full Name</th>
            <th className="py-2 px-4 border">User ID</th>
            <th className="py-2 px-4 border">Mobile</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Company Email</th>
            <th className="py-2 px-4 border">City</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">UTR</th>
            <th className="py-2 px-4 border">Digital India Text</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Authorized Signature</th>
            <th className="py-2 px-4 border">Enabled</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              {editUserId === user._id ? (
                <td colSpan={14}>
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <input type="text" name="fullName" value={editForm.fullName} onChange={handleInputChange} placeholder="Full Name" className="border rounded px-2 py-1" required />
                      <input type="text" name="userId" value={editForm.userId} onChange={handleInputChange} placeholder="User ID" className="border rounded px-2 py-1" required />
                      <input type="text" name="mobile" value={editForm.mobile} onChange={handleInputChange} placeholder="Mobile" className="border rounded px-2 py-1" required />
                      <input type="email" name="email" value={editForm.email} onChange={handleInputChange} placeholder="Email" className="border rounded px-2 py-1" required />
                      <input type="email" name="companyEmail" value={editForm.companyEmail} onChange={handleInputChange} placeholder="Company Email" className="border rounded px-2 py-1" />
                      <input type="text" name="city" value={editForm.city} onChange={handleInputChange} placeholder="City" className="border rounded px-2 py-1" required />
                      <input type="text" name="amount" value={editForm.amount} onChange={handleInputChange} placeholder="Amount" className="border rounded px-2 py-1" />
                      <input type="text" name="utr" value={editForm.utr} onChange={handleInputChange} placeholder="UTR" maxLength={12} className="border rounded px-2 py-1" />
                      <input type="text" name="digitalIndiaText" value={editForm.digitalIndiaText} onChange={handleInputChange} placeholder="Digital India Text" className="border rounded px-2 py-1 col-span-4" />
                      <textarea name="address" value={editForm.address} onChange={handleInputChange} placeholder="Address" rows={3} className="border rounded px-2 py-1 col-span-4" />
                      <input type="text" name="phone" value={editForm.phone} onChange={handleInputChange} placeholder="Phone" className="border rounded px-2 py-1 col-span-4" />
                      <input type="text" name="authorizedSignature" value={editForm.authorizedSignature} onChange={handleInputChange} placeholder="Authorized Signature" className="border rounded px-2 py-1 col-span-4" />
                      <div className="col-span-4 flex items-center space-x-2">
                        <label htmlFor="isEnabled" className="font-semibold">Enabled:</label>
                        <select
                          name="isEnabled"
                          id="isEnabled"
                          value={editForm.isEnabled ? "enabled" : "disabled"}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              isEnabled: e.target.value === "enabled",
                            })
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="enabled">Enable</option>
                          <option value="disabled">Disable</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                      <button type="button" onClick={() => setEditUserId(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                    </div>
                  </form>
                </td>
              ) : (
                <>
                  <td className="py-2 px-4 border">{user.fullName}</td>
                  <td className="py-2 px-4 border">{user.userId}</td>
                  <td className="py-2 px-4 border">{user.mobile}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.companyEmail}</td>
                  <td className="py-2 px-4 border">{user.city}</td>
                  <td className="py-2 px-4 border">{user.amount}</td>
                  <td className="py-2 px-4 border">{user.utr}</td>
                  <td className="py-2 px-4 border">{user.digitalIndiaText}</td>
                  <td className="py-2 px-4 border" style={{ whiteSpace: "pre-line" }}>{user.address}</td>
                  <td className="py-2 px-4 border">{user.phone}</td>
                  <td className="py-2 px-4 border">{user.authorizedSignature}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => toggleEnable(user)}
                      className={`px-2 py-1 rounded text-white ${user.isEnabled ? "bg-green-600" : "bg-red-600"}`}
                    >
                      {user.isEnabled ? "Enabled" : "Disabled"}
                    </button>
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      title="Edit"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
