# Architecture – Real-Time Collaborative Drawing Canvas

## 1. Overview
This project is a real-time collaborative drawing application where multiple users
can draw simultaneously on a shared canvas. The application follows a client-server
architecture using WebSockets for real-time communication.

Drawing is synchronized using stroke data instead of images, which ensures better
performance and consistent canvas state across users.

---

## 2. System Architecture
The system consists of two main parts:

- Client: Handles user interactions, canvas rendering, and local state
- Server: Manages WebSocket connections and broadcasts drawing events

The canvas is treated as a stateless renderer, while stroke data acts as the single
source of truth.

---

## 3. Data Flow
1. User interacts with the canvas using mouse events
2. Mouse events are converted into stroke data (points)
3. Stroke data is sent to the server via WebSockets
4. Server broadcasts stroke events to other connected clients
5. Clients render strokes in real time on their canvas

---

## 4. Stroke Data Model
Each drawing action is represented as a stroke object containing:
- A unique stroke ID
- Stroke color
- Stroke width
- An array of coordinate points

This model allows efficient real-time rendering and undo/redo functionality.

---

## 5. WebSocket Events
The following WebSocket events are used in the application:

- stroke:start – triggered when drawing begins
- stroke:point – streams drawing points in real time
- stroke:end – triggered when drawing ends
- cursor:move – shares real-time cursor positions

---

## 6. Undo and Redo Strategy
Undo and redo functionality is implemented using stroke history:

- All completed strokes are stored in a strokes array
- Undone strokes are stored in a redo stack

Undo removes the last stroke and redraws the canvas.
Redo restores the stroke from the redo stack and redraws the canvas.

This ensures consistent state across all users.

---

## 7. Performance Optimization
To ensure smooth drawing performance:
- Only the latest line segment is drawn during mouse movement
- Full canvas redraw happens only during undo/redo
- Cursor movement events are throttled
- Stroke data is streamed instead of full canvas images

---

## 8. Conflict Resolution
Conflicts are handled by treating strokes as immutable operations.
Overlapping drawings are resolved naturally by the order of stroke rendering.
Undo and redo operations affect the global stroke history.

---

## 9. Scalability Considerations
For scaling to more users:
- Room-based canvas separation can be added
- Stroke point batching can reduce network traffic
- Redis pub/sub can be used for horizontal scaling

---

## 10. Conclusion
This architecture focuses on simplicity, performance, and real-time synchronization.
By separating rendering, state management, and networking, the system achieves
efficient collaborative drawing with consistent behavior across clients.
