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

## Using "func.call" for the context

The caching decorator mentioned above is not suited to work with object methods.

For instance, in the code below `worker.slow()` stops working after the decoration:

```js run
// we'll make worker.slow caching
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // scary CPU-heavy task here  
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// same code as before
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

alert( worker.slow(1) ); // the original method works

worker.slow = cachingDecorator(worker.slow); // now make it caching

*!*
alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
*/!*
```

The error occurs in the line `(*)` that tries to access `this.someMethod` and fails. Can you see why?

The reason is that the wrapper calls the original function as `func(x)` in the line `(**)`. And, when called like that, the function gets `this = undefined`.

We would observe a similar symptom if we tried to run:

```js
let func = worker.slow;
func(2);
```

So, the wrapper passes the call to the original method, but without the context `this`. Hence the error.

Let's fix it.

There's a special built-in function method [func.call(context, ...args)](mdn:js/Function/call) that allows to call a function explicitly setting `this`.

The syntax is:

```js
func.call(context, arg1, arg2, ...)
```

It runs `func` providing the first argument as `this`, and the next as the arguments.

To put it simply, these two calls do almost the same:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

They both call `func` with arguments `1`, `2` and `3`. The only difference is that `func.call` also sets `this` to `obj`.

As an example, in the code below we call `sayHi` in the context of different objects: `sayHi.call(user)` runs `sayHi` providing `this=user`, and the next line sets `this=admin`:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

And here we use `call` to call `say` with the given context and phrase:


```js run
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user becomes this, and "Hello" becomes the first argument
say.call( user, "Hello" ); // John: Hello
```

In our case, we can use `call` in the wrapper to pass the context to the original function:

```js run
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
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
    let result = func.call(this, x); // "this" is passed correctly now
*/!*
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // now make it caching

alert( worker.slow(2) ); // works
alert( worker.slow(2) ); // works, doesn't call the original (cached)
```

Now everything is fine.

To make it all clear, let's see more deeply how `this` is passed along:

1. After the decoration `worker.slow` is now the wrapper `function (x) { ... }`.
2. So when `worker.slow(2)` is executed, the wrapper gets `2` as an argument and `this=worker` (it's the object before dot).
3. Inside the wrapper, assuming the result is not yet cached, `func.call(this, x)` passes the current `this` (`=worker`) and the current argument (`=2`) to the original method.

## Going multi-argument

Now let's make `cachingDecorator` even more universal. Till now it was working only with single-argument functions.

Now how to cache the multi-argument `worker.slow` method?

```js
let worker = {
  slow(min, max) {
    return min + max; // scary CPU-hogger is assumed
  }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);
```

Previously, for a single argument `x` we could just `cache.set(x, result)` to save the result and `cache.get(x)` to retrieve it. But now we need to remember the result for a *combination of arguments* `(min,max)`. The native `Map` takes single value only as the key.

There are many solutions possible:

1. Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys.
2. Use nested maps: `cache.set(min)` will be a `Map` that stores the pair `(max, result)`. So we can get `result` as `cache.get(min).get(max)`.
3. Join two values into one. In our particular case we can just use a string `"min,max"` as the `Map` key. For flexibility, we can allow to provide a *hashing function* for the decorator, that knows how to make one value from many.

For many practical applications, the 3rd variant is good enough, so we'll stick to it.

Also we need to pass not just `x`, but all arguments in `func.call`. Let's recall that in a `function()` we can get a pseudo-array of its arguments as `arguments`, so `func.call(this, x)` should be replaced with `func.call(this, ...arguments)`.

Here's a more powerful `cachingDecorator`:

```js run
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
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

alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)
```

Now it works with any number of arguments (though the hash function would also need to be adjusted to allow any number of arguments. An interesting way to handle this will be covered below).

There are two changes:

- In the line `(*)` it calls `hash` to create a single key from `arguments`. Here we use a simple "joining" function that turns arguments `(3, 5)` into the key `"3,5"`. More complex cases may require other hashing functions.
- Then `(**)` uses `func.call(this, ...arguments)` to pass both the context and all arguments the wrapper got (not just the first one) to the original function.

## func.apply

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](mdn:js/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args);
func.apply(context, args);
```

They perform the same call of `func` with given context and arguments.

There's only a subtle difference regarding `args`:

- The spread syntax `...` allows to pass *iterable* `args` as the list to `call`.
- The `apply` accepts only *array-like* `args`.

...And for objects that are both iterable and array-like, such as a real array, we can use any of them, but `apply` will probably be faster, because most JavaScript engines internally optimize it better.

Passing all arguments along with the context to another function is called *call forwarding*.

That's the simplest form of it:

```js
let wrapper = function() {
  return func.apply(this, arguments);
};
```

When an external code calls such `wrapper`, it is indistinguishable from the call of the original function `func`.

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
