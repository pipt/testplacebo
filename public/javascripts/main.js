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
    if (data.keyCode == 8) { return OS.specialKeyPress(':backspace') }
    else if (data.keyCode == 9) { return OS.specialKeyPress(':tab') }
    else if (data.keyCode == 13) { return OS.specialKeyPress(':enter') }
    else if (data.keyCode == 32) { return OS.specialKeyPress(':space') }
    else if (data.keyCode == 38) { return OS.specialKeyPress(':up') }
    else if (data.keyCode == 40) { return OS.specialKeyPress(':down') }
  });

  Terminal.cursorOn();
});
