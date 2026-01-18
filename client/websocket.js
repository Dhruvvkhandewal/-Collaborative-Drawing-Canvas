const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});



// Remote stroke started
socket.on("stroke:start", (stroke) => {
  window.remoteStrokes[stroke.id] = stroke;
});

// Remote stroke point received
socket.on("stroke:point", ({ id, point }) => {
  const stroke = window.remoteStrokes[id];
  if (!stroke) return;

  stroke.points.push(point);
  window.drawLatestSegment(stroke);
});

// Remote stroke finished
socket.on("stroke:received", (stroke) => {
  delete window.remoteStrokes[stroke.id];
  window.strokes.push(stroke);
  window.redrawCanvas();
});

const cursors = {};
const stage = document.getElementById("stage");

socket.on("cursor:move", ({ id, x, y }) => {
  let el = cursors[id];

  if (!el) {
    el = document.createElement("div");
    el.className = "cursor";
    el.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
    cursors[id] = el;
    stage.appendChild(el);
  }

  el.style.transform = `translate(${x}px, ${y}px)`;
});

socket.on("disconnect", () => {
  Object.values(cursors).forEach(el => el.remove());
});



