const MessageValidator = require('./MessageValidator');
const ValidatorFactoryWrapper = require('./ValidatorFactoryWrapper');

module.exports = ValidatorFactory;

/**
 * @param {?object} options
 * @constructor
 */
function ValidatorFactory(options) {
    this.options = options || {};
}

ValidatorFactory.prototype.validator = validator;
/**
 *
 * @param {object} message
 * @param {?object} options
 * @return {ValidatorFactoryWrapper}
 */
function validator(message, options){
    return new ValidatorFactoryWrapper(
        new MessageValidator(message),
        options
            ? Object.assign(this.options, options)
            : this.options,
    );
}

ValidatorFactory.prototype.isValid = isValid;
/**
 *
 * @param {object} message
 * @param {?object} options
 * @return {boolean}
 */
function isValid(message, options){
    return (new ValidatorFactoryWrapper(
        new MessageValidator(message),
        this.options,
    )).isValid(options);
}

ValidatorFactory.prototype.isValidStrict = isValidStrict;
/**
 *
 * @param {object} message
 * @param {?object} options
 * @return {boolean}
 */
function isValidStrict(message, options){
    return (new ValidatorFactoryWrapper(
        new MessageValidator(message),
        this.options,
    )).isValidStrict(options);
}
