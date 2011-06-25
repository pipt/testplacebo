if( typeof(window.OS) === "undefined" ){
  (function(){
    window.OS = {
      keypress: function(key) {
        isSpecialKey = OS.handleSpecialKey(key);
        if (isSpecialKey) { return false };
        console.log(key);
      },

      handleSpecialKey: function(key) {
        if (key == ':space') { return true; }
        else if (key == ':enter') { return true; }
        else if (key == ':control-c') { return true; }
        else if (key == ':backspace') { return true; }
        return false;
      }
    }
  })();
}
