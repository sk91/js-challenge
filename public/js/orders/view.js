(function(app,utils, EventEmmiter, window, undefined){

  var orders = app.modules.orders = app.modules.orders || {};

  var View = orders.view = function(config){
    this._rendered = false;

    this.el = config.el || window.document.createElement('div');
    this.model = config.model;
    this.ordersTemplate = document.getElementById("orders/list.tpl").innerHTML;
    this.ordersListItemTemplate = document.getElementById("orders/list_item.tpl").innerHTML;
    this.map = new orders.mapView();
    this.map.load();
    utils.extend(this,new EventEmmiter());
  };

  View.prototype.getElement = function(){
    return this.el;
  };


  //Display view on screen
  View.prototype.render = function(){
    var orders = this.model.getOrders()
      , ordersHtml = ''
      , map;

    //view skelleton html
    ordersHtml = utils.replacePlaceholders(this.ordersTemplate, {orders: ordersHtml});
    this.el.innerHTML = ordersHtml;

    //add orders
    this.addOrders(orders);

    //add map
    map = window.document.querySelector('.map');
    if(map){
      this.map.setElement(map);
      this.map.render();
    }
    //henle model events
    if(!this._rendered){
      this.model.on('new-orders',this.addOrders,this);
      this.model.on('order-changed',this.updateOrder,this);
    }
    this._rendered = true;

    return this;
  };



  View.prototype.addOrders = function(orders){
    var addition = ''
      , element = window.document.querySelector('.orders-list', this.el);
      

    for(var i=0; i<orders.length;i++){
      addition = utils.replacePlaceholders(this.ordersListItemTemplate,orders[i]) + addition;
      this.map.add(orders[i]);
    }

    element.insertBefore(utils.create(addition),element.firstChild);
    this.updateMostCommon();
    this.trigger('new-orders');
    return this;
  };

  View.prototype.updateOrder= function(order){
    var orderEl = document.getElementById('order_'+order.id);
    if(orderEl){
      orderEl.outerHTML = utils.replacePlaceholders(this.ordersListItemTemplate, order);
    } 
  }

  View.prototype.updateMostCommon = function(){
    var order = this.model.getMostOrdered()
      , nameElement
      , countElement;

    if(!order){
      return;
    }

    nameElement = window.document.querySelector('.common-name', this.el);
    countElement = window.document.querySelector('.common-number', this.el);

    nameElement.innerHTML = order.name;
    countElement.innerHTML= order.count
  }








})(app, app.utils,app.EventEmmiter, window);