beforeEach(function() {
  this.addMatchers({
    toHaveBeenCalledOnce: toHaveBeenCalledN(1),
    toHaveBeenCalledTwice: toHaveBeenCalledN(2),
    toHaveBeenCalledThrice: toHaveBeenCalledN(2),
    toHaveBeenCalledNTimes: toHaveBeenCalledN(null),
    toHaveBeenCalledOnceWith: toHaveBeenCalledNTimesWith(1),
    toHaveBeenCalledTwiceWith: toHaveBeenCalledNTimesWith(2),
    toHaveBeenCalledThriceWith: toHaveBeenCalledNTimesWith(3),
    toHaveBeenCalledNTimesWith: toHaveBeenCalledNTimesWith(null)
  });

  function toHaveBeenCalledN(n) {
    return function (expected) {
      if (n == null)
        n = expected;

      if (!jasmine.isSpy(this.actual))
        throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');

      this.message = function() {
        var msg = 'Expected spy ' + this.actual.identity + ' to have been called ' + n + ' time(s), but was ',
          count = this.actual.callCount;
        return [
          count === 0 ? msg + 'never called.' :
            msg + 'called ' + count + ' times.',
          msg.replace('to have', 'not to have') + 'called ' + n + ' times(s).'
        ];
      };

      return this.actual.callCount === n;
    };
  }

  function toHaveBeenCalledNTimesWith(n) {
    return function() {
      var expectedArgs = jasmine.util.argsToArray(arguments);

      if (n == null)
        n = expectedArgs.shift();

      if (!jasmine.isSpy(this.actual)) {
        throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
      }

      var foundCount = this.actual.argsForCall.reduce(function (count, args) {
        if (this.equals_(args, expectedArgs))
          count += 1;

        return count;
      }, 0, this);

      this.message = function() {
        return [
          'Expected spy ' + this.actual.identity + ' to have been called with ' +
            jasmine.pp(expectedArgs) + ' ' + n + ' time(s) but it was called ' + foundCount + 'time(s).' +
            this.actual.identity + 'called ' + n + ' times(s) with: ' + jasmine.pp(this.actual.argsForCall) + '.',
          'Expected spy ' + this.actual.identity + ' not to have been called with ' +
            jasmine.pp(expectedArgs) + ' ' + n + ' time(s) but it was.'
        ];
      };

      return this.actual.callCount === n && foundCount === n;
    }
  }
});