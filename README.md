jasmine-n-matchers
==================

[![Greenkeeper badge](https://badges.greenkeeper.io/jgrund/jasmine-n-matchers.svg)](https://greenkeeper.io/)

A set of matchers to assert a spy was called n times

The 2.0.0 release supports Jasmine 2.0. Everything earlier is for Jasmine 1.3.

## Usage

Make sure the jasmine-n-matchers.js file is executed early in your tests, it uses `beforeEach` to register the matchers.

## Example

```javascript
var spy = jasmine.createSpy('spy');

expect(spy).toHaveBeenCalledNTimes(0);

spy('foo', 'bar');

expect(spy).toHaveBeenCalledNTimes(1);
expect(spy).toHaveBeenCalledOnce();
expect(spy).toHaveBeenCalledOnceWith('foo', 'bar');

spy('foo', 'bar');

expect(spy).toHaveBeenCalledNTimes(2);
expect(spy).toHaveBeenCalledTwice();
expect(spy).toHaveBeenCalledTwiceWith('foo', 'bar');

spy('bar', 'baz');

expect(spy).toHaveBeenCalledNTimes(3);
expect(spy).toHaveBeenCalledThrice();
expect(spy).toHaveBeenCalledTwiceWith('foo', 'bar');
expect(spy).toHaveBeenCalledOnceWith('bar', 'baz');

spy('foo', 'bar');
spy('foo', 'bar');

expect(spy).toHaveBeenCalledNTimes(5);
expect(spy).toHaveBeenCalledNTimesWith(4, 'foo', 'bar');
