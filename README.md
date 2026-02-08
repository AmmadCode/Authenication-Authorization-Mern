# MERN Auth System

A full-stack authentication project built with the MERN stack. It supports email-based account verification and password reset via OTP, secure JWT cookies, and a React + Tailwind frontend.

**Features**
- Register and login with email/password
- JWT auth stored in HTTP-only cookies
- Email verification with 6-digit OTP
- Password reset via email OTP
- Basic password strength validation
- Rate limiting for login and OTP endpoints
- Protected route to fetch user data

**Tech Stack**
- Frontend: React, Vite, Tailwind CSS, React Router, Axios, React Toastify
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt, Nodemailer
- Email: SMTP (Brevo default in config)

**Project Structure**
- `backend/` Express API, auth logic, database models, email handling
- `frontend/` React app with auth pages and protected UI

**Prerequisites**
- Node.js (LTS recommended)
- MongoDB (local or Atlas)
- SMTP credentials for sending emails

**Environment Variables**

Backend: `backend/.env`
```env
MONGODB_URI="your_mongodb_connection_string"
DB_NAME="your_database_name"
JWT_SECRET="your_jwt_secret"
NODE_ENV="development"
SMTP_USER="your_smtp_user"
SMTP_PASS="your_smtp_password"
SMTP_EMAIL="your_email_address"
FRONTEND_URL="http://localhost:5173"
```

Frontend: `frontend/.env`
```env
VITE_BACKEND_URL="http://localhost:4000"
```

**Install**
```powershell
cd backend
npm install

cd ..\frontend
npm install
```

**Run (Development)**
```powershell
cd backend
npm run server
```

```powershell
cd frontend
npm run dev
```

Backend runs on `http://localhost:4000` by default. Frontend runs on `http://localhost:5173`.

**API Endpoints**

Base URL: `http://localhost:4000/api`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login a user |
| POST | `/auth/logout` | Logout and clear cookie |
| POST | `/auth/send-verify-otp` | Send email verification OTP (auth required) |
| POST | `/auth/verify-account` | Verify account with OTP (auth required) |
| GET | `/auth/is-auth` | Check auth status |
| POST | `/auth/send-reset-otp` | Send password reset OTP |
| POST | `/auth/reset-password` | Reset password with OTP |
| GET | `/user/data` | Get user data (auth required) |

**Notes**
- CORS is configured to allow the `FRONTEND_URL` and send cookies.
- In production, cookies are set with `secure: true` and `sameSite: none`.

**Scripts**

Backend (`backend/`)
- `npm run server` Start API with nodemon
- `npm start` Start API with node

Frontend (`frontend/`)
- `npm run dev` Start Vite dev server
- `npm run build` Build for production
- `npm run preview` Preview production build
- `npm run lint` Lint the frontend

**License**
No license specified.
