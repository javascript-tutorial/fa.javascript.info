# تاریخ و زمان

بیایید یک شیء درون‌ساخت جدید را بشناسیم: [Date](mdn:js/Date). این شیء تاریخ و زمان را ذخیره می‌کند و متدهایی را برای مدیریت تاریخ/زمان فراهم می‌کند.

برای مثال، ما می‌توانیم از آن برای ذخیره‌سازی زمان ساختن/تغییردادن، اندازه‌گیری زمان یا فقط برای نمایش دادن زمان کنونی استفاده کنیم.

## ایجاد

برای ایجاد یک شیء `Date` جدید باید `new Date()` را با یکی از آرگومان‌های زیر صدا بزنیم:

`new Date()`
: بدون آرگومان -- یک شیء `Date` برای تاریخ و زمان کنونی می‌سازد:

    ```js run
    let now = new Date();
    alert( now ); // تاریخ/زمان کنونی را نمایش می‌دهد
    ```

`new Date(milliseconds)`
: یک شیء `Date` با زمانی برابر با تعداد میلی‌ثانیه‌هایی (milliseconds، 1/1000 ثانیه) که از اول ژانویه سال 1970 میلادی با UTC+0 گذشته است می‌سازد.

    ```js run
    // 01.01.1970 UTC+0 صفر یعنی
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // 02.01.1970 UTC+0 :حالا 24 ساعت اضافه می‌کنیم و تاریخی که دریافت می‌کنیم 
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    عدد صحیحی که تعداد میلی‌ثانیه‌های گذشته از شروع 1970 را نمایش می‌دهد را *مُهرزمانی (timestamp)* می‌گویند.

    مهرزمانی یک نمایش آسان از تاریخ است. ما همیشه می‌توانیم با استفاده از `new Date(timestamp)` یک تاریخ را از یک مهرزمانی بسازیم و شیء `Date` موجود را با استفاده از متد `date.getTime()` به مهرزمانی تبدیل کنیم (ادامه متن را ببینید).

    :تاریخ‌های قبل از 01.01.1970 مهرزمانی منفی دارند، برای مثال
    ```js run
    // سی و یک دسامبر 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: اگر یک آرگومان تنها وجود داشته باشد که رشته است، سپس به طور خودکار تجزیه می‌شود. الگوریتم آن با `Date.parse` یکسان است، ما آن را بعدا یاد می‌گیریم.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // باشد GMT زمان تنظیم نشده است پس فرض می‌شود که نیمه شب
    // و با توجه به منطقه‌زمانی‌ای که کد در آن اجرا می‌شود تنظیم می‌شود
    // :پس نتیجه می‌تواند این باشد
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // یا
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: یک تاریخ با مؤلفه‎های داده شده در منطقه‌زمانی محلی می‌سازد. فقط دو آرگومان اول ضروری هستند.

    - پارامتر `year` باید حتما 4 رقم باشد: `2013` خوب است ولی `98` نه.
    - شمارش پارامتر `month` از `0` (ژانویه) تا `11` (دسامبر) است.
    - پارامتر `date` در واقع روز ماه است، اگر وارد نشود `1` فرض می‌شود.
    - اگر `hours/minutes/seconds/ms` وارد نشوند،برای آنها `0` در نظر گرفته می‌شود.

    برای مثال:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // اول ژانویه 2011، ساعت 00:00:00
    new Date(2011, 0, 1); // یکسان است، ساعت و بقیه پارامترها به طور پیش‌فرض 0 هستند
    ```

    :بیشترین دقت 1 میلی‌ثانیه (1/1000 ثانیه) است

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## دسترسی به اجزاء تاریخ

متدهایی برای دسترسی به سال، ماه و بقیه اجزاء در شیء `Date` وجود دارد:

[getFullYear()](mdn:js/Date/getFullYear)
: دریافت سال (4 رقم)

[getMonth()](mdn:js/Date/getMonth)
: دریافت ماه، **از 0 تا 11**.

[getDate()](mdn:js/Date/getDate)
: دریافت روز ماه، از 1 تا 31، اسم متد واقعا کمی عجیب بنظر می‌رسد.

[getHours()](mdn:js/Date/getHours)، [getMinutes()](mdn:js/Date/getMinutes)، [getSeconds()](mdn:js/Date/getSeconds)، [getMilliseconds()](mdn:js/Date/getMilliseconds)
: جزء متناظر با خود را دریافت می‌کنند یعنی به ترتیب: ساعت، دقیقه، ثانیه و میلی‌ثانیه.

```warn header="متد `getYear()` درست نیست بلکه `getFullYear()` درست است"
بسیاری از موتورهای جاوااسکریپت یک متد غیر استاندارد `getYear()` را پیاده‌سازی می‌کنند. این متد منسوخ شده است. بعضی اوقات یک سال 2 رقمی را برمی‌گرداند. لطفا هیچ‌وقت از آن استفاده نکنید. متد `getFullYear()` برای سال وجود دارد.
```

علاوه بر این، ما می‌توانیم روز هفته را هم دریافت کنیم:

[getDay()](mdn:js/Date/getDay)
: دریافت روز هفته، از `0` (Sunday، یکشنبه) تا `6` (Saturday، شنبه). اولین روز همیشه Sunday (یکشنبه) است و در بعضی از کشورها اینگونه نیست اما نمی‌توان آن را تغییر داد.

**تمام متدهای بالا اجزاء را با توجه به منطقه زمانی محلی برمی‌گردانند.**

همچنین نقطه مقابل آنها در UTC هم وجود دارد که روز، ماه، سال و بقیه را برای منطقه زمانی UTC+0 برمی‌گرداند: [getUTCFullYear()](mdn:js/Date/getUTCFullYear)، [getUTCMonth()](mdn:js/Date/getUTCMonth)، [getUTCDay()](mdn:js/Date/getUTCDay). فقط `"UTC"` را بعد از `"get"` اضافه کنید.

اگر منطقه زمانی شما نسبت به UTC متفاوت باشد، کد پایین ساعت‌های متفاوت را نشان می‌دهد:

```js run
// تاریخ کنونی
let date = new Date();

// ساعت در منطقه زمانی کنونی شما
alert( date.getHours() );

// (زمان شهر لندن بدون ساعت تابستانی) UTC+0 ساعت در منطقه زمانی
alert( date.getUTCHours() );
```

علاوه بر متدهای داده شده، دو متد خاص هم وجود دارند که نوع UTC برای آنها وجود ندارد:

[getTime()](mdn:js/Date/getTime)
: مهرزمانی را برای تاریخ برمی‌گرداند -- عددی برابر با میلی‌ثانیه‌هایی که از اول ژانویه 1970 میلادی با UTC+0 گذشته است.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: تقاوت بین UTC و منطقه زمانی محلی را به دقیقه برمی‌گرداند.

    ```js run
    // باشید، خروجی 60 می‌دهد UTC-1 اگر شما در منطقه زمانی
    // باشید، خروجی 180- می‌دهد UTC+3 اگر در منطقه زمانی
    alert( new Date().getTimezoneOffset() );

    ```

## تنظیم کردن اجزاء تاریخ

متدهای زیر به اجازه تنظیم کردن اجزاء تاریخ را می‌دهند:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (تمام تاریخ را توسط میلی‌ثانیه‌های گذشته از 01.01.1970 UTC+0 تنظیم می‌کند)

تمام آنها به جز `setTime()` یک نوع UTC دارند، برای مثال: `setUTCHours()`.

همانطور که می‌بینیم، بعضی از متدها می‌توانند چند جزء را همزمان تنظیم کنند، برای مثال `setHours`. اجزائی که ذکر نشوند تغییر داده نمی‌شوند.

برای مثال:

```js run
let today = new Date();

today.setHours(0);
alert(today); // .هنوز امروز است اما ساعت به 0 تغییر داده شد
today.setHours(0, 0, 0, 0);
alert(today); // .هنوز هم امروز است، الان ساعت دقیقا 00:00:00 است
```

## Autocorrection

The *autocorrection* is a very handy feature of `Date` objects. We can set out-of-range values, and it will auto-adjust itself.

For instance:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
```

Out-of-range date components are distributed automatically.

Let's say we need to increase the date "28 Feb 2016" by 2 days. It may be "2 Mar" or "1 Mar" in case of a leap-year. We don't need to think about it. Just add 2 days. The `Date` object will do the rest:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

That feature is often used to get the date after the given period of time. For instance, let's get the date for "70 seconds after now":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // shows the correct date
```

We can also set zero or even negative values. For example:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```

## Date to number, date diff

When a `Date` object is converted to number, it becomes the timestamp same as `date.getTime()`:

```js run
let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
```

The important side effect: dates can be subtracted, the result is their difference in ms.

That can be used for time measurements:

```js run
let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

alert( `The loop took ${end - start} ms` );
```

## Date.now()

If we only want to measure time, we don't need the `Date` object.

There's a special method `Date.now()` that returns the current timestamp.

It is semantically equivalent to `new Date().getTime()`, but it doesn't create an intermediate `Date` object. So it's faster and doesn't put pressure on garbage collection.

It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

So this is probably better:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## Benchmarking

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let's measure two functions that calculate the difference between two dates: which one is faster?

Such performance measurements are often called "benchmarks".

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

These two do exactly the same thing, but one of them uses an explicit `date.getTime()` to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

So, which one is faster?

The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.

Let's measure:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Using `getTime()` is so much faster! That's because there's no type conversion, it is much easier for engines to optimize.

Okay, we have something. But that's not a good benchmark yet.

Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

For example, like this:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Modern JavaScript engines start applying advanced optimizations only to "hot code" that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.

The great pack of articles about V8 can be found at <http://mrale.ph>.
```

## Date.parse from a string

The method [Date.parse(str)](mdn:js/Date/parse) can read a date from a string.

The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

- `YYYY-MM-DD` -- is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` -- is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

We can instantly create a `new Date` object from the timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Summary

- Date and time in JavaScript are represented with the [Date](mdn:js/Date) object. We can't create "only date" or "only time": `Date` objects always carry both.
- Months are counted from zero (yes, January is a zero month).
- Days of week in `getDay()` are also counted from zero (that's Sunday).
- `Date` auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
- Dates can be subtracted, giving their difference in milliseconds. That's because a `Date` becomes the timestamp when converted to a number.
- Use `Date.now()` to get the current timestamp fast.

Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct
```

Node.js has `microtime` module and other ways. Technically, almost any device and environment allows to get more precision, it's just not in `Date`.
