# Flujo de información

- Petición desde el cliente
- Conjunto estructurado de datos que contienen un verbo (GET, POST, PUT, DELETE)

- Petición

    Verbo: POST
    Datos: {
        "nombre": "Producto 1",
        "precio": 1234
    }
    Ruta: 'server.com/productos'

    --

    VERBO: GET
    Ruta: 'server.com/productos'

    --

    Verbo: PUT
    Datos: {
        "nombre": "Producto 2",
        "precio": 321
    }
    Ruta: 'server.com/productos/:identificador'

    --

    Verbo: GET
    Ruta: 'server.com/productos/:identificador'

    --

    Verbo: DELETE
    Ruta: 'server.com/productos/:identificador'

