# Centro_de_Computo
Sistema de gestión del centro de cómputo de la UMT para los becarios.

Contiene los archivos pertenientes al sistema, a la API REST para el servidor y al archivo para la creación e inicialización de la base de datos MYSQL.

Instalación

Para la instalación del proyecto consta de dos partes la instalación de la API en un del servicio en un servidor web, y la del sistema en el lado del cliente o en un servidor web por igual.
Para el Servidor web
Se tiene que instalar las herramientas correspondientes:

-	Node.js
-	Morgan
-	Expresss
-	MySql
<br> 
Para la base de datos tiene que estar en la misma ubicación que nuestra api, para hacer las consultas. En la carpeta de “base_datos”. Se encuentra un script sql, la cual contiene las estructuras para nuestra base de datos y algunos registros para prueba y consultas.

Después se procede a instalar la API en el servidor usando Node.js, en nuestro caso se está instalado en un puerto local de la computadora.

Como se muestra en la consola se usa el node.js para desplegar la API de la carpeta especifica donde se encuentra ubicada los archivos de la API (centro_computoREST), la cual nos da el puerto del servidor, en este caso el “localhost:4000”. 
Para la aplicación web
Se tiene que cambiar la configuración para el host del servidor que estamos usando para nuestra API asi como su puerto. La cual depende si usamos un servicio alojado en la web. Para esto se cambia en el archivo de la carpeta del proyecto “centro_computo > js > config.js” que se usa en todo el proyecto. Como se muestra a continuación.
Para el despliegue de la aplicación, se debe de instalar en un servicio web para su correcto uso. Pero en nuestro caso estaremos usando un servidor virtual con una extensión del Visual Code. Ya que todo el programa usa peticiones http de POST y GET para comunicarse con la API REST de nuestro sistema.
