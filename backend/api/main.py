from fastapi import FastAPI
from core.config import settings

from routes import jobs, styles


app = FastAPI(title=settings.project_name)


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(jobs.router)
app.include_router(styles.router)

