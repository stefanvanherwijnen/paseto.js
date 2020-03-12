const MessageValidator = require('./MessageValidator');

/**
 * @param {MessageValidator} validator
 * @param {?object} options
 * @constructor
 */
function ValidatorFactoryWrapper(validator, options) {
    this.validator = validator;
    this.options = options ? options : {};
}

ValidatorFactoryWrapper.prototype.isForAudience = isForAudience;
/**
 * @param {string} audience
 * @return {boolean}
 */
function isForAudience(audience) {
    return this.validator.isForAudience(audience);
}

ValidatorFactoryWrapper.prototype.isIdentifiedBy = isIdentifiedBy;
/**
 * @param {string} tokenIdentifier
 * @return {boolean}
 */
function isIdentifiedBy(tokenIdentifier) {
    return this.validator.isIdentifiedBy(tokenIdentifier);
}

ValidatorFactoryWrapper.prototype.isIssuedBy = isIssuedBy;
/**
 * @param {string} issuer
 * @return {boolean}
 */
function isIssuedBy(issuer) {
    return this.validator.isIssuedBy(issuer);
}

ValidatorFactoryWrapper.prototype.isSubject = isSubject;
/**
 * @param {string} subject
 * @return {boolean}
 */
function isSubject(subject) {
    return this.validator.isSubject(subject);
}

ValidatorFactoryWrapper.prototype.isExpired = isExpired;
/**
 * @param {?Date} date
 * @return {boolean}
 */
function isExpired(date) {
    return this.validator.isExpired(date);
}

ValidatorFactoryWrapper.prototype.isIssuedAtValid = isIssuedAtValid;
/**
 * @param {?Date} date
 * @return {boolean}
 */
function isIssuedAtValid(date) {
    return this.validator.isIssuedAtValid(date);
}

ValidatorFactoryWrapper.prototype.isNotBeforeValid = isNotBeforeValid;
/**
 *
 * @param {?Date} date
 */
function isNotBeforeValid(date) {
    return this.validator.isNotBeforeValid(date);
}

ValidatorFactoryWrapper.prototype.isValid = isValid;
/**
 * @param {?object} options
 */
function isValid(options) {
    return this.validator.isValid(options
            ? Object.assign(this.options, options)
            : this.options);
}

ValidatorFactoryWrapper.prototype.isValidStrict = isValidStrict;
/**
 * @param {?object} options
 */
function isValidStrict(options) {
    return this.validator.isValidStrict(options
            ? Object.assign(this.options, options)
            : this.options);
}
