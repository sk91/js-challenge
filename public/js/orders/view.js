(function(app,utils, EventEmmiter, window, undefined){

  var orders = app.modules.orders = app.modules.orders || {};

  var View = orders.view = function(config){
    this.el = config.el || window.document.createElement('div');
    this.model = config.model;
    this.ordersTemplate = document.getElementById("orders/list.tpl").innerHTML;
    this.ordersListItemTemplate = document.getElementById("orders/list_item.tpl").innerHTML;
    this.rendered = false;
    utils.extend(this,new EventEmmiter());
    this.map = new orders.mapView();
    this.map.load();
  };

  View.prototype.getElement = function(){
    return this.el;
  };

  View.prototype.render = function(){
    var orders = this.model.getItems()
      , ordersHtml = ''
      , map;


    ordersHtml = utils.replacePlaceholders(this.ordersTemplate, {orders: ordersHtml});

    this.el.innerHTML = ordersHtml;

    this.itemsAddedCallback(orders);
    map = window.document.querySelector('.map');
    if(map){
      this.map.setElement(map);
      this.map.render();
    }

    if(!this.rendered){
      this.model.on('new-items',this.itemsAddedCallback,this);
      this.model.on('item-changed',this.itemChangedCallback,this);
    }
    this.rendered = true;

    return this;
  };



  View.prototype.itemsAddedCallback = function(items){
    var addition = ''
      , element = window.document.querySelector('.orders-list', this.el);
      

    for(var i=0; i<items.length;i++){
      addition = utils.replacePlaceholders(this.ordersListItemTemplate,items[i]) + addition;
      this.map.add(items[i]);
    }

    element.insertBefore(utils.create(addition),element.firstChild);
    this.updateMostCommon();
    this.trigger('new-items');
    return this;
  };

  View.prototype.itemChangedCallback= function(item){
    var order = document.getElementById('order_'+item.id);
    if(order){
      order.outerHTML = utils.replacePlaceholders(this.ordersListItemTemplate, item);
    } 
  }

  View.prototype.updateMostCommon = function(){
    var item = this.model.getMostOrdered()
      , nameElement
      , countElement;

    if(!item){
      return;
    }

    nameElement = window.document.querySelector('.common-name', this.el);
    countElement = window.document.querySelector('.common-number', this.el);

    nameElement.innerHTML = item.name;
    countElement.innerHTML= item.count
  }








})(app, app.utils,app.EventEmmiter, window);