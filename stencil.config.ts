import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
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
