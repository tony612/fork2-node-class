module.exports = function(definition, parentClass) {
  var klass = definition.initialize || function(){};
  if (parentClass) {
    klass.prototype = new parentClass();
  }
  delete definition.initialize;
  for (var prop in definition) {
    if (definition.hasOwnProperty(prop)) {
      klass.prototype[prop] = definition[prop];
    }
  }
  klass.prototype.constructor = klass;
  return klass;
};
