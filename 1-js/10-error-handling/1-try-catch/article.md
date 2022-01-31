# مدیریت ارور، "try...catch"

مهم نیست که چقدر در برنامه‌نویسی عالی هستیم، گاهی اوقات اسکریپت‌های ما ارورهایی (error) دارند. این ارورها ممکن است به دلیل اشتباهات ما، ورودی غیر منتظره کاربر، پاسخ نادرست سرور و هزاران دلیل دیگر رخ بدهند.

معمولا، هنگامی که اروری رخ می‌دهد اسکریپت می‌میرد (بلافاصله متوقف می‌شود) و آن را در کنسول چاپ می‌کند.

اما یک ساختار سینتکسی `try...catch` وجود دارد که به ما این امکان را می‌دهد که ارورها را «بگیریم (catch)» تا اسکریپت، به جای مردن، بتواند کاری منطقی‌تر انجام دهد.

## سینتکس "try...catch"

ساختار `try...catch` دو بلوک اصلی دارد: `try` و سپس `catch`:

```js
try {

  // ...کد

} catch (err) {

  // مدیریت ارور

}
```

این سینتکس اینگونه کار می‌کند:

1. ابتدا، کد درون `try {...}` اجرا می‌شود.
2. اگر اروری وجود نداشت، سپس `catch (err)` نادیده گرفته می‌شود: اجرای برنامه به انتهای `try` می‌رسد و با گذشتن از `catch` ادامه می‌یابد.
3. اگر اروری رخ دهد، سپس اجرای `try` متوقف شده و کنترل برنامه به ابتدای `catch (err)` می‌رود. متغیر `err` (می‌توانیم هر نامی برای آن استفاده کنیم) شامل شیء اروری حاوی جزئیاتی درباره چیزی که اتفاق افتاده است.

![](try-catch-flow.svg)

پس یک ارور درون بلوک `try {...}` اسکریپت را نمی‌کشد -- ما شانسی برای مدیریت آن درون `catch` داریم.

بیایید به چند مثال نگاهی بیاندازیم.

- یک مثال بدون ارور: `alert` خطوط `(1)` و `(2)` را نشان می‌دهد:

    ```js run
    try {

      alert('ابتدای try اجرا می‌شود');  // *!*(1) <--*/!*

      // اروری اینجا وجود ندارد...

      alert('انتهای try اجرا می‌شود');   // *!*(2) <--*/!*

    } catch (err) {

      alert('نادیده گرفته می‌شود چون اروری وجود ندارد Catch'); // (3)

    }
    ```
- مثالی شامل یک ارور: خطوط `(1)` و `(3)` را نمایش می‌دهد:

    ```js run
    try {

      alert('ابتدای try اجرا می‌شود');  // *!*(1) <--*/!*

    *!*
      lalala; // !ارور، متغیر تعریف نشده است
    */!*

      alert('(هیچ گاه به اینجا نمی‌رسد) try انتهای');  // (2)

    } catch (err) {

      alert(`ارور رخ داد!`); // *!*(3) <--*/!*

    }
    ```


````warn header="`try...catch` فقط برای ارورهای هنگام اجرای برنامه کار می‌کند"
برای اینکه `try...catch` کار کند، کد باید قابل اجرا باشد. به عبارتی دیگر، باید کد جاوااسکریپت معتبر باشد.

اگر کد از لحاظ سینتکسی غلط باشد کار نمی‌کند، برای مثال اگر آکولادهای بی‌همتا داشته باشد:

```js run
try {
  {{{{{{{{{{{{
} catch (err) {
  alert("موتور جاوااسکریپت نمی‌تواند این کد را متوجه شود. این کد نامعتبر است.");
}
```

موتور جاوااسکریپت ابتدا کد را می‌خواند و سپس آن را اجرا می‌کند. ارورهایی که در فاز خواندن رخ می‌دهند، ارورهای «زمان تجزیه (parse-time errors)» نامیده می‌شوند و قابل پوشش نیستند (از درون همان کد). به این دلیل که موتور نمی‌تواند کد را متوجه شود.

پس `try...catch` تنها می‌تواند ارورهایی که در کد معتبر رخ می‌دهند را مدیریت کند. چنین ارورهایی «ارورهای هنگام اجرا (runtime errors)» یا گاهی اوقات «استثناها (exceptions)» نامیده می‌شوند.
````


````warn header="`try...catch` به صورت همگام کار می‌کند"
اگر یک استثناء در کدی «برنامه‌ریزی شده» رخ دهد، مثلا در `setTimeout`، سپس `try...catch` آن را نمی‌گیرد:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // اسکریپت اینجا می‌میرد
  }, 1000);
} catch (err) {
  alert( "کار نخواهد کرد" );
}
```

به این دلیل که خود تابع بعدا اجرا می‌شود، زمانی که موتور ساختار `try...catch` را پشت سر گذاشته است.

برای اینکه استثناء را درون یک تابع برنامه‌ریزی شده بگیریم، `try...catch` باید درون آن تابع باشد:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // !ارور را مدیریت می‌کند try...catch
  } catch {
    alert( "ارور اینجا گرفته می‌شود!" );
  }
}, 1000);
```
````

## شیء Error

زمانی که یک ارور رخ می‌دهد، جاوااسکریپت شیءای حاوی جزئیاتی درباره آن را ایجاد می‌کند. این شیء به عنوان آرگومان به `catch` پاس داده می‌شود:

```js
try {
  // ...
} catch (err) { // <-- استفاده کنیم err این «شیء ارور» است، می‌توانستیم از کلمه‌ای دیگر به جای
  // ...
}
```

برای تمام ارورهای درون‌ساخت، شیء ارور دو ویژگی اصلی دارد:

`name`
: اسم ارور. برای مثال، برای یک متغیر تعریف نشده برابر با `"ReferenceError"` است.

`message`
: پیام متنی درباره جزئیات ارور.

در اکثر محیط‌ها ویژگی‌های غیر استاندارد دیگر هم وجود دارد. یکی از ویژگی‌هایی که به طور گسترده استفاده و پشتیبانی می‌شود:

`stack`
: پشته فراخوانی کنونی: رشته‌ای حاوی اطلاعاتی درباره دنباله فراخوانی‌هایی که موجب رخ دادن ارور شدند. برای اهداف اشکال‌زدایی استفاده می‌شود.

برای مثال:

```js run untrusted
try {
*!*
  lalala; // !ارور، متغیر تعریف نشده است
*/!*
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...پشته فراخوانی‌ها)

  // می‌توانستیم ارور را به طور کامل هم نشان دهیم
  // به رشته تبدیل می‌شود «name: message» ارور به صورت
  alert(err); // ReferenceError: lalala is not defined
}
```

## پیوند اختیاری «catch»

[recent browser=new]

اگر ما به جزئیات ارور نیازی نداریم، `catch` می‌تواند آن را حذف کند:

```js
try {
  // ...
} catch { // <-- (err) بدون
  // ...
}
```

## استفاده از "try...catch"

بیایید یک مورد استفاده از `try...catch` را در دنیای واقعی ببینیم.

همانطور که از قبل می‌دانیم، جاوااسکریپت از متد [JSON.parse(str)](mdn:js/JSON/parse) برای خواندن مقدارهایی که به صورت جی‌سان کدگذاری شده‌اند پشتیبانی می‌کند.

این متد معمولا برای کدبرداری داده‌ای که از طریق شبکه دریافت شده است، از سرور یا منبعی دیگر، استفاده می‌شود.

ما داده را دریافت می‌کنیم و `JSON.parse` را اینگونه فراخوانی می‌کنیم:

```js run
let json = '{"name":"John", "age": 30}'; // داده دریافت شده از سرور

*!*
let user = JSON.parse(json); // تبدیل نمایش متنی به شیء جاوااسکریپت
*/!*

// شیءای حاوی ویژگی‌های دریافت شده از رشته است user حالا
alert( user.name ); // John
alert( user.age );  // 30
```

شما می‌توانید در فصل <info:json> اطلاعاتی با جزئیات بیشتر درباره جی‌سان پیدا کنید.

**اگر `json` شکل درستی نداشته باشد، `JSON.parse` یک ارور ایجاد می‌کند، پس اسکریپت «می‌میرد».**

آیا ما باید به آن راضی باشیم؟ قطعا نه!

اینگونه، اگر داده مشکلی داشته باشد، بازدید کننده هرگز آن را نخواهد دانست (مگر اینکه آن‌ها کنسول توسعه‌دهنده را باز کنند). و مردم چیزی که بدون پیام اروری «می‌میرد» را دوست ندارند.

بیایید از `try...catch` برای مدیریت ارور استفاده کنیم:

```js run
let json = "{ bad json }";

try {

*!*
  let user = JSON.parse(json); // <-- ...زمانی که اروری رخ می‌دهد
*/!*
  alert( user.name ); // کار نمی‌کند

} catch (err) {
*!*
  // اجرای برنامه به اینجا می‌پرد...
  alert( "پوزش می‌خواهیم، داده دارای ارور است، ما سعی خواهیم کرد یک بار دیگر برای آن درخواست کنیم." );
  alert( err.name );
  alert( err.message );
*/!*
}
```

اینجا ما از بلوک `catch` فقط برای نمایش پیام استفاده می‌کنیم، اما می‌توانیم کارهای بیشتری انجام دهیم: یک درخواست شبکه جدید ارسال کنیم، یک راه جایگزین به بازدیدکننده پیشنهاد کنیم، اطلاعاتی درباره ارور را به logging facility ارسال کنیم و... . هر چیزی از مردن بهتر است.

## پرتاب ارورهای خودمان

اگر `json` از لحاظ سینتکس درست باشد اما ویژگی مورد نیاز `name` را نداشته باشد چه؟

مثل اینجا:

```js run
let json = '{ "age": 30 }'; // داده ناقض

try {

  let user = JSON.parse(json); // <-- اروری وجود ندارد
*!*
  alert( user.name ); // !وجود ندارد name ویژگی
*/!*

} catch (err) {
  alert( "اجرا نمی‌شود" );
}
```

اینجا `JSON.parse` به صورت طبیعی اجرا می‌شود اما در واقع نبودن `name` برای ما یک ارور است.

برای یکی کردن مدیریت ارور، ما از عملگر `throw` استفاده می‌کنیم.

### عملگر «Throw»

عملگر `throw` (به معنی پرتاب کردن) یک ارور ایجاد می‌کند.

سینتکس آن:

```js
throw <error object>
```

از لحاظ فنی ما می‌توانیم از هر چیزی به عنوان شیء ارور استفاده کنیم. حتی ارور می‌تواند یک مقدار اصلی باشد،مثل یک عدد یا رشته، اما بهتر است از شیءها استفاده کنیم که ترجیحا ویژگی‌های `name` و `message` را داشته باشند (برای اینکه تا حدی با ارورهای درون‌ساخت سازگار باشند).

جاوااسکریپت تابع‌های سازنده درون‌ساخت زیادی برای ارورهای استاندارد دارد: `Error`، `SyntaxError`، `ReferenceError`، `TypeError` و بقیه آن‌ها. ما می‌توانیم از آن‌ها برای ایجاد شیءهای ارور هم استفاده کنیم.

سینتکس آن‌ها:

```js
let error = new Error(message);
// یا
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

برای ارور‌های درون‌ساخت (نه برای هر شیءای، فقط برای ارورها)، ویژگی `name` دقیقا اسم سازنده است. و `message` از آرگومان گرفته می‌شود.

برای مثال:

```js run
let error = new Error("اتفاقاتی رخ می‌دهد o_O");

alert(error.name); // Error
alert(error.message); // o_O اتفاقاتی رخ می‌دهد
```

بیایید ببینیم `JSON.parse` چه نوع اروری ایجاد می‌کند:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch (err) {
*!*
  alert(err.name); // SyntaxError
*/!*
  alert(err.message); // Unexpected token b in JSON at position 2
}
```

همانطور که می‌بینیم یک `SyntaxError` است.

و در این مورد ما، نبودن `name` یک ارور است چون کاربران باید یک `name` داشته باشند.

پس بیایید آن را throw کنیم:

```js run
let json = '{ "age": 30 }'; // داده ناقص

try {

  let user = JSON.parse(json); // <-- اروری وجود ندارد

  if (!user.name) {
*!*
    throw new SyntaxError("Incomplete data: no name"); // (*)
*/!*
  }

  alert( user.name );

} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}
```

در خط `(*)`، عملگر `throw` با `message` داده شده یک `SyntaxError` ایجاد می‌کند، به همان شیوه که جاوااسکریپت خودش این ارور را ایجاد می‌کند. اجرای `try` بلافاصله متوقف می‌شود و کنترل به `catch` می‌پرد.

حالا `catch` به جایی برای مدیریت تمام ارورها تبدیل شد: هم برای JSON.parse` و هم برای موارد دیگر.

## Rethrowing

In the example above we use `try...catch` to handle incorrect data. But is it possible that *another unexpected error* occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just this "incorrect data" thing.

For example:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {
  user = JSON.parse(json); // <-- forgot to put "let" before user

  // ...
} catch (err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (no JSON Error actually)
}
```

Of course, everything's possible! Programmers do make mistakes. Even in open-source utilities used by millions for decades -- suddenly a bug may be discovered that leads to terrible hacks.

In our case, `try...catch` is placed to catch "incorrect data" errors. But by its nature, `catch` gets *all* errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That's wrong and also makes the code more difficult to debug.

To avoid such problems, we can employ the "rethrowing" technique. The rule is simple:

**Catch should only process errors that it knows and "rethrow" all others.**

The "rethrowing" technique can be explained in more detail as:

1. Catch gets all errors.
2. In the `catch (err) {...}` block we analyze the error object `err`.
3. If we don't know how to handle it, we do `throw err`.

Usually, we can check the error type using the `instanceof` operator:

```js run
try {
  user = { /*...*/ };
} catch (err) {
*!*
  if (err instanceof ReferenceError) {
*/!*
    alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
  }
}
```

We can also get the error class name from `err.name` property. All native errors have it. Another option is to read `err.constructor.name`.

In the code below, we use rethrowing so that `catch` only handles `SyntaxError`:

```js run
let json = '{ "age": 30 }'; // incomplete data
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

*!*
  blabla(); // unexpected error
*/!*

  alert( user.name );

} catch (err) {

*!*
  if (err instanceof SyntaxError) {
    alert( "JSON Error: " + err.message );
  } else {
    throw err; // rethrow (*)
  }
*/!*

}
```

The error throwing on line `(*)` from inside `catch` block "falls out" of `try...catch` and can be either caught by an outer `try...catch` construct (if it exists), or it kills the script.

So the `catch` block actually handles only errors that it knows how to deal with and "skips" all others.

The example below demonstrates how such errors can be caught by one more level of `try...catch`:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
*!*
      throw err; // rethrow (don't know how to deal with it)
*/!*
    }
  }
}

try {
  readData();
} catch (err) {
*!*
  alert( "External catch got: " + err ); // caught it!
*/!*
}
```

Here `readData` only knows how to handle `SyntaxError`, while the outer `try...catch` knows how to handle everything.

## try...catch...finally

Wait, that's not all.

The `try...catch` construct may have one more code clause: `finally`.

If it exists, it runs in all cases:

- after `try`, if there were no errors,
- after `catch`, if there were errors.

The extended syntax looks like this:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!* (err) {
   ... handle errors ...
} *!*finally*/!* {
   ... execute always ...
}
```

Try running this code:

```js run
try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

The code has two ways of execution:

1. If you answer "Yes" to "Make an error?", then `try -> catch -> finally`.
2. If you say "No", then `try -> finally`.

The `finally` clause is often used when we start doing something and want to finalize it in any case of outcome.

For instance, we want to measure the time that a Fibonacci numbers function `fib(n)` takes. Naturally, we can start measuring before it runs and finish afterwards. But what if there's an error during the function call? In particular, the implementation of `fib(n)` in the code below returns an error for negative or non-integer numbers.

The `finally` clause is a great place to finish the measurements no matter what.

Here `finally` guarantees that the time will be measured correctly in both situations -- in case of a successful execution of `fib` and in case of an error in it:

```js run
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "error occurred");

alert( `execution took ${diff}ms` );
```

You can check by running the code with entering `35` into `prompt` -- it executes normally, `finally` after `try`. And then enter `-1` -- there will be an immediate error, and the execution will take `0ms`. Both measurements are done correctly.

In other words, the function may finish with `return` or `throw`, that doesn't matter. The `finally` clause executes in both cases.


```smart header="Variables are local inside `try...catch...finally`"
Please note that `result` and `diff` variables in the code above are declared *before* `try...catch`.

Otherwise, if we declared `let` in `try` block, it would only be visible inside of it.
```

````smart header="`finally` and `return`"
The `finally` clause works for *any* exit from `try...catch`. That includes an explicit `return`.

In the example below, there's a `return` in `try`. In this case, `finally` is executed just before the control returns to the outer code.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (err) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // first works alert from finally, and then this one
```
````

````smart header="`try...finally`"

The `try...finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.

```js
function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}
```
In the code above, an error inside `try` always falls out, because there's no `catch`. But `finally` works before the execution flow leaves the function.
````

## Global catch

```warn header="Environment-specific"
The information from this section is not a part of the core JavaScript.
```

Let's imagine we've got a fatal error outside of `try...catch`, and the script died. Like a programming error or some other terrible thing.

Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don't see error messages), etc.

There is none in the specification, but environments usually provide it, because it's really useful. For instance, Node.js has [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) for that. And in the browser we can assign a function to the special [window.onerror](mdn:api/GlobalEventHandlers/onerror) property, that will run in case of an uncaught error.

The syntax:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Error message.

`url`
: URL of the script where error happened.

`line`, `col`
: Line and column numbers where error happened.

`error`
: Error object.

For instance:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // Whoops, something went wrong!
  }

  readData();
</script>
```

The role of the global handler `window.onerror` is usually not to recover the script execution -- that's probably impossible in case of programming errors, but to send the error message to developers.

There are also web-services that provide error-logging for such cases, like <https://errorception.com> or <http://www.muscula.com>.

They work like this:

1. We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
2. That JS script sets a custom `window.onerror` function.
3. When an error occurs, it sends a network request about it to the service.
4. We can log in to the service web interface and see errors.

## Summary

The `try...catch` construct allows to handle runtime errors. It literally allows to "try" running the code and "catch" errors that may occur in it.

The syntax is:

```js
try {
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // do in any case after try/catch
}
```

There may be no `catch` section or no `finally`, so shorter constructs `try...catch` and `try...finally` are also valid.

Error objects have following properties:

- `message` -- the human-readable error message.
- `name` -- the string with error name (error constructor name).
- `stack` (non-standard, but well-supported) -- the stack at the moment of error creation.

If an error object is not needed, we can omit it by using `catch {` instead of `catch (err) {`.

We can also generate our own errors using the `throw` operator. Technically, the argument of `throw` can be anything, but usually it's an error object inheriting from the built-in `Error` class. More on extending errors in the next chapter.

*Rethrowing* is a very important pattern of error handling: a `catch` block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn't know.

Even if we don't have `try...catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
