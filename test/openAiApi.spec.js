//aqui van las pruebas de las funciones de openAI
//import test, { expect } from '@playwright/test'
import {communicateWithOpenAI} from '../src/lib/openAiApi.js'


// Mockear fetch globalmente
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      choices: [
        {
          message: {
            content: 'Hola, soy el cantante. ¿Cómo puedo ayudarte?',
            role: 'system',
          }
        }
      ],
    }),
  })
);

describe('communicateWithOpenAI', () => {
  it('should return mocked data from OpenAI API', async () => {
    const bands = {
      name: 'Paramore',
      descripcionLarga: 'Paramore es una banda estadounidense de rock alternativo formada en 2004 en Franklin, Tennessee. La banda es conocida por su sonido energético y la potente voz de su vocalista Hayley Williams, y ha lanzado varios álbumes exitosos a lo largo de su carrera.',
    };
    const messages = 'hola ,¿como estas?';

    const response = await communicateWithOpenAI(bands, messages);

    // Verifica que la respuesta es la esperada
    expect(response).toEqual(
      {choices: [
        {message: {
          role:"system",
          content: 'Hola, soy el cantante. ¿Cómo puedo ayudarte?',
        }
        }
      ]
      });
    // Verifica que fetch fue llamado con la URL correcta y los parámetros correctos
    expect(fetch).toHaveBeenCalledWith('https://api.openai.com/v1/chat/completions', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Hola soy ${bands.name} responderás como si fueras el cantante y darás tu nombre, tu personalidad se basa en ${bands.descripcionLarga}, con respuestas cortas no más de 30 caracteres`,
          },
          {
            role: 'user',
            content: messages,
          }
        ],
      }),
    });
  });
});

