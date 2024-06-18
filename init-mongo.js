// Inicializar MongoDB con las colecciones y documentos requeridos

// Conectar a la base de datos
db = db.getSiblingDB('tienda_online');

// Crear colección y documento para Carrito de Compras
db.createCollection('Carrito_de_Compras');
db.Carrito_de_Compras.insert({
    _id: ObjectId(),
    ID_Usuario: "12345",
    Productos: [
        { ID_Producto: "1", Cantidad: 2, Detalles: "..." },
        { ID_Producto: "2", Cantidad: 1, Detalles: "..." }
    ],
    Estado: "Pendiente"
});

// Crear colección y documento para Producto
db.createCollection('Producto');
<<<<<<< Updated upstream
db.Producto.insert({
    _id: ObjectId(),
    Nombre: "Producto1",
    Descripción: "Descripción del producto",
    Fotos: ["foto1.jpg", "foto2.jpg"],
    Comentarios: ["Comentario1", "Comentario2"],
    Videos: ["video1.mp4"],
    Precio: 100.0
});

// Crear colección y documento para Catálogo de Productos
db.createCollection('Catalogo_de_Productos');
db.Catalogo_de_Productos.insert({
    _id: ObjectId(),
    Productos: [
        {
            ID_Producto: "1",
            Descripciones: "Descripción del producto",
            Fotos: ["foto1.jpg", "foto2.jpg"],
            Comentarios: ["Comentario1", "Comentario2"],
            Videos: ["video1.mp4"]
        }
    ],
    Historial_Cambios: [
        { Cambio: "Precio", Valor_Anterior: 100.0, Valor_Nuevo: 90.0, Operador: "Admin", Fecha: new Date("2023-01-01") },
        { Cambio: "Imagen", Valor_Anterior: "foto1.jpg", Valor_Nuevo: "foto3.jpg", Operador: "Admin", Fecha: new Date("2023-01-02") }
    ]
});
=======
db.Producto.insertMany([
    {
        _id: ObjectId("1"),
        Nombre: "Producto A",
        Descripción: "Descripción del producto A",
        Fotos: ["fotoA1.jpg", "fotoA2.jpg"],
        Comentarios: ["Comentario A1", "Comentario A2"],
        Videos: ["videoA1.mp4"],
        Precio: 50.0
    },
    {
        _id: ObjectId("2"),
        Nombre: "Producto B",
        Descripción: "Descripción del producto B",
        Fotos: ["fotoB1.jpg", "fotoB2.jpg"],
        Comentarios: ["Comentario B1", "Comentario B2"],
        Videos: ["videoB1.mp4"],
        Precio: 30.0
    }
]);
>>>>>>> Stashed changes
