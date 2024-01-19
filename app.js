//Importaciones
import {obtenerCategorias, cargarBusqueda} from './funciones.js'
import {buttonBuscar} from './componentes.js'


const iniciarApp = () => {
    //Funciones
    obtenerCategorias()
    //Eventos
    buttonBuscar.addEventListener('click', cargarBusqueda)
}


document.addEventListener('DOMContentLoaded', iniciarApp)