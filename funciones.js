//Importaciones
import {inputCategorias, contenedorComidas} from './componentes.js'


export const obtenerCategorias = async () => {
    try{
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        //Llamar a la API
        const respuesta = await fetch(url)
        const data = await respuesta.json()
        const categorias = data.categories
        //Llenar los datos del select
        categorias.forEach(categoria => {
            const nombreCategoria = categoria.strCategory

            const $option = document.createElement('option')
            $option.value = nombreCategoria
            $option.textContent = nombreCategoria


            inputCategorias.appendChild($option)
        });
    }catch(error){
        console.log(error)
    }
}


export const cargarBusqueda = async e => {
    e.preventDefault()
    //Vaciar contenedor si es que ya se busco antes
    contenedorComidas.innerHTML = ''
    const categoria = inputCategorias.value
    //Cargar las comidas por API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
    const data = await response.json()
    const comidas = data.meals
    //Renderizar los datos de busqueda
    comidas.forEach(comida => {
        const contenedorComida = document.createElement('p')
        contenedorComida.textContent = comida.strMeal
        contenedorComida.addEventListener('click', () => {
            const id = comida.idMeal
            detallesComida(id)
        })
        contenedorComidas.appendChild(contenedorComida)
    })
}


const detallesComida = async (id) => {
    //Limpiar consola por hay hay busquedas recientes
    console.clear()
    //Buscar los datelles de la comida por medio del APi
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json()
    const detalles = data.meals[0]
    //Cargar detalles por consola
    console.log(detalles.strMeal)

    console.log('Ingredientes:')
    for(let i = 1; i<= 20; i++){
        if(detalles[`strIngredient${i}`]){
            const ingrendiente = detalles[`strIngredient${i}`]
            const cantidad = detalles[`strMeasure${i}`]
    
            console.log(`${ingrendiente} - ${cantidad}`)
        }
    }


    console.log(detalles.strInstructions)
    console.log(detalles.strYoutube)

}