(function(app,undefined){
  app.utils = {

    //this not a deep extend!!
    extend: function(target){
      var src, srcObj;

      if(arguments.length < 2){
        src = [target];
        target = {};
      }else{
         src = Array.prototype.slice.call(arguments,1)
      }

      for(var i = 0; i < src.length; i++){
        srcObj = src[i];
        for(var prop in srcObj){
          if(srcObj.hasOwnProperty(prop)){
            target[prop] = srcObj[prop];
          }
        }
      }
      return target;
    },

    replacePlaceholders: function(html,data){
      for(var prop in data){
        html = html.replace("{{" + prop + "}}", data[prop]);
      }
      return  html;
    },

    create: function(htmlStr){
      var tmp = window.document.createElement('div')
        , frag = window.document.createDocumentFragment();
        tmp.innerHTML = htmlStr;
        while(tmp.firstChild){
          frag.appendChild(tmp.firstChild)
        }

        return frag;
    }
  }
})(app)