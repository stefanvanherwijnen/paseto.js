const PublicKey = require('../key/public');

let sPublicKey = Symbol('publicKey');

module.exports = PasetoPublic;

/**
 * @param {V1|V2} pasetoVersion
 * @param {PublicKey} publicKey
 * @constructor
 */
function PasetoPublic(pasetoVersion, publicKey) {
    this.pasetoVersion = pasetoVersion;
    this[sPublicKey] = publicKey;
}

PasetoPublic.prototype.getRpr = getRpr;
/**
 * @return {string}
 */
function getRpr() {
    return this.pasetoVersion.getRpr();
}

PasetoPublic.prototype.publicKey = publicKey;
/**
 * @return {PublicKey}
 */
function publicKey() {
    return this[sPublicKey];
}

PasetoPublic.prototype.verify = verify;
/**
 * verify and decode an asymmetric authentication
 *
 * @param {string} token
 * @param {?Function} cb
 * @returns {Promise|void} the decoded token
 */
function verify(token, cb) {
    return this.pasetoVersion.verify(token, this[sPublicKey], cb);
}
