$(document).ready(function() {
  $(document).keypress(function(data) {
    if (33 <= data.charCode && data.charCode <= 126) {
      OS.keypress(data.charCode);
    }
  });

  $(document).keydown(function(data) {
    if (data.keyCode == 3) { return OS.keypress(':control-c')}
    else if (data.keyCode == 8) { return OS.keypress(':backspace')}
    else if (data.keyCode == 13) { return OS.keypress(':enter')}
    else if (data.keyCode == 32) { return OS.keypress(':space')}
  });
});
