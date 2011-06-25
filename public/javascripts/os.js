if( typeof(window.OS) === "undefined" ){
  (function(){
    window.OS = {
      normalKeyPress: function(key) {
        console.log(key);
        OS.output(String.fromCharCode(key))
      },

      output: function(text) {
        window.Terminal.output(text);
      },

      specialKeyPress: function(key) {
        if (key == ':space') {
          OS.output('&nbsp;');
          return false;
        } else if (key == ':enter') { return false; }
        else if (key == ':control-c') { return false; }
        else if (key == ':backspace') { return false; }
        return true;
      }
    }
  })();
}
