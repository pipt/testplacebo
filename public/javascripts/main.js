$(document).ready(function() {
  $(document).keypress(function(data) {
    if (data.charCode == 3) { data.charCode = 67; }
    if (33 <= data.charCode && data.charCode <= 126) {
      OS.normalKeyPress(data);
    }
  });

  $(document).keydown(function(data) {
    return KeyHandlers.handleKey(data.keyCode);
  });

  Terminal.cursorOn();
});
