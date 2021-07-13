import Message from './Message';

export const INTERNAL_MESSAGES = {
  open: new Message('open-connection', 'string', null),
  update: new Message('ydoc-update', 'uint8array', null),
};
