if (typeof(window.Programs) === "undefined") {
  (function() {
    window.Programs = {
      allPrograms: function() {
        var programs = []
        for (var member in Programs) {
          if (member != 'allPrograms' && member != 'possiblePrograms' && !member.match(/ /)) {
            programs.push(member);
          }
        }
        return programs.sort();
      },

      possiblePrograms: function() {
        var all = this.allPrograms();
        var possible = [];
        for (var i = 0; i < all.length; i++) {
          if (all[i].substring(0, OS.command.length) == OS.command) { possible.push(all[i]); }
        }
        return possible.sort();
      }
    };
  })();
}
