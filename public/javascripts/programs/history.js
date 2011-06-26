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
