describe("Backbone fancy model", function(){
  "use strict";

  var model;
  var Model = Backbone.Model.extend({
    compute: {
      'foo <- bar bin': function(bar, bin){
        return bar + bin;
      }
    },

    initialize: function(){
      this.computed();
    }
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
});
