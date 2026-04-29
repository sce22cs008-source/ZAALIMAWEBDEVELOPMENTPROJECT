# CareerForge Pro 🚀
**AI-Powered ATS-Proof Resume Generator & Job Matcher**

## 🏗️ Architecture
This project follows a modern **Decoupled Monorepo** structure.

### 1. Frontend (`/client`)
- **Framework**: React 18 (Vite)
- **Styling**: Vanilla CSS + Tailwind Utility Classes
- **State Management**: Redux Toolkit for global resume state and user authentication.
- **Animations**: Framer Motion for premium UI transitions.

### 2. Backend (`/server`)
- **Framework**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenAI SDK (GPT-4o) for content optimization.
- **PDF Core**: Puppeteer for generating high-fidelity, print-ready resumes.

### 3. Payments
- **Stripe**: Handles subscription lifecycles, user roles, and webhooks.

---

## 📂 Folder Structure
```text
careerforge-pro/
├── client/                 # React Frontend
│   └── src/
│       ├── components/     # Reusable UI pieces
│       ├── features/       # Feature-specific logic
│       ├── store/          # Redux Toolkit setup
│       └── services/       # API interaction layers
├── server/                 # Node.js Backend
│   ├── models/             # Database Schemas
│   ├── routes/             # REST Endpoints
│   ├── services/           # AI, PDF, and Stripe logic
│   └── controllers/        # Request handlers
└── .env                    # Environment secrets
```
