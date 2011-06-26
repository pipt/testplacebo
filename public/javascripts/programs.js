window.Programs['rake'] = {
  queue: [],
  shouldHalt: false,

  init: function() {
    self = window.Programs['rake'];
    self.queue = [];
    self.shouldHalt = false;

  },

  run: function(args) {
    this.processEvents();
  },

  halt: function() {
    window.Programs['rake'].shouldHalt = true;
  },

  processEvents: function() {
    self = window.Programs['rake'];
    if (self.shouldHalt) {
      window.OS.programFinished();
      return
    }
    action = self.queue.shift();
    if (action != null) {
      if (typeof(action) == 'function') {
        action();
        setTimeout(function() { self.processEvents(); }, 0);
        return
      } else if (typeof(action) == 'object') {
        if (action.type == 'wait') {
          setTimeout(function() { self.processEvents(); }, action.seconds * 1000);
        }
        return;
      }
    }
    setTimeout(function() {self.processEvents.apply(window);}, 100);
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
