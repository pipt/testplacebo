$(document).ready(function() {
  $(document).keypress(function(data) {
    if (data.charCode == 3) {
      OS.normalKeyPress(99);
    }
    if (33 <= data.charCode && data.charCode <= 126) {
      OS.normalKeyPress(data.charCode);
    }
  });

  $(document).keydown(function(data) {
    if (data.keyCode == 67) { OS.controlPressed = true; }
    else if (data.keyCode == 8) { return OS.specialKeyPress(':backspace') }
    else if (data.keyCode == 13) { return OS.specialKeyPress(':enter') }
    else if (data.keyCode == 32) { return OS.specialKeyPress(':space') }
  });

  $(document).keyup(function(data) {
    if (data.keyCode == 17) { OS.controlPressed = false; console.log('control up'); }
  });

  Terminal.init();
});
