# Doctor Prescription App with AI Autocomplete

A doctor prescription form with **AI-powered inline ghost-text autocomplete** as you type.

## Features
- Patient Info, Diagnosis, Medications, Doctor signature sections
- AI autocomplete (ghost text) on diagnosis and medication fields
- Press **Tab** to accept a suggestion, **Escape** to dismiss
- AI provider selector (Gemini at launch; ChatGPT & Claude ready in Phase 2)
- Clean **Print to A4** layout

## Quick Start

### 1. Backend
```bash
cd backend
cp .env.example .env
# Add your GEMINI_API_KEY in .env
npm install
npm start
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Getting a Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Create a free API key
3. Add it to `backend/.env` as `GEMINI_API_KEY=your_key`

## Phase 2 (coming soon)
- OpenAI ChatGPT provider
- Anthropic Claude provider
- Side suggestion panel
- PDF export
