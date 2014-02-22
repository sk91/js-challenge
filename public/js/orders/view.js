(function(app,utils, window, undefined){

  var orders = app.modules.orders = app.modules.orders || {};

  var View = orders.view = function(config){
    this.el = config.el || window.document.createElement('div');
    this.model = config.model;
    this.ordersTemplate = document.getElementById("orders/list.tpl").innerHTML;
    this.ordersListItemTemplate = document.getElementById("orders/list_item.tpl").innerHTML;
    this.rendered = false;
    this.listeners = [];
  };

  View.prototype.getElement = function(){
    return this.el;
  };

  View.prototype.render = function(){
    var orders = this.model.getItems()
      , ordersHtml = '';


    ordersHtml = utils.replacePlaceholders(this.ordersTemplate, {orders: ordersHtml});

    this.el.innerHTML = ordersHtml;

    this.itemsAddedCallback(orders);

    if(!this.rendered){
      this.model.onNewItemsAdded(this.itemsAddedCallback,this);
    }
    this.rendered = true;

    return this;
  };



  View.prototype.itemsAddedCallback = function(items){
    console.log('new items', items)
    var addition = ''
      , element = window.document.querySelector('.orders-list', this.el);
      

    for(var i=0; i<items.length;i++){
      addition = utils.replacePlaceholders(this.ordersListItemTemplate,items[i]) + addition;
    }

    element.insertBefore(utils.create(addition),element.firstChild);
    this.updateMostCommon();
    this.triggerNewItemsAdded();
    return this;
  };

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

  View.prototype.onNewItemsAdded = function(cb,target){
    this.listeners.push({cb:cb, target:target || null});
  };

  View.prototype.triggerNewItemsAdded = function(items){
    for(var i = 0; i< this.listeners.length; i++){
      this.listeners[i].cb.call(this.listeners[i].target,items);
    }
  };






})(app, utils, window);