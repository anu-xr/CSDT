import * as Y from 'yjs';

//base CSDT object
export default class Base {
  constructor() {
    this.version = '0.1.0';
    this.ydoc = new Y.Doc();

    //receive ydoc updates
    document.addEventListener('CSDT-y-update', (e) => {
      const update = e.detail;
      Y.applyUpdate(this.ydoc, update);
    });
  }
}
