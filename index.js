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
  klass.prototype.super = function(methodName) {
    var args = Array.prototype.slice.call(arguments, 1); // [] === Array.prototype
    var superClass = klass.__super__;
    if (superClass.prototype.hasOwnProperty(methodName)) {
      return superClass.prototype[methodName].apply(this, args);
    }
  }

  klass.prototype.constructor = klass;
  return klass;
};
