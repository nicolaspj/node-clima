*  comandos utilizados * 
npm init -y //para crear el .json por default
npm install colors inquirer // para instalar colores para la terminal y inquirer 
npm i axios // documentacion https://www.npmjs.com/package/axios#example
npm i uuid // para id unicas cuando no existen en las api 

/*env */
para guardar apy_keys y demas datos de contraseñas importantes se crea 
un archivo con terminacion .env en la raiz del proyecto donde en el caso 
de este proyecto se le asigna el nombre de ejemplo con la pk
MAPBOX_KEY = pk.sdlfsverm235'3g093q4t5afvio4e40t'0i4 

y se utiliza el paquete dotenv , que se descarga como 
npm i dotenv

y se utiliza haciendo 
  'access_token' : process.env.MAPBOX_KEY 

  esto suponiendo que el access_token se solicite con ese nombre