module.exports = ($) ->
# $ - promises implementation

  buildResolver = (deferred) ->
    (error, args...) ->
      if error then deferred.reject(error) else deferred.resolve(args...)

  Object.defineProperty Object::, 'defer', get: ->
    wrapped = {}
    for property in Object.getOwnPropertyNames(@)

      break if property is 'defer' or typeof @[property] isnt 'function'

      wrapped[property] = (args...) =>
        deferred = $.defer()
        @[property].call(@, args..., buildResolver(deferred))
        deferred.promise

    wrapped

  (func, args...) ->
    deferred = $.defer()
    func(args..., buildResolver(deferred))
    deferred.promise
