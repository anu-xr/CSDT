import Base from './base';

//manages connections as a parent site
export class CSDTParent extends Base {
  constructor(iframe) {
    super();

    this.iframe = iframe;

    //send ydoc updates
    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      const event = new CustomEvent('CSDT-y-update', { detail: update });
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  //returns a promise that resolves with the ping to the child site
  ping() {
    const startTime = Date.now();
    return new Promise((resolve, _reject) => {
      window.document.addEventListener('CSDT-response-ping', (e) => resolve(startTime - e.detail), { once: true });

      const event = new CustomEvent('CSDT-ping');
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  //returns a promise that resolves with a response from the child site
  openConnection(connectionType) {
    return new Promise((resolve, _reject) => {
      window.document.addEventListener('CSDT-response-connection-open', (e) => resolve(e.detail), { once: true });

      const data = {
        connectionType: connectionType,
      };
      const event = new CustomEvent('CSDT-connection-open', { detail: data });
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  dispatchEvent(text, data) {
    const event = new CustomEvent(text, { detail: data });
    this.iframe.contentDocument.dispatchEvent(event);
  }
}
