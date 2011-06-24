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
        setTimeout(function() {TestPlacebo.run.apply(window);}, action.seconds * 1000);
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
    queue.push({seconds: seconds});
    return this;
  }
}

$(document).ready(function() {
  TestPlacebo.init();

  TestPlacebo
    .type(' World!')
    .wait(5)
    .type(' Yey!')
    .type('Woot!');

  TestPlacebo.run();
});
