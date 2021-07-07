import Connection from './Connection';
import ParentConnection from './ParentConnection';
import Message from './Message';
import { INTERNAL_MESSAGES } from './constants';

export default class CSDT {
  constructor() {
    this.messages = { ...INTERNAL_MESSAGES };
    this.connections = { parent: new ParentConnection() };
  }

  openConnection(url, id) {
    const connection = new Connection(url);
    if (this.connections[id]) this.closeConnection(id);
    this.connections[id] = connection;
  }

  closeConnection(id) {
    this.connections[id].iframe.remove();
    delete this.connections[id];
  }

  createMessage(id, text, expectsResponse, sentDataType, responseDataType) {
    const message = new Message(text, expectsResponse, sentDataType, responseDataType);
    this.messages[id] = message;
  }
}
