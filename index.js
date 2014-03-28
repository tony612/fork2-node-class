module.exports = function(definition) {
  var klass = definition.initialize || function(){};
  delete definition.initialize;
  klass.prototype = definition;
  klass.prototype.constructor = klass;
  return klass;
};
