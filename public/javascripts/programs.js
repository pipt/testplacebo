window.Programs['rake'] = {
  queue: [],
  shouldHalt: false,

  init: function() {
    self = window.Programs['rake'];
    self.queue = [];
    self.shouldHalt = false;

    self
      .wait(2)
      .type('/usr/bin/ruby -S bundle exec rspec ./spec/units/sweet_sweet_testing.rb<br/>').waitRandom(1, 2)
      .startTimer();

    numTests = Math.floor(Math.random() * 30 + 50)

    for(i = 0; i < numTests; i++) {
      self.waitRandom(0.05, 0.4).type('.');
    }

    self
      .waitRandom(1, 2)
      .type('<br/>')
      .outputDone()
      .type(numTests + ' examples, 0 failures')
      .waitRandom(0.5, 1.5)
      .finish();
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
          if (action.milliseconds < 100) {
            setTimeout(function() { self.processEvents(); }, action.milliseconds);
          } else {
            action.milliseconds -= 100;
            self.queue.unshift(action);
            setTimeout(function() { self.processEvents(); }, 100);
          }
        }
        return;
      }
    }
    setTimeout(function() {self.processEvents.apply(window);}, 100);
  },

  type: function(text) {
    window.Programs['rake'].queue.push(function() { window.OS.programOutput.apply(window, [text]) });
    return this;
  },

  wait: function(seconds) {
    window.Programs['rake'].queue.push({ type: 'wait', milliseconds: seconds * 1000 });
    return this;
  },

  waitRandom: function(lower, upper) {
    seconds = (Math.random() * (upper - lower)) + lower;
    window.Programs['rake'].queue.push({ type: 'wait', milliseconds: seconds * 1000 });
    return this;
  },

  startTimer: function() {
    window.Programs['rake'].queue.push(function() { window.Programs['rake']._startTimer.apply(window) });
    return this;
  },

  _startTimer: function() {
    window.Programs['rake'].startTime = new Date();
  },

  outputDone: function() {
    Programs['rake'].queue.push(function() {
      var runTime = (new Date() - Programs['rake'].startTime) / 1000;
      OS.programOutput('Finished in ' + runTime + ' seconds<br/>');
    });
    return this;
  },

  finish: function() {
    window.Programs['rake'].queue.push(function() { window.Programs['rake'].shouldHalt = true; });
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
