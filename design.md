# Low-Level Design (LLD): FocusMate

---

## 1. Introduction

**Prodigy Time** is a productivity tracker based on the Pomodoro Technique, built for organizations to improve task management, focused work, and collaboration.  
Users run timed focus sessions with short/long breaks, attach sessions to tasks, see analytics, and share progress to drive accountability and healthy workloads.

---

## 2. Tech Stack

- **Frontend:** React + Tailwind  
- **Backend:** Node.js + Express (REST APIs)  
- **Database:** MongoDB (Atlas)  
- **Deployment:** Vercel/Netlify (frontend), Render (backend), MongoDB Atlas  

---

## 3. Module Breakdown

### 3.1 Auth (JWT)
- Email/password login & signup
- Protected routes

### 3.2 Task Management
- CRUD tasks
- Categories/tags
- Priorities
- Due dates
- Status: `OPEN | IN_PROGRESS | DONE`

### 3.3 Pomodoro Timer (Frontend-owned)
- Start/pause/resume/reset
- Stores `startedAt` & `expectedEndAt` in localStorage
- On start/finish, logs sessions to the backend

### 3.4 Analytics/Dashboard
- Per-user summaries: Pomodoros/day, total focus minutes

---

## 4. API Design (Backend)

- `POST /auth/signup` – create user  
- `POST /auth/login` – login and return JWT  
- `GET /tasks` – fetch all tasks for user  
- `POST /tasks` – add new task  
- `PUT /tasks/:id` – update task  
- `DELETE /tasks/:id` – delete task  
- `POST /pomodoro/start` – log pomodoro session  
- `GET /pomodoro/history` – get productivity stats  

---

## 5. Database (MongoDB)

### 5.1 Collections

- **users:** profile, auth, Id, role
- **tasks:** Id, ownerId, title, notes, status, tags, timestamps

---

## 6. Frontend Timer Persistence (Key Idea)

- **On start:**  
  Compute `expectedEndAt = Date.now() + duration`; save `{ phase, startedAt, expectedEndAt, isRunning }` to localStorage.
- **On tick:**  
  `remaining = expectedEndAt - Date.now()`
- **On refresh:**  
  Read local state; if elapsed, finalize locally and PATCH complete to backend.
- **On start/complete:**  
  Call backend to log sessions.

---

## 7. UI/UX Screens (Wireframe List)

- Landing Page
- Auth (login / signup)
- Dashboard
- Task
- Pomodoro
- Analysis
- Settings

---

## 8. Error Handling

- Invalid auth → inline error; lock protected routes.
- Timer restore: if `expectedEndAt < now` on load, auto-finalize & log completion.

---

## 9. Non-Functional Requirements

- **Scalability:** multi-tenant by Id; stateless APIs
- **Security:** JWT, password hashing (bcrypt), input validation
- **Performance:** frontend owns timer to avoid server churn

---

## 10. Deployment

- **Frontend:** Vercel/Netlify
- **Backend:** Render


