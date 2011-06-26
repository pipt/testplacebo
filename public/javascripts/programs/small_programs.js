window.Programs['echo'] = {
  run: function(args) {
    OS.programOutput(args.slice(1).join('&nbsp;'));
    OS.programFinished();
  }
};

window.Programs['make me a sandwich'] = {
  run: function() {
    OS.programOutput('What? Make it yourself.');
    OS.programFinished();
  }
};

window.Programs['sudo make me a sandwich'] = {
  run: function() {
    OS.programOutput('Okay.');
    OS.programFinished();
  }
};

window.Programs['uname'] = {
  run: function() {
    OS.programOutput('UnicornOS 4.04');
    OS.programFinished();
  }
};

window.Programs['whoami'] = {
  run: function() {
    OS.programOutput('You are a meat popsicle');
    OS.programFinished();
  }
};

window.Programs['uptime'] = {
  bootTime: Date(),

  run: function() {
    OS.programOutput('Running since ' + Programs['uptime'].bootTime);
    OS.programFinished();
  }
};

window.Programs['clear'] = {
  run: function() {
    $('.writable').html('');
    OS.programFinished(false);
  }
};

window.Programs['date'] = {
  run: function() {
    OS.programOutput(Date());
    OS.programFinished();
  }
};
