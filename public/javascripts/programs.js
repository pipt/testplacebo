if (typeof(window.Programs) === "undefined") {
  (function() {
    window.Programs = {
      allPrograms: function() {
        var programs = []
        for (var member in Programs) {
          if (member != 'allPrograms' && !member.match(/ /)) { programs.push(member); }
        }
        return programs;
      }
    };
  })();
}

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

window.Programs['history'] = {
  previousCommands: [],
  currentCommandPointer: 0,

  run: function() {
    OS.programOutput(this.previousCommands.join('<br/>'));
    OS.programFinished();
  },

  addCommand: function(command) {
    if (this.previousCommands[this.previousCommands.length - 1] != command) {
      this.previousCommands.push(command);
    }
    this.currentCommandPointer = this.previousCommands.length;
  },

  previousCommand: function() {
    if (this.currentCommandPointer >= 0) { return this.previousCommands[--this.currentCommandPointer]; }
    return '';
  },

  nextCommand: function() {
    if (this.currentCommandPointer >= this.previousCommands.length) {
      return '';
    } else {
      return this.previousCommands[++this.currentCommandPointer];
    }
  }
};

window.Programs['whoami'] = {
  run: function() {
    OS.programOutput('You are a meat popsicle');
    OS.programFinished();
  }
};
