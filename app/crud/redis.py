from app.database import redis_client
from app.models.redis import SesionBase

def get_sesion(sesion_id: str) -> dict:
    return redis_client.hgetall(sesion_id)

def create_sesion(sesion_id: str, sesion: SesionBase) -> dict:
    redis_client.hmset(sesion_id, sesion.dict())
    return redis_client.hgetall(sesion_id)

def update_sesion(sesion_id: str, sesion: SesionBase) -> dict:
    redis_client.hmset(sesion_id, sesion.dict())
    return redis_client.hgetall(sesion_id)

def delete_sesion(sesion_id: str) -> None:
    redis_client.delete(sesion_id)
