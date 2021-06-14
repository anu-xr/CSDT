import Base from './base';

//manages connections as a child site
export class CSDTChild extends Base {
  constructor() {
    super();

    //ydoc send updates
    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      const event = new CustomEvent('CSDT-y-update', { detail: update });
      parent.document.dispatchEvent(event);
    });

    document.addEventListener('CSDT-ping', () => {
      const response = new CustomEvent('CSDT-response-ping', { detail: Date.now() });
      parent.document.dispatchEvent(response);
    });

    document.addEventListener('CSDT-connection-open', (e) => {
      this.hash = e.detail.hash;
    });
  }

  responseConnectionOpen(connectionEstablished = false) {
    const data = {
      connectionEstablished: connectionEstablished,
    };
    const response = new CustomEvent('CSDT-response-connection-open', { detail: data });
    parent.document.dispatchEvent(response);
  }
}
