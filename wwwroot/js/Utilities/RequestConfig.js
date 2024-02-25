function getRequestConfig(RequestCompression, RequestEncryption, ResponseCompression, ResponseEncryption) {
  return encryptData(JSON.stringify({
    'RequestCompression': RequestCompression,
    'RequestEncryption': RequestEncryption,
    'ResponseCompression': ResponseCompression,
    'ResponseEncryption': ResponseEncryption
  }))
}
