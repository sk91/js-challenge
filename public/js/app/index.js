(function(window,undefined){
  var app = window.app = {
    modules : {},

    config:{
      API_ENDPOINT: "http://localhost:3000",
      GEOCODING_ENDPOINT: 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&key=AIzaSyACX_h_5-5aP1CCGB8JnoLAXT1YJLzpReA&latlng='
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
      ordersView.on('new-items',function(){
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

