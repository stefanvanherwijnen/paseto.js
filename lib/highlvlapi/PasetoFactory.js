const PrivateKey = require('../key/private');
const PublicKey = require('../key/public');
const SymmetricKey = require('../key/symmetric');
const V1 = require('../protocol/V1');
const V2 = require('../protocol/V2');
const PasetoLocal = require('./PasetoLocal');
const PasetoPrivate = require('./PasetoPrivate');
const PasetoPublic = require('./PasetoPublic');
const ret = require("../utils").ret;

const sPasetoVersion = Symbol('pasetoVersion');
const sRepr = Symbol('repr');

/**
 * @param {V1|V2} version
 * @constructor
 */
function PasetoFactory(version) {
    this[sPasetoVersion] = version;
    this[sRepr] = version.repr();
}

PasetoFactory.prototype.getRpr = getRepr;
/**
 * @return {string}
 */
function getRepr() {
    return this[sRepr];
}

PasetoFactory.prototype.getPrivateKey = getPrivateKey;
/**
 * @param {{privateKey: Buffer, publicKey?: Buffer}} keys
 * @return {Promise} PasetoPrivate
 */
function getPrivateKey(keys) {
    if (keys && keys.publicKey) {
        const pk = new PrivateKey(this[sPasetoVersion]);
        const pubKey = new PublicKey(this[sPasetoVersion]);
        return Promise.all([
                pk.inject(keys.privateKey),
                pubKey.inject(keys.publicKey),
            ])
            .then(() => new PasetoPrivate(this[sPasetoVersion], pk, pubKey));
    }
    if (keys) {
        const pk = new PrivateKey(this[sPasetoVersion]);
        return pk.inject(keys.privateKey)
            .then(() => new PasetoPrivate(this[sPasetoVersion], pk));
    }

    return this[sPasetoVersion].private()
        .then(gPrivateKey => gPrivateKey.public()
            .then( gPublicKey => new PasetoPrivate(this[sPasetoVersion], gPrivateKey, gPublicKey))
        );
}

PasetoFactory.prototype.getPublicKey = ret(getPublicKey);
/**
 * @param {PublicKey} publicKey
 * @param {function} cb
 * @return {Promise}
 */
function getPublicKey(publicKey, cb) {
    const gPublicKey = new PublicKey(this[sPasetoVersion]);
    gPublicKey.inject(publicKey, () =>
       void cb(new PasetoPublic(this[sPasetoVersion], gPublicKey))
    );
}

PasetoFactory.prototype.getLocalKey = ret(getLocalKey);
/**
 * @param {Buffer} localKey
 * @param {function} cb
 */
function getLocalKey(localKey, cb) {
    if (localKey) {
        const gLocalKey = new SymmetricKey(this[sPasetoVersion]);
        return void gLocalKey.inject(localKey, () =>
            void cb(new PasetoLocal(this[sPasetoVersion], gLocalKey))
        );
    }
    this[sPasetoVersion].symmetric(sym =>
        void cb(new PasetoLocal(this[sPasetoVersion], sym))
    );
}
