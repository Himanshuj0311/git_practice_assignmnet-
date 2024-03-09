// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')


const app = express();
app.use(bodyParser.json());
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb+srv://himanshu:jain@cluster0.xby2gvs.mongodb.net/data?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define MongoDB schema and model for your data
const dataSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    hobbies: String
});

const Data = mongoose.model('Data', dataSchema);

// API routes for CRUD operations
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    res.json(newData);
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
