TestPlacebo = {
  startTime: new Date(),

  init: function() {
    queue = [];
  },

  run: function() {
    action = queue.shift();
    if (action != null) {
      if (typeof(action) == 'function') {
        action();
        setTimeout(function() {TestPlacebo.run.apply(window);}, 0);
        return
      } else if (typeof(action) == 'object') {
        if (action.type == 'wait') {
          setTimeout(function() {TestPlacebo.run.apply(window);}, action.seconds * 1000);
        }
        return;
      }
    }
    setTimeout(function() {TestPlacebo.run.apply(window);}, 100);
  },

  type: function(text) {
    queue.push(function() {TestPlacebo._type.apply(window, [text]);});
    return this;
  },

  _type: function(text) {
    $('.content').append(text);
  },

  wait: function(seconds) {
    queue.push({type: 'wait', seconds: seconds});
    return this;
  },

  waitRandom: function(lower, upper) {
    seconds = (Math.random() * (upper - lower)) + lower;
    queue.push({type: 'wait', seconds: seconds});
    return this;
  },

  outputDone: function() {
    queue.push(function() {TestPlacebo._outputDone.apply(window)});
    return this;
  },

  _outputDone: function() {
    var runTime = (new Date() - TestPlacebo.startTime) / 1000;
    $('.content').append('Finished in ' + runTime + ' seconds<br/>');
  }
}

$(document).ready(function() {
  TestPlacebo.init();

  TestPlacebo
    .type('$ ').waitRandom(2, 4)
    .type('r').waitRandom(0.1, 0.3)
    .type('a').waitRandom(0.1, 0.3)
    .type('k').waitRandom(0.1, 0.3)
    .type('e<br/>').wait(2)
    .type('/usr/bin/ruby -S bundle exec rspec ./spec/units/sweet_sweet_testing.rb<br/>');

  for(i = 0; i < 100; i++) {
    TestPlacebo.waitRandom(0, 0.1).type('.&#8203;');
  }

  TestPlacebo
    .type('<br/>')
    .outputDone()
    .type('100 examples, 0 failures');

  TestPlacebo.run();
});
