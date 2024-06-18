# Tienda Online - Gestión de Pedidos

Este proyecto implementa una aplicación de gestión de pedidos para una tienda online, utilizando una combinación de bases de datos SQL y NoSQL. Se utilizan PostgreSQL, MongoDB y Redis para diferentes partes del sistema.

## Contenidos

- [Descripción](#descripción)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Descripción

La aplicación gestiona la creación de pedidos, carritos de compras, facturación y pagos. Utiliza:
- **PostgreSQL** para gestionar la información de usuarios, pedidos, facturas y pagos.
- **MongoDB** para gestionar los carritos de compras.
- **Redis** para gestionar las sesiones de usuario.

## Prerrequisitos

Antes de comenzar, asegúrate de tener Docker y Docker Compose instalados en tu máquina.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```

2. Asegúrate de tener los scripts de inicialización y el archivo `docker-compose.yml` en el directorio raíz del proyecto:
    - `docker-compose.yml`
    - `init-postgres.sql`
    - `init-mongo.js`
    - `init-redis.sh`

3. Asegúrate de que el script `init-redis.sh` tenga permisos de ejecución:
    ```bash
    chmod +x init-redis.sh
    ```

## Uso

1. Levanta los contenedores Docker:
    ```bash
    docker-compose up
    ```

   Este comando descargará las imágenes de Docker para PostgreSQL, MongoDB y Redis, creará y configurará los contenedores, y ejecutará los scripts de inicialización para configurar las bases de datos con las estructuras y datos requeridos.

2. (Opcional) Verifica que los datos de prueba se hayan cargado correctamente:

   - **PostgreSQL**:
     Usa `pgAdmin` o `psql` para conectarte y verificar los datos.
   
   - **MongoDB**:
     Usa `mongosh` para conectarte y verificar los datos:
     ```bash
     winpty docker exec -it mongo mongosh
     use tienda_online
     show collections
     db.Carrito_de_Compras.find().pretty()
     db.Producto.find().pretty()
     ```

   - **Redis**:
     Usa `redis-cli` para conectarte y verificar los datos:
     ```bash
     winpty docker exec -it redis redis-cli
     GET user:12345
     HGETALL session:12345
     ```

## Endpoints

La API expone los siguientes endpoints:

### Usuarios (PostgreSQL)
- **GET** `/usuarios`
- **POST** `/usuarios`
- **PUT** `/usuarios/:id`
- **DELETE** `/usuarios/:id`
- **POST** `/usuarios/login`

### Pedidos (PostgreSQL)
- **GET** `/pedidos`
- **POST** `/pedidos`
- **PUT** `/pedidos/:id`
- **DELETE** `/pedidos/:id`

### Facturas (PostgreSQL)
- **GET** `/facturas`
- **POST** `/facturas`
- **PUT** `/facturas/:id`
- **DELETE** `/facturas/:id`

### Pagos (PostgreSQL)
- **GET** `/pagos`
- **POST** `/pagos`
- **PUT** `/pagos/:id`
- **DELETE** `/pagos/:id`

### Carritos (MongoDB)
- **GET** `/carritos`
- **POST** `/carritos`
- **PUT** `/carritos/:id`
- **DELETE** `/carritos/:id`

### Productos (MongoDB)
- **GET** `/productos`
- **POST** `/productos`
- **PUT** `/productos/:id`
- **DELETE** `/productos/:id`

### Sesiones (Redis)
- **GET** `/sesiones/:id`
- **PUT** `/sesiones/:id`
- **DELETE** `/sesiones/:id`

## Contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
