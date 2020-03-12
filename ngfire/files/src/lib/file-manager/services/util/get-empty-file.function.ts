export function __GetEmptyFile() {
  return _toByteArray('');
}

function _toByteArray(str: string) : Uint8Array
{
  const utf8 = unescape(encodeURIComponent(str));

  const arr  = [];
  for (let i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }
  return new Uint8Array(arr);
}
