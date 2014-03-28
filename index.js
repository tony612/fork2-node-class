module.exports = function(args) {
  var klass = args.initialize || function(){};
  delete args.initialize;
  klass.prototype = args;
  return klass;
};
