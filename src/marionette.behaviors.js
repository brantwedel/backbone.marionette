// ----------------------------------------------------
// todo:
//   [ ] view should be able to add and remove a behavior
//   [ ] view.removeBehavior "tooltips"
//   [ ] view.addBehavior {tooltip: {}}
// ----------------------------------------------------

Marionette.Behaviors = (function(Marionette, _){
  function Behaviors(view){
    // lookup view behaviors from behaviors array
    this.behaviors = Behaviors.parseBehaviors(view, view.behaviors);

    // save the original view trigger method
    var triggerMethod = view.triggerMethod;

    var _this = this;
    view.triggerMethod = function(){
      var args = arguments;
      // call the views trigger method
      triggerMethod.apply(view, args);

      // loop through each behavior and trigger methods
      _.each(_this.behaviors, function(b){
        // call triggerMethod on each behavior
        // to proxy through any triggerMethod
        triggerMethod.apply(b, args);
      });
    };
  }

  _.extend(Behaviors, {
    // placeholder method to be extended by the user
    // should define the object that stores the behaviors
    // i.e.
    //
    // Marionette.Behaviors.behaviorsLookup: function() {
    //   return App.Behaviors
    // }
    behaviorsLookup: function(){
      throw new Error("You must define where your behaviors are stored. See http://www.marionette.com/using-behaviors");
    },

    parseBehaviors: function(view, behaviors){
      return _.map(behaviors, function(v){
        var key     = _.keys(v)[0];
        var options = _.values(v)[0];
        return new (_.result(Behaviors, "behaviorsLookup")[key])(options, view);
      });
    }
  });

  return Behaviors;

})(Marionette, _);