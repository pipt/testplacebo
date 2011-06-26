window.Programs['rake'] = {
  init: function() {

  },

  run: function(args) {
    OS.output('Running rake...<br/>');
    OS.output(args[1]);
    OS.programFinished();
  }
};
