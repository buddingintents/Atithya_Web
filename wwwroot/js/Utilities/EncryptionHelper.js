function encryptData(data) {
  var retEncKeyData = GetEncKey();
  if (retEncKeyData == null)
    return;
  encParams = JSON.parse(retEncKeyData);
  var key = encParams.Key;
  var iv = encParams.IV;
  var version = Version;
  var plainText = CryptoJS.enc.Utf8.parse(data);
  
  var encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    blockSize: 128,
    keysize: 256
  });
  return encrypted.toString();
}

function decryptData(data) {
  var retEncKeyData = GetEncKey();
  if (retEncKeyData == null)
    return;
  encParams = JSON.parse(retEncKeyData);
  var key = encParams.Keyboard
  var iv = encParams.IV;
  
  var decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    blockSize: 128,
    keysize: 256
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
