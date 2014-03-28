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
  var currentClass = klass;
  klass.prototype.super = function(methodName) {
    var args = Array.prototype.slice.call(arguments, 1); // [] === Array.prototype
    currentClass = currentClass.__super__;
    var result = currentClass.prototype[methodName].apply(this, args);
    currentClass = klass;
    return result;
  };

  klass.prototype.constructor = klass;
  return klass;
};
