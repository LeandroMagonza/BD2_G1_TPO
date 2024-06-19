db.createUser({
    user: 'admin',
    pwd: 'password',
    roles: [
      {
        role: 'readWrite',
        db: 'tiendaonline'
      }
    ]
  });
  
db = db.getSiblingDB('tiendaonline');

// Crear colección de productos
db.createCollection('productos', { capped: false });

// Insertar productos y obtener sus IDs
const productos = db.productos.insertMany([
  { _id: ObjectId("60c72b2f5f1b2c001a59b8a2"), nombre: "Producto A", stock: 100, precio: 50.0 },
  { _id: ObjectId("60c72b2f5f1b2c001a59b8a3"), nombre: "Producto B", stock: 50, precio: 25.0 }
]);

// Crear colección de carritos
db.createCollection('carritos', { capped: false });

// Insertar un carrito con los productos creados
db.carritos.insertMany([
  {
    ID_usuario: 1,
    lista_de_productos: [
      { ID_producto: ObjectId("60c72b2f5f1b2c001a59b8a2"), nombre: "Producto A", cantidad: 2, precio: 50.0 },
      { ID_producto: ObjectId("60c72b2f5f1b2c001a59b8a3"), nombre: "Producto B", cantidad: 1, precio: 25.0 }
    ],
    estado: "pendiente"
  }
]);
