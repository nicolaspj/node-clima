import { inquirerMenu, leerInput , listadoLugares, pausa } from './helpers/inquirer.js';
import { Busqueda } from './models/busquedas.js';

const main = async() => {
    const busquedas = new Busqueda();
    let opt ;
   
    do{
    opt = await inquirerMenu();
    //console.log({opt});
    switch (opt) {
        case 1:
            //MENSAJE 
            const lugar = await leerInput('Ciudad: ');
           
            //BUSCAR LUGARES
            const resp = await busquedas.ciudad(lugar);
            
            //SELECCION DE LUGAR esto en caso de que haya multiples lugares con el mismo nombre
            const idSelec = await listadoLugares(resp);
            if (resp === '0') continue; // en caso de que se quiera cancelar 
            const lugarSelec =  resp.find( l => l.id === idSelec);
            
            busquedas.agregarHistorial(lugarSelec.capital);
            // const climaLugar descomentar cuando haya api de clima funcionando
            //const climaLugar =  await busquedas.clima (lugarSelec.capLat , lugarSelec.capLon);
            //MOSTRAR RESULTADOS 
            //console.log("resp",resp);
            //console.log("\nidSelec",idSelec);
            //console.log("\nlugarSelec",lugarSelec);
            console.clear();
            console.log('\n nombre de cuidad:',lugarSelec.capital , '\n');
            console.log('\n lat de cuidad:',lugarSelec.capLat , '\n');
            console.log('\n long de cuidad' , lugarSelec.capLon , '\n');

            //datos de clima hardcodeado
            console.log('\n temp  de la cuidad actual\n',lugarSelec.temp);
            console.log('\n Estado de la cuidad actual\n',lugarSelec.desc);
            console.log('\n temp min de cuidad\n', lugarSelec.min);
            console.log('\n temp max de cuidad\n' ,lugarSelec.max);
            break;
        case 2:
            busquedas.historial.forEach ( (lugar , i ) => {
                const idx = `${ i + 1 }.`.green;
                console.log(`${idx} ${ lugar }`);
            })
            break;
        default:
            break;
    } 
    await pausa();
   }while( opt !== 0);
    
    
}

main();