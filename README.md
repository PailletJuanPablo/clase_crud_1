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


## Proceso de un Crud en express

- Leer todos los recursos

    1) Se crea la ruta con el verbo adecuado que es GET, y la ruta adecuada es entidad en plural (/productos, /products, /users)
    
    2) Vinculamos la ruta al método de un controller
    
    3) Controlador pide los datos al modelo
   
    4) Envía datos a la vista
   
    5) Vista los renderiza 

- Crear un nuevo recurso

    1) Se crea una ruta con el verbo adecuado que es GET para mostrar el formulario de creación (llamar al método para mostrarlo del controller)

    2) Una segunda ruta con verbo POST que será llamada desde el formulario (llamará al método para crear del controller). El formulario contendrá inputs con un atributo name que será el que procesará el servidor.

            Voy a crear una petición POST hacia la url que tenga en action del form
                Va a tener como body los names de cada input con el valor que tengan en el momento de hacer el submit
                {
                    "price": 123,
                    "name": "producto 1"
                }

    3) El servidor va a recibir los datos del producto en req.body y arma la estructura que corresponda para agregar un nuevo producto, products.push(nuevoProducto). Guardamos el archivo productsDatabase.json con los valores del nuevo array de productos.

- Leer un recurso individual (detalle)

    1) Se crea la ruta con el verbo adecuado que es GET, y la ruta adecuada es entidad en plural (/productos, /products, /users) seguida de /:identificador == parametro
    
    2) Vinculamos la ruta al método de un controller
    
    3) Obtener el id a buscar de req.params.nombreParametro == req.params.identificador
    
    4) Pedirle al modelo el recurso con ese identificador
    
    5) Si no existe un recurso con ese id, controlador devuelve una vista (Producto no encontrado)
    
    6) Si existe, controlador arma estructura de datos para pasarla a la vista
            MAL PRACTICA: foreach(productos) ( (producto) =>  producto.category == 'visited' muestro algo)
    
    7) Vista recibe datos del controlador y los muestra al usuario

- Actualizar un recurso 

    1) Se crea una ruta con el verbo adecuado que es GET para mostrar el formulario de edición (llamar al método para mostrarlo del controller). 
    El controlador obtiene el parámetro para buscar el recurso y envía los datos del recurso a la vista del formulario.
    En cada input del formulario de edición, modifico el atributo value para que renderize el valor del producto actual (recibido desde el controlador).
    
    2) Una segunda ruta con verbo (PUT / PATCH) que será llamada desde el formulario (llamará al método para actualizar del controller). El formulario contendrá inputs con un atributo name que será el que procesará el servidor.

            Voy a crear una petición PUT hacia la url que tenga en action del form
            La url deberá contener el parámetro identificador del recurso (/:id)
            Va a tener como body los names de cada input con los values de cada input que tengan en el momento de hacer el submit
            {
                "price": 123,
                "name": "producto 1"
            }

    3) Obtener el parámetro id, pedirle al modelo ese recurso.

    4) El servidor va a recibir los datos del producto a actualizar en req.body y arma la estructura que corresponda para editar el producto, products.findIndex() . Guardamos el archivo productsDatabase.json con los valores del nuevo array de productos.

        array[indice] = nuevoValor

    5) Redireccionar al usuario al home (/products)

- Eliminar un recurso

    1) Una  ruta con el verbo DELETE que será llamada desde el formulario (llamará al método para eliminar del controller).

    2) Obtener el parámetro id, pedirle al modelo ese recurso.

    3) Si no existe un recurso con ese id, controlador devuelve una vista (Producto no encontrado)

    4) Si existe, pide al modelo que elimine ese producto. 

    5) Redireccionar al usuario al home (/products) 
    // res.redirect(303, '/products')

    


- Session y Cookies

    - Cliente va a completar un formulario de login
    - Servidor va a 
        1) Guardar usuario en la sesión actual
        2) Guardar en cookies algún dato que permita regenerar esa sesión en el futuro

# Autenticación

- Registro

    - Completo un formulario de registro
        - input name email
        - input name password
            - Crear ruta, controlador que renderize vista de formulario de registro
    - Se realiza una petición POST con los datos
            - Crear ruta que procese POST y redireccionar a Controlador
    - Servidor recibe email y password y antes de guardar al usuario en el sistema
        - a la contraseña recibida desde req.body la va a encriptar y va a guardarla
            - hashSync(contraseña recibida, saltRounds)
            - Almacenar array de usuarios en el archivo users.json


- Login

     - Completo un formulario de login
        - input name email
        - input name password
    - Se realiza una petición POST con los datos
    - Servidor
        - Va a revisar si existe un usuario con ese email
        - La clave enviada desde el cliente que quiere loguearse (sin encriptar)
          Se compara con la clave encriptada.
          compareSync(cadenaDesencriptada, cadenaEncriptada)
        - req.session.user = usuario obtenido desde la base de datos

# Validar peticiones

    - Instalar express-validator
    - Requerir {body} en alguna ruta 
    - Se agregan las validaciones como middlewares de las rutas y van a contener los esquemas de validator.js
        https://github.com/validatorjs/validator.js
    - En el controlador voy a verificar si la petición tiene errores y aplicar la lógica que corresponda






# Cookies y Session

    - Las cookies se manejan principalmente desde el lado del cliente
    - La session desde el lado del servidor

    - Cookies son para datos no sensibles
    - Session para datos sensibles

    - Cookies pueden durar mucho tiempo.
    - Session dura el tiempo que este abierto el navegador. Cada vez que volvemos a abrirlo se genera una nueva session.


¿Como identificar si el cliente ya visitó antes mi sitio?

- Como servidor chequear en cookies si existe "yaVisito"
- Si no existe "yaVisito" quiere decir que es la primera vez que ingresa
- Le guardo la cookie "yaVisito"

Contador de visitas

- Guardo una cookie "visitas" con un valor inicial de 1 
- Cada vez que recibo una petición le sumo 1 al valor de visitas

# Session

- Nace y muere con la apertura y cierre del navegador. 
- No deja rastros




# Sequelize

- Instalar paquetes de npm
    - npm i -g sequelize-cli (global, una sola vez)
    - npm i sequelize // Paquete 
    - npm i mysql2 // Motor de base de datos a utilizar

- Archivo .sequelizerc
- ejecutar sequelize init
- En src/database/config.js agregar module.exports al inicio para exportar el objeto

# Variables de Entorno

- instalar dotenv
    npm i dotenv
- crear archivo .env y agregarlo en .gitignore
- agregar la linea 
    require('dotenv').config() en nuestro código
Ya está configurado



# Migraciones

- Ejecutar npm install --save-dev sequelize-cli (Esto instala la librería como dependencia de desarrollo)

- Generar migraciones y modelos
npx sequelize-cli model:generate --name User --attributes id:integer,name:string,email:string,password:string

- Ejecutar las migraciones
npx sequelize-cli db:migrate

```
Ejemplo para productos:
npx sequelize-cli model:generate --name Product --attributes name:string,price:decimal,discount:decimal,category:string,description:string,image:string
```

# Trabajar con modelos

- Importar el archivo database/models/index, y desde ahí utilizar el modelo { Product } = require('database/models')


    