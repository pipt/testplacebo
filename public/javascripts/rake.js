window.Programs['rake'] = {
  init: function() {
  },

  run: function(args) {
    OS.programOutput('Running rake...<br/>');
    OS.programOutput(args[1]);
    OS.programFinished();
  },

  halt: function() {
  }
};
