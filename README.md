# 📝 prepAI – Master Every Interview With AI

**prepAI** is a full-stack **MERN** application that helps candidates prepare for interviews in a structured and personalized way. Users can log in, select their **role**, **experience level**, and **topics to focus on**, and the app generates tailored interview questions. Each question includes the option to **"Learn More"** for deeper concept explanations, ensuring both practice and learning. 👉 *AI-Powered Prep for Every Role, Every Level.*

---

## 🚀 Tech Stack

| Layer           | Technology                                                                   |
| --------------- | ---------------------------------------------------------------------------- |
| Frontend        | React 19, Vite, React Router, Tailwind CSS, Axios, React Hot Toast, React Icons, Framer Motion |
| Backend         | Node.js, Express.js                                                          |
| Database        | MongoDB (via Mongoose)                                                       |
| AI              | Google Generative AI (for questions & explanations)                          |
| Auth & Security | JWT-based auth, bcryptjs, CORS                                              |
| File Upload     | Multer                                                                       |
| Deployment      | Vercel (frontend), Render/Railway (backend)                                  |

---

## ✨ Features

- **Personalized Interview Prep** – Users log in, select their role, experience level, and focus topics.
- **AI-Generated Questions** – Dynamically generate important interview questions using Google Gemini API.
- **Learn More Explanations** – Click a question to view a detailed AI-powered concept explanation.
- **Session Management** – Save, manage, and revisit past interview sessions.
- **User Authentication** – Secure login/signup with JWT tokens and protected API routes.
- **Profile Management** – Upload and manage profile information with photo support.
- **Responsive UI** – Tailwind CSS-based clean design that works across all devices.
- **Real-time Feedback** – Get insights and guidance on your interview preparation.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v14+
- MongoDB URI (Atlas or local)
- Google Generative AI API key ([Get one here](https://ai.google.dev))

---

### 1) Clone & Install

```bash
git clone <repository-url>
cd "Ai Prep"

# Backend
cd Backend
npm install

# Frontend
cd ../frontend/interview-prep-ai
npm install
```

---

### 2) Environment Variables

Create **two** `.env` files—one in `Backend/` and one in `frontend/interview-prep-ai/`.

**`Backend/.env`**

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-interview-prep
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
GOOGLE_API_KEY=your_google_generative_ai_api_key
```

**`frontend/interview-prep-ai/.env`**

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3) Run the App (Local)

```bash
# Terminal 1 – Backend
cd Backend
npm run dev   # Uses nodemon for auto-reload

# Terminal 2 – Frontend
cd frontend/interview-prep-ai
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
Ai Prep/
├── Backend/
│   ├── controllers/
│   │   ├── authControllers.js      # Login, signup logic
│   │   ├── aiControllers.js        # AI question & explanation generation
│   │   ├── sessionController.js    # Session CRUD operations
│   │   └── questionController.js   # Question management
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── Session.js              # Interview session schema
│   │   └── Question.js             # Question schema
│   ├── routes/
│   │   ├── authRoutes.js           # /auth endpoints
│   │   ├── aiRoutes.js             # /ai endpoints
│   │   ├── sessionRoutes.js        # /sessions endpoints
│   │   └── questionRoutes.js       # /questions endpoints
│   ├── middlewares/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── uploadMiddleware.js     # File upload handling
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── utils/
│   │   └── prompts.js              # AI prompt templates
│   ├── uploads/                    # User uploaded files directory
│   ├── server.js                   # Express server entry point
│   └── package.json
│
├── frontend/interview-prep-ai/
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── LandingPage.jsx           # Homepage
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   ├── Home/
│   │   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   │   └── CreateSessionForm.jsx
│   │   │   └── InterviewPrep/
│   │   │       ├── InterviewPrep.jsx    # Main interview interface
│   │   │       └── components/
│   │   │           ├── AIResponsePreview.jsx
│   │   │           └── RoleInfoHeader.jsx
│   │   ├── components/
│   │   │   ├── Cards/
│   │   │   │   ├── ProfileCard.jsx
│   │   │   │   ├── QuestionCard.jsx
│   │   │   │   └── SummaryCard.jsx
│   │   │   ├── Inputs/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── ProfilePhotoSelector.jsx
│   │   │   ├── Layouts/
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── Loader/
│   │   │   │   ├── SkeletonLoader.jsx
│   │   │   │   └── SpinnerLoader.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Drawer.jsx
│   │   │   └── DeleteAlertContent.jsx
│   │   ├── context/
│   │   │   └── UserContext.jsx          # Global user state
│   │   ├── utils/
│   │   │   ├── axiosInstance.js         # Axios with auth headers
│   │   │   ├── apiPaths.js              # API endpoint constants
│   │   │   ├── helper.js
│   │   │   └── uploadImage.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
└── .git/
```

---

## 🔐 API Routes Overview

### Authentication (`/api/auth`)
- `POST /auth/signup` – Register new user
- `POST /auth/login` – User login (returns JWT)
- `POST /auth/logout` – User logout

### Sessions (`/api/sessions`)
- `GET /sessions` – Get all user's interview sessions
- `POST /sessions` – Create new interview session
- `GET /sessions/:id` – Get session details
- `DELETE /sessions/:id` – Delete a session

### Questions (`/api/questions`)
- `GET /questions` – Fetch question bank
- `POST /questions` – Create new question
- `GET /questions/:id` – Get question details

### AI-Powered (`/api/ai`)
- `POST /ai/generate-questions` – Generate interview questions (protected)
- `POST /ai/generate-explanation` – Generate detailed concept explanation (protected)

---

## 🌐 Frontend Routes

| Route                        | Description                |
|------------------------------|---------------------------|
| `/`                          | Landing page              |
| `/signup`                    | User registration         |
| `/login`                     | User login                |
| `/dashboard`                 | User dashboard & sessions |
| `/interview-prep/:sessionId` | Main interview interface  |

---

## 🔧 Available Scripts

**Backend**
```bash
npm run dev    # Start with nodemon (development)
npm start      # Start server (production)
```

**Frontend**
```bash
npm run dev     # Start dev server with Vite
npm run build   # Build for production
npm run preview # Preview production build locally
npm run lint    # Run ESLint
```

---

## 🎯 How It Works

1. **User Registration & Login** – Secure authentication with JWT tokens
2. **Select Interview Parameters** – Choose role, experience level, and topics
3. **AI Question Generation** – Google Gemini API generates relevant interview questions
4. **Practice & Learn** – Answer questions and click "Learn More" for concept explanations
5. **Session Tracking** – All sessions are saved for future reference
6. **Progress Monitoring** – Dashboard shows interview history and statistics

---

## 🙌 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License

---

## 🚀 Deployment Notes

- **Frontend**: Deploy to Vercel, Netlify, or any static hosting
- **Backend**: Deploy to Render, Railway, Heroku, or any Node.js hosting
- **Database**: Use MongoDB Atlas for cloud hosting
- **Environment Variables**: Set all `.env` variables in your hosting platform's configuration

---

**Happy Interviewing! 🎉** Start your interview prep journey today!
