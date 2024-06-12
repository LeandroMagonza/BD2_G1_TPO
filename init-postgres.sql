-- Crear la base de datos y tablas para PostgreSQL
CREATE TABLE Usuario (
    ID_usuario SERIAL PRIMARY KEY,
    Nombre VARCHAR(50),
    Dirección VARCHAR(100),
    Documento_de_identidad VARCHAR(20),
    Tiempo_de_conexión INT,
    Categoría_de_usuario VARCHAR(10)
);

CREATE TABLE Pedido (
    ID_pedido SERIAL PRIMARY KEY,
    ID_usuario INT REFERENCES Usuario(ID_usuario),
    Lista_de_productos JSON,
    Importe_de_artículos DECIMAL,
    Descuentos DECIMAL,
    Impuestos DECIMAL,
    Estado_del_pedido VARCHAR(20)
);

CREATE TABLE Factura (
    ID_factura SERIAL PRIMARY KEY,
    ID_pedido INT REFERENCES Pedido(ID_pedido),
    Fecha_de_emisión TIMESTAMP,
    Importe_total DECIMAL,
    Detalles_del_cliente JSON,
    Detalles_de_pago JSON
);

CREATE TABLE Pago (
    ID_pago SERIAL PRIMARY KEY,
    ID_factura INT REFERENCES Factura(ID_factura),
    Medio_de_pago VARCHAR(20),
    Operador_interviniente VARCHAR(50),
    Fecha_y_hora_del_pago TIMESTAMP,
    Monto DECIMAL
);
