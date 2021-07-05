import Base from './base';

//manages a connection as a parent site
export class CSDTParent extends Base {
  constructor(iframe) {
    super();

    this.iframe = iframe;
    this.hash = Math.random().toString(36).substring(2, 15);
  }

  //returns a promise that resolves with a response from the child site
  openConnection(connectionType) {
    return new Promise((resolve, _reject) => {
      window.document.addEventListener('CSDT-response-connection-open', (e) => resolve(Boolean(e.detail)), {
        once: true,
      });

      const data = {
        connectionType: String(connectionType),
        hash: this.hash,
      };

      this.dispatchEvent('CSDT-connection-open', data);
    });
  }
}
