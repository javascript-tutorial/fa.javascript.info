libs:
  - lodash

---

# پیوند تابع

زمانی که متدهای تابع را به عنوان callback پاس می‌دهیم، برای مثال به `setTimeout`، یک مشکل شناخته شده وجود دارد: «از دست دادن `this`».

در این فصل ما راه‌هایی را برای رفع آن خواهیم دید.

## از دست دادن "this"

ما از قبل درباره از دست دادن `this` مثال‌هایی را دیده‌ایم. زمانی که یک متد جایی به غیر از شیء خودش پاس داده شود، `this` از دست می‌رود.

چیزی که ممکن است با `setTimeout` اتفاق بیافتد اینجا آورده شده:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`سلام، ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // !undefined ،سلام
*/!*
```

همانطور که می‌بینیم، خروجی "John" را به عنوان `this.firstName` نشان نداد بلکه `undefined` را نمایش داد!

دلیلش این است که `setTimeout` تابع `user.sayHi` را جدای از شیء آن دریافت کرد. خط آخر می‌تواند اینگونه نوشته شود:

```js
let f = user.sayHi;
setTimeout(f, 1000); // را از دست داد user زمینه
```

روش `setTimeout` در مرورگر کمی خاص است: این تابع برای فراخوانی تابع `this=window` را تنظیم می‌کند (در Node.js، مقدار `this` شیء تایمر می‌شود اما اینجا خیلی مهم نیست). پس برای `this.firstName` این تابع تلاش می‌کند که `window.firstName` را دریافت کند، که وجود ندارد. در موارد مشابه دیگر، معمولا `this` برابر با `undefined` می‌شود.

کاری که انجام می‌شود کاملا معمولی است، ما می‌خواهیم یک متد شیء را جایی دیگر (اینجا، به زمان‌بند) که فراخوانی خواهد شد پاس دهیم. چگونه مطمئن شویم که با زمینه درست فراخوانی می‌شود؟

## راه‌حل 1: دربرگیرنده

ساده‌ترین راه‌حل استفاده از یک تابع دربرگیرنده است:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`سلام، ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // !John ،سلام
}, 1000);
*/!*
```

حالا کار می‌کند، چون `user` را از محیط لغوی بیرونی دریافت می‌کند و سپس به طور معمولی متد را فراخوانی می‌کند.

این یکسان اما کوتاه‌تر است:

```js
setTimeout(() => user.sayHi(), 1000); // !John ،سلام
```

مناسب بنظر می‌رسد اما یک آسیب‌پذیری جزئی ممکن است در ساختار کد ما نمایان شود.

اگر قبل از اینکه `setTimeout` فعال شود (تاخیر یک ثانیه‌ای وجود دارد!) `user` مقدارش تغییر کند چه؟ سپس ناگهان، شیء اشتباهی را فراخوانی می‌کند!

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`سلام، ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...در حین 1 ثانیه تغییر می‌کند user مقدار
user = {
  sayHi() { alert("!setTimeout دیگر در user یک"); }
};

// !setTimeout دیگر در user یک
```

راه‌حل بعدی تضمین می‌کند که چنین چیزی اتفاق نیافتد.

## Solution 2: bind

Functions provide a built-in method [bind](mdn:js/Function/bind) that allows to fix `this`.

The basic syntax is:

```js
// more complex syntax will come a little later
let boundFunc = func.bind(context);
```

The result of `func.bind(context)` is a special function-like "exotic object", that is callable as function and transparently passes the call to `func` setting `this=context`.

In other words, calling `boundFunc` is like `func` with fixed `this`.

For instance, here `funcUser` passes a call to `func` with `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Here `func.bind(user)` as a "bound variant" of `func`, with fixed `this=user`.

All arguments are passed to the original `func` "as is", for instance:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)
*/!*
```

Now let's try with an object method:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

In the line `(*)` we take the method `user.sayHi` and bind it to `user`. The `sayHi` is a "bound" function, that can be called alone or passed to `setTimeout` -- doesn't matter, the context will be right.

Here we can see that arguments are passed "as is", only `this` is fixed by `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John ("Hello" argument is passed to say)
say("Bye"); // Bye, John ("Bye" is passed to say)
```

````smart header="Convenience method: `bindAll`"
If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
````

## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function `double` on its base:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary

Method `func.bind(context, ...args)` returns a "bound variant" of function `func` that fixes the context `this` and first arguments if given.

Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
