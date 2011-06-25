if( typeof(window.TestPlacebo) === "undefined" ){
  (function(){
    window.TestPlacebo = {
      startTime: null,
      testRunning: false,
      nextId: 1,
      userText: [],

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
        $('#writable').append(text);
        $('.content').scrollTo('max');
      },

      userType: function(text) {
        TestPlacebo.userText.push(TestPlacebo.nextId);
        $('#writable').append('<span id="user-text-' + (TestPlacebo.nextId++) + '">' + text + '</span>');
      },

      userDel: function() {
        $('#user-text-' + TestPlacebo.userText.pop()).remove();
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

      startTimer: function() {
        queue.push(function() {TestPlacebo._startTimer.apply(window)});
        return this;
      },

      _startTimer: function() {
        TestPlacebo.startTime = new Date();
      },

      start: function() {
        queue.push(function() {TestPlacebo._start.apply(window)});
        return this;
      },

      _start: function() {
        TestPlacebo.testRunning = true;
      },

      stop: function() {
        queue.push(function() {TestPlacebo._stop.apply(window)});
        return this;
      },

      _stop: function() {
        TestPlacebo.testRunning = false;
      },

      outputDone: function() {
        queue.push(function() {TestPlacebo._outputDone.apply(window)});
        return this;
      },

      _outputDone: function() {
        var runTime = (new Date() - TestPlacebo.startTime) / 1000;
        TestPlacebo._type('Finished in ' + runTime + ' seconds<br/>');
      },

      cursorOn: function() {
        $('.cursor').removeClass('cursor-off');
        setTimeout(TestPlacebo.cursorOff, 600);
      },

      cursorOff: function() {
        $('.cursor').addClass('cursor-off');
        setTimeout(TestPlacebo.cursorOn, 600);
      }
    }
  })();
}

$(document).ready(function() {
  var TestPlacebo = window.TestPlacebo;
  TestPlacebo.init();

  TestPlacebo
    .start()
    .waitRandom(2, 4)
    .type('r').waitRandom(0.1, 0.3)
    .type('a').waitRandom(0.1, 0.3)
    .type('k').waitRandom(0.1, 0.3)
    .type('e<br/>').wait(2)
    .type('/usr/bin/ruby -S bundle exec rspec ./spec/units/sweet_sweet_testing.rb<br/>').waitRandom(1, 2)
    .startTimer();

  numTests = Math.floor(Math.random() * 30 + 50)

  for(i = 0; i < numTests; i++) {
    TestPlacebo.waitRandom(0.05, 0.4).type('.');
  }

  TestPlacebo
    .waitRandom(1, 2)
    .type('<br/>')
    .outputDone()
    .type(numTests + ' examples, 0 failures<br/>')
    .waitRandom(0.5, 1.5)
    .type('<span class="prompt">$</span> ')
    .stop();

  TestPlacebo.run();
  TestPlacebo.cursorOn();

  $(document).keypress(function(data) {
    if (65 <= data.charCode && data.charCode <= 122) {
      TestPlacebo.userType(String.fromCharCode(data.charCode));
    } else if (data.charCode == 13) {
      TestPlacebo.userType('<br/>');
      if (!TestPlacebo.testRunning) {
        TestPlacebo._type('<span class="prompt">$</span> ');
      }
      else if (data.charCode == 8) {
        console.log(data.keyCode);
        TestPlacebo.userDel();
        return false;
      }
    }
    console.log(data.keyCode);
  });

  $(document).keydown(function(data) {
    if (data.keyCode == 8) {
      console.log(data.keyCode);
      TestPlacebo.userDel();
      return false;
    }
  })
});
