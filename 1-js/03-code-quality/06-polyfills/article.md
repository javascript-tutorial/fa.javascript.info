
# Polyfills and transpilers

زبان جاوااسکریپت پیوسته در حال تکامل است. پیشنهادهایی برای بهتر شدن آن به‌طور منظم صورت می‌گیرد، این پیشنهاد‌ها بررسی می‌شوند و اگر ارزشمند باشند، به لیست <https://tc39.github.io/ecma262/> اضافه می‌شوند و سپس به [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) راه می‌یابند.

تیم‌های مسئول موتورهای جاوااسکریپت تصمیم می‌گیرند کدام یک را اول پیاده‌سازی کنند. ممکن است تصمیم بگیرند پیشنهادهایی که هنوز به‌صورت پیش‌نویس هستند را اول پیاده‌سازی کنند و چیزهایی که در spec هستند را به بعدتر موکول کنند. دلیلش هم می‌تواند این باشد که شاید بعضی جذابیت کمتری دارند یا انجام آن‌ها سخت‌تر است.

پس کاملا طبیعی است که یک موتور فقط بخشی از یک استاندارد را پیاده‌سازی کند.

یک صفحه‌ی خوب برای این که ببینید در حال حاضر چه چیزهایی پشتیبانی می‌شود اینجاست <https://kangax.github.io/compat-table/es6/> (خیلی بزرگ است، ما چیزهای زیادی برای مطالعه داریم).

As programmers, we'd like to use most recent features. The more good stuff - the better!

On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

