if( typeof(window.OS) === "undefined" ){
  (function(){
    window.OS = {
      programRunning: false,
      command: '',
      userText: [],
      nextUserTextId: 1,

      span: function(text, id) {
        return '<span id="user-text-' + id + '">' + text + '</span>';
      },

      normalKeyPress: function(key) {
        OS.userText.push('user-text-' + OS.nextUserTextId);
        if (!OS.programRunning) { OS.command += String.fromCharCode(key); }
        OS.output(OS.span(String.fromCharCode(key), OS.nextUserTextId++));
      },

      output: function(text) {
        window.Terminal.output(text);
      },

      specialKeyPress: function(key) {
        if (key == ':space') {
          OS.userText.push('user-text-' + OS.nextUserTextId);
          if (!OS.programRunning) { OS.command += ' '; }
          OS.output(OS.span('&nbsp;', OS.nextUserTextId++));
          return false;
        } else if (key == ':enter') { return false; }
        else if (key == ':control-c') { return false; }
        else if (key == ':backspace') {
          id = OS.userText.pop();
          window.Terminal.del(id);
          // update command variable
          return false;
        }
        return true;
      }
    }
  })();
}
