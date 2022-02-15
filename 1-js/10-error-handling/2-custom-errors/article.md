# ارورهای شخصی‌سازی شده، تعمیم دادن Error

زمانی که ما چیزی را توسعه می‌دهیم، اغلب اوقات به کلاس‌های ارور خودمان برای بازتاب دادن اشتباهات خاصی که ممکن است در کارهایمان رخ دهند نیاز داریم. برای ارورهای درون عملیات شبکه‌ای ممکن است به `HttpError` نیاز داشته باشیم، برای عملیات پایگاه داده به `DbError`، برای عملیات جستجو به `NotFoundError` و غیره.

ارورهای ما باید از ویژگی‌های اولیه ارور مانند `message`، `name` و ترجیحا `stack` هم پشتیبانی کنند. اما آن‌ها ممکن است ویژگی‌های خود را داشته باشند، برای مثال شیءهای `HttpError` ممکن است ویژگی `statusCode` را با مقداری مانند `404` یا `403` یا `500` داشته باشند.

جاوااسکریپت اجازه می‌دهد که از `throw` همراه با هر آرگومانی استفاده کنیم، پس از لحاظ فنی ارورهای شخصی‌سازی شده ما نیازی ندارند که از `Error` ارث‌بری کنند. اما اگر ما از آن ارث‌بری کنیم، سپس استفاده از `obj instanceof Error` برای شناسایی شیءهای ارور ممکن می‌شود. پس بهتر است از آن ارث‌بری کنیم. 

همانطور که برنامه رشد می‌کند، طبیعتا ارورهای ما یک سلسه مراتب تشکیل می‌دهند. برای مثال، `HttpTimeoutError` ممکن است از `HttpError` ارث‌بری کند و همینطور ادامه داشته باشد.

## تعمیم دادن Error

به عنوان یک مثال، بیایید تابع `readUser(json)` را در نظر بگیریم که جی‌سان حاوی داده کاربر را می‌خواند.

اینجا مثالی از اینکه یک `json` معتبر چگونه است داریم:
```js
let json = `{ "name": "John", "age": 30 }`;
```

از درون، ما از `JSON.parse` استفاده خواهیم کرد. اگر این متد یک `json` ناقص را دریافت کند، سپس `SyntaxError` پرتاب می‌کند. اما اگر `json` از لحاظ سینتکس درست باشد به معنی یک کاربر معتبر نیست نه؟ ممکن است که داده مهم را نداشته باشد. برای مثال، ممکن است ویژگی‌های `name` و `age` که برای کاربران ما ضروری است را نداشته باشد.

تابع `readUser(json)` نه تنها جی‌سان را می‌خواند بلکه داده را بررسی («اعتبارسنجی») می‌کند. اگر فیلدهای مورد نیاز وجود نداشته باشند یا شکل اشتباه باشد، پس یک ارور داریم. و این یک `SyntaxError` نیست چون داده از لحاظ سینتکس درست است بلکه نوع دیگری از ارور است. ما به آن `ValidationError` (ارور اعتبارسنجی) می‌گوییم و برای آن یک کلاس می‌سازیم. یک ارور از این نوع باید اطلاعاتی درباره فیلد متخلف را داشته باشد.

کلاس `ValidationError` ما باید از کلاس `Error` ارث‌بری کند.

کلاس `Error` درون‌ساخت است اما اینجا کد تقریبی آن را داریم تا بتوانیم متوجه شویم که چه چیزی را تعمیم می‌دهیم:

```js
// درون‌ساخت که توسط خود جاوااسکریپت تعریف شده است Error یک «شبه کد» برای کلاس
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (اسم‌های متفاوت برای کلاس‌های ارور درون‌ساخت متفاوت)
    this.stack = <call stack>; // غیر استاندارد، اما اکثر محیط‌های اجرا از آن پشتیبانی می‌کنند
  }
}
```

حالا بیایید با `ValidationError` آن را ارث‌بری کنیم و در عمل امتحانش کنیم:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // لیستی از فراخوانی‌های تودرتو با شماره خطوط برای هر کدام از آن‌ها
}
```

لطفا توجه کنید: در خط `(1)` ما تابع سازنده والد را فراخوانی می‌کنیم. جاوااسکریپت از ما می‌خواهد که `super` را درون تابع سازنده فرزند فراخوانی کنیم پس این موضوع الزامی است. تابع سازنده والد ویژگی `message` را تنظیم می‌کند.

تابع سازنده والد همچنین ویژگی `name` را برابر با `"Error"` قرار می‌دهد پس در خط `(2)` ما آن را به مقدار درستش برمی‌گردانیم.

بیایید در `readUser(json)` از آن استفاده کنیم:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// کاربرد
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// try..catch مثال عملی با

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("داده نامعتبر: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("ارور سینتکس جی‌سان: " + err.message);
  } else {
    throw err; // کن rethrow ارور ناشناس، آن را (**)
  }
}
```

بلوک `try..catch` در کد بالا هم `ValidationError` ما و هم `SyntaxError` درون‌ساخت را از `JSON.parse` مدیریت می‌کند.

لطفا به اینکه ما چگونه از `instanceof` برای چک کردن یک نوع ارور خاص در خط `(*)` استفاده کردیم توجه کنید.

همچنین می‌توانستیم `err.name` را بررسی کنیم، مثلا اینگونه:

```js
// ...
// (err instanceof SyntaxError) به جای
} else if (err.name == "SyntaxError") { // (*)
// ...
```

نسخه `instanceof` خیلی بهتر است چون در آینده ما قرار است `ValidationError` را تعمیم دهیم، از آن انواع دیگر بسازیم، مثلا `PropertyRequiredError`. و بررسی `instanceof` برای کلاس‌های ارث‌بر جدید هم کار خواهد کرد. پس این روش بعید است که منسوخ شود.

همچنین مهم است که اگر `catch` یک ارور ناشناس را ملاقات کند، در خط `(**)` آن را rethrow کند. بلوک `catch` فقط می‌داند که چگونه ارورهای سینتکس و اعتبارسنجی را مدیریت کند، انواع دیگر (که به خاطر یک غلط املایی در کد یا هر دلیل دیگری ایجاد شده‌اند) باید از آن بیرون بیافتند.

## Further inheritance

The `ValidationError` class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for `age` instead of a number). Let's make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that's missing.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

The new class `PropertyRequiredError` is easy to use: we only need to pass the property name: `new PropertyRequiredError(property)`. The human-readable `message` is generated by the constructor.

Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.

Let's call it `MyError`.

Here's the code with `MyError` and other custom error classes, simplified:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Now custom errors are much shorter, especially `ValidationError`, as we got rid of the `"this.name = ..."` line in the constructor.

## Wrapping exceptions

The purpose of the function `readUser` in the code above is "to read the user data". There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but in the future `readUser` function may grow and probably generate other kinds of errors.

The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:

```js
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.

Here's the code that defines `ReadError` and demonstrates its use in `readUser` and `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

In the code above, `readUser` works exactly as described -- catches syntax and validation errors and throws `ReadError` errors instead (unknown errors are rethrown as usual).

So the outer code checks `instanceof ReadError` and that's it. No need to list all possible error types.

The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.

## Summary

- We can inherit from `Error` and other built-in error classes normally. We just need to take care of the `name` property and don't forget to call `super`.
- We can use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there's no easy way to get its class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
