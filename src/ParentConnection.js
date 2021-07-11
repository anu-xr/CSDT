import * as Y from 'yjs';
import { INTERNAL_MESSAGES } from './constants';

export default class ParentConnection {
  constructor() {
    this.hash = '';
    this.ydoc = new Y.Doc();
    this.connectionOpened = false;

    //receive ydoc updates
    this.onMessage(
      INTERNAL_MESSAGES.update,
      (data) => {
        Y.applyUpdate(this.ydoc, data);
      },
      false
    );

    //send ydoc updates
    this.ydoc.on('update', (update) => {
      this.sendMessage(INTERNAL_MESSAGES.update, update);
    });

    //wait for parent to initialize connection
    const open = INTERNAL_MESSAGES.open;
    this.onMessage(open, (data) => {
      this.hash = data;
      this.sendResponse(open);
    });
  }

  sendResponse(message, data) {
    const text = message.getResponseTextFromChild(this.hash);
    const event = new CustomEvent(text, { detail: data });
    parent.document.dispatchEvent(event);
  }

  sendMessage(message, data) {
    const text = message.getTextFromChild(this.hash);
    const event = new CustomEvent(text, { detail: data });
    parent.document.dispatchEvent(event);
  }

  sendMessageWithResponse(message, data, convert = true) {
    const responseText = message.getResponseTextFromChild(this.hash);
    const promise = new Promise((resolve) => {
      document.addEventListener(
        responseText,
        (e) => {
          const d = convert === true ? message.convertResponse(e.detail) : e.detail;
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

  //onEvent functions
  onMessage(message, func, once = false, convert = true) {
    document.addEventListener(
      message.getTextFromParent(),
      (e) => {
        const data = convert === true ? message.convertSent(e.detail) : e.detail;
        func(data);
      },
      { once: once }
    );
  }

  onResponse(message, func, once = false, convert = true) {
    document.addEventListener(
      message.getResponseTextFromParent(),
      (e) => {
        const data = convert === true ? message.convertResponse(e.detail) : e.detail;
        func(data);
      },
      { once: once }
    );
  }
}
