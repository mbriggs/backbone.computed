"use strict";
(function() {
  var Class = function(){ this.initialize.apply(this, arguments) };
  Class.prototype.initialize = function(){};
  Class.extend = Backbone.Model.extend;

  if(Backbone.Model.prototype.computed) throw new Error("computed already defined");

  Backbone.Model.prototype.computed = function(){
    var model = this;
    _.each(model.compute, function(compute, definition) {
      var property = new ComputedProperty(definition, compute);
      var perform = property.handlerFor(model);

      model.on(property.events, perform);
      perform(); // set initial value
    });
  };

  var ComputedProperty = Class.extend({
    initialize: function(definition, compute) {
      var tokens = definition.split(' <- ');
      this.name = tokens[0];
      this.dependancies = tokens[1].split(' ');
      this.events = _(this.dependancies).
        map(function(attr) {
          return 'change:' + attr
        }).
        join(' ');
      this.compute = compute;
    },

    handlerFor: function(model) {
      var property = this;

      return function() {
        var vals = multiGet(model, property.dependancies);
        var compute = _.isString(property.compute) ? model[property.compute] : property.compute;
        var computed = compute.apply(model, vals);

        model.set(property.name, computed);
      }
    }
  });

  function multiGet(model, fields) {
    var vals = [];

    for(var i = 0; i < fields.length; i++){
      vals.push(model.attributes[ fields[i] ]);
    }

    return vals;
  }
}());
