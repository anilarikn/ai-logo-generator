# 📱 AI Logo Generator — Mobile App (React Native + Expo)

AI Logo Generator is a mobile application that allows users to generate AI-powered logos based on a prompt and a selected style.  
The backend processes logo creation using a queued task system, and the mobile app polls for the final result before displaying it.

---

## 🚀 Features

### 🎨 Logo Generation Flow
- User enters a logo prompt.
- Selects a style card.
- App sends request to backend (Cloud Run).
- Backend queues and processes the job.
- App polls task status until complete.
- Output screen displays high-quality generated logo.

### 🧩 Key UI Components
- **GradientBackground** — layered beams + blur
- **Banner** — info / success / error states  
  - Spinner for loading  
  - Gradient success  
  - Thumbnail preview
- **TextArea** — prompt input
- **StyleCard** — logo style selector
- **PrimaryButton** — gradient action button

### 🖼 Output Screen
- Full-width generated image
- Prompt summary card
- Style label
- Clipboard copy button (Expo Clipboard)

---

## 🔌 API Flow

### **1. Generate Logo**
```
POST /generate
{
  "prompt": "a blue lion logo",
  "style": "monogram" | null
}
```

### **2. Poll Task**
```
GET /task/{task_id}

→ queued | processing | done | failed
```

### **3. Example "done" response**
```
{
  "status": "done",
  "image_url": "https://..."
}
```

---

## ⚙ Environment Variables

Create `.env` file:

```
EXPO_PUBLIC_API_URL=https://your-api-url.a.run.app
```

Used inside API client:

```ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
```

---

## ▶ Running the App

Install dependencies:

```sh
npm install
```

Start development server:

```sh
npm run start
```

or:

```sh
expo start
```

---

## 📦 Production Build

```sh
expo build:ios
expo build:android
```

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| React Native (Expo) | Mobile UI Framework |
| TypeScript | Type-safe development |
| Axios | REST API client |
| Expo Clipboard | Copy functionality |
| React Navigation | Mobile routing |
| Firebase Storage | Hosting for style icons |
| Google Cloud Run | Backend task processing |

---

## ✨ Design Principles

- Pixel-perfect alignment with Figma
- Smooth gradients & layered noise
- Clean, minimal UI
- Fast and responsive feedback loop
- No unnecessary complexity

---


