/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
const level = 'debug';
const originFormated = (functionName: string, date: string) =>
  `### ${`${functionName}        `.slice(0, 8)} ${date} ###`;
export default {
  // Leave the promise, maybe in the future it will send the log to a endpoint
  info: (...payload: any[]): Promise<boolean> =>
    new Promise(resolve => {
      const date = new Date().toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
      });
      console.log(originFormated('INFO', date));
      console.log(payload);
      resolve(true);
    }),

  debug: (...payload: any[]): Promise<boolean> =>
    new Promise(resolve => {
      const date = new Date().toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
      });
      if (level !== 'debug') return resolve(true);
      console.log(originFormated('DEBUG', date));
      console.log(payload);
      return resolve(true);
    }),

  error: (...payload: any[]): Promise<boolean> =>
    new Promise(resolve => {
      const date = new Date().toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
      });
      if (level !== 'debug') resolve(true);
      console.error(originFormated('ERROR', date));
      console.error(payload);
    }),
};
