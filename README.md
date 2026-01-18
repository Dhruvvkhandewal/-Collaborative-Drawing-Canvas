# Real-Time Collaborative Drawing Canvas

## Overview
This project is a real-time collaborative drawing application where multiple users can
draw simultaneously on a shared canvas. The application uses the HTML5 Canvas API for
drawing and Socket.io for real-time communication between users.

Instead of sharing images, the system synchronizes drawing actions as stroke data
(coordinates), which ensures better performance and consistent canvas state.

---

## Tech Stack
- Frontend: HTML, CSS, JavaScript (Canvas API)
- Backend: Node.js, Express
- Real-time Communication: Socket.io

---

## Features
- Real-time multi-user drawing
- Live stroke streaming (drawing appears while moving the mouse)
- Global undo and redo functionality
- User cursor indicators
- Optimized canvas rendering
- Conflict-safe stroke-based architecture

---

## Project Structure
collaborative-canvas/
├── client/
│ ├── index.html
│ ├── style.css
│ ├── canvas.js
│ ├── websocket.js
│ └── main.js
├── server/
│ └── server.js
├── package.json
├── README.md
└── ARCHITECTURE.md

---

## Setup Instructions
1. Clone the repository
2. Install dependencies:
npm install

3. Start the server:


node server/server.js

4. Open the application in your browser:


http://localhost:3000

---

## How to Test with Multiple Users
- Open the application in two or more browser tabs
- Draw in one tab and observe real-time drawing in the others
- Cursor movements and drawing strokes should sync instantly

---

## Known Limitations
- No user authentication
- Canvas data is not persisted after refresh
- Mobile touch support not implemented

---

## Time Spent
Approximately 3–5 days

---

## Conclusion
This project demonstrates real-time system design, efficient canvas rendering,
WebSocket-based communication, and clean separation of concerns between rendering,
state, and networking layers.
