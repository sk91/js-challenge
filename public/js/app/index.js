(function(window,undefined){
  var app = window.app = {
    modules : {},

    config:{
      API_ENDPOINT: "http://localhost:3000"
    },

    init: function(){
     var ordersModel = new this.modules.orders.model()
      , ordersContainer = document.getElementById('view')
      , ordersView = new this.modules.orders.view({
          el: ordersContainer,
          model: ordersModel
        }).render()
      , interval;
      ordersModel.get();
      ordersView.onNewItemsAdded(function(){
        setTimeout(function(){
          ordersModel.get();
        },1000);
      });
    }
   
  };


  //only for modern browsers
  window.document.addEventListener('DOMContentLoaded', function () {
    app.init();
  });

})(window)