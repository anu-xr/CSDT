import Message from './message';

export const INTERNAL_MESSAGES = {
  open: new Message('open-connection', false, 'string', null),
  update: new Message('ydoc-update', false, 'uint8array', null),
};
