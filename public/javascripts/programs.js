if( typeof(window.Programs) === "undefined" ){
  (function(){
    window.Programs = {};
  })();
}

window.Programs['echo'] = {
  run: function(args) {
    OS.programOutput(args.slice(1).join('&nbsp;'));
    OS.programFinished();
  }
};

window.Programs['make me a sandwich'] = {
  run: function(args) {
    OS.programOutput('What? Make it yourself.');
    OS.programFinished();
  }
};

window.Programs['sudo make me a sandwich'] = {
  run: function(args) {
    OS.programOutput('Okay.');
    OS.programFinished();
  }
};

window.Programs['uname'] = {
  run: function(args) {
    OS.programOutput('UnicornOS 4.04');
    OS.programFinished();
  }
};

window.Programs['history'] = {
  previousCommands: [],

  run: function(args) {
    OS.programOutput(this.previousCommands.join('<br/>'));
    OS.programFinished();
  }
}
