# AI Logo Generator – Backend API  
FastAPI • Firestore • Cloud Tasks • Cloud Storage  
Asynchronous Image Generation Simulation Backend

---

## 🚀 Overview

**AI Logo Generator Backend** is a modern, scalable API service built for a React Native mobile app.  
Instead of running a real AI model, this backend **simulates asynchronous AI logo generation** on Google Cloud:

- **Google Cloud Run** – containerized, auto-scaling, HTTPS-enabled deployment  
- **Google Cloud Tasks** – delayed background processing  
- **Google Firestore** – database for jobs & styles  
- **Google Cloud Storage** – placeholder-based image “generation”  
- **FastAPI** – clean, type-safe Python backend  

High-level flow:

1. Client calls **POST /jobs/generate**  
2. A job document is created in **Firestore**  
3. A **Cloud Task** is scheduled (e.g. 45–60 seconds delay)  
4. Cloud Task hits an **internal endpoint** `/jobs/internal/{job_id}/process`  
5. Backend generates a logo by **copying a placeholder** in Cloud Storage  
6. Job status updates: `queued → processing → done`  
7. Client polls **GET /jobs/{job_id}** until ready  

---

## 🌐 Live Base URL (Cloud Run)

```
https://ai-logo-api-771612782970.europe-west1.run.app
```

---

## 📡 REST API

### **1. POST /jobs/generate**

```
POST /jobs/generate
```

**Response – 201 Created (initial)**

```json
{
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon"
}
```

**Response – After Processing**

```json
{
  "job_id": "1OCmYNMdeklYgWauYkZ6",
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon",
  "status": "done",
  "image_url": "https://storage.googleapis.com/your-bucket/generated-logos/1OCmYNMdeklYgWauYkZ6.png"
}
```

---

### **2. GET /jobs/{job_id}**

```
GET /jobs/{job_id}
```

**Example**

```
GET https://ai-logo-api-771612782970.europe-west1.run.app/jobs/1OCmYNMdeklYgWauYkZ6
```

**Possible status values**

- `queued` – job is created, waiting  
- `processing` – generating logo  
- `done` – finished, image ready  
- `failed` – simulated failure (**~30% failure rate for testing**)  

---

### **3. GET /styles**

```
GET /styles
```

**Example Response**

```json
[
  {
    "id": "flat",
    "label": "Flat Minimal",
    "description": "Clean flat-style logos with bold colors.",
    "active": true
  },
  {
    "id": "neon",
    "label": "Neon Glow",
    "description": "Vibrant neon gradients and glow effects.",
    "active": true
  }
]
```

---

## 🧱 Project Structure

```
backend/api/
├── core/
│   ├── config.py           # Settings, environment variables, GCP config
│   ├── constants.py        # Shared constants
│   ├── dependencies.py     # Firestore, repos, etc.
│   ├── errors.py           # Custom exceptions
│
├── domain/
│   ├── job.py              # Job model & rules
│   ├── style.py            # Style model
│
├── infrastructure/
│   ├── job_repository.py   # Firestore → jobs
│   ├── styles_repository.py# Firestore → styles
│   ├── tasks_queue.py      # Cloud Tasks scheduling
│   ├── image_storage.py    # Generates logo via blob copy
│
├── models/
│   ├── schemas.py          # Request/response models
│
├── routes/
│   ├── jobs.py             # /jobs
│   ├── styles.py           # /styles
│
├── .env                    # Local config (ignored)
├── Dockerfile              # Cloud Run container
├── main.py                 # FastAPI entrypoint
└── requirements.txt        # Python dependencies
```
