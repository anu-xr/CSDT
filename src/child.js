import Base from './base';

//manages a connection as a child site
export class CSDTChild extends Base {
  constructor() {
    super();

    document.addEventListener('CSDT-connection-open', (e) => {
      this.hash = String(e.detail.hash);
    });
  }

  responseConnectionOpen(connectionEstablished = false) {
    this.dispatchEvent('CSDT-response-connection-open', Boolean(connectionEstablished));
  }
}
