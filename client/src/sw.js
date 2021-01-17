import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';

setupRouting();
console.log('getFiles()', getFiles());
setupPrecaching(getFiles());

