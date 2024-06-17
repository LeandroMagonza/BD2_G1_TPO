from sqlalchemy import Column, Integer, String, JSON, DECIMAL, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuario"
    ID_usuario = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String, index=True)
    Dirección = Column(String)
    Documento_de_identidad = Column(String)
    Tiempo_de_conexión = Column(Integer)
    Categoría_de_usuario = Column(String)

class Pedido(Base):
    __tablename__ = "pedido"
    ID_pedido = Column(Integer, primary_key=True, index=True)
    ID_usuario = Column(Integer, ForeignKey("usuario.ID_usuario"))
    Lista_de_productos = Column(JSON)
    Importe_de_artículos = Column(DECIMAL)
    Descuentos = Column(DECIMAL)
    Impuestos = Column(DECIMAL)
    Estado_del_pedido = Column(String)

    usuario = relationship("Usuario")

class Factura(Base):
    __tablename__ = "factura"
    ID_factura = Column(Integer, primary_key=True, index=True)
    ID_pedido = Column(Integer, ForeignKey("pedido.ID_pedido"))
    Fecha_de_emisión = Column(TIMESTAMP)
    Importe_total = Column(DECIMAL)
    Detalles_del_cliente = Column(JSON)
    Detalles_de_pago = Column(JSON)

    pedido = relationship("Pedido")

class Pago(Base):
    __tablename__ = "pago"
    ID_pago = Column(Integer, primary_key=True, index=True)
    ID_factura = Column(Integer, ForeignKey("factura.ID_factura"))
    Medio_de_pago = Column(String)
    Operador_interviniente = Column(String)
    Fecha_y_hora_del_pago = Column(TIMESTAMP)
    Monto = Column(DECIMAL)

    factura = relationship("Factura")
