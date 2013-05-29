// Generated by CoffeeScript 1.6.2
(function() {
  var __slice = [].slice;

  module.exports = function($) {
    var buildResolver;

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
    Object.defineProperty(Object.prototype, 'defer', {
      get: function() {
        var property, wrapped, _i, _len, _ref,
          _this = this;

        wrapped = {};
        _ref = Object.getOwnPropertyNames(this);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          property = _ref[_i];
          if (property === 'defer' || typeof this[property] !== 'function') {
            break;
          }
          wrapped[property] = function() {
            var args, deferred, _ref1;

            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            deferred = $.defer();
            (_ref1 = _this[property]).call.apply(_ref1, [_this].concat(__slice.call(args), [buildResolver(deferred)]));
            return deferred.promise;
          };
        }
        return wrapped;
      }
    });
    return function() {
      var args, deferred, func;

      func = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      deferred = $.defer();
      func.apply(null, __slice.call(args).concat([buildResolver(deferred)]));
      return deferred.promise;
    };
  };

}).call(this);