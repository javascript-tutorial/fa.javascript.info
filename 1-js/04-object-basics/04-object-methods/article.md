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

## "this" در متدها

اینکه یک متد شیء نیازمند دسترسی به اطلاعات ذخیره‌شده در آن شیء باشد تا کارش را انجام دهد یک چیز رایج است.

برای مثال، کد درون `user.sayHi()` شاید به اسم `user` احتیاج داشته باشد.

**برای دسترسی به شیء، متد می‌تواند از کلمه کلیدی `this` استفاده کند.**

مقدار `this` شیء "قبل از نقطه" است، همان شیءای که برای صدازدن متد استفاده شده است. 

برای مثال:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // همان "شیء کنونی" است "this"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

اینجا، در حین اجراشدن `user.sayHi()`، مقدار `this` برابر با `user` خواهد بود.

به طور فنی، امکان دسترسی به شیء بدون `this` هم وجود دارد، با مراجعه به آن به وسیله‌ی متغیر بیرونی:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "this" به جای "user"
*/!*
  }

};
```

...اما چنین کدی قابل اطمینان نیست. اگر ما تصمیم بگیریم که `user` را در متغیر دیگری کپی کنیم، برای مثال `admin = user` و `user` را با چیز دیگری عوض کنیم، سپس به شیء اشتباهی دسترسی خواهد داشت.

این موضوع در کد پایین نشان داده شده:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // باعث یک ارور می‌شود
*/!*
  }

};


let admin = user;
user = null; // بازنویسی برای روشن کردن مطلب

*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
```

اگر ما از `this.name` به جای `user.name` درون `alert` استفاده می‌کردیم، کد کار می‌کرد.

## "this" محدود نیست

در جاوااسکریپت، کلمه کلیدی `this` متفاوت از بیشتر زبان‌های برنامه‌نویسی دیگر رفتار می‌کند. این کلمه می‌تواند در هر تابعی استفاده شود، حتی اگر آن تابع متدی از یک شیء نباشد.

در مثال پایین هیچ ارور سینتکسی وجود ندارد:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

مقدار `this` هنگام اجراشدن برنامه ارزیابی می‌شود، با وابستگی به زمینه‌ی استفاده.

برای مثال، اینجا تابع یکسانی به دو شیء متفاوت تخصیص داده شده است و "this" متفاوتی هنگام صدازدن دارد.

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// استفاده از تابعی یکسان در دو شیء
user.f = sayHi;
admin.f = sayHi;
*/!*

// متقاوتی دارند this این صدازدن‌ها
// درون تابع همان شیء "قبل نقطه" است "this"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (نقطه یا براکت‌ها به متد دسترسی دارند - مسئله‌ی مهمی نیست)
```

قاعده ساده است: اگر `obj.f()` صدا زده شود، سپس در حین صدازدن `f`، `this` برابر با `obj` است. پس در مثال بالا یا برابر با `user` است یا `admin`.

````smart header="صدازدن بدون شیء: `this == undefined`"
ما حتی می‌توانیم تابع را بدون هیچ شیءای صدا بزنیم:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

در این مورد `this` در حالت سخت‌گیرانه (strict mode) برابر با `undefined` است. اگر ما تلاش کنیم که به `this.name` دسترسی پیدا کنیم، یک ارور به وجود می‌آید.

در حالت غیر سخت‌گیرانه در چنین موردی مقدار `this` برابر است با *global object* (در مرورگر `window` است، ما در فصل [](info:global-object) به سراغ آن می‌رویم). این یک رفتار تاریخی است که `"use strict"` آن را درست می‌کند.

معمولا چنین صدازدنی یک ارور برنامه‌نویسی است. اگر `this` درون یک تابع باشد، انتظار می‌رود که در زمینه‌ی شیء صدا زده شود.
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
