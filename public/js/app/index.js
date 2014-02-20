(function(window,undefined){
  var app = window.app = {
    modules : {},

    config:{
      API_ENDPOINT: "http://localhost:3000"
    },

    init: function(){
     new this.modules.orders.model().get();
    }
   
  };


  //only for modern browsers
  window.document.addEventListener('DOMContentLoaded', function () {
      app.init();
  });

})(window)