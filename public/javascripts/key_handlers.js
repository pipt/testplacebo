if (typeof(window.KeyHandlers) === "undefined") {
  (function() {
    window.KeyHandlers = {
      tabAlreadyPressed: false,
      specialKeys: {},

      handleKey: function(key) {
        if (KeyHandlers.specialKeys[key] !== undefined) { return KeyHandlers.specialKeys[key](); }
        return true;
      }
    };

  })();
}

window.KeyHandlers.specialKeys[8] = function() { // backspace
  var id = OS.userText.pop();
  Terminal.del(id);
  OS.command = OS.command.substring(0, OS.command.length - 1);
  return false;
};

window.KeyHandlers.specialKeys[9] = function() { // tab
  if (OS.currentProgram == null) {
    var possible = Programs.possiblePrograms();
    if (possible.length == 1) {
      OS.replaceCurrentCommand(possible[0]);
    } else if (possible.length > 1) {
      if (KeyHandlers.tabAlreadyPressed) {
        KeyHandlers.tabAlreadyPressed = false;
        OS.userText = [];
        Terminal.output('<br/>');
        Terminal.output(possible.join(' '));
        OS.displayPrompt();
        OS.replaceCurrentCommand(OS.command);
      } else {
        KeyHandlers.tabAlreadyPressed = true;
      }
    }
  }
  return false;
};

window.KeyHandlers.specialKeys[13] = function() { // enter
  OS.enter();
  return false;
};

window.KeyHandlers.specialKeys[32] = function() { // space
  OS.userText.push('user-text-' + OS.nextUserTextId);
  if (OS.currentProgram == null) { OS.command += ' '; }
  Terminal.output(OS.span('&nbsp;', OS.nextUserTextId++));
  return false;
};

window.KeyHandlers.specialKeys[38] = function() { // up
  if (OS.currentProgram == null) { OS.replaceCurrentCommand(Programs['history'].previousCommand()); }
  return false;
};

window.KeyHandlers.specialKeys[40] = function() { // down
  if (OS.currentProgram == null) { OS.replaceCurrentCommand(Programs['history'].nextCommand()); }
  return false;
}
