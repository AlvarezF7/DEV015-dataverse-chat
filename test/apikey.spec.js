//en este archivo desarrolla los test correspondientes

import { getApiKey, setApiKey } from '../src/lib/ApiKey.js';


// Mock de localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    clear: () => { store = {}; }
  };
})();

describe('API Utils', () => {
  let originalLocalStorage;

  // Guarda una referencia al localStorage original antes de modificarlo
  beforeAll(() => {
    originalLocalStorage = global.localStorage;
  });

  // Antes de cada prueba, sustituye el localStorage real con el mock
  beforeEach(() => {
    global.localStorage = localStorageMock;
  });

  // Después de cada prueba, restaura el localStorage original
  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  test('setApiKey stores the API key in localStorage', () => {
    const apiKey = '12345';
    setApiKey(apiKey);
    expect(localStorage.getItem('apiKey')).toBe(apiKey);
  });

  test('getApiKey retrieves the API key from localStorage', () => {
    const apiKey = '67890';
    localStorage.setItem('apiKey', apiKey);
    expect(getApiKey()).toBe(apiKey);
  });
});

