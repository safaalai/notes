import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

function getBuildEnv() {
  if( process.argv && (process.argv.indexOf('--dev') > -1) )
    return 'dev';
  else
    return 'prod';
}
console.log('Doing a ' + getBuildEnv() + ' build.');

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.' + getBuildEnv() + '.ts',
  taskQueue: 'async',
  testing: {
    testPathIgnorePatterns: ["/node_modules/","/server/"]
  },
  outputTargets: [
    {
      type: 'www',
      dir: 'server/gateway/dist/www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: '/'
    }
  ]
};
