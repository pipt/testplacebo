if( typeof(window.OS) === "undefined" ){
  (function(){
    window.OS = {
      programRunning: false,
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
            OS.userText = [];
            OS.command = '';
            OS.output('^C');
            if (OS.programRunning && OS.currentProgram.halt != undefined) {
              OS.currentProgram.halt();
            } else {
              OS.output('<br/>');
              OS.output('<span class="prompt">$</span> ');
            }
          }
        } else {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (!OS.programRunning) { OS.command += String.fromCharCode(key.charCode); }
          OS.output(OS.span(String.fromCharCode(key.charCode), OS.nextUserTextId++));
        }
      },

      output: function(text) {
        window.Terminal.output(text);
      },

      programOutput: function(text) {
        OS.userText = [];
        OS.command = '';
        window.Terminal.output(text);
      },

      specialKeyPress: function(key) {
        if (key == ':space') {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (!OS.programRunning) { OS.command += ' '; }
          OS.output(OS.span('&nbsp;', OS.nextUserTextId++));
          return false;
        } else if (key == ':enter') {
          OS.enter();
          return false;
        } else if (key == ':backspace') {
          id = OS.userText.pop();
          window.Terminal.del(id);
          OS.command = OS.command.substring(0, OS.command.length - 1);
          return false;
        }
        return true;
      },

      enter: function() {
        OS.userText = [];
        OS.output('<br/>');
        if (!OS.programRunning) {
          OS.runProgram();
        }
        OS.command = '';
      },

      runProgram: function() {
        if (OS.command != '') {
          var parts = OS.command.split(' ');
          var program = window.Programs[parts[0]];
          if (program === undefined) {
            OS.output('Unknown command<br/>');
            OS.output('<span class="prompt">$</span> ');
          } else {
            OS.programRunning = true;
            OS.currentProgram = program;
            if (program.init !== undefined) { program.init(); }
            program.run(parts);
          }
        } else {
          OS.userText = [];
          OS.command = '';
          OS.output('<span class="prompt">$</span> ');
        }
      },

      programFinished: function() {
        OS.currentProgram = null;
        OS.programRunning = false;
        OS.output('<br/>');
        OS.output('<span class="prompt">$</span> ');
      }
    }
  })();
}

if( typeof(window.Programs) === "undefined" ){
  (function(){
    window.Programs = {};
  })();
}
