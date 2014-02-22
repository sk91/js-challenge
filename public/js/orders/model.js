(function(app,http,utils, EventEmmiter, window, undefined){
  var orders = app.modules.orders = app.modules.orders || {};

  var Model = orders.model = function(){
    this.orders = [];
    this.max = {
      counters:{},
      count:-1,
      name:false
    };
    utils.extend(this,new EventEmmiter());
  }

  Model.prototype.default =  function(){
    return {
      name: 'unknown',
      geo_lat: 'unknown',
      geo_long: 'unknown',
      price: 'unknown',
      address:''
    }
  };

  Model.prototype.get = function(){
    http.ajax({
      method:'GET',
      url: app.config.API_ENDPOINT + '/orders',
      success: getSuccess,
      error: getFail
    },this);

    return this;

    function getSuccess(response){
      var orders;
      try{
        orders = JSON.parse(response);
      }catch(e){
        return this.error('invalid_response', e);
      }  
      this.addNewOrders(orders);
    }

    function getFail(response,status){
      this.error('response error', status);
    }
  };

  Model.prototype.error = function(){
   console.error(arguments);
  };

  Model.prototype.getOrders = function(){
    return this.orders;
  }

  Model.prototype.addNewOrders = function(orders){
    var currentOrdersCount = this.orders.length
      , newOrders = []
      , order;
    for(var i = currentOrdersCount; i<orders.length ; i++){
      order = utils.extend({}, this.default(), orders[i]);
      this.addOrder(order);
      newOrders.push(order);
      this.loadAddress(order);
    }
    this.trigger('new-orders',newOrders);
  }


  Model.prototype.addOrder = function(order){
    var count;
    this.orders.push(order);
    if(!(order.name in this.max.counters)){
      this.max.counters[order.name] = 0;
    }
    count = ++this.max.counters[order.name];
    if(count > this.max.count){
      this.max.count = count;
      this.max.name = order.name;
    }
  }

  Model.prototype.loadAddress = function(order){
    http.ajax({
      method:'GET',
      url: app.config.GEOCODING_ENDPOINT + order.geo_lat+',' + order.geo_long,
      success: addressSuccess
    },this);
    this.trigger('model-changed',order);

    function addressSuccess(response){
      adderssObj = JSON.parse(response);
      order.address = adderssObj.results[0].formatted_address;
      this.trigger('order-changed',order);
    }
  };



  Model.prototype.getMostOrdered = function(){
    if(this.max.name === false){
      return null;
    }

    return {count: this.max.count, name: this.max.name};
  };

})(app, app.http, app.utils, app.EventEmmiter,window);