if( typeof(window.Terminal) === "undefined" ){
  (function(){
    window.Terminal = {
      output: function(text) {
        $('.writable').append(text);
        $('.content').scrollTo('max');
      },

      del: function(id) {
        $('#' + id).remove();
      }
    }
  })();
}
