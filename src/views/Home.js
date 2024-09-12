// General: cada archivo dentro de la carpeta view debe llevar elementos del html renderizados
// Definir funciones/componentes similares para otras rutas

// src/views/Home.js
import  data  from '../data/dataset.js';
//import { filterData } from '../lib/dataFunctions.js';
import {renderItems} from '../components/cards.js';
import { navigateTo } from "../router.js";
//import{ filterSection }from '../components/filters.js';// esto es la parte de los filtros  de html en dataverse


function Home(props) {
  const viewEl = document.createElement('div');
  // const root =  document.getElementById("root");
  //root.classList.add("vacio");
 
  const headerEl = document.createElement('header'); 
  headerEl.innerHTML= `
  <img src="../components/img/banner4.jpg" alt="banner" >

  <h1>House of Rock </h1>
  
  <button type="button" id="apiKeyLink">ApiKey</button>

  <button type="button" id="indiChatLink">Chat</button>`; //este te lleva a la vista de error x ahora

  viewEl.appendChild(headerEl);
  // viewEl.appendChild(filterSection(filterData))
  viewEl.appendChild(renderItems(data)) 
  

  //agrega los eventos listener
  const apiLinkEl = headerEl.querySelector('#apiKeyLink');

  apiLinkEl.addEventListener('click', () => navigateTo("/apiView", { name: "apiKey" }));

 
  const chatLinkEl = headerEl.querySelector('#indiChatLink');
  chatLinkEl.addEventListener('click', () => {
    const item = data.find(item => item.id === props.id);
    
    if (item) {

      navigateTo("/individualChat", { id: item.id });

    } else {
      navigateTo("/errorView", { message: "Error page not found" });
    }
  });

 
  return viewEl;
}

export default Home; /*default es en remplazo de los {} del archivo index.js L9 cumple la funcion de la llaves*/

