if( typeof(window.OS) === "undefined" ){
  (function(){
    window.OS = {
      currentProgram: null,
      command: '',
      userText: [],
      nextUserTextId: 1,

      span: function(text, id) {
        return '<span id="user-text-' + id + '">' + text + '</span>';
      },

      normalKeyPress: function(key) {
        if (key.ctrlKey) {
          if (String.fromCharCode(key.charCode) == 'c' || String.fromCharCode(key.charCode) == 'C') {
            OS.clearBackspaceBuffer();
            Terminal.output('^C');
            if (OS.currentProgram != null && OS.currentProgram.halt != undefined) {
              OS.currentProgram.halt();
            } else {
              OS.displayPrompt();
            }
          }
        } else {
          OS.userOutput(String.fromCharCode(key.charCode));
        }
      },

      programOutput: function(text) {
        OS.clearBackspaceBuffer();
        Terminal.output(text);
      },

      userOutput: function(text) {
        OS.userText.push('user-text-' + OS.nextUserTextId);
        if (OS.currentProgram == null) { OS.command += text; }
        Terminal.output(OS.span(text, OS.nextUserTextId++));
      },

      specialKeyPress: function(key) {
        if (key == ':space') {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (OS.currentProgram == null) { OS.command += ' '; }
          Terminal.output(OS.span('&nbsp;', OS.nextUserTextId++));
          return false;
        } else if (key == ':enter') {
          OS.enter();
          return false;
        } else if (key == ':backspace') {
          id = OS.userText.pop();
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
          if (OS.currentProgram == null) { console.log('tab'); }
          return false;
        }
        return true;
      },

      enter: function() {
        if (OS.currentProgram == null) { OS.runProgram(); }
        else { Terminal.output('<br/>'); }
        OS.clearBackspaceBuffer();
      },

      runProgram: function() {
        if (OS.command != '') {
          Programs['history'].addCommand(OS.command);
          var parts = OS.command.split(' ');
          var program = Programs[OS.command] || Programs[parts[0]];
          if (program === undefined) {
            Terminal.output('<br/>' + parts[0] + ': command not found');
          } else {
            Terminal.output('<br/>');
            OS.currentProgram = program;
            program.run(parts);
            return;
          }
        }
        OS.clearBackspaceBuffer();
        OS.displayPrompt();
      },

      programFinished: function() {
        OS.currentProgram = null;
        OS.displayPrompt();
      },

      displayPrompt: function() {
        Terminal.output('<br/>');
        Terminal.output('<span class="prompt">$</span> ');
      },

      clearBackspaceBuffer: function() {
        OS.userText = [];
        OS.command = '';
      },

      replaceCurrentCommand: function(newCommand) {
        OS.command = '';
        while (OS.userText.length > 0) { Terminal.del(OS.userText.pop()); }
        if (newCommand !== undefined) {
          for (i = 0; i < newCommand.length; i++) { OS.userOutput(newCommand.charAt(i)); }
        }
      }
    }
  })();
}
