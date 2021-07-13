import Connection from './Connection';
import ParentConnection from './ParentConnection';
import Message from './Message';
import { INTERNAL_MESSAGES } from './constants';

export default class ConnectionManager {
  constructor() {
    this.messages = { ...INTERNAL_MESSAGES };
    this.connections = { parent: new ParentConnection() };
  }

  openConnection(url, id) {
    if (this.connections[id]) this.closeConnection(id);

    const connection = new Connection(url);
    this.connections[id] = connection;

    return connection;
  }

  closeConnection(id) {
    this.connections[id].iframe.remove();
    delete this.connections[id];
  }

  createMessage(id, text, sentDataType, responseDataType) {
    const message = new Message(text, sentDataType, responseDataType);
    this.messages[id] = message;
  }
}
