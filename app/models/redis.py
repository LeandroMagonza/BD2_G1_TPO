from pydantic import BaseModel
from typing import Dict, Optional

class SesionBase(BaseModel):
    ID_usuario: str
    Fecha_y_hora_de_inicio_de_sesion: str
    Fecha_y_hora_de_fin_de_sesion: Optional[str] = None
    Actividad_registrada: Optional[str] = None

class SesionCreate(SesionBase):
    pass

class Sesion(SesionBase):
    Sesion_id: str
