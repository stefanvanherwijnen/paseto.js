const SymmetricKey = require('../key/symmetric');
const ret = require("../utils").ret;

const sSymmetricKey = Symbol('symmetricKey');

/**
 * @param {V1|V2} version
 * @param {SymmetricKey} key
 * @constructor
 */
function PasetoLocal(version, key) {
    this.pasetoVersion = version;
    this[sSymmetricKey] = key;
}

PasetoLocal.prototype.getRpr = getRpr;
/**
 * @return {string}
 */
function getRpr() {
    return this[sSymmetricKey].getRpr();
}

PasetoLocal.prototype.encrypt = ret(encrypt);
/**
 * @param {string|Buffer} message
 * @param {function} cb
 * @return {void}
 */
function encrypt(message, cb) {
    const sk = this[sSymmetricKey];
    if (!sk) {
        throw new Error('No local key');
    }
    this.pasetoVersion.encrypt(message, sk, cb);
}

PasetoLocal.prototype.decrypt = ret(decrypt);
/**
 * @param {string} message
 * @param {function} cb
 * @throws {Error} No local key
 * @return void
 */
function decrypt(message, cb) {
    const sk = this[sSymmetricKey];
    if (!sk) {
        throw new Error('No local key');
    }
    return this.pasetoVersion.decrypt(message, sk, cb);
}

PasetoLocal.prototype.localKey = localKey;
/**
 * @return {SymmetricKey}
 */
function localKey() {
    return this[sSymmetricKey];
}
