export function addIframe(url) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.display = 'none';
  iframe.style.position = 'absolute';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

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
