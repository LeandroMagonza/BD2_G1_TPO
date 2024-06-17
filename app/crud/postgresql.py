from sqlalchemy.orm import Session
from app.models import postgresql as models
from app.schemas import postgresql as schemas

def get_usuario(db: Session, usuario_id: int):
    return db.query(models.Usuario).filter(models.Usuario.ID_usuario == usuario_id).first()

def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
    db_usuario = models.Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

# Otros CRUD para las demás entidades
