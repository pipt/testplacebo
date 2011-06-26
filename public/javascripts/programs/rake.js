window.Programs['rake'] = {
  run: function(args) {
    this.queue = [];
    this.shouldHalt = false;

    this
      .wait(2)
      .type('/usr/bin/ruby -S bundle exec rspec ./spec/units/sweet_sweet_testing.rb<br/>').waitRandom(1, 2)
      .startTimer();

    if (args.length == 2 && !isNaN(args[1]) && args[1] > 0) { numTests = args[1]; }
    else { numTests = Math.floor(Math.random() * 5 + 10); }
    for(var i = 0; i < numTests; i++) { this.waitRandom(0.05, 0.4).type('.'); }

    this
      .waitRandom(1, 2)
      .type('<br/>')
      .outputDone()
      .type(numTests + ' example' + (numTests != 1 ? 's' : '') + ', 0 failures')
      .waitRandom(0.5, 1.5)
      .finish();

    this.processEvents();
  },

  halt: function() {
    Programs['rake'].shouldHalt = true;
  },

  processEvents: function() {
    var self = Programs['rake'];
    if (self.shouldHalt) {
      OS.programFinished();
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
    setTimeout(function() { self.processEvents(); }, 100);
  },

  type: function(text) {
    Programs['rake'].queue.push(function() { OS.programOutput(text) });
    return this;
  },

  wait: function(seconds) {
    Programs['rake'].queue.push({ type: 'wait', milliseconds: seconds * 1000 });
    return this;
  },

  waitRandom: function(lower, upper) {
    seconds = (Math.random() * (upper - lower)) + lower;
    Programs['rake'].queue.push({ type: 'wait', milliseconds: seconds * 1000 });
    return this;
  },

  startTimer: function() {
    Programs['rake'].queue.push(function() { Programs['rake'].startTime = new Date(); });
    return this;
  },

  outputDone: function() {
    Programs['rake'].queue.push(function() {
      var runTime = (new Date() - Programs['rake'].startTime) / 1000;
      OS.programOutput('Finished in ' + runTime + ' seconds<br/>');
    });
    return this;
  },

  finish: function() {
    Programs['rake'].queue.push(function() { Programs['rake'].shouldHalt = true; });
  }
};
