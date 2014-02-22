(function(app,utils, window, undefined){

  var orders = app.modules.orders = app.modules.orders || {};

  var View = orders.mapView = function(config){
    var that = this;
    this.options =  utils.extend({},config);

    this.map = null;
    this.markers = [];
    this.loaded = false;
    this.renderOnLoad = false;
    this.markersToAdd = [];
    app.modules.orders.google_maps_loaded = function(){
      that.loadedCb.call(that, arguments);
    }
  };

  View.prototype.loadedCb = function(){
    this.loaded = true;
    this.options = utils.extend({},{
      zoom: 5,
      center: new google.maps.LatLng(52.5167,13.3833)
    },this.options);

    if(this.renderOnLoad){
      this.render();
    }
    
  };

  View.prototype.load =  function() {
    var script = window.document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
        'callback=app.modules.orders.google_maps_loaded';
    window.document.body.appendChild(script);
  };

  View.prototype.render = function(container){
    if(!this.loaded){
      this.renderOnLoad = true;
      return this;
    }
    if(!this.el){
      this.el = window.document.createElement('div');
    }
    this.map = new google.maps.Map(
      this.el,
      this.options
    );

    for(var i = 0; i<this.markersToAdd.length; i++){
      this.add(this.markersToAdd[i]);
    }
    this.markersToAdd = [];

    return this;
  };

  View.prototype.setElement= function(el){
    this.el = el;
  }

  View.prototype.add= function(order){
    var coordinates,marker,infowindow;
    if(!this.loaded){
      return this.markersToAdd.push(order);
    }
    coordinates = new google.maps.LatLng(order.geo_lat,order.geo_long);

    marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      title: order.name,
      scaleControl: true
    });

    infowindow = new google.maps.InfoWindow({
      content: utils.replacePlaceholders(
        window.document.getElementById('orders/map_tooltip.tpl').innerHTML,
        order)
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.map,marker);
    });
  }

})(app,app.utils, window)


