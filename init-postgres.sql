-- Crear la base de datos y tablas para PostgreSQL
CREATE TABLE Usuario (
    ID_usuario SERIAL PRIMARY KEY,
    Nombre VARCHAR(50),
    Dirección VARCHAR(100),
    Documento_de_identidad VARCHAR(20),
    Contrasenia VARCHAR(100),  -- Nueva columna para la contrasenia
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
<<<<<<< Updated upstream
=======

-- Insertar datos de prueba

-- Usuarios
INSERT INTO Usuario (Nombre, Dirección, Documento_de_identidad, Contrasenia, Tiempo_de_conexión, Categoría_de_usuario)
VALUES ('Juan Perez', 'Calle Falsa 123', '12345678', 'password123', 120, 'MEDIUM');

-- Pedidos
INSERT INTO Pedido (ID_usuario, Lista_de_productos, Importe_de_artículos, Descuentos, Impuestos, Estado_del_pedido)
VALUES (1, '[{"ID_Producto": "1", "Cantidad": 2, "Detalles": "Producto A"}, {"ID_Producto": "2", "Cantidad": 1, "Detalles": "Producto B"}]', 100.0, 10.0, 5.0, 'Pendiente');

-- Facturas
INSERT INTO Factura (ID_pedido, Fecha_de_emisión, Importe_total, Detalles_del_cliente, Detalles_de_pago)
VALUES (1, '2023-01-01 10:00:00', 95.0, '{"Nombre": "Juan Perez", "Dirección": "Calle Falsa 123"}', '{"Metodo": "Tarjeta de Credito", "Numero": "1234-5678-9012-3456"}');

-- Pagos
INSERT INTO Pago (ID_factura, Medio_de_pago, Operador_interviniente, Fecha_y_hora_del_pago, Monto)
VALUES (1, 'Tarjeta de Credito', 'Visa', '2023-01-01 10:05:00', 95.0);
>>>>>>> Stashed changes
