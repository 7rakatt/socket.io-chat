const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();
const { join } = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
const port = process.env.PORT;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit('send_message_to_all',msg)
  });
  socket.on('typing',() => {
    socket.broadcast.emit('show_typing_status');
  })
  socket.on('stop_typing',() => {
    socket.broadcast.emit('hide_typing_status');
  })
});

server.listen(port, () => {
  console.log(`listening to port ${port}`);
});
