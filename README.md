# Tienda Online - Gestión de Pedidos

Este proyecto implementa una aplicación de gestión de pedidos para una tienda online, utilizando una combinación de bases de datos SQL y NoSQL. Se utilizan PostgreSQL, MongoDB y Redis para diferentes partes del sistema.

## Contenidos

- [Descripción](#descripción)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Descripción

La aplicación gestiona la creación de pedidos, carritos de compras, facturación y pagos. Utiliza:
- **PostgreSQL** para gestionar la información de usuarios, pedidos, facturas y pagos.
- **MongoDB** para gestionar los carritos de compras y catálogos de productos.
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

## Uso

1. **Levanta los contenedores**:
    ```bash
    docker-compose up
    ```

   Este comando descargará las imágenes de Docker para PostgreSQL, MongoDB y Redis, creará y configurará los contenedores, y ejecutará los scripts de inicialización para configurar las bases de datos con las estructuras y datos requeridos.

2. **Verifica la conexion**:
   - **PostgreSQL**: Usa pgAdmin para conectarte a PostgreSQL. Configura un nuevo servidor en pgAdmin con los siguientes detalles:
     - **Host name/address:** `localhost`
     - **Port:** `5432`
     - **Username:** `user`
     - **Password:** `password`

   - **MongoDB**: Usa `mongosh` para conectarte a MongoDB:
     ```bash
     winpty docker exec -it mongo mongosh
     ```
     Una vez dentro del shell de MongoDB, verifica las colecciones:
     ```javascript
     use tienda_online
     show collections
     db.Carrito_de_Compras.find().pretty()
     db.Producto.find().pretty()
     ```

   - **Redis**: Usa `redis-cli` para conectarte a Redis:
     ```bash
     winpty docker exec -it redis redis-cli
     ```
     Verifica que Redis esté funcionando:
     ```bash
     set test_key "Redis is running"
     get test_key
     ```

## Contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
