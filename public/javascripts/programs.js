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

window.Programs['echo'] = {
  run: function(args) {
    OS.programOutput(args.slice(1).join('&nbsp;'));
    OS.programFinished();
  }
};

window.Programs['make'] = {
  run: function(args) {
    if (args.slice(1).join(' ') == 'me a sandwich') {
      OS.programOutput('What? Make it yourself.');
    }
    OS.programFinished();
  }
}

window.Programs['sudo'] = {
  run: function(args) {
    if (args.slice(1).join(' ') == 'make me a sandwich') {
      OS.programOutput('Okay.');
    }
    OS.programFinished();
  }
}
