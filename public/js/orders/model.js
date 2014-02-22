(function(app,http, window, undefined){
  var orders = app.modules.orders = app.modules.orders || {};

  var Model = orders.model = function(){
    this.items = [];
    this.max = {
      counters:{},
      count:-1,
      name:false
    };
    this.listeners = [];
  }

  Model.prototype.default =  function(){
    return {
      name: 'unknown',
      geo_lat: 'unknown',
      geo_long: 'unknown',
      price: 'unknown'
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
      this.addNewItems(orders);
    }

    function getFail(response,status){
      this.error('response error', status);
    }
  };

  Model.prototype.error = function(){
   console.error(arguments);
  };

  Model.prototype.getItems = function(){
    return this.items;
  }

  Model.prototype.addNewItems = function(items){
    var currentItemsCount = this.items.length
      , newItems = []
      , item;
    for(var i = currentItemsCount; i<items.length ; i++){
      item = utils.extend({}, this.default(), items[i]);
      this.addItem(item);
      newItems.push(item);
    }
    this.triggerNewItemsAdded(newItems);
  }


  Model.prototype.addItem = function(item){
    var count;
    this.items.push(item);
    if(!(item.name in this.max.counters)){
      this.max.counters[item.name] = 0;
    }
    count = ++this.max.counters[item.name];
    if(count > this.max.count){
      this.max.count = count;
      this.max.name = item.name;
    }
  }


  Model.prototype.onNewItemsAdded = function(cb,target){
    this.listeners.push({cb:cb, target:target || null});
  }

  Model.prototype.triggerNewItemsAdded = function(items){
    for(var i = 0; i< this.listeners.length; i++){
      this.listeners[i].cb.call(this.listeners[i].target,items);
    }
  }

  Model.prototype.getMostOrdered = function(){
    if(this.max.name === false){
      return null;
    }

    return {count: this.max.count, name: this.max.name};
  };

})(app, http, window);