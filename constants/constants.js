export const NOTICIAS_KEY = 'NOTICIAS';
export const PASANTIAS_KEY = 'PASANTIAS';
export const TRABAJOS_KEY = 'TRABAJOS';

export const NOTICIAS_URL = 'https://faiweb.uncoma.edu.ar';
export const TRABAJOS_URL = `${NOTICIAS_URL}/index.php/bolsa-de-trabajo`;
export const PASANTIAS_URL = `${NOTICIAS_URL}/index.php/70-extension/pasantias`

export const sources = [
    {
        key: NOTICIAS_KEY,
        url: NOTICIAS_URL,
        type: 'noticias',
    },
    {
        key: PASANTIAS_KEY,
        url: PASANTIAS_URL,
        type: 'pasantias',
    },
    {
        key: TRABAJOS_KEY,
        url: TRABAJOS_URL,
        type: 'trabajos',
    }]