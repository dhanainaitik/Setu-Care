# 🏥 SetuCare — AI-Powered Digital Healthcare Platform

> **An inclusive digital healthcare layer connecting patients, doctors, medical records, and healthcare services.**

Built for a college hackathon — a complete, working prototype demonstrating QR Health Cards, AI language translation, digital prescriptions, and a unified lifelong health timeline.

---

## 📋 Project Overview

SetuCare solves three core problems in Indian healthcare:
1. **Fragmented medical records** — No central repository for prescriptions, reports, timelines
2. **Language barriers** — Doctors and patients often speak different languages
3. **Accessibility** — Patients without smartphones need offline access to their health identity

### Core Features
- 📱 **QR Health Card** — Physical card with secure QR for offline access
- 🤖 **AI Language Translator** — Gemini-powered real-time doctor-patient translation
- 📅 **Lifelong Health Timeline** — All consultations, prescriptions, and records in one place
- 💊 **Digital Prescriptions** — Doctor-issued, patient-stored
- 🩺 **Consultation Summaries** — AI-generated, doctor-approved
- 🏥 **Hospital Discovery** — Nearby hospitals with partner discounts
- 👨‍👩‍👧 **Family Health** — Manage records for entire family
- 👨‍⚕️ **Three Roles** — Patient, Doctor, Admin

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6) |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| AI | Google Gemini API (`gemini-1.5-flash`) |
| QR Generation | `qrcode` npm + qrcode.js CDN |
| QR Scanning | html5-qrcode CDN |
| File Uploads | multer |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cd backend
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/setucare
JWT_SECRET=setucare_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here   # Optional — app works with mock AI if missing
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

> **Gemini API Key**: Get one free at [Google AI Studio](https://aistudio.google.com/app/apikey). If not set, all AI features use realistic mock responses — the demo still works perfectly.

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local) OR MongoDB Atlas URI
- Git

### 1. Clone / Extract
```bash
cd setuCare
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
```

### 3. Database Setup
Make sure MongoDB is running:
```bash
# Windows
mongod

# Or use MongoDB Atlas — update MONGO_URI in .env
```

---

## 🌱 Seed Demo Data

```bash
cd backend
npm run seed
```

This creates:
- 3 demo patients (including Rahul Kumar)
- 2 demo doctors
- 6 hospitals
- 4 partner discounts
- Medical history, prescriptions, consultations for Rahul
- Family members

Output will show QR tokens for each patient.

---

## 🚀 Running the Application

### Backend
```bash
cd backend
npm run dev    # Development with nodemon
# OR
npm start      # Production
```
Backend runs at: **http://localhost:5000**

### Frontend
The frontend is pure HTML/CSS/JS — no build step needed.

**Option A: Simple file serving (recommended for hackathon)**
```bash
# From the setuCare root directory
npx serve frontend -p 3000
```

**Option B: VS Code Live Server**
Open `frontend/index.html` with Live Server extension.

**Option C: Direct file opening**
Open `frontend/index.html` in your browser.
> Note: Some API calls may require CORS to be set correctly if opening as `file://`

Frontend runs at: **http://localhost:3000**

---

## 🎯 Demo Credentials

| Role | Name | Phone | Password |
|---|---|---|---|
| Patient (Primary Demo) | Rahul Kumar | 9876543210 | Patient@123 |
| Patient | Priya Singh | 9876543211 | Patient@123 |
| Patient | Mohammed Ali Khan | 9876543212 | Patient@123 |
| Doctor | Dr. Rajesh Sharma | 9100000001 | Doctor@123 |
| Doctor | Dr. Priya Patel | 9100000002 | Doctor@123 |
| Admin | SetuCare Admin | 9000000000 | Admin@123 |

---

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new patient |
| POST | `/api/auth/login` | Login (all roles) |
| GET | `/api/auth/me` | Get current user |

### Patients
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/patients/:id` | Patient profile |
| GET | `/api/patients/:id/records` | Medical records |
| GET | `/api/patients/:id/timeline` | Health timeline |
| GET | `/api/patients/:id/medications` | Active medications |
| GET | `/api/patients/:id/prescriptions` | All prescriptions |
| GET | `/api/patients/:id/consultations` | All consultations |

### QR
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/qr/generate` | Generate QR token |
| GET | `/api/qr/my/card` | My QR card |
| GET | `/api/qr/:token` | Resolve token → patient |
| GET | `/api/qr/by-healthid/:healthId` | Lookup by Health ID |

### Consultations (Doctor)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/consultations` | Start consultation |
| PUT | `/api/consultations/:id` | Update transcript |
| POST | `/api/consultations/:id/summary` | Generate AI summary |
| PUT | `/api/consultations/:id/approve-summary` | Doctor approves |
| POST | `/api/consultations/translate` | Translate text |

### Prescriptions (Doctor)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/prescriptions` | Create prescription |
| PUT | `/api/prescriptions/:id/approve` | Approve prescription |

### Discovery
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/hospitals` | List hospitals |
| GET | `/api/discounts` | Partner discounts |

### Family
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/family` | List family members |
| POST | `/api/family` | Add family member |
| DELETE | `/api/family/:id` | Remove member |

---

## 🎬 Hackathon Demo Flow

**Total time: ~3-5 minutes**

### Step 1 — Patient Login
- Open `http://localhost:3000`
- Click **Patient (Rahul)** quick login button
- Show the **Patient Dashboard**: profile card, medications, conditions, timeline

### Step 2 — QR Health Card
- Click **My QR Card** in sidebar
- Show the Aadhaar-style physical card design
- Show QR code with secure token
- Click **Download** to download QR

### Step 3 — Doctor Scan
- Open a new tab, go to `http://localhost:3000`
- Click **Doctor (Dr. Sharma)** quick login
- Show **Doctor Dashboard**
- In "Enter Health ID manually": type **SC-2026-000124**
- Click **Find** → Patient result appears

### Step 4 — Patient Overview
- Click **Full Profile**
- Show: allergies, conditions, medications, prescriptions, timeline

### Step 5 — Start Consultation
- Click **Start Consultation**
- Set: Doctor = English, Patient = Hindi
- Click **▶ Start Consultation**
- Use demo phrase buttons to simulate:
  - Doctor says: "How long have you had this pain?"
  - System translates to Hindi
  - Patient responds in Hindi
  - System translates back to English

### Step 6 — End & Summarize
- Click **⏹ End Consultation**
- AI summary appears with:
  - Chief Complaint, Symptoms, Doctor Notes, Follow-up
- Click **✅ Approve Summary**

### Step 7 — Digital Prescription
- Click **💊 Create Prescription**
- Fill in medicines (or use pre-filled demo)
- Click **✅ Approve & Save Prescription**

### Step 8 — Patient View
- Switch back to Rahul's tab
- Navigate to **Prescriptions** — new prescription visible
- Navigate to **Consultations** — new consultation with summary
- Navigate to **Health Timeline** — all events chronological

### Step 9 — Find Healthcare
- Navigate to **Find Healthcare**
- Show hospitals with ratings, specialties
- Show partner discount cards (10-20% off)

---

## 🔒 Security Notes

- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens with 7-day expiry
- QR codes contain only opaque tokens — **no medical data**
- Role-based access control on all routes
- Input validation on all endpoints
- Environment variables for all secrets

---

## ⚠️ Disclaimer

> SetuCare is a healthcare record and communication platform. It does not provide medical diagnosis. All clinical decisions remain with the treating doctor. The AI features are for documentation (translation, transcription, summarization) only.

---

## 📁 Project Structure

```
setuCare/
├── backend/
│   ├── server.js           # Express app
│   ├── config/db.js        # MongoDB connection
│   ├── models/             # 11 Mongoose models
│   ├── routes/             # 11 route files
│   ├── middleware/         # Auth + Role guards
│   ├── utils/
│   │   ├── gemini.js       # AI integration + mocks
│   │   └── seed.js         # Demo data seeder
│   └── uploads/            # Multer file storage
│
└── frontend/
    ├── index.html           # Landing page
    ├── css/main.css         # Full design system
    ├── js/api.js            # Shared API client
    └── pages/               # 15 HTML pages
        ├── login.html
        ├── register.html
        ├── patient-dashboard.html
        ├── health-vault.html
        ├── timeline.html
        ├── prescriptions.html
        ├── consultations.html
        ├── qr-card.html
        ├── hospitals.html
        ├── family.html
        ├── profile.html
        ├── doctor-dashboard.html
        ├── doctor-patient.html
        ├── doctor-consultation.html
        └── admin.html
```

---

*Built with ❤️ for healthcare accessibility — SetuCare Hackathon 2026*
