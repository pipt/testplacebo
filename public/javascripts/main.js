$(document).ready(function() {
  $(document).keypress(function(data) {
    if (data.charCode == 3) {
      data.charCode = 67;
      OS.normalKeyPress(data);
      return;
    }
    if (33 <= data.charCode && data.charCode <= 126) {
      OS.normalKeyPress(data);
    }
  });

  $(document).keydown(function(data) {
    if (data.keyCode == 8) { return SpecialKeyHandlers.handleKey(':backspace') }
    else if (data.keyCode == 9) { return SpecialKeyHandlers.handleKey(':tab') }
    else if (data.keyCode == 13) { return SpecialKeyHandlers.handleKey(':enter') }
    else if (data.keyCode == 32) { return SpecialKeyHandlers.handleKey(':space') }
    else if (data.keyCode == 38) { return SpecialKeyHandlers.handleKey(':up') }
    else if (data.keyCode == 40) { return SpecialKeyHandlers.handleKey(':down') }
  });

  Terminal.cursorOn();
});
