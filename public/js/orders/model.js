(function(app,http, window, undefined){
  var orders = app.modules.orders = app.modules.orders || {};

  var Model = orders.model = function(){
    this.items = [];
  }

  Model.prototype.get = function(){
    http.ajax({
      method:'GET',
      url: app.config.API_ENDPOINT + '/orders',
      type: "application/json",
      success: getSuccess,
      fail: getFail
    });

    function getSuccess(){
      alert("load success")
    }

    function getFail(){

    }
  }

})(app, http, window);