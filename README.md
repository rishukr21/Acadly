# Acadly 🎓
> **Study smarter. Prepare better. Achieve more.**  
> An all-in-one semester examination preparation platform tailored for B.Tech & B.E. college students.

---

## 1. Project Overview
Acadly is designed from the ground up for engineering undergraduates to conquer their semester exams. Instead of juggling fragmented PDFs, chaotic spreadsheets, and last-minute panic, Acadly provides a unified, distraction-free SaaS workspace featuring syllabus tracking, study scheduling, countdown timers, and an AI study tutor.

**Phase 1 Deliverables:**
- Production-grade MERN architecture with modular controllers, services, middleware, and route guards.
- Secure authentication system (JWT via HTTP-only cookies, bcrypt hashing, and Google Identity Services OAuth).
- Multi-step student academic onboarding workflow (degree, college, engineering branch, semester standing).
- Premium SaaS design system inspired by Linear, Notion, and Vercel with light/dark theme persistence.
- Complete landing page and interactive authenticated dashboard with honest empty states (zero fabricated statistics).
- Live placeholder interfaces for all 10 future modules.

---

## 2. Technology Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom brand palette & dark mode
- **Routing:** React Router DOM (v7)
- **State & Context:** React Context API (Auth, Theme, Toast notifications)
- **Forms & Validation:** React Hook Form
- **HTTP Client:** Axios (configured with `withCredentials: true` for HTTP-only cookies)
- **Icons:** Lucide React
- **Authentication Client:** Google Identity Services (`https://accounts.google.com/gsi/client`)

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Zero-Setup Local Dev:** `mongodb-memory-server` automatic fallback if external MongoDB URI is not configured
- **Security:** `bcryptjs` (salt rounds: 12), `jsonwebtoken`, `cookie-parser`, `cors`
- **Rate Limiting:** `express-rate-limit`
- **Validation:** `express-validator`
- **OAuth Verification:** `google-auth-library`

---

## 3. Folder Structure
```
Acadly/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Input, Card, Modal, Avatar, ThemeToggle, Toast, EmptyState
│   │   │   └── layout/         # Navbar, Sidebar, TopNav, DashboardLayout
│   │   ├── context/            # AuthContext, ThemeContext, ToastContext
│   │   ├── pages/              # LandingPage, LoginPage, RegisterPage, OnboardingPage, DashboardPage, SettingsPage
│   │   │   └── modules/        # 10 Phase 2/3/4 module placeholders
│   │   ├── routes/             # ProtectedRoute, OnboardingRoute, PublicRoute, AppRoutes
│   │   ├── services/           # api.js, authService.js, userService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Express.js Backend API
│   ├── src/
│   │   ├── config/             # db.js, env.js
│   │   ├── controllers/        # authController.js, userController.js
│   │   ├── middleware/         # authMiddleware.js, errorMiddleware.js, rateLimiter.js
│   │   ├── models/             # User.js (Mongoose Schema)
│   │   ├── routes/             # authRoutes.js, userRoutes.js, healthRoutes.js
│   │   ├── services/           # tokenService.js, googleAuthService.js
│   │   ├── validators/         # authValidators.js
│   │   ├── utils/              # responseHandler.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── package.json                # Root package for concurrent execution
├── PROJECT_STATUS.md           # Implementation tracker & sprint log
├── README.md
└── .gitignore
```

---

## 4. Environment Variables

### Server (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port for Express server | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB Atlas / local connection string | *(Leave blank for automatic in-memory DB fallback)* |
| `JWT_SECRET` | Secret key used to sign JWT session cookies | `super_secret_jwt_key_32_characters_min` |
| `JWT_EXPIRES_IN` | Token validity | `7d` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID from Google Cloud Console | `your_client_id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret | `your_client_secret` |

### Client (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID for frontend button | `your_client_id.apps.googleusercontent.com` |

---

## 5. Installation & Running the Project

### Option A: Run Both Concurrently (Recommended)
From the project root:
```bash
# 1. Install root, backend, and frontend dependencies
npm run install:all

# 2. Start both backend and frontend development servers
npm run dev
```
- Backend runs at: `http://localhost:5000`
- Frontend runs at: `http://localhost:5173`
- API Health Check: `http://localhost:5000/api/health`

### Option B: Run Individually

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

---

## 6. Authentication & Database Details

### Password Security & Session Handling
1. **Bcrypt Hashing:** Passwords are salted with 12 rounds before storing in MongoDB.
2. **HTTP-Only Cookies:** Tokens are set in `acadly_token` cookies with `httpOnly: true`, preventing XSS extraction.
3. **Mongoose User Model:** Excludes `passwordHash` by default (`select: false` and custom `toJSON` serialization).
4. **Rate Limiting:** Protects `/api/auth/*` against brute-force password guessing.

### Google OAuth Flow
1. The client loads Google Identity Services (`gsi/client`).
2. When configured with `VITE_GOOGLE_CLIENT_ID`, the user logs in via Google and receives a JWT ID token.
3. The ID token is securely sent to `POST /api/auth/google`.
4. The backend verifies the signature and audience using `google-auth-library`.
5. If the user already exists by Google ID or email, the accounts are safely linked. Otherwise, a new user document is created.
6. If credentials are not yet configured in `.env`, the UI provides clear instructions and avoids fake login simulations.

### In-Memory MongoDB Fallback
If you do not have a live MongoDB Atlas cluster or local `mongod` instance available, the backend automatically launches `mongodb-memory-server` in development mode. You can register, log in, perform onboarding, and update settings immediately with zero manual database configuration!

---

## 7. API Endpoints Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System uptime & database connection status |
| `POST` | `/api/auth/register` | Public | Register with name, email, password |
| `POST` | `/api/auth/login` | Public | Login with email and password |
| `POST` | `/api/auth/google` | Public | Authenticate via Google ID token |
| `GET` | `/api/auth/me` | Protected | Fetch current user session |
| `POST` | `/api/auth/logout` | Public | Clear HTTP-only session cookie |
| `PUT` | `/api/users/profile` | Protected | Update personal & academic onboarding info |
| `PUT` | `/api/users/theme` | Protected | Update theme preference |

---

## 8. License & Credits
Designed and engineered for engineering students. Phase 1 Foundation by Acadly Team.
