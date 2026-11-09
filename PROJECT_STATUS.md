# Acadly - Project Status & Roadmap

**Current Phase:** Phase 1 (Foundation, UI & Authentication)  
**Status:** Complete & Fully Verified ✅  
**Target Audience:** B.Tech/B.E. College Students  
**Design Aesthetic:** Linear / Notion / Vercel-inspired SaaS (Indigo/Violet palette, Light & Dark mode)

---

## 1. Phase 1 Verification Checklist

### Architecture & Setup
- [x] Workspace inspected and Git initialized
- [x] Project architecture planned & executed (Client + Server structure)
- [x] Root monorepo setup with concurrent dev scripts (`npm run dev`)
- [x] Backend Express architecture setup (ES Modules)
- [x] Frontend React + Vite + Tailwind CSS setup with custom brand palette

### Backend Features
- [x] MongoDB connection with automatic dev fallback (`mongodb-memory-server` / Atlas URI)
- [x] User Mongoose model with timestamps and validation (`passwordHash` excluded by default)
- [x] Centralized error handling & structured responses
- [x] Rate limiting (`express-rate-limit`) & security headers (CORS with credentials, Cookie config)
- [x] Password hashing via `bcryptjs` (12 rounds)
- [x] JWT tokens issued via secure HTTP-only cookies (`acadly_token`)
- [x] `POST /api/auth/register` (name, email, password - validated & duplicate check)
- [x] `POST /api/auth/login` (email, password, remember-me support)
- [x] `POST /api/auth/google` (Google ID token verification via `google-auth-library`)
- [x] `GET /api/auth/me` (current authenticated user via cookie/bearer token)
- [x] `POST /api/auth/logout` (clears HTTP-only cookie)
- [x] `PUT /api/users/profile` (update profile & academic onboarding details)
- [x] `PUT /api/users/theme` (save theme preference)
- [x] `GET /api/health` (server, uptime, & database health status)

### Frontend Features
- [x] Design system tokens (Sophisticated Indigo/Violet palette, subtle borders, dark mode support)
- [x] Persistent Theme Provider (`light` / `dark`, saved in `localStorage`, syncs with `.dark` root class)
- [x] Auth Provider (`user`, `login`, `register`, `logout`, `updateUser`, `googleLogin`)
- [x] Toast notification system (success, error, warning, info toasts with auto-dismiss)
- [x] Reusable UI components (`Button`, `Input`, `Card`, `Modal`, `Avatar`, `ThemeToggle`, `LoadingSpinner`, `EmptyState`, `GoogleLoginButton`)
- [x] Premium SaaS Landing Page
  - [x] Sticky glassmorphism Navbar with responsive mobile drawer
  - [x] Hero section with interactive live-like SaaS dashboard preview
  - [x] 8 Feature cards with subtle hover states
  - [x] How it works (3-step timeline)
  - [x] Why Acadly & AI-powered learning section with conversational demo
  - [x] Testimonials (clearly labelled demo feedback from college undergrads)
  - [x] Final Call to Action & Footer
- [x] Authentication Screens
  - [x] Registration with strength indicator & password visibility toggle
  - [x] Login with remember-me, forgot password modal, and Google button
  - [x] Google Identity Services integration with real verification and configuration helper
- [x] Multi-Step Student Onboarding (4 Steps)
  - [x] Step 1: Personal info (Name, Avatar preset selection)
  - [x] Step 2: Academic info (College name, Degree - B.Tech / B.E.)
  - [x] Step 3: Semester & Academic Year setup (Branch, Semester 1–8, Session)
  - [x] Step 4: Completion screen with setup summary and dashboard redirect
- [x] Authenticated SaaS Dashboard
  - [x] Collapsible desktop sidebar & mobile drawer (Linear/Notion inspired)
  - [x] Top navigation (Page title, Search bar, Notifications popover, Theme toggle, User dropdown)
  - [x] Dashboard widgets with zero fabricated stats (friendly empty states & quick actions)
  - [x] Live placeholder interfaces for all 10 future modules:
    - [x] My Subjects (`/dashboard/subjects`)
    - [x] Study Planner (`/dashboard/planner`)
    - [x] Exam Schedule (`/dashboard/exams`)
    - [x] Pomodoro Timer (`/dashboard/pomodoro`)
    - [x] Revision Center (`/dashboard/revision`)
    - [x] AI Study Assistant (`/dashboard/ai-assistant`)
    - [x] Notes & Resources (`/dashboard/notes`)
    - [x] Study Groups (`/dashboard/groups`)
    - [x] Leaderboard (`/dashboard/leaderboard`)
    - [x] Analytics (`/dashboard/analytics`)
- [x] Settings Page
  - [x] Profile information & academic details editing (connected to backend `PUT /api/users/profile`)
  - [x] Theme preference selection (Light & Dark mode switch)
  - [x] Account security details & logout trigger

### Documentation & Verification
- [x] `README.md` created with architecture and quick start
- [x] `PROJECT_STATUS.md` updated
- [x] `server/.env.example` and `client/.env.example` created
- [x] End-to-end testing with running servers and verified HTTP endpoints

---

## 2. Dependencies Installed

### Root Monorepo
- `concurrently`: ^9.1.2

### Client (`client/package.json`)
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^7.3.0
- `axios`: ^1.8.1
- `lucide-react`: ^0.477.0
- `react-hook-form`: ^7.54.2
- `tailwindcss`: ^3.4.17
- `postcss`: ^8.5.3
- `autoprefixer`: ^10.4.20
- `vite`: ^6.2.0

### Server (`server/package.json`)
- `express`: ^4.21.2
- `mongoose`: ^8.12.1
- `dotenv`: ^16.4.7
- `cors`: ^2.8.5
- `cookie-parser`: ^1.4.7
- `bcryptjs`: ^3.0.2
- `jsonwebtoken`: ^9.0.2
- `google-auth-library`: ^9.15.1
- `express-rate-limit`: ^7.5.0
- `express-validator`: ^7.2.1
- `mongodb-memory-server`: ^10.1.4 (for zero-setup dev database fallback)
- `nodemon`: ^3.1.9

---

## 3. Verified End-to-End Test Suite

| Test Case | Method / Route | Expected Result | Actual Result |
| :--- | :--- | :--- | :--- |
| Health Check | `GET /api/health` | 200 OK, database connected | Status: healthy, db connected ✅ |
| Registration | `POST /api/auth/register` | 201 Created, user returned, JWT cookie set | 201 Created, password hash omitted ✅ |
| Duplicate Check | `POST /api/auth/register` | 400 Bad Request, duplicate email rejected | 400 Bad Request ("email already exists") ✅ |
| Invalid Login | `POST /api/auth/login` | 401 Unauthorized for wrong password | 401 Unauthorized ("Invalid email or password") ✅ |
| Valid Login | `POST /api/auth/login` | 200 OK, user returned, cookie set | 200 OK with session cookie ✅ |
| Current User | `GET /api/auth/me` | 200 OK, returns user profile from cookie | 200 OK with active user data ✅ |
| Onboarding Save | `PUT /api/users/profile` | 200 OK, updates academic data in MongoDB | 200 OK, college, sem, branch updated ✅ |
| Logout | `POST /api/auth/logout` | 200 OK, clears cookie | 200 OK, cookie cleared ✅ |
| Post-Logout Check | `GET /api/auth/me` | 401 Unauthorized after cookie cleared | 401 Unauthorized ("Authentication required") ✅ |
| Client Production Build | `npm run build` | Zero syntax or bundling errors | Built in 1.21s cleanly ✅ |
| Vite Dev Server | `http://localhost:5173` | Serves React index.html and assets | 200 OK, renders properly ✅ |

---

## 4. How to Run

```bash
# In the root workspace:
npm run dev
```
- Backend runs on `http://localhost:5001`
- Frontend runs on `http://localhost:5173`
