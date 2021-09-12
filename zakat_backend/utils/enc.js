const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const CARD_KEY = "IhA_D7365";
const OTHER_KEY = "m2AMZ5&5";

module.exports = {
    encrypt(text) {
        var cipher = crypto.createCipher('aes-256-cbc', OTHER_KEY)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt(text) {
        var decipher = crypto.createDecipher('aes-256-cbc', OTHER_KEY)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    },

    cardEncrypt(text) {
        var cipher = crypto.createCipher('aes-256-cbc', CARD_KEY)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    cardDecrypt(text) {
        var decipher = crypto.createDecipher('aes-256-cbc', CARD_KEY)
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

}