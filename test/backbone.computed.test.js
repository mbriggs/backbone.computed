describe("Backbone fancy model", function(){
  "use strict";

  var model;
  var Model = Backbone.Model.extend({
    compute: {
      'foo <- bar bin': function(bar, bin){
        return bar + bin;
      },

      'named <- dep': 'bound'
    },

    initialize: function(){
      this.computed();
    },

    bound: function(){}
  });


  beforeEach(function(){
    model = new Model({ bar: 1, bin: 2 });
  });

  it("has an initial computed value", function(){
    expect(model.get('foo')).to.eq(3);
  });

  it("changes when dependency changes", function(){
    model.set('bar', 10);
    expect(model.get('foo')).to.eq(12);
  });

  it("changes when other dependency changes", function(){
    model.set({bin: 10});
    expect(model.get('foo')).to.eq(11);
  });

  it("binds to local methods", sinon.test(function(){
    sinon.spy(model, 'bound');

    model.set('dep', 20);

    expect(model.bound).to.have.been.calledOn(model);
    expect(model.bound).to.have.been.calledWith(20);
  }));
});
