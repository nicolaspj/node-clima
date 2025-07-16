import colors from 'colors';
import readline from 'readline';
import inquirer from 'inquirer';


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message:'¿Qué desea hacer?',
        choices:[
            {
                value: 1,
                name : '1. Buscar Pais'
            },
            {
                value: 2,
                name : '2. Historial'
            },
            {
                value: 0,
                name : '0. Salir'
            }
        ]
    }
];


export const inquirerMenu = async () => {
    console.clear();
    console.log('=======================');
    console.log(' Seleccione una Opcion ');
    console.log('=======================\n');

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

export const pausa = () =>{
    return new Promise( resolve =>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`\nPresione ${'ENTER'.green } para continuar \n`, (opcion) => {
        rl.close();
        resolve(opcion)
    });
    })
}

export const leerInput = async (message) => {
    const question = [
        {
            type : 'input',
            name : 'desc',
            message ,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

export const listadoLugares = async ( lugares = [] ) => {
           // {
           //     value: tarea.id,
           //     name : '0. Salir'
           // }
        const choices = lugares.map( (lugar, i) => {
            const idx = `${i + 1 }`.green;
            return {
                value : lugar.id,
                name: `${idx}  ${ lugar.capital}`
            }
        } );

        choices.unshift ({
            value : '0',
            name: '0.'.green + ' Cancelar'
        });

        const preguntas = [
            {
                type: 'list',
                name: 'id',
                message: 'Seleccione lugar',
                choices
            }
        ]
        

        const { id } = await inquirer.prompt(preguntas);
        return id; 
    }

export const confirmar = async ( message ) => {

        const confirmar = [
            {
                type: 'confirm',
                name: 'ok',
                message
            }
        ];
        const { ok } = await inquirer.prompt(confirmar);
        return ok;
    }

export const mostrarListadoTareasChecklist = async ( tareas = [] ) => {
           // {
           //     value: tarea.id,
           //     name : '0. Salir'
           // }
        const choices = tareas.map( (tarea, i) => {
            const idx = `${i + 1 }`.green;
            return {
                value : tarea.id,
                name: `${idx}  ${ tarea.desc}`,
                checked: (tarea.completadoEn) ? true : false
            }
        });

        

        const preguntas = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Seleccione tarea -- (Presiona <espacio> para seleccionar ,\n <a> para  seleccionar todo,\n <i> para invertir la seleccion y \n <enter> para guardar \n )',
                choices
            }
        ]
        

        const { ids } = await inquirer.prompt(preguntas);
        return ids; 
    
    
    
    
    }




 