from pydantic import BaseModel
from typing import Optional

class UsuarioBase(BaseModel):
    Nombre: str
    Dirección: Optional[str] = None
    Documento_de_identidad: Optional[str] = None
    Tiempo_de_conexión: Optional[int] = None
    Categoría_de_usuario: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    ID_usuario: int

    class Config:
        orm_mode = True

# Otros esquemas para las demás entidades
