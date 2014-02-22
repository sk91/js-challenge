(function(app, utils, undefined){
  app.http = {
    ajax : function(config, target){
      var xhr = new XMLHttpRequest();

      target = target || this;

      config = utils.extend({
        method: 'GET',
        url: window.location,
        success: function(){},
        error: function(){},
        done: function(){}
      } , config);

      xhr.open(config.method, config.url);
      xhr.onreadystatechange=function(){
        if(xhr.readyState === 4 ){
          if(xhr.status === 200){
            config.success.call(target, xhr.responseText, xhr);
          }else{
            config.error.call(target,xhr.responseText, xhr.status, xhr);
          }
          config.done.call(target,xhr.responseText, xhr.status, xhr);
        }
      }
      xhr.send(config.data);

    }
  }
})(app,app.utils)