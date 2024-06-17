from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List, Optional

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectid')
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class CarritoDeCompras(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias='_id')
    ID_Usuario: str
    Productos: List[dict]
    Estado: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Otros modelos para Producto y Catalogo de Productos