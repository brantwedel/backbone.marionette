describe("Behaviors", function(){
  describe("behavior lookup", function() {
    it("should throw if behavior lookup is not defined", function() {
      expect(Marionette.Behaviors.behaviorsLookup).toThrow();
    });
  });

  describe("behavior parsing", function() {
    var V, Obj;

    beforeEach(function() {
      Obj = {
        ToolTip: sinon.spy()
      };

      V = Marionette.ItemView.extend({
        behaviors: [
          {
            ToolTip: {
              position: "top"
            }

          }
        ]
      });

      Marionette.Behaviors.behaviorsLookup = Obj;
    });

    it("should instantiate the tooltip behavior", function() {
      new V;
      expect(Obj.ToolTip).toHaveBeenCalled();
    });
  });

  describe("behavior initialize", function() {
    var Behavior = Marionette.Behavior.extend({
      initialize: sinon.spy()
    });

    it("should call initialize when a behavior is created", function() {
      var b = new Behavior;

      expect(b.initialize).toHaveBeenCalled();
    });
  });

  describe("behavior trigger calls", function() {
    var spy, V, hold;
    beforeEach(function() {
      spy = sinon.spy();
      hold = {}
      hold.testB = Marionette.Behavior.extend({
        onRender: function(){
          spy();
        }
      });

      V = Marionette.View.extend({
        behaviors: [
          {
            testB: {}
          }
        ]
      });

      Marionette.Behaviors.behaviorsLookup = hold;
    })

    it ("should call onRender when a view is rendered", function() {
      var v = new V;
      v.triggerMethod("render");
      expect(spy).toHaveBeenCalled();
    });
  });
});