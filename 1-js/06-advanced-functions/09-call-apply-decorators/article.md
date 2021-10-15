# دکوراتورها و ارسال کردن، متدهای call/apply

هنگام کار کردن با تابع‌ها، جاوااسکریپت انعطاف‌پذیری بی‌نظیری را ارائه می‌دهد. تابع‌ها می‌توانند رد و بدل شوند، به عنوان شیء استفاده شوند و حالا ما خواهیم دید که چگونه فراخوانی‌ها را بین تابع‌ها *ارسال کنیم* و *رفتار* آن‌ها را *تغییر دهیم*.

## کش کردن پنهانی

فرض کنیم تابع `slow(x)` را داریم که از پردازنده خیلی کار می‌کشد اما نتیجه‌های آن همیشه ثابت هستند. به عبارتی دیگر، برای `x` یکسان همیشه نتیجه‌ای یکسان را برمی‌گردند.

اگر تابع زیاد فراخوانی می‌شود، ممکن است بخواهیم که نتیجه‌ها را کَش کنیم (به یاد بسپاریم) تا از مصرف زمان اضافی برای محاسبات دوباره جلوگیری کنیم.

اما به جای اینکه این قابلیت را به `slow(x)` اضافه کنیم یک تابع دربرگیرنده (wrapper) می‌سازیم که کش کردن را اضافه می‌کند. همانطور که خواهیم دید، مزایای زیادی از انجام این کار دریافت می‌کنیم.

کد اینگونه است و توضیحات به دنبال آن:

```js run
function slow(x) {
  // اینجا می‌تواند یک کاری که پردازنده را زیاد مشغول می‌کند وجود داشته باشد
  alert(`با ${x} فراخوانی شد`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // وجود داشت cache اگر چنین کلیدی در
      return cache.get(x); // نتیجه را از آن بخوان
    }

    let result = func(x);  // را فراخوانی کن func در غیر این صورت

    cache.set(x, result);  // و نتیجه را کش کن (به خاطر بسپار)
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // کش شده و نتیجه آن برگردانده شد slow(1)
alert( "Again: " + slow(1) ); // از کش برگردانده شد slow(1) نتیجه

alert( slow(2) ); // کش شده و نتیجه آن برگردانده شد slow(2)
alert( "Again: " + slow(2) ); // از کش برگردانده شد slow(2) نتیجه
```

در کد بالا `cachingDecorator` یک *دکوراتور* است: تابعی خاص که یک تابع دیگر را دریافت می‌کند و رفتار آن را تغییر می‌دهد. 

ایده این است که ما می‌توانیم `cachingDecorator` را برای هر تابعی فراخوانی کنیم و این تابع، دربرگیرنده کش‌کننده را برمی‌گرداند. این عالی است چون ما می‌توانیم تابع‌های زیادی داشته باشیم که از چنین خاصیتی استفاده کنند و تنها کاری که ما باید انجام دهیم، اعمال `cachingDecorator` روی آن‌ها است.

با جدا کردن کش کردن از کد تابع اصلی، ما کد اصلی را هم ساده‌تر نگه داشتیم.

نتیجه‌ی `cachingDecorator(func)` یک «دربرگیرنده» است: تابع `function(x)` که فراخوانی `func(x)` را در منطق کش کردن «می‌پوشاند»:

![](decorator-makecaching-wrapper.svg)

از یک کد بیرونی، تابع `slow` دربر گرفته شده کار یکسانی انجام می‌دهد. فقط یک جنبه کش کردن به رفتار این تابع اضافه شده است.

برای خلاصه‌سازی، چند مزیت در استفاده کردن از یک `cachingDecorator` به صورت جداگانه به جای تغییر کد خود `slow` وجود دارد:

- تابع `cachingDecorator` را می‌توان دوباره استفاده کرد. ما می‌توانیم آن را روی تابع دیگری هم اعمال کنیم.
- منطق کش کردن جدا است، این منطق پیچیدگی خود `slow` را افزایش نداد (اگر وجود داشت).
- اگر نیاز باشد ما می‌توانیم چند دکوراتور را ترکیب کنیم (دکوراتورهای دیگر دنبال خواهند کرد).

## استفاده از "func.call" برای زمینه

دکوراتور کش کردن که در بالا گفته شد برای کار با متدهای شیء مناسب نیست.

برای مثال، در کد پایین `worker.slow()` بعد از دکور کردن کار نمی‌کند:

```js run
// کش کند worker.slow کاری خواهیم کرد که
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {  
    // کاری که به پردازنده خیلی فشار می‌آورد را اینجا داریم
    alert("فراخوانی شده با " + x);
    return x * this.someMethod(); // (*)
  }
};

// کد یکسان قبلی
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func(x); // (**)
*/!*
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // متد اصلی کار می‌کند

worker.slow = cachingDecorator(worker.slow); // حالا کاری می‌کنیم که کش کند

*!*
alert( worker.slow(2) ); // Error: Cannot read property 'someMethod' of undefined !وای یک ارور
*/!*
```

ارور در خط `(*)` اتفاق می‌افتد، خطی که تلاش می‌کند به `this.someMethod` دسترسی پیدا کند و شکست می‌خورد. می‌توانید ببینید چرا؟

دلیلش این است که دربرگیرنده تابع اصلی را به عنوان `func(x)` در خط `(**)` فراخوانی می‌کند. و زمانی که اینگونه فرا خواند، تابع `this = undefined` را دریافت می‌کند.

اگر سعی می‌کردیم که این را اجرا کنیم هم مشکل یکسانی پیش می‌آمد:

```js
let func = worker.slow;
func(2);
```

پس دربرگیرنده فراخوانی را به متد اصلی می‌فرستد اما بدون زمینه `this`. به همین دلیل ارور ایجاد می‌شود.

بیایید این را درست کنیم.

یک متد درون ساخت خاص برای تابع‌ها وجود دارد به نام [func.call(context, ...args)](mdn:js/Function/call) که به ما این امکان را می‌دهد تا به صراحت با تنظیم کردن `this` یک تابع را فرا بخوانیم.

سینتکس اینگونه است:

```js
func.call(context, arg1, arg2, ...)
```

این متد با دریافت اولین آرگومان به عنوان `this` و بقیه آن‌ها به عنوان آرگومان‌های تابع `func` را اجرا می‌کند.

برای اینکه ساده بگوییم، این دو فراخوانی تقریبا کار یکسانی را انجام می‌دهند:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

هر دوی آن‌ها `func` را با آرگومان‌های `1`، `2` و `3` فراخوانی می‌کنند. تنها تفاوت این است که `func.call` مقدار `this` را هم برابر با `obj` قرار می‌دهد.

به عنوان مثال، در کد پایین ما `sayHi` را با زمینه‌های مختلفی از شیءها فراخوانی می‌کنیم: `sayHi.call(user)` تابع `sayHi` را با تنظیم کردن `this=user` اجرا می‌کند و خط بعدی `this=admin` را تنظیم می‌کند:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// استفاده کنید "this" برای قرار دادن شیءهای متفاوت به عنوان call از
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

و اینجا ما از `call` برای فراخوانی `say` همراه با زمینه و عبارت داده شده استفاده می‌کنیم:


```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// قرار می‌گیرد و "سلام" اولین آرگومان می‌شود this در user
say.call( user, "سلام" ); // John: سلام
```

در این مورد ما، می‌توانیم از `call` درون دربرگیرنده استفاده کنیم تا زمینه را در تابع اصلی تنظیم کنیم:

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("فراخوانی شده با " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
*!*
    let result = func.call(this, x); // به درستی قرار داده می‌شود "this" حالا
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // حالا کاری می‌کنیم که کش کند

alert( worker.slow(2) ); // کار می‌کند
alert( worker.slow(2) ); // کار می‌کند، تابع اصلی را فراخوانی نمی‌کند (کش شده است)
```

حالا همه چیز درست است.

برای اینکه همه چیز را روشن کنیم، بیایید عمیق‌تر ببینیم که `this` چگونه تنظیم شده است:

1. بعد از دکور کردن، `worker.slow` همان دربرگیرنده‌ی `function (x) { ... }` است.
2. پس زمانی که `worker.slow(2)` اجرا می‌شود، دربرگیرنده `2` را به عنوان آرگومان دریافت می‌کند و `this=worker` است (همان شیء قبل از نقطه).
3. درون دربرگیرنده، با فرض اینکه نتیجه هنوز کش نشده است، `func.call(this, x)` مقدار `this` کنونی (=`worker`) و آرگومان کنونی (`=2`) را در متد اصلی تنظیم می‌کند.

## چند آرگومانی شدن

حالا بیایید `cachingDecorator` را جامع‌تر کنیم. تا حالا فقط با تابع‌هایی که یک آرگومان داشتند کار می‌کرد.

حالا چگونه متد `worker.slow` که چند آرگومان دارد را کش کنیم؟

```js
let worker = {
  slow(min, max) {
    return min + max; // یک کاری که به پردازنده فشار می‌آورد
  }
};

// باید فراخوانی‌هایی که آرگومان‌های یکسانی دارند را یه خاطر بسپارد
worker.slow = cachingDecorator(worker.slow);
```

قبلا، برای یک آرگومان می‌توانستیم از `cache.set(x, result)` برای ذخیره نتیجه و `cache.get(x)` برای دریافت آن استفاده کنیم. اما حالا باید نتیجه را برای *ترکیبی از آرگومان‌ها*`(min,max)` ذخیره کنیم. ساختار `Map` فقط یک مقدار را به عنوان کلید دریافت می‌کند.

چند راه‌حل احتمالی وجود دارد:

1. یک ساختار داده جدید شبیه map پیاده‌سازی کنیم (یا از شخص ثالث استفاده کنیم) که همه‌کاره است و چندکلیدی را ممکن می‌سازد.
2. از mapهای پیچیده استفاده کنیم: `cache.set(min)` یک `Map` خواهد بود که جفت `(max, result)` را ذخیره می‌کند. پس ما می‌توانیم `result` را به صورت `cache.get(min).get(max)` دریافت کنیم.
3. دو مقدار را به یک مقدار تبدیل کنیم. در این مورد خاص، می‌توانیم از رشته `"min,max"` به عنوان کلید `Map` استفاده کنیم. برای انعطاف پذیری، می‌توانیم یک *تابع ترکیب‌سازی(hashing function)* برای دکوراتور تعیین کنیم که می‌داند چگونه از چند مقدار یک مقدار بدست آورد.

برای بسیاری از موارد عملی، نوع سوم به اندازه کافی مناسب است پس ما با همان کار می‌کنیم.

همچنین ما باید نه تنها `x` بلکه تمام آرگومان‌ها را در `func.call` قرار دهیم. بیایید یادآوری کنیم که در یک تابع `function()` می‌توانیم یک شبه‌آرایه از آرگومان‌های آن را با `arguments` دریافت کنیم پس `func.call(this, ...arguments)` باید جایگزین `func.call(this, x)` شود.

اینجا یک `cachingDecorator` قدرتمندتر داریم:

```js run
let worker = {
  slow(min, max) {
    alert(`فراخوانی شده با ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
*!*
    let key = hash(arguments); // (*)
*/!*
    if (cache.has(key)) {
      return cache.get(key);
    }

*!*
    let result = func.call(this, ...arguments); // (**)
*/!*

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // کار می‌کند
alert( "Again " + worker.slow(3, 5) ); // یکسان است (کش شده)
```

حالا این تابع با هر تعداد آرگومان کار می‌کند (گرچه تابع ترکیب‌سازی هم باید جوری تنظیم شود که هر تعداد آرگومان را قبول کند. یک راه جالب برای کنترل این موضوع پایین‌تر پوشش داده شده است).

دو تفاوت وجود دارد:

- در خط `(*)` این تابع، `hash` را فراخوانی می‌کند تا یک کلید را از `arguments` بسازد. اینجا ما از تابع ساده «پیوند دادن» استفاده کردیم که آرگومان‌های `(3, 5)` را به کلید `"3,5"` تبدیل می‌کند. موارد پیچیده‌تر ممکن است تابع‌های ترکیب‌سازی دیگری را نیاز داشته باشند.
- سپس خط `(**)` برای اینکه زمینه و تمام آرگومان‌هایی که دربرگیرنده دریافت کرد (نه فقط اولی) را در تابع اصلی قرار دهد از `func.call(this, ...arguments)` استفاده می‌کند.

## متد func.apply

می‌توانستیم به جای `func.call(this, ...arguments)` از `func.apply(this, arguments)` استفاده کنیم.

سینتکس متد درون‌ساخت [func.apply](mdn:js/Function/apply) اینگونه است:

```js
func.apply(context, args)
```

این متد با تنظیم کردن `this=context` و استفاده از شیء `args` به عنوان لیستی از آرگومان‌ها، تابع `func` را فراخوانی می‌کند.

تنها تفاوت بین `call` و `apply` این است که `call` لیستی از آرگومان‌ها را قبول می‌کند در حالی که `apply` یک شیء شبه‌آرایه که شامل آرگومان‌ها است را قبول می‌کند.

پس این دو فراخوانی تقریبا یکی هستند:

```js
func.call(context, ...args);
func.apply(context, args);
```

آن‌ها فراخوانی یکسانی از `func` همراه با زمینه و آرگومان‌های داده شده را انجام می‌دهند.

فقط یک تفاوت جزئی در مورد `args` وجود دارد:

- سینتکس اسپرد `...` به ما اجازه می‌دهد تا `args` *حلقه‌پذیر* را به عنوان لیست در `call` قرار دهیم.
- متد `apply` فقط `args` *شبه‌آرایه* را قبول می‌کند.

...و برای شیءهایی که هم حلقه‌پذیر و هم شبه‌آرایه هستند، مانند آرایه واقعی، ما می‌توانیم هر یک از آن‌ها را استفاده کنیم اما احتمالا `apply` سریع‌تر باشد چون بیشتر موتورهای جاوااسکریپت آن را از دورن بهتر بهینه کرده‌اند.

قرار دادن تمام آرگومان‌ها در کنار زمینه در تابعی دیگر را *ارسال کردن فراخوانی(call forwarding)* می‌گویند.

این ساده‌ترین شکل از آن است:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

زمانی که یک کد بیرونی این `wrapper` را فراخوانی کند، نمی‌توان آن را از فراخوانی تابع اصلی `func` تشخیص داد.

## Borrowing a method [#method-borrowing]

Now let's make one more minor improvement in the hashing function:

```js
function hash(args) {
  return args[0] + ',' + args[1];
}
```

As of now, it works only on two arguments. It would be better if it could glue any number of `args`.

The natural solution would be to use [arr.join](mdn:js/Array/join) method:

```js
function hash(args) {
  return args.join();
}
```

...Unfortunately, that won't work. Because we are calling `hash(arguments)`, and `arguments` object is both iterable and array-like, but not a real array.

So calling `join` on it would fail, as we can see below:

```js run
function hash() {
*!*
  alert( arguments.join() ); // Error: arguments.join is not a function
*/!*
}

hash(1, 2);
```

Still, there's an easy way to use array join:

```js run
function hash() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hash(1, 2);
```

The trick is called *method borrowing*.

We take (borrow) a join method from a regular array (`[].join`) and use `[].join.call` to run it in the context of `arguments`.

Why does it work?

That's because the internal algorithm of the native method `arr.join(glue)` is very simple.

Taken from the specification almost "as-is":

1. Let `glue` be the first argument or, if no arguments, then a comma `","`.
2. Let `result` be an empty string.
3. Append `this[0]` to `result`.
4. Append `glue` and `this[1]`.
5. Append `glue` and `this[2]`.
6. ...Do so until `this.length` items are glued.
7. Return `result`.

So, technically it takes `this` and joins `this[0]`, `this[1]` ...etc together. It's intentionally written in a way that allows any array-like `this` (not a coincidence, many methods follow this practice). That's why it also works with `this=arguments`.

## Decorators and function properties

It is generally safe to replace a function or a method with a decorated one, except for one little thing. If the original function had properties on it, like `func.calledCount` or whatever, then the decorated one will not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

E.g. in the example above if `slow` function had any properties on it, then `cachingDecorator(slow)` is a wrapper without them.

Some decorators may provide their own properties. E.g. a decorator may count how many times a function was invoked and how much time it took, and expose this information via wrapper properties.

There exists a way to create decorators that keep access to function properties, but this requires using a special `Proxy` object to wrap a function. We'll discuss it later in the article <info:proxy#proxy-apply>.

## Summary

*Decorator* is a wrapper around a function that alters its behavior. The main job is still carried out by the function.

Decorators can be seen as "features" or "aspects" that can be added to a function. We can add one or add many. And all this without changing its code!

To implement `cachingDecorator`, we studied methods:

- [func.call(context, arg1, arg2...)](mdn:js/Function/call) -- calls `func` with given context and arguments.
- [func.apply(context, args)](mdn:js/Function/apply) -- calls `func` passing `context` as `this` and array-like `args` into a list of arguments.

The generic *call forwarding* is usually done with `apply`:

```js
let wrapper = function() {
  return original.apply(this, arguments);
};
```

We also saw an example of *method borrowing* when we take a method from an object and `call` it in the context of another object. It is quite common to take array methods and apply them to `arguments`. The alternative is to use rest parameters object that is a real array.

There are many decorators there in the wild. Check how well you got them by solving the tasks of this chapter.
