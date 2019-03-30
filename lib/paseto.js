exports = module.exports = {
  // keys
  SymmetricKey: require('./key/symmetric'),
  PrivateKey: require('./key/private'),
  PublicKey: require('./key/public'),
  // protocols
  V1: require('./protocol/V1'),
  V2: require('./protocol/V2'),
  highLevel: {
    Duration: require('./highlvlapi/Duration'),
    MessageValidat: require('./highlvlapi/MessageValidator'),
    ValidatorFactory: require('./highlvlapi/ValidatorFactory'),
    ValidatorFactoryWrapper: require('./highlvlapi/ValidatorFactoryWrapper'),
    PasetoFactory: require('./highlvlapi/PasetoFactory'),
    PasetoLocal: require('./highlvlapi/PasetoLocal'),
    PasetoPrivate: require('./highlvlapi/PasetoPrivate'),
    PasetoPublic: require('./highlvlapi/PasetoPublic'),
    MessageFactory: require('./highlvlapi/MessageFactory'),
  }
};
