const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// =====================
// SOCKET.IO SETUP
// =====================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// =====================
// SERVE FRONTEND
// =====================
app.use(express.static(path.join(__dirname, "../client")));

// =====================
// SOCKET CONNECTION
// =====================
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // -------- Stroke lifecycle --------

  // Stroke started
  socket.on("stroke:start", (stroke) => {
    socket.broadcast.emit("stroke:start", stroke);
  });

  // Stroke point streaming
  socket.on("stroke:point", (data) => {
    socket.broadcast.emit("stroke:point", data);
  });

  // Stroke ended
  socket.on("stroke:end", (stroke) => {
    console.log("Received stroke:", stroke.id);
    socket.broadcast.emit("stroke:received", stroke);
  });

  // -------- Disconnect --------
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("cursor:move", (pos) => {
  socket.broadcast.emit("cursor:move", {
    id: socket.id,
    x: pos.x,
    y: pos.y
  });
});

});

// =====================
// START SERVER
// =====================
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
