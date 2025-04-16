const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// Your routes here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurant'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/payment', require('./routes/payment'));

// Socket.io listeners
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('order-status-update', (data) => {
    io.emit('order-status-changed', data); // broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => console.log(err));
