module.exports = function(definition) {
  var klass = definition.initialize || function(){};
  delete definition.initialize;
  klass.prototype = definition;
  return klass;
};
