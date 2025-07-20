const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose.connect(
  'mongodb+srv://radigitalindia:h0rn7AsBvTnZgsgV@radigitalindia.pvxmh92.mongodb.net/?retryWrites=true&w=majority&appName=radigitalindia',
  {
    useNewUrlParser: true,            // not needed in newer versions
    useUnifiedTopology: true          // not needed in newer versions
  }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Mongoose Schema
const FormSchema = new mongoose.Schema({
  fullName: String,
  userId: String,
  mobile: String,
  email: String,
  city: String,
  amount: String,
  utr: String,
  digitalIndiaText: String,
  address: String,
  phone: String,
  companyEmail: String,
  authorizedSignature: String
});

const Form = mongoose.model('Form', FormSchema);

// ✅ Save new form
app.post('/api/save', async (req, res) => {
  try {
    console.log("📥 Received data:", req.body);
    const form = new Form(req.body);
    await form.save();
    res.status(201).send({ message: '✅ Data saved' });
  } catch (err) {
    console.error("❌ Error saving form:", err.message, err.stack);
    res.status(500).send({ error: '❌ Failed to save', details: err.message });
  }
});

// ✅ Update form by ID
app.put('/api/forms/:id', async (req, res) => {
  try {
    const updatedUser = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Error updating user:", err.message);
    res.status(500).send({ error: 'Failed to update user' });
  }
});

// ✅ Delete form by ID
app.delete('/api/forms/:id', async (req, res) => {
  try {
    const deletedUser = await Form.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ message: 'User not found' });
    res.send({ message: '✅ User deleted' });
  } catch (err) {
    console.error("❌ Error deleting user:", err.message);
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

// ✅ Get all forms
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    console.error("❌ Error fetching forms:", err.message);
    res.status(500).send({ error: 'Failed to fetch forms' });
  }
});

// ✅ Get latest form
app.get('/api/forms/latest', async (req, res) => {
  try {
    const latestForm = await Form.findOne().sort({ _id: -1 });
    if (!latestForm) return res.status(404).send({ message: 'No form data found' });
    res.json(latestForm);
  } catch (err) {
    console.error("❌ Error fetching latest form:", err.message);
    res.status(500).send({ error: 'Failed to fetch latest form' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
