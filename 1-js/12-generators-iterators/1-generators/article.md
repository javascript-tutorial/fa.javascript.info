# Generators

توابع معمول فقط یک‌بار می‌توانند یک مقدار(مثلا یک object یا undefined) را برگردانند.

اما generatorها می‌توانند چندین بار، بر اساس تقاضا، مقادیر متفاوت را برگردانند(اصطلاحا yield کنند.). generatorها با [iterableها](info:iterable) به خوبی کار می‌کنند و به کمک آن‌ها می‌توان جریان‌های داده ساخت.

## توابع Generator

برای ساختن یک generator به یک سینتکس خاص نیاز است: *function، که به آن "تابع generator" می‌گویند.

ظاهر یک تابع generator به صورت زیر است:

```js

function* generateSequence() {

  yield 1;

  yield 2;

  return 3;

}

```


توابع generator با توابع معمول، رفتار متفاوتی دارند. زمانی که این توابع صدا می‌شوند، بدنه آن‌ها اجرا نمی‌شود؛ در عوض، یک آبجکت خاص به نام "generator object" برمی‌گردانند که به وسیله آن اجرای تابع را می‌توان کنترل کرد.

برای مثال:

```js run

function* generateSequence() {

  yield 1;

  yield 2;

  return 3;

}

//برمی‌گرداند generator یک آبجکت generator تابع

let generator = generateSequence();

\*!*

alert(generator); // [object Generator]

\*/!*

```


اجرای بدنه تایع هنوز شروع نشده است:

![](generateSequence-1.svg)

متد اصلی یک آبجکت generator متد `()next` است. هنگامی که صدا می‌شود، بدنه تابع تا اولین `yield value` اجرا می‌شود(`value` می‌تواند حذف شود که در این صورت `undefined` است.)؛ سپس اجرای تابع متوقف می‌شود و مقدار yield شده برگرداننده می‌شود.

مقدار برگردانده شده توسط متود `next` همواره یک آبجکت با 2 پراپرتی است:

- `value`: مقدار برگرداننده شده توسط `yield`.

- `done`: یک Boolean است که در صورت اتمام بدنه تابع مقدار true و در غیر این صورت مقدار false دارد.

برای مثال، در کد زیر، یک آبجکت generator ایجاد شده و اولین مقدار `yield` شده توسط آن گرفته شده است:

```js run

function* generateSequence() {

  yield 1;

  yield 2;

  return 3;

}

let generator = generateSequence();

\*!*

let one = generator.next();

\*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}

```


اکنون فقط مقدار اول را گرفته‌ایم و اجرای تابع در خط دوم متوقف شده است:

![](generateSequence-2.svg)

اکنون اگر دوباره `()generator.next` را صدا بزنیم اجرای تابع شروع می‌شود و تا `yield` بعدی و برگردانده شدن مقدار ادامه می‌یابد:

```js

let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}

```


![](generateSequence-3.svg)

و اگر برای بار سوم آن را صدا بزنیم، اجرای تابع به `return` می‌رسد و تمام می‌شود:

```js

let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}

```


![](generateSequence-4.svg)

اکنون از روی `done:true` متوجه می‌شویم کار generator تمام شده و `value:3` آخرین مقدار برگردانده شده توسط generator است.

دیگر صدا کردن `()generator.next` منطقی نیست. اگر این کار را انجام دهیم، آبجکت یکسانی با `done:true` برگردانده می‌شود.

```smart header="`function* f(…)`یا`function *f(…)`؟"

هر دو سینتکس صحیح هستند.

ولی معمولا اولی ترجیح داده می‌شود؛ چون `*` نوع تابع و نه نام تابع را مشخص می‌کند.

````

## generatorها iterable هستند.

همانطور که احتمالا با توجه به `()next` متوجه شده‌اید، generatorها [iterable](info:iterable) هستند.

با استفاد از `for..of` می‌توان از `value` آن‌ها استفاده کرد:

```js run

function* generateSequence() {

  yield 1;

  yield 2;

  return 3;

}

let generator = generateSequence();

for(let value of generator) {

  alert(value); // ابتدا 1 و سپس 2

}

````

این شیوه از صدا کردن `next` تمیزتر است؛ این‌گونه فکر نمی‌کنید؟

...اما دقت کنید: مثال بالا ابتدا `1` و سپس `2` را نشان داد؛ خبری از `3` نیست!

علت این اتفاق این است که `for..of` آخرین مقدار را هنگامی که `done:true` است در نظر نمی‌گیرد. هنگام برگرداندن آخرین مقدار با `return`، بر خلاف `done:true`، `yield` است. در نتیجه برای نشان دادن تمام مقادیر باید آن‌ها را با `yield` برگردانیم:
```js run

function* generateSequence() {

  yield 1;

  yield 2;

\*!*

  yield 3;

\*/!*

}

let generator = generateSequence();

for(let value of generator) {

  alert(value); // ابتدا 1 سپس 2 و بعد از آن 3

}

```


از آنجایی که generatorها iterable هستند، از تمام functionality آن‌ها نیز برای generatorها می‌توان استفاده کرد؛ مثل spread syntax `...`:

```js run

function* generateSequence() {

  yield 1;

  yield 2;

  yield 3;

}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3

```


در کد بالا، `()generateSequence...`، باعث می‌شود آبجکت generator که iterable هم هست به آرایه‌ای از اعداد تبدیل شود.(درباره spread syntax در چپتر [](info:rest-parameters-spread#spread-syntax) بیشتر بخوانید.)

## استفاده از generatorها برای iterableها

در چپتر [](info:iterable) یک آبجکت `range` ساختیم که مقادیر `from..to` را باز می‌گرداند.

کد آن به شرح زیر بود:

```js run

let range = {

  from: 1,

  to: 5,

  // در ابتدا این متود را فقط یک بار صدا می‌کند for..of range

  [Symbol.iterator]() {

    // این، آبجکت ایتریتور را باز می‌گرداند:

	 // فقط با آن آبجکت کار می‌کند و از آن مقادیر بعدی را می‌خواند for..of سپس
    return {

      current: this.from,

      last: this.to,

      // صدا می‌شود for..of توسط iteration در هر next()

      next() {

        // باید مقدار را به عنوان یک آبجکت برگرداند:
        // {value: ..., done: ...}

        if (this.current <= this.last) {

          return { done: false, value: this.current++ };

        } else {

          return { done: true };

        }

      },

    };

  },

};

// برمی‌گرداند range.to تا range.from اعداد را از range روی iteration
alert([...range]); // 1,2,3,4,5

```


می‌توان از یک تابع generator برای iteration به جای Symbol.iterator استفاده کرد.

این همان `range` اما بسیار جمع و جور تر است:

```js run

let range = {

  from: 1,

  to: 5,

  \*[Symbol.iterator]() {

    //[Symbol.iterator] نسخه جمع و جور : function*()

    for (let value = this.from; value <= this.to; value++) {

      yield value;

    }

  },

};

alert([...range]); // 1,2,3,4,5

```


دلیل کارکرد روش بالا این است که  `()range[Symbol.iterator]` دقیقا همان چیزی را برمی‌گرداند که `for..of` انتظار دارد:

- متود `next` موجود است.

- مقدار بازگشتی به فرم `{value:..., done:true/false}` است.

این کارکرد یک اتفاق نیست، generatorها با توجه به  iterator ها، برای پیاده‌سازی ساده‌تر آن‌ها به زبان اضافه شده‌اند.

روشی که از generator استفاده می‌کند بسیار مختصرتر از روش اول `range` است و همان کارکرد را دارد.

```smart header="generatorها ممکن است تا ابد مقدار تولید کنند"

در مثال بالا، یک دنباله کران دار تولید کردیم، ولی می‌توان به همان روش یک دنباله بی‌کران از مقادیر را ساخت. مثل یک دنباله بی‌پایان از اعداد شبه تصادفی.

```


## ترکیب generatorها

ترکیب generatorها قابلیتی است که به وسیله آن می‌توان generatorها را در هم `embed` کرد.

برای مثال یک generator داریم که یک دنباله از اعداد را تولید می‌کند:

```js

function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) yield i;

}

```


اکنون می‎‌خواهیم از آن به نحوی بازاستفاده کنیم که دنباله پیچیده‌تری بتوان ایجاد کرد:

- ابتدا ارقام از `0` تا `9`(با کد کاراکتر 48 تا 57)
-  سپس حروف بزرگ از `A` تا `Z`(با کد کاراکتر 65 تا 90)
-  سپس حروف کوچک از `a` تا `z`(با کد کاراکتر 97 تا 122)

برای مثال از این دنباله می‌توان با انتخاب کاراکتر، برای تولید رمز عبور استفاده کرد.

در توابع معمولی، برای ترکیب جواب‌ها از چندین تابع دیگر، آن‌ها را صدا می‌کنیم، مقادیر را ذخیره می‌کنیم و سپس در آخر آن‌ها را به هم `join` می‌کنیم.

برای generatorها سینتکس`*yield` برای "embed" کردن یک generator درون دیگری استفاده می‌شود.

generator ترکیب شده:

```js run

function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) yield i;

}

function* generatePasswordCodes() {

\*!*

  // 0..9

  yield* generateSequence(48, 57);

  // A..Z

  yield* generateSequence(65, 90);

  // a..z

  yield* generateSequence(97, 122);

\*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {

  str += String.fromCharCode(code);

}

alert(str); // 0..9A..Za..z

```


عبارت `*yield` اجرا را به یک generator دیگر می‌سپارد(اصطلاحا `delegate` می‌کند). بدان معنا که `yeild* gen` روی `gen` ایتریت می‌کند و به صورت درونی مقدار yield شده را به بیرون هدایت می‌کند؛ انگار که کلا مقدار توسط generator دوم تولید شده است.

اگر از generatorها به صورت inline و تو در تو استفاده کنیم نیز به همان نتیجه می‌رسیم:

```js run

function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) yield i;

}

function* generateAlphaNum() {

\*!*

  // yield* generateSequence(48, 57);

  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);

  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);

  for (let i = 97; i <= 122; i++) yield i;

\*/!*

}

let str = '';

for(let code of generateAlphaNum()) {

  str += String.fromCharCode(code);

}

alert(str); // 0..9A..Za..z

```


ترکیب generatorها یک راه معقول برای استفاده از جریان یک generator درون دیگری است و از حافظه بیشتر برای ذخیره مقادیر استفاده نمی‌کند.

## "yield" is a two-way street

Until this moment, generators were similar to iterable objects, with a special syntax to generate values. But in fact they are much more powerful and flexible.

That's because `yield` is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

Let's see an example:

```js run

function* gen() {

\*!*

  // Pass a question to the outer code and wait for an answer

  let result = yield "2 + 2 = ?"; // (*)

\*/!*

  alert(result);

}

let generator = gen();

let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator

```


![](genYield2.svg)

1. The first call `generator.next()` should be always made without an argument (the argument is ignored if passed). It starts the execution and returns the result of the first `yield "2+2=?"`. At this point the generator pauses the execution, while staying on the line `(*)`.

2. Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.

3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call `next(4)`. It may take time. That's not a problem: the generator will wait.

For instance:

```js

// resume the generator after some time

setTimeout(() => generator.next(4), 1000);

```


As we can see, unlike regular functions, a generator and the calling code can exchange results by passing values in `next/yield`.

To make things more obvious, here's another example, with more calls:

```js run

function* gen() {

  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?";

  alert(ask2); // 9

}

let generator = gen();

alert(generator.next().value); // "2 + 2 = ?"

alert(generator.next(4).value); // "3 * 3 = ?"

alert(generator.next(9).done); // true

```


The execution picture:

![](genYield2-2.svg)

1. The first `.next()` starts the execution... It reaches the first `yield`.

2. The result is returned to the outer code.

3. The second `.next(4)` passes `4` back to the generator as the result of the first `yield`, and resumes the execution.

4. ...It reaches the second `yield`, that becomes the result of the generator call.

5. The third `next(9)` passes `9` into the generator as the result of the second `yield` and resumes the execution that reaches the end of the function, so `done: true`.

It's like a "ping-pong" game. Each `next(value)` (excluding the first one) passes a value into the generator, that becomes the result of the current `yield`, and then gets back the result of the next `yield`.

## generator.throw

As we observed in the examples above, the outer code may pass a value into the generator, as the result of `yield`.

...But it can also initiate (throw) an error there. That's natural, as an error is a kind of result.

To pass an error into a `yield`, we should call `generator.throw(err)`. In that case, the `err` is thrown in the line with that `yield`.

For instance, here the yield of `"2 + 2 = ?"` leads to an error:

```js run

function* gen() {

  try {

    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");

  } catch(e) {

    alert(e); // shows the error

  }

}

let generator = gen();

let question = generator.next().value;

\*!*

generator.throw(new Error("The answer is not found in my database")); // (2)

\*/!*

```


The error, thrown into the generator at line `(2)` leads to an exception in line `(1)` with `yield`. In the example above, `try..catch` catches it and shows it.

If we don't catch it, then just like any exception, it "falls out" the generator into the calling code.

The current line of the calling code is the line with `generator.throw`, labelled as `(2)`. So we can catch it here, like this:

```js run

function* generate() {

  let result = yield "2 + 2 = ?"; // Error in this line

}

let generator = generate();

let question = generator.next().value;

\*!*

try {

  generator.throw(new Error("The answer is not found in my database"));

} catch(e) {

  alert(e); // shows the error

}

\*/!*

```


If we don't catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

## generator.return

`generator.return(value)` finishes the generator execution and return the given `value`.

```js

function* gen() {

  yield 1;

  yield 2;

  yield 3;

}

const g = gen();

g.next(); // { value: 1, done: false }

g.return("foo"); // { value: "foo", done: true }

g.next(); // { value: undefined, done: true }

```


If we again use `generator.return()` in a completed generator, it will return that value again ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)).

Often we don't use it, as most of time we want to get all returning values, but it can be useful when we want to stop generator in a specific condition.

## Summary

- Generators are created by generator functions `function* f(…) {…}`.

- Inside generators (only) there exists a `yield` operator.

- The outer code and the generator may exchange results via `next/yield` calls.

In modern JavaScript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique. And, surely, they are great for making iterable objects.

Also, in the next chapter we'll learn async generators, which are used to read streams of asynchronously generated data (e.g paginated fetches over a network) in `for await ... of` loops.

In web-programming we often work with streamed data, so that's another very important use case.
