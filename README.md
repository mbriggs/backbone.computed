# Backbone.Computed

Computed properties are properties which have dependancies on other properties in your model. Any time those other properties change, the computed property is re-computed.

The syntax for this is

```
var MyModel = Backbone.Model.extend({
  compute: {
    'myComputedProperty <- dependancy1 dependancy2': function(dep1, dep2){
      return dep1 * dep2;
    }
  }
}

var foo = new MyModel({ dependancy1: 10, dependancy2: 5 });
foo.get('myComputedProperty'); //=> 50
foo.set('dependancy2', 2);
foo.get('myComputedProperty'); //=> 20
```

This project is extremely heavily influenced by https://github.com/derickbailey/backbone.compute. The main thing that is different is the dsl for property definition vs the configuration object. All in all, I think the simple approach is best for this problem.
