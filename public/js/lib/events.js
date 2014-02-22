/** Allows to bind and trigger events */

(function(app, utils, undefined){
  app.EventEmmiter = function(){
    return {
      listeners:{},

      on: function(action,callback,target){
        target = target || this;
        if(!(action in this.listeners)){
          this.listeners[action] = [];
        }

        this.listeners[action].push(function(){
          callback.apply(target,arguments);
        })
      },

      trigger: function(action){
        var listeners,args;
        if(!(action in this.listeners)){
          return false;
        }

        args = Array.prototype.slice.call(arguments,1);
        listeners = this.listeners[action];
        for(var i=0; i< listeners.length; i++){
          listeners[i].apply(this,args);
        }
      }
    };
  }
})(app,app.utils)