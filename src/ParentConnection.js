import * as Y from 'yjs';
import { INTERNAL_MESSAGES } from './constants';

export default class ParentConnection {
  constructor() {
    this.hash = '';
    this.ydoc = new Y.Doc();
    this.connectionOpened = false;

    //receive ydoc updates
    INTERNAL_MESSAGES.update.onResponse((data) => {
      Y.applyUpdate(this.ydoc, data);
    });

    //send ydoc updates
    this.ydoc.on('update', (update) => {
      this.sendMessage(INTERNAL_MESSAGES.update, update);
    });

    //wait for parent to initialize connection
    const open = INTERNAL_MESSAGES.open;
    document.addEventListener(open.getTextFromParent(), (data) => {
      this.hash = open.convertSent(data);

      this.sendResponse(open);
    });
  }

  sendResponse(message, data) {
    const text = message.getResponseTextFromChild(this.hash);
    const event = new CustomEvent(text, { detail: data });
    parent.document.dispatchEvent(event);
  }

  sendMessage(message, data) {
    const text = message.getTextAsParent();
    const event = new CustomEvent(text, { detail: data });
    parent.document.dispatchEvent(event);
  }

  sendMessageWithResponse(message, data) {
    const responseText = message.getResponseTextFromChild(this.hash);
    const promise = new Promise((resolve) => {
      document.addEventListener(
        responseText,
        (e) => {
          const d = message.convertResponse(e.detail);
          resolve(d);
        },
        {
          once: once,
        }
      );
      this.sendMessage(message, data);
    });
    return promise;
  }
}
