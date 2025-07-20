import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    mobile: "",
    email: "",
    city: "",
    amount: "",
    utr: "",
  });
  const [showAllUsersButton, setShowAllUsersButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const value = localStorage.getItem("showAllUsersButton");
    setShowAllUsersButton(value !== "false");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "utr" && value.length > 12) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    const { fullName, userId, mobile, email, city } = formData;
    if (fullName && userId && mobile && email && city) {
      setStep(2);
    } else {
      alert("Please fill all fields in Step 1");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/save", formData);
      alert("Form submitted successfully!");
      navigate("/invoice");
    } catch (error) {
      alert("Submission failed.");
    }
  };

  const handleAllUsersClick = () => {
    navigate("/all-users");
  };

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md mx-auto mt-10">
      <div className="flex justify-center gap-4 mb-6">
        {showAllUsersButton && (
          <button
            onClick={handleAllUsersClick}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            All Users
          </button>
        )}
       
      </div>

      {step === 1 && (
        <>
          <h2 className="text-xl font-bold mb-4">Step 1: User Details</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.fullName}
            className="input mb-2 w-full border p-2 rounded"
          />
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            onChange={handleChange}
            value={formData.userId}
            className="input mb-2 w-full border p-2 rounded"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={formData.mobile}
            className="input mb-2 w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            onChange={handleChange}
            value={formData.email}
            className="input mb-2 w-full border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={formData.city}
            className="input mb-2 w-full border p-2 rounded"
          />
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Step 2: Payment Info</h2>
          <img
            src="/QRcode_DIGITAL INDIA premium.png"
            alt="QR Code"
            className="w-64 h-auto mb-4 mx-auto"
          />
          <input
            type="text"
            name="amount"
            placeholder="Amount Sent"
            onChange={handleChange}
            value={formData.amount}
            className="input mb-2 w-full border p-2 rounded"
          />
          <input
            type="text"
            name="utr"
            placeholder="UTR Number (max 12 digits)"
            maxLength="12"
            onChange={handleChange}
            value={formData.utr}
            className="input mb-2 w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
