class DrawingState {
  constructor() {
    this.strokes = [];
    this.redoStack = [];
  }

  addStroke(stroke) {
    this.strokes.push(stroke);
    this.redoStack = [];
  }

  undo() {
    const stroke = this.strokes.pop();
    if (stroke) this.redoStack.push(stroke);
    return this.strokes;
  }

  redo() {
    const stroke = this.redoStack.pop();
    if (stroke) this.strokes.push(stroke);
    return this.strokes;
  }
}

module.exports = DrawingState;
function redrawCanvas(strokes) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach(drawFullStroke);
}
