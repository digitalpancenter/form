import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Invoice = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await axios.get("https://form-qvht.onrender.com/api/forms/latest");
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();

    import("html2pdf.js").then((module) => {
      window.html2pdf = module.default;
    });
  }, []);

  if (loading) return <p>Loading invoice...</p>;
  if (!formData) return <p>No invoice data found.</p>;

  const baseAmount = Number(formData.amount) || 0;
  const serviceCharge = 18;
  const gst = 18;
  const finalBalance = baseAmount - serviceCharge - gst;

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Sacramento&display=swap');
        .font-signature {
          font-family: 'Allura', cursive;
          font-size: 1.2rem;
          color: #1e40af;
          opacity: 0.8;
          letter-spacing: 3px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          border-bottom: 2px solid #1e40af;
          display: inline-block;
          padding-bottom: 6px;
          margin-top: 0.25rem;
          transform: rotate(-5deg) skewX(-5deg);
          user-select: none;
        }
        .signature-flourish {
          display: block;
          width: 60px;
          height: 10px;
          border-bottom: 3px solid #1e40af;
          margin-top: 2px;
          border-radius: 20px;
          transform: rotate(-10deg);
          opacity: 0.5;
        }
      `}</style>

      <div className="text-right mb-4">
        <button
          onClick={() => {
            if (invoiceRef.current) {
              window.html2pdf()
                .set({
                  margin: 0,
                  filename: `invoice_${formData.userId || "unknown"}.pdf`,
                  image: { type: "jpeg", quality: 0.98 },
                  html2canvas: { scale: 2, useCORS: true, backgroundColor: "#fff" },
                  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                })
                .from(invoiceRef.current)
                .save();
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      <div ref={invoiceRef} className="border p-6 font-sans text-sm bg-white">
        <div className="flex justify-between items-center border-b-4 border-blue-500 pb-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {formData.digitalIndiaText || "DIGITAL INDIA"}
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-blue-600">PREMIUM</h1>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div>
            <p className="font-bold italic">{formData.digitalIndiaText || "DIGITAL INDIA"}</p>
            <p style={{ whiteSpace: "pre-line" }}>
              {formData.address || "Eros Corporate Tower, Nehru Place, Delhi\nINDIA"}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {formData.phone || "(91+) 7061805159"}
            </p>
            <p>{formData.companyEmail || "radigitalindai@gmail.com"}</p>
          </div>
          <div className="text-right space-y-1">
            <p>
              <span className="font-bold">Date:</span> {formattedDate}
            </p>
            <p>
              <span className="font-bold">Invoice #</span> {(formData._id || "unknown").slice(-6).toUpperCase()}
            </p>
            <p>
              <span className="font-bold">PO #</span> {formData.userId || ""}
            </p>
          </div>
        </div>

        <div className="bg-blue-500 text-white mt-6 px-2 py-1 font-bold">Bill To:</div>
        <div className="border px-2 py-2">
          <p>{formData.fullName}</p>
          <p className="font-bold">{formData.userId}</p>
          <p>{formData.city}</p>
          <p>Mobile: {formData.mobile}</p>
          <p>Email: {formData.email}</p>
        </div>

        <table className="w-full mt-6 border border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border px-2 py-1 text-left">Quantity</th>
              <th className="border px-2 py-1 text-left">Description</th>
              <th className="border px-2 py-1 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">Service Charge (Fixed)</td>
              <td className="border px-2 py-1">₹{serviceCharge.toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="border px-2 py-1">2</td>
              <td className="border px-2 py-1">GST (Fixed)</td>
              <td className="border px-2 py-1">₹{gst.toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-100 font-bold">
              <td className="border px-2 py-1">3</td>
              <td className="border px-2 py-1">Final Balance</td>
              <td className="border px-2 py-1">₹{finalBalance.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-start mt-10">
          <div className="text-left">
            <p className="text-sm mb-1">Authorized Signature</p>
            <p className="font-signature">{formData.authorizedSignature || "RAHUL"}</p>
            <span className="signature-flourish"></span>
          </div>

          <div className="text-right space-y-1">
            <p>Paid Amount: ₹{baseAmount.toFixed(2)}</p>
            <p>Service Charge: ₹{serviceCharge.toFixed(2)}</p>
            <p>GST: ₹{gst.toFixed(2)}</p>
            <div className="bg-blue-500 text-white px-4 py-2 font-bold inline-block mt-2">
              Balance due: ₹{finalBalance.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm">
          <p>
            Make all checks payable to &lt;{formData.digitalIndiaText || "DIGITAL INDIA"}&gt;. Or submit payment via &lt;UPI / Bank Transfer&gt;.
          </p>
          <p className="font-bold italic mt-2">Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
