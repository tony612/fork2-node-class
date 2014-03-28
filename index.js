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
  // Everytime this.super calls this class's super method
  // But currentClass is different
  // e.g.
  // var A = Class({foo: function() { return 1; }});
  // var B = Class({foo: function() { this.super('foo') }});
  // var C = Class({foo: function() { this.super('bar') }});
  // var c = new C();
  // c.foo();
  // -> C#foo
  //      this[c].super('bar');
  //      -> This function: currentClass = C change=> B
  //      -> B.prototype.foo.apply(this, args);
  //        -> B#foo
  //          this[c].super('bar')
  //          -> This function: currentClass = B change=> A
  //          -> A.prototype.foo.apply(this, args);
  //
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
