---
title: Encryption, Decryption
permalink: /docs/encryption-decryption/
---

<div class="note info">
  <h5>Encryption and Decryption of contents using <code>crypto</code> module</h5>
  <p></p>
</div>


Example code:

<div class="note unreleased">
  <h5>index.js file</h5>
  <p></p>
</div>



```js
var inp_password = process.argv.slice(2)[0];
if (inp_password == undefined || inp_password.length < 6)
{
    console.log('Invalid password, it must be greater than 5 letters with no white space');
    console.log('Restart program and try again');
    process.exit(1);
}

var makepassword32bytes = require('./modules/makepassword32bytes.js');
var _32bytePassword = makepassword32bytes(inp_password);

var encdec = require('./modules/encdec.js');

var encMessage = encdec.encrypt('Hello world', _32bytePassword);

var decMessage = encdec.decrypt(encMessage, _32bytePassword);

console.log('Encrypted Message ', encMessage);
console.log('Decrypted Message ', decMessage);
```

<div class="note unreleased">
  <h5>encdec.js file</h5>
  <p></p>
</div>


```js
var crypto = require('crypto');

var IV_LENGTH = 16;

function encrypt(text, key) {

  var iv = crypto.randomBytes(IV_LENGTH);
  var cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
  var encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, key) {
  var textParts = text.split(':');
  var iv = new Buffer(textParts.shift(), 'hex');
  var encryptedText = new Buffer(textParts.join(':'), 'hex');
  var decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
  var decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}


module.exports = { decrypt, encrypt };
```

<div class="note unreleased">
  <h5>makepassword32bytes.js file</h5>
  <p></p>
</div>


```js

var makepassword32bytes = function (text) {

    var data = text;
    while (data.length <= 32)
    {
        data += data;
    }
    data = data.substr(0, 32);
    return data;
}

module.exports = makepassword32bytes;
```

To ensure the encrypted content never produces the same output, we will use an `Initialization Vector (IV)` to add some `randomness` to the encryption algorithm. For this to be strong, we need to generate a `unique random IV` per encryption run – not a single fixed pre-defined IV. This is similar to a salt for password hashing, and will be stored with our encrypted data so we can decrypt it later along with the key.
