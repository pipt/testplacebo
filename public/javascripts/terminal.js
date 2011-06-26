if( typeof(window.Terminal) === "undefined" ){
  (function(){
    window.Terminal = {
      output: function(text) {
        $('.writable').append(text);
        $('.content').scrollTo('max');
      },

      del: function(id) {
        $('#' + id).remove();
      },

      cursorOn: function() {
        $('.cursor').removeClass('cursor-off');
        setTimeout(Terminal.cursorOff, 600);
      },

      cursorOff: function() {
        $('.cursor').addClass('cursor-off');
        setTimeout(Terminal.cursorOn, 600);
      }
    }
  })();
}
