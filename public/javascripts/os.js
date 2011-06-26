if (typeof(window.OS) === "undefined") {
  (function() {
    window.OS = {
      currentProgram: null,
      command: '',
      userText: [],
      nextUserTextId: 1,
      commandQueue: [],

      span: function(text, id) {
        return '<span id="user-text-' + id + '">' + text + '</span>';
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

      enter: function() {
        if (OS.currentProgram == null) { OS.runProgram(); }
        else { Terminal.output('<br/>'); }
        OS.clearBackspaceBuffer();
      },

      runProgram: function() {
        if (OS.command != '') {
          var commands = OS.command.split('&&');
          if (commands.length > 1) {
            OS.commandQueue = commands.slice(1);
            var command = OS.trimCommand(commands[0]);
          } else {
            var command = OS.trimCommand(OS.command);
          }
          Programs['history'].addCommand(command);
          var parts = command.split(' ');
          var program = Programs[command] || Programs[parts[0]];
          if (program === undefined) {
            Terminal.output('<br/>' + parts[0] + ': command not found');
            OS.programFinished();
          } else {
            Terminal.output('<br/>');
            OS.currentProgram = program;
            program.run(parts);
          }
        } else {
          Programs['history'].resetCommandPointer();
          OS.displayPrompt();
        }
      },

      programFinished: function(newLine) {
        if (OS.commandQueue.length > 0) {
          OS.command = OS.commandQueue.shift();
          OS.runProgram();
        } else {
          OS.currentProgram = null;
          OS.displayPrompt(newLine);
        }
      },

      displayPrompt: function(newLine) {
        if (newLine === undefined || newLine) { Terminal.output('<br/>'); }
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
          for (var i = 0; i < newCommand.length; i++) { OS.userOutput(newCommand.charAt(i)); }
        }
      },

      trimCommand: function(command) {
        return command.replace(/^\s*/, '').replace(/\s*$/, '');
      }
    }
  })();
}
