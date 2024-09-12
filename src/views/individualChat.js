
import { navigateTo } from "../router.js";
import data from "../data/dataset.js";

import {communicateWithOpenAI}  from "../lib/openAiApi.js";

export function ChatIndividual(props) {  //props solo contiene la id
 
  const element = document.createElement('div'); 
  element.classList.add("chatIndividual");

  
  const bands = data.find((item) => item.id === props.id);

  if (!bands) {
    // eslint-disable-next-line no-console
    console.error('No matching data found');
    return document.createElement('div'); // Devuelve un elemento vacío si no se encuentra el dato
  }

  // Crea el contenido HTML del chat
  const chatElement = document.createElement('div');
  chatElement.classList.add("chaty");
   
  chatElement.innerHTML += `
   <link rel="stylesheet" href="chat.css"/>
    <header class="titleChat" id="titleChat">
      <h1>House of Rock </h1>
      <button type="button" class="returnHome">Home</button>
    </header>
    <section class="leadVocal" id="leadVocal">
      <h2 class="singer" id="singer">${bands.name} </h2>
      <p class="descrip">${bands.shortDescripcion}</p>
    <figure>
      <img src="${bands.imageUrl}"alt="${bands.id}" id="imgChat"/>
    </figure>  
    </section>   
    <div class="messages" id="messages"></div>
    <section class="userMessage" id="userM">
        <textarea  class="userMessage" id="userText" placeholder="iniciar chat"></textarea>
        <button type="button" class="btnSend"> Enviar </button>
     </section>`;
 
  element.appendChild(chatElement);

  const returnButton = element.querySelector('.returnHome');
  returnButton.addEventListener('click', () => navigateTo("/", { name: "home" }));

  const sendButton = element.querySelector('.btnSend');
  sendButton.addEventListener('click', () => {
    const userText = element.querySelector('#userText').value; // Obtener el valor del textarea
    const messagesDiv = element.querySelector('#messages'); // Contenedor de mensajes
    communicateWithOpenAI(userText, bands).then((response)=>{
    //  console.log(response)
      const newMessage = document.createElement('p');
      newMessage.classList.add("chatResponse")
      newMessage.textContent = ` ${response}`;
      messagesDiv.appendChild(newMessage); //entrega el nuevo mensaje del usuario al div
    });
    
    if (userText.trim() !== '') {
      // Crear un nuevo párrafo para mostrar el mensaje
      const newMessage = document.createElement('p');
      newMessage.textContent = ` ${userText}`;
      messagesDiv.appendChild(newMessage); // Añadir el nuevo mensaje al contenedor de mensajes
      
      // Limpiar el textarea
      element.querySelector('#userText').value = '';
    }
  }); 
    
  return element;
}
