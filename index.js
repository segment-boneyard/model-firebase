
var statics = require('./statics')
  , protos = require('./protos');


/**
 * Mixin our plugin.
 */

module.exports = function (url) {
  return function (Model) {
    Model.firebase = new window.Firebase(url);
    for (var key in statics) Model[key] = statics[key];
    for (var key in protos) Model.prototype[key] = protos[key];
    Model.on('construct', construct);
  };
};


/**
 * On construct, start listening for firebase changes.
 */

function construct (model, attrs) {

  attrs.toObject = toObject;

  model.firebase().on('value', function (snapshot) {
    var attrs = snapshot.val();
    if (attrs) {
      model.set(attrs);
      model.model.emit('update', model);
      model.emit('update');
    }
  });
}

/**
 * Make a firebase friendly object for storage
 */

function toObject () {

  var out = {};

  for(var name in this) {
    if(this.hasOwnProperty(name) && typeof this[name] !== 'function') {

      out[name] = typeof this[name].toObject === 'function' ?
                  this[name].toObject.apply(this[name], arguments) :
                  this[name];
    }
  }

  return out;
}