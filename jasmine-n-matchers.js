'use strict';
beforeEach(function () {
  jasmine.addMatchers({
    toHaveBeenCalledOnce: toHaveBeenCalledN(1),
    toHaveBeenCalledTwice: toHaveBeenCalledN(2),
    toHaveBeenCalledThrice: toHaveBeenCalledN(3),
    toHaveBeenCalledNTimes: toHaveBeenCalledN(null),
    toHaveBeenCalledOnceWith: toHaveBeenCalledNTimesWith(1),
    toHaveBeenCalledTwiceWith: toHaveBeenCalledNTimesWith(2),
    toHaveBeenCalledThriceWith: toHaveBeenCalledNTimesWith(3),
    toHaveBeenCalledNTimesWith: toHaveBeenCalledNTimesWith(null)
  });

  /**
   * HOF that checks a spy was called n times
   * @param {Number} n
   * @returns {Function}
   */
  function toHaveBeenCalledN (n) {
    return function matcherFactory (util, customEqualityTesters) {
      return {
        compare: function compare (actual, expected) {
          if (n == null)
            n = expected;

          if (!jasmine.isSpy(actual))
            return {
              result: false,
              message: 'Expected a spy, but got ' + jasmine.pp(actual) + '.'
            };

          var count = actual.calls.count()

          var result = {
            pass: util.equals(count, n, customEqualityTesters)
          };

          var msg = 'Expected spy ' + actual.and.identity() + ' to have been called ' + n + ' time(s), but was ';
          msg = (count === 0 ? msg + 'never called.' : msg + 'called ' + count + ' times.');

          result.message = (result.pass ? msg.replace('to have', 'not to have') : msg);

          return result;
        }
      };
    };
  }

  /**
   * HOF that checks a spy was called n times with args.
   * @param {Number} n
   * @returns {Function}
   */
  function toHaveBeenCalledNTimesWith(n) {
    return function matcherFactory (util, customEqualityTesters) {
      return {
        compare: function compare () {
          var expectedArgs = jasmine.util.argsToArray(arguments);
          var actual = expectedArgs.shift();

          if (n == null)
            n = expectedArgs.shift();

          if (!jasmine.isSpy(actual))
            return {
              result: false,
              message: 'Expected a spy, but got ' + jasmine.pp(actual) + '.'
            };

          var allActualArgs = actual.calls.allArgs();
          var foundCount = allActualArgs.reduce(function (count, args) {
            if (util.equals(args, expectedArgs), customEqualityTesters)
              count += 1;

            return count;
          }, 0);

          var result = {
            pass: util.equals(foundCount, n)
          };

          var actualIdentity = actual.and.identity();

          if (result.pass)
            result.message = 'Expected spy ' + actualIdentity + ' not to have been called with ' +
              jasmine.pp(expectedArgs) + ' ' + n + ' time(s) but it was.'
          else
            result.message = 'Expected spy ' + actualIdentity + ' to have been found with ' +
              jasmine.pp(expectedArgs) + ' ' + n + ' time(s) but it was found ' + foundCount + ' time(s).\n\n' +
              'Spy '+ actual.and.identity() + ' call listing:\n' + jasmine.pp(allActualArgs) + '.'

          return result;
        }
      };
    };
  }
});
