# DocSlot AI — Rural Clinical Navigation & Early Risk Detection

**Team Codefinix** | GDG Bit N Build '26 — UP Regionals | Problem Statement 01 (HealthTech)

## Problem

Rural and semi-urban populations often face fragmented healthcare access. A person may have symptoms, previous prescriptions, or lab reports, but no unified system helps them understand what to do next or which specialist to consult.

## Our Solution

DocSlot AI is a multimodal, AI-powered healthcare navigation assistant that lets patients describe their health concern by typing, speaking, or uploading a photo of an old prescription/lab report. The system analyzes the input and classifies it into one of three tiers — Self-Care, See a Doctor, or Urgent — while explaining its reasoning and recommending the right specialist, without ever attempting a definitive diagnosis.

## Key Features

**Core**
- Multimodal input — text, voice (multi-language), and image upload
- AI-powered 3-tier risk navigation engine (Self-Care / See a Doctor / Urgent)
- No-diagnosis policy — always guides toward the right next step, never confirms a condition
- Reliable rule-based fallback engine if the API/internet is unavailable

**Special (Key Differentiators)**
- Explainable Reasoning Trail — every suggestion comes with a "Why this suggestion?" explanation
- Multi-Language Voice Support — voice input in Hindi and regional languages, not just English
- Human-in-the-Loop Escalation — the system openly flags low-confidence assessments and recommends confirming with a local health worker or doctor

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- AI Engine: Google Gemini API (gemini-3.6-flash) for multimodal reasoning; rule-based JavaScript engine as an offline fallback
- Backend: Node.js + Express (proxies requests to Gemini so the API key never reaches the browser)
- Voice: Browser Web Speech API (multi-language recognition)

## Architecture

Patient (text / voice / image)
        down to
Frontend (AI-help.html/js) — captures input, shows chat UI
        down to
Backend (server.js) — /api/symptom-check
        down to
Google Gemini API — multimodal analysis + structured response
        down to
Frontend — parses [LEVEL] [CONFIDENCE] [REASONING] [SPECIALIST] [ADVICE]
        then shows tier badge, reasoning trail, escalation notice,
        and matching doctor cards

If the Gemini API call fails (no internet/quota), the backend error is caught and a local rule-based keyword-matching engine takes over instantly, so the app never crashes or shows a blank response.

## Innovation

- Combines conversational AI, document understanding, and voice — in one lightweight, dependency-free frontend
- Works reliably even with poor connectivity via the built-in fallback engine
- Explainability and human-in-the-loop design directly address trust and safety concerns in AI-assisted healthcare guidance

## Impact

Helps rural and semi-urban patients get quick, understandable guidance on their health concerns in their own language, reducing unnecessary clinic visits for minor issues while ensuring urgent cases are flagged immediately.

## Setup Instructions

Prerequisites: Node.js installed, and a Google Gemini API key from Google AI Studio (aistudio.google.com)

Steps:

1. Clone the repository
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. Install backend dependencies
   npm install

3. Add your Gemini API key
   Create a .env file in the project folder:
   GEMINI_API_KEY=your_api_key_here

4. Start the backend server
   node server.js
   The backend runs at http://localhost:3000

5. Open the frontend
   Open AI-help.html in a browser (recommended: use VS Code's "Live Server" extension for the best experience with voice/microphone permissions).

## Team

Codefinix — Built end-to-end for GDG Bit N Build '26, UP Regionals.
