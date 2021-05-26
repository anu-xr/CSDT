import Base from './base';
import * as Y from 'yjs';

//manages connections as a parent site
export default class CSDTParent extends Base {
  constructor(iframe) {
    super();

    this.iframe = iframe;

    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      const event = new CustomEvent('CSDT-y-update', { detail: update });
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  //checks if site supports CSDT
  //returns a promise that resolves if the child site responds
  checkSupport() {
    return new Promise((resolve, _reject) => {
      window.document.addEventListener('CSDT-response-check-support', resolve(), { once: true });

      const event = new CustomEvent('CSDT-check-support');
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  //initiates ydoc connection
  yConnect() {
    const data = this.ydoc.getMap().toJSON();
    const event = new CustomEvent('CSDT-y-connect', { detail: data });
    this.iframe.contentDocument.dispatchEvent(event);
  }
}
