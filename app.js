const formulario = document.querySelector('#formulario');

const tareaInput = document.querySelector('#tarea');
const descripcionInput = document.querySelector('#descripcion');
const btnCrear = document.querySelector('#boton');

class Tareas {
    constructor() {
        this.tareas = [];
    }

    // agregarTarea(tarea) {
    //     this.tareas = [...this.tareas, tarea];
    // }
};

eventListeners();
function eventListeners() {
    tareaInput.addEventListener('input', datosTarea);
    descripcionInput.addEventListener('input', datosTarea);

    formulario.addEventListener('submit', crearTarea);
};

const tareaObj = {
    tarea: '',
    descripcion: ''
};

function datosTarea(e) {
    tareaObj[e.target.name] = e.target.value;
};

function imprimirAlerta(mensaje, tipo) {
    const existeAlerta = document.querySelector('.alerta');

    if(!existeAlerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alerta')

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.remove('alerta');
            divMensaje.classList.add('completo');
        }

        divMensaje.textContent = mensaje;
        
        document.querySelector('#alerta').appendChild(divMensaje);

        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
        }
};


function crearTarea(e) {
    e.preventDefault();

    const {tarea, descripcion} = tareaObj;

    if(tarea === '' || descripcion === '') {
        imprimirAlerta('Todos los espacios son obligatorios.', 'error');

        return;
    } else {
        imprimirAlerta('Se creó la tarea con éxito!.');

        nuevaTarea(tareaObj);
    };

    reiniciarObjeto();

    formulario.reset();
}

function reiniciarObjeto() {
    tareaObj.tarea = '',
    tareaObj.descripcion = ''
};


const nuevaTarea = async (tareaObj) => {
    const body= {
        "update": {},
        "fields": {
          "summary": tareaObj.tarea,
          "issuetype": {
            "id": "10020"
          },
          "project": {
            "id": "10005"
          },
          "description": {
            "type": "doc",
            "version": 1,
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "text": tareaObj.descripcion,
                    "type": "text"
                  }
                ]
              }
            ]
          }
        }
      } 

    try {
        const res = await fetch(process.env.URL_BACKEND, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    } catch(error) {
        console.log(error)
    }
};
