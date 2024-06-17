from fastapi import APIRouter, HTTPException
from app.crud import mongodb as crud
from app.schemas import mongodb as schemas

router = APIRouter(
    prefix="/carritos",
    tags=["carritos"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Carrito)
def create_carrito(carrito: schemas.CarritoCreate):
    return crud.create_carrito(carrito=carrito)

@router.get("/{carrito_id}", response_model=schemas.Carrito)
def read_carrito(carrito_id: str):
    db_carrito = crud.get_carrito(carrito_id=carrito_id)
    if db_carrito is None:
        raise HTTPException(status_code=404, detail="Carrito not found")
    return db_carrito

# Otros endpoints para Producto y Catalogo de Productos
