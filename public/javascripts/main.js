$(document).ready(function() {
  $(document).keypress(function(data) {
    KeyHandlers.handleNormalKey(data);
  });

  $(document).keydown(function(data) {
    return KeyHandlers.handleSpecialKey(data);
  });

  Terminal.cursorOn();
});
