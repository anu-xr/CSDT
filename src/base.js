import * as Y from 'yjs';

//base CSDT object
export default class Base {
  constructor() {
    this.version = '0.1.0';
    this.ydoc = new Y.Doc();
    this.hash = '';

    //receive ydoc updates
    document.addEventListener('CSDT-ydoc-update', (e) => {
      const update = new Uint8Array(e.detail);
      Y.applyUpdate(this.ydoc, update);
    });

    //send ydoc updates
    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      this.dispatchEvent('CSDT-ydoc-update', new Uint8Array(update));
    });
  }

  dispatchEvent(text, data = null) {
    const event = new CustomEvent(text, { detail: data });
    if (this.iframe) this.iframe.contentDocument.dispatchEvent(event);
    else parent.document.dispatchEvent(event);
  }
}
