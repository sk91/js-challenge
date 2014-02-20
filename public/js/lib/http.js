(function(window,undefined){
  window.http = {
    ajax : function(config){
      alert('ajax request');

      if('success' in config){
        config.success();
      }  
    }
  }
})(window)