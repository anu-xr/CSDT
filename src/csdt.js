const CSDT = { version: '0.1.0' };

window.document.addEventListener('CSDT-check', () => {
  const response = new CustomEvent('CSDT-check-response', { detail: CSDT });
  window.parent.document.dispatchEvent(response);
});

window.document.addEventListener('CSDT-check-response', (e) => {
  console.log(`CSDT check successful: ${e.detail}`);
});

/*
import * as Y from 'yjs';

const ydoc = new Y.Doc();
const ymap = ydoc.getMap();

ymap.set('rand', Math.random());
*/
