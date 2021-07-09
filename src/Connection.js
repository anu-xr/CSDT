import * as Y from 'yjs';
import { addIframe } from './helpers';
import { INTERNAL_MESSAGES } from './constants';

export default class Connection {
  constructor(url) {
    this.url = String(url);
    this.iframe = addIframe(this.url);
    this.hash = Math.random().toString(36).substring(2, 15);
    this.ydoc = new Y.Doc();
    this.connectionOpened = false;

    //receive ydoc updates
    INTERNAL_MESSAGES.update.onResponseFromChild(this.hash, (data) => {
      Y.applyUpdate(this.ydoc, data);
    });

    //send ydoc updates
    this.ydoc.on('update', (update) => {
      this.sendMessage(INTERNAL_MESSAGES.update, update);
    });

    //initiate the connection once the iframe is loaded
    this.iframe.addEventListener(
      'load',
      () => {
        this.sendMessageWithResponse(INTERNAL_MESSAGES.open, this.hash).then(() => {
          this.connectionOpened = true;
        });
      },
      { once: true }
    );
  }

  sendResponse(message, data) {
    const text = message.getResponseTextFromChild(this.hash);
    const event = new CustomEvent(text, { detail: data });
    this.iframe.contentDocument.dispatchEvent(event);
  }

  sendMessage(message, data) {
    const text = message.getTextFromParent();
    const event = new CustomEvent(text, { detail: data });
    this.iframe.contentDocument.dispatchEvent(event);
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
          once: true,
        }
      );
      this.sendMessage(message, data);
    });
    return promise;
  }
}
