if (typeof(window.SpecialKeyHandlers) === "undefined") {
  (function() {
    window.SpecialKeyHandlers = {
      handleKey: function(key) {
        if (key == ':space') {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (OS.currentProgram == null) { OS.command += ' '; }
          Terminal.output(OS.span('&nbsp;', OS.nextUserTextId++));
          return false;
        } else if (key == ':enter') {
          OS.enter();
          return false;
        } else if (key == ':backspace') {
          var id = OS.userText.pop();
          Terminal.del(id);
          OS.command = OS.command.substring(0, OS.command.length - 1);
          return false;
        } else if (key == ':up') {
          if (OS.currentProgram == null) { OS.replaceCurrentCommand(Programs['history'].previousCommand()); }
          return false;
        } else if (key == ':down') {
          if (OS.currentProgram == null) { OS.replaceCurrentCommand(Programs['history'].nextCommand()); }
          return false;
        } else if (key == ':tab') {
          if (OS.currentProgram == null) {
            console.log('tab');
            console.log(Programs.allPrograms());
          }
          return false;
        }
        return true;
      }
    }
  })();
}
