# AI Logo Generator – Backend API  
FastAPI • Firestore • Cloud Tasks • Cloud Storage  
Asynchronous Image Generation Simulation Backend

---

## 🚀 Overview

AI Logo Generator Backend is a modern, scalable API service designed for a React Native mobile app. Instead of running a real AI model, this backend simulates asynchronous AI logo generation using:

- Google Cloud Tasks (delayed background processing)
- Google Firestore (database for jobs & styles)
- Google Cloud Storage (placeholder-based image generation)
- FastAPI (clean, maintainable Python backend)

Flow:

1. Client calls POST /jobs/generate  
2. Job is stored in Firestore  
3. Cloud Task is scheduled (45–60 seconds delay)  
4. Cloud Task triggers internal endpoint /jobs/internal/{job_id}/process  
5. Logo image is created by copying a placeholder  
6. Job updates: queued → processing → done  
7. Client polls GET /jobs/{job_id} until ready  

---

## 📁 Project Structure

backend/api/  
├── core/  
│   ├── config.py  
│   ├── constants.py  
│   ├── dependencies.py  
│   ├── errors.py  
├── domain/  
│   ├── job.py  
│   ├── style.py  
├── infrastructure/  
│   ├── job_repository.py  
│   ├── styles_repository.py  
│   ├── tasks_queue.py  
│   ├── image_storage.py  
├── models/  
│   ├── schemas.py  
├── routes/  
│   ├── jobs.py  
│   ├── styles.py  
├── .env  
├── Dockerfile  
├── main.py  
└── requirements.txt  

---

## 🌐 Base URL

Production (Cloud Run):

```text
https://ai-logo-api-skcaxavxpq-ew.a.run.app
```

📡 REST API

```1. Generate Logo```

POST /jobs/generate

Request Body

{
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon"
}

Response (201 Created)

{
  "job_id": "1OCmYNMdeklYgWauYkZ6",
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon",
  "status": "queued",
  "image_url": null
}

Later (after processing):

{
  "job_id": "1OCmYNMdeklYgWauYkZ6",
  "prompt": "Cute koala mascot logo for a mobile app",
  "style": "neon",
  "status": "completed",
  "image_url": "https://storage.googleapis.com/your-bucket/generated-logos/1OCmYNMdeklYgWauYkZ6.png"
}


```2. Get Job Status```

GET /jobs/{job_id}

Example

GET /jobs/1OCmYNMdeklYgWauYkZ6

-- Possible status values

- queued – job is created, waiting for processing

- processing – background worker is “generating” the logo

- done – logo is ready, image_url is available

- failed – if something goes wrong

```3. List Active Styles```

Styles are stored in Firestore in a styles collection.
Only documents with active == true are returned.

Endpoint

GET /styles


Response Example

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
