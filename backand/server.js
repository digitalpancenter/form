const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Direct MongoDB Atlas connection
mongoose.connect('mongodb+srv://radigitalindia:h0rn7AsBvTnZgsgV@radigitalindia.pvxmh92.mongodb.net/?retryWrites=true&w=majority&appName=radigitalindia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define the Mongoose schema and model
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

// POST route to save form data
app.post('/api/save', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send({ message: 'Data saved' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to save' });
  }
});

// PUT to update a user by ID
app.put('/api/forms/:id', async (req, res) => {
  try {
    const updatedUser = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send({ error: 'Failed to update user' });
  }
});

// DELETE a user by ID
app.delete('/api/forms/:id', async (req, res) => {
  try {
    const deletedUser = await Form.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

// GET route to fetch all saved form data
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch forms' });
  }
});

// GET route to fetch the latest saved form
app.get('/api/forms/latest', async (req, res) => {
  try {
    const latestForm = await Form.findOne().sort({ _id: -1 });
    if (!latestForm) return res.status(404).send({ message: 'No form data found' });
    res.json(latestForm);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch latest form' });
  }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
