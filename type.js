TestPlacebo = {
  init: function() {
    queue = [];
  },

  run: function() {
    action = queue.shift();
    if (action != null) {
      if (typeof(action) == 'function') {
        action();
      } else if (typeof(action) == 'object') {
        if (action.type == 'wait') {
          setTimeout(function() {TestPlacebo.run.apply(window);}, action.seconds * 1000);
        } else if (action.type == 'waitRandom') {
          time = (Math.random() * (action.upper - action.lower)) + action.lower;
          setTimeout(function() {TestPlacebo.run.apply(window);}, time);
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
    queue.push({type: 'waitRandom', lower: lower * 1000, upper: upper * 1000});
    return this;
  }
}

$(document).ready(function() {
  TestPlacebo.init();

  TestPlacebo
    .type('$ ').waitRandom(2, 4)
    .type('r').waitRandom(0.1, 0.3)
    .type('a').waitRandom(0.1, 0.3)
    .type('k').waitRandom(0.1, 0.3)
    .type('e<br/>');

  for(i = 0; i < 10; i++) {
    TestPlacebo.waitRandom(0.3, 2).type('.');
  }

  TestPlacebo.run();
});
