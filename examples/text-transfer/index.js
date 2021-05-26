import CSDTParent from '../../src/parent';

const input = document.querySelector('input');
const iframe = document.querySelector('iframe');

const page2 = new CSDTParent(iframe);

input.oninput = () => {
  const text = input.value;
  const ydoc = page2.ydoc;

  const ytext = ydoc.getText('display');

  ydoc.transact(() => {
    ytext.delete(0, ytext.length);
    ytext.insert(0, text);
  });
};
