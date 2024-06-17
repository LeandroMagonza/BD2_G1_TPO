from fastapi import APIRouter, HTTPException
from app.crud import redis as crud
from app.schemas import redis as schemas

router = APIRouter(
    prefix="/sesiones",
    tags=["sesiones"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Sesion)
def create_sesion(sesion_id: str, sesion: schemas.SesionCreate):
    created_sesion = crud.create_sesion(sesion_id, sesion)
    return {**created_sesion, "Sesion_id": sesion_id}

@router.get("/{sesion_id}", response_model=schemas.Sesion)
def read_sesion(sesion_id: str):
    db_sesion = crud.get_sesion(sesion_id)
    if not db_sesion:
        raise HTTPException(status_code=404, detail="Sesion not found")
    return {**db_sesion, "Sesion_id": sesion_id}

@router.put("/{sesion_id}", response_model=schemas.Sesion)
def update_sesion(sesion_id: str, sesion: schemas.SesionCreate):
    updated_sesion = crud.update_sesion(sesion_id, sesion)
    return {**updated_sesion, "Sesion_id": sesion_id}

@router.delete("/{sesion_id}")
def delete_sesion(sesion_id: str):
    crud.delete_sesion(sesion_id)
    return {"detail": "Sesion deleted"}
