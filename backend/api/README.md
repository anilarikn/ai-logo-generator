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

1. Client calls **`POST /jobs/generate`**  
2. A job document is created in **Firestore**  
3. A **Cloud Task** is scheduled (e.g. 45–60 seconds delay)  
4. Cloud Task hits an **internal endpoint** `POST /jobs/internal/{job_id}/process`  
5. Backend “generates” the logo by **copying a placeholder** image in Cloud Storage  
6. Job status is updated: `queued → processing → done`  
7. Client polls **`GET /jobs/{job_id}`** until the image is ready  

---

## 🌐 Live Base URL (Cloud Run)

The backend is deployed on **Google Cloud Run**:

```text
https://ai-logo-api-771612782970.europe-west1.run.app
```

📡 REST API

```
POST /jobs/generate
```
Response – 201 Created (initial)

{
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon"
}

Response – After Processing

{
  "job_id": "1OCmYNMdeklYgWauYkZ6",
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon",
  "status": "done",
  "image_url": "https://storage.googleapis.com/your-bucket/generated-logos/1OCmYNMdeklYgWauYkZ6.png"
}

```
GET /jobs/{job_id}
```
- Example

GET https://ai-logo-api-771612782970.europe-west1.run.app/jobs/1OCmYNMdeklYgWauYkZ6


* Possible status values

- queued – job is created, waiting for processing

- processing – background worker is “generating” the logo

- done – logo is ready, image_url is available

- failed – something went wrong during processing (Failure rate: %30 for testing)

```
GET /styles
```
- Example Response
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
🧱 Project Structure
```
backend/api/
├── core/
│   ├── config.py           # Settings, environment variables, GCP config
│   ├── constants.py        # Shared string/field constants
│   ├── dependencies.py     # FastAPI dependencies (Firestore, repos, etc.)
│   ├── errors.py           # Custom exceptions & error mapping
│
├── domain/
│   ├── job.py              # Job domain model & business rules
│   ├── style.py            # Style domain model
│
├── infrastructure/
│   ├── job_repository.py   # Firestore integration for jobs
│   ├── styles_repository.py# Firestore integration for styles
│   ├── tasks_queue.py      # Cloud Tasks client & enqueue logic
│   ├── image_storage.py    # Cloud Storage (placeholder → generated logo copy)
│
├── models/
│   ├── schemas.py          # Pydantic request/response schemas
│
├── routes/
│   ├── jobs.py             # /jobs endpoints
│   ├── styles.py           # /styles endpoints
│
├── .env                    # Local environment variables (not committed)
├── Dockerfile              # Container image definition for Cloud Run
├── main.py                 # FastAPI app entrypoint
└── requirements.txt        # Python dependencies
