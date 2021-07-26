export function addIframe(url) {
  const div = document.createElement('div');
  div.style.overflow = 'hidden';
  div.style.position = 'relative';

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.position = 'fixed';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.left = '100%';

  div.appendChild(iframe);
  document.body.appendChild(div);

  return iframe;
}

export function convertType(data, type) {
  switch (type) {
    case 'boolean':
      return Boolean(data);
    case 'string':
      return String(data);
    case 'number':
      return Number(data);
    case 'uint8array':
      return new Uint8Array(data);
  }
  return null;
}
