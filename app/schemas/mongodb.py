from pydantic import BaseModel
from typing import List

class Producto(BaseModel):
    ID_Producto: str
    Cantidad: int
    Detalles: str

class CarritoBase(BaseModel):
    ID_Usuario: str
    Productos: List[Producto]
    Estado: str

class CarritoCreate(CarritoBase):
    pass

class Carrito(CarritoBase):
    id: str

    class Config:
        orm_mode = True

# Otros esquemas para Producto y Catalogo de Productos
