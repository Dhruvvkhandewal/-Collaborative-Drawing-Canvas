


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


window.strokes = [];
window.redoStack = [];
window.remoteStrokes = {};
let currentStroke = null;
let isDrawing = false;




canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;

  currentStroke = {
    id: crypto.randomUUID(),
    color: "black",
    width: 2,
    points: [{ x: e.offsetX, y: e.offsetY }]
  };
    socket.emit("stroke:start", currentStroke);
});


canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;

  const point = { x: e.offsetX, y: e.offsetY };
  currentStroke.points.push(point);

  drawLatestSegment(currentStroke); // 👈 THIS CALL
  socket.emit("stroke:point", {
  id: currentStroke.id,
  point
});

});


canvas.addEventListener("mouseup", () => {
    isDrawing = false;
   strokes.push(currentStroke);
    redoStack = [];

// 🔥 SEND STROKE TO SERVER
    socket.emit("stroke:end", currentStroke);

   currentStroke = null;
   redrawCanvas();

});



 window.drawLatestSegment = function (stroke) {
  const pts = stroke.points;

 
  if (pts.length < 2) return;

  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.width;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(
    pts[pts.length - 2].x,
    pts[pts.length - 2].y
  );
  ctx.lineTo(
    pts[pts.length - 1].x,
    pts[pts.length - 1].y
  );
  ctx.stroke();
}
window.redrawCanvas = function ()  {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  strokes.forEach(stroke => {
    drawFullStroke(stroke);
  });
}
window.drawFullStroke = function (stroke) {
  const pts = stroke.points;
  if (pts.length < 2) return;

  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.width;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);

  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }

  ctx.stroke();
}

const undoBtn = document.getElementById("undoBtn");

undoBtn.addEventListener("click", () => {
  if (strokes.length === 0) return;

  const stroke = strokes.pop();
  redoStack.push(stroke);
  redrawCanvas();
   
});

const redoBtn = document.getElementById("redoBtn");

redoBtn.addEventListener("click", () => {
  if (redoStack.length === 0) return;

  const stroke = redoStack.pop();
  strokes.push(stroke);
  redrawCanvas();

});

let lastCursorEmit = 0;

canvas.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastCursorEmit < 30) return; 
  lastCursorEmit = now;

  socket.emit("cursor:move", {
    x: e.offsetX,
    y: e.offsetY
  });
});





