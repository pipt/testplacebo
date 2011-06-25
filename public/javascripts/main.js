$(document).ready(function() {
  $(document).keypress(function(data) {
    if (33 <= data.charCode && data.charCode <= 126) {
      OS.normalKeyPress(data.charCode);
    }
  });

  $(document).keydown(function(data) {
    if (data.keyCode == 3) { return OS.specialKeyPress(':control-c')}
    else if (data.keyCode == 8) { return OS.specialKeyPress(':backspace')}
    else if (data.keyCode == 13) { return OS.specialKeyPress(':enter')}
    else if (data.keyCode == 32) { return OS.specialKeyPress(':space')}
  });
});
