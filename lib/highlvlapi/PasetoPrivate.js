const PrivateKey = require('../key/private');
const PublicKey = require('../key/public');
const PasetoPublic = require( './PasetoPublic');

const sPrivateKey = Symbol('privateKey');
const sPublicKey = Symbol('publicKey');
const sHasPublicKey = Symbol('hasPublicKey');

/**
 *
 * @param {V1|V2} pasetoVersion
 * @param {PrivateKey} privateKey
 * @param {PublicKey} publicKey
 * @constructor
 */
function PasetoPrivate(pasetoVersion, privateKey, publicKey) {
    this[sPrivateKey] = privateKey;
    this[sPublicKey] = publicKey ? new PasetoPublic(pasetoVersion, publicKey) : undefined;
    this[sHasPublicKey] = publicKey !== undefined;
}

PasetoPrivate.prototype.sign = sign;
/**
 * Encode a message using an asymmetric authentication
 *
 * @param {Buffer|string} message the prefered way is by using a buffer
 * @param {?function} cb
 * @returns {Promise|void}the encoded message
 */
function sign(message, cb) {
    return this.pasetoVersion.sign(message, this[sPrivateKey], cb);
}

PasetoPrivate.prototype.privateKey = privateKey;
/**
 *
 * @return {PasetoPrivate}
 */
function privateKey() {
    return this[sPrivateKey];
}

PasetoPrivate.prototype.hasPublicKey = hasPublicKey;
/**
 * @returns {boolean} if it can use a public key
 */
function hasPublicKey() {
    return this[sHasPublicKey];
}

PasetoPrivate.prototype.publicKey = publicKey;
/**
 *
 * @return {?PublicKey}
 */
function publicKey() {
    const pub = this[sPublicKey];
    return pub ? pub.publicKey() : undefined;
}

PasetoPrivate.prototype.verify = verify;
/**
 * verify and decode an asymmetric authentication token
 *
 * @see {@link hasPublicKey}
 * @param {string} token
 * @param {?function} cb
 * @returns {undefined|void|Promise} the decoded token or undefined
 */
function verify(token, cb) {
    const pub = this[sPublicKey];
    return pub ? pub.verify(token, cb) : undefined;
}
