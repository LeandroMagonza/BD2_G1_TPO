from fastapi import FastAPI
from app.routers import postgresql, mongodb, redis

app = FastAPI()

app.include_router(postgresql.router, prefix="/postgresql", tags=["postgresql"])
app.include_router(mongodb.router, prefix="/mongodb", tags=["mongodb"])
app.include_router(redis.router, prefix="/redis", tags=["redis"])

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
