from app.database import mongo_db
from app.models.mongodb import CarritoDeCompras
from bson.objectid import ObjectId

def get_carrito(carrito_id: str):
    return mongo_db.Carrito_de_Compras.find_one({"_id": ObjectId(carrito_id)})

def create_carrito(carrito: CarritoDeCompras):
    result = mongo_db.Carrito_de_Compras.insert_one(carrito.dict(by_alias=True))
    return mongo_db.Carrito_de_Compras.find_one({"_id": result.inserted_id})

# Otros CRUD para Producto y Catalogo de Productos
