# متدهای شیء، "this"

شیءها معمولا برای نمایش چیزهایی که در دنیای واقعی هستند ساخته می‌شوند، مانند کاربرها، سفارشات و غیره:

```js
let user = {
  name: "John",
  age: 30
};
```

و در دنیای واقعی، یک کاربر می‌تواند *کاری انجام دهد* برای مثال چیزی را از سبد خرید اتخاب کند، وارد سایت شود، از سایت خارج شود و غیره.

اعمال در جاوااسکریپت توسط تابع‌های درون ویژگی‌ها نمایش داده می‌شوند.

## مثال‌هایی از متد

برای شروع، بیایید به `user` یاد بدهیم که سلام بگوید:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("سلام!");
};
*/!*

user.sayHi(); // !سلام
```

اینجا ما از Function Expression برای ساخت یک تابع استفاده کردیم و آن را به ویژگی `user.sayHi` شیء تخصیص دادیم.

سپس می‌توانیم آن را با `user.sayHi()` صدا بزنیم. حالا user می‌تواند صحبت کند!

تابعی که یک ویژگی از شیءای باشد *متد* نامیده می‌شود.

پس اینجا ما یک متد `sayHi` از شیء `user` داریم.

قطعا ما می‌توانستیم از تابعی که قبلا تعریف شده است استفاده کنیم، مثل اینجا:

```js run
let user = {
  // ...
};

*!*
// اول تعریف می‌کنیم
function sayHi() {
  alert("سلام!");
};

// سپس به عنوان متد آن را اضافه می‌کنیم
user.sayHi = sayHi;
*/!*

user.sayHi(); // !سلام
```

```smart header="برنامه‌نویسی شیءگرا"
زمانی که ما با استفاده از شیء برای نمایش چیزهای موجود کد می‌نویسیم، به آن [برنامه‌نویسی شیءگرا](https://en.wikipedia.org/wiki/Object-oriented_programming) می‌گویند، یا به طور خلاصه: "OOP".

مبحث OOP بسیار بزرگ و به نوبه خود یک علم جذاب است. چگونه چیزهای موجود را به درستی انتخاب کنیم؟ چگونه تعامل بین آنها را سازماندهی کنیم؟ به آن معماری نرم‌افزار می‌گویند و در مورد این موضوع کتاب‌های عالی‌ای وجود دارد مانند: "Design Patterns: Elements of Reusable Object-Oriented Software" توسط E. Gamma، R. Helm، R. Johnson، J. Vissides یا "Object-Oriented Analysis and Design with Applications" توسط G. Booch و غیره.
```
### خلاصه‌نویسی متد

یک سینتکس کوتاه‌تر برای متدها در شیءهای لیترال وجود دارد:

```js
// این شیءها کار یکسانی انجام می‌دهند

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// خلاصه‌نویسی متد بهتر به نظر می‌رسد نه؟
user = {
*!*
  sayHi() { // یکسان است "sayHi: function(){...}" با
*/!*
    alert("Hello");
  }
};
```

همانطور که نشان داده شد، ما می‌توانیم `"function"` را حذف کنیم و فقط `sayHi()` را بنویسیم.

حقیقتا این دو روش کاملا یکسان نیستند. تفاوت‌هایی جزئی و مربوط به وراثت شیء (بعدا آن را می‌آموزیم) وجود دارند، اما آنها الان مهم نیستند. تقریبا در تمام موارد سینتکس کوتاه‌تر ترجیح داده می‌شود.

## "this" in methods

It's common that an object method needs to access the information stored in the object to do its job.

For instance, the code inside `user.sayHi()` may need the name of the `user`.

**To access the object, a method can use the `this` keyword.**

The value of `this` is the object "before dot", the one used to call the method.

For instance:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" is the "current object"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Here during the execution of `user.sayHi()`, the value of `this` will be `user`.

Technically, it's also possible to access the object without `this`, by referencing it via the outer variable:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" instead of "this"
*/!*
  }

};
```

...But such code is unreliable. If we decide to copy `user` to another variable, e.g. `admin = user` and overwrite `user` with something else, then it will access the wrong object.

That's demonstrated below:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // leads to an error
*/!*
  }

};


let admin = user;
user = null; // overwrite to make things obvious

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

If we used `this.name` instead of `user.name` inside the `alert`, then the code would work.

## "this" is not bound

In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it's not a method of an object.

There's no syntax error in the following example:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

The value of `this` is evaluated during the run-time, depending on the context.

For instance, here the same function is assigned to two different objects and has different "this" in the calls:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;
*/!*

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
```

The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. So it's either `user` or `admin` in the example above.

````smart header="Calling without an object: `this == undefined`"
We can even call the function without an object at all:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error.

In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we'll get to it later in the chapter [](info:global-object)). This is a historical behavior that `"use strict"` fixes.

Usually such call is a programming error. If there's `this` inside a function, it expects to be called in an object context.
````

```smart header="The consequences of unbound `this`"
If you come from another programming language, then you are probably used to the idea of a "bound `this`", where methods defined in an object always have `this` referencing that object.

In JavaScript `this` is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is "before the dot".

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We'll understand how to work with it, how to get benefits and avoid problems.
```

## Arrow functions have no "this"

Arrow functions are special: they don't have their "own" `this`. If we reference `this` from such a function, it's taken from the outer "normal" function.

For instance, here `arrow()` uses `this` from the outer `user.sayHi()` method:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

That's a special feature of arrow functions, it's useful when we actually do not want to have a separate `this`, but rather to take it from the outer context. Later in the chapter <info:arrow-functions> we'll go more deeply into arrow functions.


## Summary

- Functions that are stored in object properties are called "methods".
- Methods allow objects to "act" like `object.doSomething()`.
- Methods can reference the object as `this`.

The value of `this` is defined at run-time.
- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- A function can be copied between objects.
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`.

Please note that arrow functions are special: they have no `this`. When `this` is accessed inside an arrow function, it is taken from outside.
