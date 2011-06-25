if( typeof(window.Terminal) === "undefined" ){
  (function(){
    window.Terminal = {
      output: function(text) {
        $('.writable').append(text);
      },

      del: function(id) {
        $(id).remove();
      }
    }
  })();
}
