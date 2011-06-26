window.Programs['echo'] = {
  init: function() {
  },

  run: function(args) {
    OS.programOutput(args.slice(1).join('&nbsp;'));
    OS.programFinished();
  },

  halt: function() {
  }
};
