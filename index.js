module.exports = function(definition, parentClass) {
  var klass = definition.initialize || function(){};
  if (parentClass) {
    klass.prototype = new parentClass();
    klass.__super__ = parentClass;
  } else {
    klass.__super__ = Object;
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
