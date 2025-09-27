import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import http from 'http';


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));  

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String, 
});

const User = mongoose.model('user', userSchema);

const DataSchema = new mongoose.Schema({
  deviceId: String,
  voltage: Number,
  timestamp: { type: Date, default: Date.now },
});

const Data = mongoose.model('sensor_data', DataSchema);



// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = password === user.password; // In production, use hashed passwords
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
    
// API endpoint to receive data from ESP32
app.post("/api/data", async (req, res) => {
  try {
    const { deviceId, voltage } = req.body;

    const newData = new Data({ deviceId, voltage });
    await newData.save();

    // Emit real-time data to frontend
    io.emit("newData", { deviceId, voltage, timestamp: newData.timestamp });

    res.status(200).json({ message: "Data stored successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

io.on("connection", (socket) => {
  console.log("Frontend connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Frontend disconnected:", socket.id);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});