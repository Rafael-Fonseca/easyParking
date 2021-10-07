var aesjs = require('aes-js')
const { cardSecret } = require('../.card.env')

module.exports = app => {

  const encrypt = function (data) {
    // Convert text to bytes
    var dataBytes = aesjs.utils.utf8.toBytes(data);

    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(
      cardSecret,
      new aesjs.Counter(5));

    var encryptedBytes = aesCtr.encrypt(dataBytes);

    // To store the binary data, you may convert it to hex
    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }


  const decrypt = function (encryptedData) {
    // When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedData);

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(
      cardSecret,
      new aesjs.Counter(5));

    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  return { encrypt, decrypt }
}