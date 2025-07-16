import colors from 'colors';
 import readline from 'readline';

export const mostrarMenu = () => {
    return new Promise (resolve =>{
         const rl = readline.createInterface({
        input: process.stdin
        
    });

    console.clear();
    console.log('=======================');
    console.log(' Seleccione una Opcion ');
    console.log('=======================\n');

    console.log(`${'1.'.green} Crear Tarea`);
    console.log(`${'2.'.green} Listar Tareas`);
    console.log(`${'3.'.green} Listar Tareas Completadas`);
    console.log(`${'4.'.green} Crear Tarea Pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar Tarea`);
    console.log(`${'0.'.green} Salir`);

    rl.question(`\nSeleccione una opcion\n`, (opt) => {
        resolve(opt);    
    });
    
    })
   
}


export const pausa = () =>{
    return new Promise( resolve =>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`\nPresione ${'ENTER'.green } para continuar \n`, (opt) => {
        rl.close();
        resolve(opt)
    });
    })
}