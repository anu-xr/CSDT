import Base from './base';
import * as Y from 'yjs';

//manages connections as a child site
export default class CSDTChild extends Base {
  constructor() {
    super();

    window.document.addEventListener('CSDT-check-support', () => {
      const response = new CustomEvent('CSDT-response-check-support', { detail: this.version });
      window.parent.document.dispatchEvent(response);
    });

    window.document.addEventListener('CSDT-y-update', (e) => {
      const update = e.detail;
      Y.applyUpdate(this.ydoc, update);
    });

    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      const event = new CustomEvent('CSDT-y-update', { detail: update });
      window.parent.document.dispatchEvent(event);
    });
  }
}
