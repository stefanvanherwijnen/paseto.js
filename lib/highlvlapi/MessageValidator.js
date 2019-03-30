/**
 * @typedef IValidationOptions
 * @property {?string} audience;
 * @property {?string} tokenIdentifier;
 * @property {?string} issuer;
 * @property {?string} subject;
 * @property {?Date} now;
}
*/

/**
 * @param {object} message
 * @return {boolean}
 * @constructor
 */
function MessageValidator(message) {
    if (!message) {
        throw new Error('message is not valid');
    }
    if (message instanceof String) {
        throw new Error('message is a string instead of object');
    }
    if (message instanceof Number) {
        throw new Error('message is a number instead of object');
    }
    if (message instanceof Array) {
        throw new Error('message is an Array instead of object');
    }
    this.message = message;
}

MessageValidator.prototype.isForAudience = isForAudience;
/**
 * @param {string} audience
 * @return {boolean}
 */
function isForAudience(audience) {
    return this.message.aud === audience;
}

MessageValidator.prototype.isIdentifiedBy = isIdentifiedBy;
/**
 * @param {string} tokenIdentifier
 * @return {boolean}
 */
function isIdentifiedBy(tokenIdentifier) {
    return this.message.jti === tokenIdentifier;
}

MessageValidator.prototype.isIssuedBy = isIssuedBy;
/**
 * @param {string} issuer
 * @return {boolean}
 */
function isIssuedBy(issuer) {
    return this.message.iss === issuer;
}

MessageValidator.prototype.isSubject = isSubject;
/**
 * @param {string} subject
 * @return {boolean}
 */
function isSubject(subject) {
    return this.message.sub === subject;
}

MessageValidator.prototype.isExpired = isExpired;
/**
 * @param {Date} date
 * @return {boolean}
 */
function isExpired(date) {
    const message = this.message;
    if (!message.exp) {
        return false;
    }
    return (message.exp instanceof Date ? message.exp : new Date(message.exp)) < (date ? date : new Date());
}

MessageValidator.prototype.isIssuedAtValid = isIssuedAtValid;
/**
 *
 * @param {?Date} date
 * @return {boolean}
 */
function isIssuedAtValid(date) {
    const message = this.message;
    if (!message.iat) {
        return false;
    }
    return (message.iat instanceof Date ? message.iat : new Date(message.iat)) <= (date ? date : new Date());
}

MessageValidator.prototype.isNotBeforeValid = isNotBeforeValid;
/**
 * @param {?Date} date
 * @return {boolean}
 */
function isNotBeforeValid(date) {
    const message = this.message;
    if (!message.nbf) {
        return false;
    }
    return (message.nbf instanceof Date ? message.nbf : new Date(message.nbf)) <= (date ? date : new Date());
}

MessageValidator.prototype.isValid = isValid;
/**
 * @param options
 */
function isValid(options) {
    if (options === undefined) {
        options = {};
    }
    const message = this.message;
    return !this.isExpired(options.now) &&
        (message.iat === undefined || this.isIssuedAtValid(options.now)) &&
        (message.nbf === undefined || this.isNotBeforeValid(options.now)) &&
        (options.audience === undefined || message.aud === undefined || this.isForAudience(options.audience)) &&
        (options.tokenIdentifier === undefined || message.jti === undefined
            || this.isIdentifiedBy(options.tokenIdentifier)) &&
        (options.issuer === undefined || message.iss === undefined || this.isIssuedBy(options.issuer)) &&
        (options.subject === undefined || message.sub === undefined || this.isSubject(options.subject))
    ;
}


MessageValidator.prototype.isValidStrict = isValidStrict;
/**
 * @param options
 */
function isValidStrict(options) {
    if (options === undefined) {
        options = {};
    }
    return !this.isExpired(options.now) &&
            (this.isIssuedAtValid(options.now)) &&
            (this.isNotBeforeValid(options.now)) &&
            (options.audience === undefined || this.isForAudience(options.audience)) &&
            (options.tokenIdentifier === undefined || this.isIdentifiedBy(options.tokenIdentifier)) &&
            (options.issuer === undefined || this.isIssuedBy(options.issuer)) &&
            (options.subject === undefined || this.isSubject(options.subject))
    ;
}
