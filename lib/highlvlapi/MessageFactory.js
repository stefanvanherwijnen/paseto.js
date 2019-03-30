const ParamtersMaping =  Object.freeze({
    audience: 'aud',
    expiration: 'exp',
    issuedAt: 'iat',
    issuer: 'iss',
    notBefore: 'nbf',
    subject: 'sub',
    tokenIdentifier: 'jti',
});

module.export = MessageFactory;

/**
 *
 * @param {object} options
 * @constructor
 */
function MessageFactory(options) {
    if (options) {
        if (options.duration) {
            const duration = options.duration;
            this.calculateExpiration = () => duration.getExpiration();
        }
    }
    this.options = MessageFactory.toMessageOptions(options);
}

MessageFactory.toMessageOptions = toMessageOptions;

function toMessageOptions(options) {
    if (!options) { return {}; }
    return Object.keys(options).reduce(
        (acc, key) => {
            if (options.hasOwnProperty(key) && key !== 'duration') {
                acc[ParamtersMaping[key]] = options[key];
            }
            return acc;
        },
        {}
    );
}

MessageFactory.createMessage = createMessage;

function createMessage(inputMessage) {
    const message = {};
    const options = this.options;
    if (options) {
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                message[key] = (options as any)[key];
            }
        }
    }
    for (const key in inputMessage) {
        if (inputMessage.hasOwnProperty(key)) {
            message[key] = (inputMessage as any)[key];
        }
    }
    if (this.calculateExpiration) {
        const exp = this.calculateExpiration();
        if (message.exp === undefined || exp <  message.exp) {
            message.exp = exp;
        }
    }
    return message;
}
