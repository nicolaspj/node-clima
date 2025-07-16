import fs from 'fs';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


export class Busqueda {
    historial = [];
    dbPath = 'db/database.json';


    constructor(){
        this.leerDB();
    }

    get Paramsclima() {
        return {
                    
                    appid:process.env.OPENWEATHER_KEY,
                    units: 'metric',
                    lang: 'es' 
                }
    }



    async ciudad(lugar = '') {
        try {
            const resp = await axios.get(`https://restcountries.com/v3.1/name/${lugar}`);
            return resp.data.map(lugar => {
                const capital = lugar.capital ? lugar.capital[0] : 'Capital no disponible';
                const capitalInfo = lugar.capitalInfo;
                const latlng = capitalInfo && capitalInfo.latlng && capitalInfo.latlng.length === 2
                    ? capitalInfo.latlng
                    : [null, null];

                return {
                    id: uuidv4() ,
                    capital: capital,
                    capLat: latlng[0],
                    capLon: latlng[1],
                    desc : 'Nublado',
                    min : '5°',
                    max : '17°',
                    temp : '11°'
                };
            });
        } catch (error) {
            console.log('No se encontró el país elegido');
            return [];
        }
    }

    /*
    async clima ( lat , long )  {
        try {
            
            const resp = await axios.create({
                baseURL:`https://api.openweathermap.org/data/3.0/onecall?`,
                params: {...this.Paramsclima, lat , long}
            })
            //en la parte de params defino los parametros por defecto mientras que lat y long siempre cambian por la 
            //posicion de la ciudad elegida

            const respuesta = await resp.get();
            const {weather , main} = respuesta.data;
            return {

                desc : weather[0].description,
                min : main.temp_min,
                max : main.temp_max,
                temp : main.temp
            }


        } catch (error) {
            console.log(error);
        }
    }
    */


    agregarHistorial( lugar = ''){
        //TODO prevenir duplicidad

        if(this.historial.includes(lugar.toLocaleLowerCase() )){
            return;
        }
        this.historial.unshift( lugar );

        //grabar en db;
        
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial : this.historial
        };

        fs.writeFileSync( this.dbPath , JSON.stringify(payload));
            
    }
        
    leerDB(){
         if(!fs.existsSync(this.dbPath)){
            return null;
        }
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.historial = data.historial;
    }

}

    