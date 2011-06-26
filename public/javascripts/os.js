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
            OS.clearCurrentInput();
            OS.output('^C');
            if (OS.currentProgram != null && OS.currentProgram.halt != undefined) {
              OS.currentProgram.halt();
            } else {
              OS.displayPrompt();
            }
          }
        } else {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (OS.currentProgram == null) { OS.command += String.fromCharCode(key.charCode); }
          OS.output(OS.span(String.fromCharCode(key.charCode), OS.nextUserTextId++));
        }
      },

      output: function(text) {
        Terminal.output(text);
      },

      programOutput: function(text) {
        OS.clearCurrentInput();
        Terminal.output(text);
      },

      specialKeyPress: function(key) {
        if (key == ':space') {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (OS.currentProgram == null) { OS.command += ' '; }
          OS.output(OS.span('&nbsp;', OS.nextUserTextId++));
          return false;
        } else if (key == ':enter') {
          OS.enter();
          return false;
        } else if (key == ':backspace') {
          id = OS.userText.pop();
          Terminal.del(id);
          OS.command = OS.command.substring(0, OS.command.length - 1);
          return false;
        }
        return true;
      },

      enter: function() {
        if (OS.currentProgram == null) { OS.runProgram(); }
        else { OS.output('<br/>'); }
        OS.clearCurrentInput();
      },

      runProgram: function() {
        if (OS.command != '') {
          var parts = OS.command.split(' ');
          var program = Programs[OS.command] || Programs[parts[0]];
          if (program === undefined) {
            OS.output('<br/>' + parts[0] + ': command not found');
          } else {
            OS.output('<br/>');
            OS.currentProgram = program;
            program.run(parts);
            return;
          }
        }
        OS.clearCurrentInput();
        OS.displayPrompt();
      },

      programFinished: function() {
        OS.currentProgram = null;
        OS.displayPrompt();
      },

      displayPrompt: function() {
        OS.output('<br/>');
        OS.output('<span class="prompt">$</span> ');
      },

      clearCurrentInput: function() {
        OS.userText = [];
        OS.command = '';
      }
    }
  })();
}
