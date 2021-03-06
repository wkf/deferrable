// Generated by CoffeeScript 1.6.2
(function() {
  var __slice = [].slice;

  module.exports = function($) {
    var buildResolver, defer;

    buildResolver = function(deferred) {
      return function() {
        var args, error;

        error = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (error) {
          return deferred.reject(error);
        } else {
          return deferred.resolve.apply(deferred, args);
        }
      };
    };
    defer = function() {
      var args, deferred, func, _ref;

      func = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      deferred = $.defer();
      (_ref = this[func] || func).call.apply(_ref, [this].concat(__slice.call(args), [buildResolver(deferred)]));
      return deferred.promise;
    };
    Object.defineProperty(Object.prototype, 'defer', {
      value: defer,
      writable: true
    });
    return defer;
  };

}).call(this);
