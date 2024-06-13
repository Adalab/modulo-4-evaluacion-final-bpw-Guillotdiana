
API DE LIBROS 📖 
Bienvenido a la API de Libros. Esta API te permite acceder a una base de datos de libros,
permitiendo realizar operaciones de CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los libros.

🚧Instalacion 🚧
Clona el repositorio 

Instala las siguientes dependencias:
Express
Cors
Nodemon
mysql2
Inicia el proyecto con npm run dev


EndPoints📍 

//Crear un nuevo libro
POST /books
Agrega un nuevo libro a la base de datos.
URL: /books
Método HTTP: POST
Respuesta exitosa:
Código: 200
Contenido: Detalle del libro creado

        {
“succes”: true;
“id”: id creado
        },

//Obtener todos los libros
GET /books
Retorna una lista de todos los libros en la base de datos.
URL: /books
Método HTTP: GET
Respuesta exitosa:
Código: 200 
Contenido: Lista de libros

"results": [
        {
            "id": 1,
            "name": "La sombra del viento",
            "genre": "Suspense",
            "author": "Carlos Ruiz Zafon"
        },
];

//Obtener un libro por titulo
GET /books/:name
Retorna los detalles de un libro específico.
URL: /books/:name
Método HTTP: GET
Parámetros de ruta: name (obligatorio) - Titulo del libro.
Validaciones:
Respuesta exitosa:
Código: 200 
Contenido: Detalles del libro

{
   "data": {
        "id": 2,
        "name": "El duque y yo",
        "genre": "Romance",
        "author": "Julia Quinn"
        }
}

Código: 400
Contenido: "El titulo del libro no existe en la BD"
Respuesta de error:
Código: 400
Contenido: error
//Actualizar un libro
PUT /books/:id
Actualiza la información de un libro existente.
URL: /books/:id
Método HTTP: PUT
Parámetros de ruta: id (obligatorio) - ID del libro.
Validaciones:
Si el id está presente:
Código: 200 
Contenido: 

{
    "success": true
}

Si el id no está presente:
Código: 200 
Contenido: 

{
    "success": false,
    "message": "Libro no encontrado"
}

Respuesta de error:
Código: 400
Contenido: error

//Actualizar un libro
Eliminar un libro
DELETE /books/:id
Elimina un libro de la base de datos.
URL: /books/:id
Método HTTP: DELETE
Parámetros de ruta: id (obligatorio) - ID del libro.
Respuesta exitosa: 
Respuesta exitosa:
Código: 200 
Contenido: 
{
    "success": true
}

Respuesta de error:
Código: 400
Contenido: error


©️ Diana Guillot