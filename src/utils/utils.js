import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = join(dirname(fileURLToPath(import.meta.url)), '..');

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const checkLastConnection = (last_connection, days) => {
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000; // 2 días en milisegundos

  const isMoreThanDaysAgo = Date.now() - last_connection > daysInMilliseconds;

  if (isLastConnectionMoreThanTwoDaysAgo) {
    console.log('El usuario no se ha conectado en los últimos 2 días.');
  } else {
    console.log('El usuario se ha conectado en los últimos 2 días.');
  }
  return isMoreThanDaysAgo;
};
