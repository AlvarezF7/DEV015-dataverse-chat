//en este va get api 
import { getApiKey } from './ApiKey.js';


export const communicateWithOpenAI = (messages,bands) => { //se importa en el chat individual
//Aquí es donde debes implementar la petición con fetch pide datos en js
  const apiKey =  getApiKey ();  //para llamar a la apikey;
  const openAi = "https://api.openai.com/v1/chat/completions";  //define la url de openai*/
 
  //console.log(bands);
  //peticion fetch

  return fetch( openAi, { 
    method: "POST", //método HTTP usado en el request, post envía datos.
    headers: { //encabezados HTTP que se envían con el request
      "Authorization": `Bearer ${apiKey}`, //bearer indica el envío de un token de acceso.
      "Content-Type": "application/json", //el cuerpo del request es en formato JSON.
    },
    body: JSON.stringify({  //Cuerpo del request, el método stringify convierte el objeto en un JSON
      model: "gpt-4",  //Modelo OpenAI a usar
      messages: [  //Array de mensajes del chat
        {
          role:"system", content:`Hola soy  ${bands.name} responderas como si fueras el cantante y daras tu nombre,
          tu personalidad se basa en ${bands.descripcionLarga}, con respuestas cortas no mas de 30 caracteres`},
        {role:"user", content: messages }
      ], 
    }),
  })
    .then(response => response.json())
    .then(response => {
      console.log(response.choices[0].message.content)
      return response.choices[0].message.content
    })
    .catch(error =>{
      console.error('Error:', error);
      throw error;
    });
     
};
