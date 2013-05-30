module.exports = ($) ->
# $ - promises implementation

  buildResolver = (deferred) ->
    (error, args...) ->
      if error then deferred.reject(error) else deferred.resolve(args...)

  defer = (func, args...) ->
    deferred = $.defer()
    (@[func] or func).call(@, args..., buildResolver(deferred))
    deferred.promise

  Object.defineProperty Object::, 'defer', {
    value: defer
    writable: true
  }

  defer
