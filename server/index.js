//server entry point
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  //instantianting a new server with origin and methods
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => { //data is id of room passed in front end of application
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room ${data}`) //$data is room number and socket id is user id from joining the server
  });

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running");
});
