
# شیء تابع، NFE

همانطور که می‌دانیم، یک تابع در جاوااسکریپت یک مقدار است.

هر مقداری در جاوااسکریپت نوع دارد. تابع از چه نوعی است؟

در جاوااسکریپت، تابع‌ها شیء هستند.

یک راه خوب برای تصور کردن تابع‌ها، فکر کردن به آنها به عنوان «شیءهای عملکردی» قابل فراخوانی است. ما نه تنها می‌توانیم آنها را فرا بخوانیم بلکه می‌توانیم با آنها مانند شیءها رفتار کنیم: ویژگی‌ها را اضافه/حذف کنیم، آنها را توسط مرجع رد و بدل کنیم و غیره.


## ویژگی "name"

شیء تابع‌ها چند ویژگی قابل استفاده دارند.

برای مثال، اسم یک تابع با ویژگی "name" قابل دسترس است:

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

منطق مقداردهی اسم، هوشمندانه و جالب است. حتی زمانی که یک تابع بدون اسم ساخته و سریعا تخصیص داده شود، اسم درستی را برای مقداردهی استفاده می‌کند:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (!یک اسم دارد)
```

اگر مقداردهی توسط یک مقدار پیش‌فرض انجام شود هم کار می‌کند:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (!کار می‌کند)
}

f();
```

در مشخصات، این خاصیت «اسم زمینه‌ای» نامیده شده است. اگر تابع اسمی نداشته باشد، سپس در مقداردهی، از زمینه موجود پیدا می‌شود.

متدهای شیءها هم اسم دارند:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

اگرچه هیچ جادویی وجود ندارد. مواردی وجود دارند که راهی برای فهمیدن اسم درست وجود ندارد. در این صورت، ویژگی اسم (name) خالی است، مثل اینجا:

```js run
// تابع درون آرایه ساخته شده است
let arr = [function() {}];

alert( arr[0].name ); // <رشته خالی>
// موتور راهی برای دریافت اسم درست ندارد، پس هیچی وجود ندارد
```

اگرچه در عمل، اکثر تابع‌ها اسم دارند.

## ویژگی "length"

یک ویژگی درون‌ساخت دیگر به نام "length" وجود دارد که تعداد پارامترهای تابع را برمی‌گرداند، برای مثال:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

اینجا می‌بینیم که پارامترهای رِست شمرده نمی‌شوند.

ویژگی `length` بعضی اوقات برای [درون‌نگری](https://en.wikipedia.org/wiki/Type_introspection) در تابع‌هایی که بر روی تابع‌های دیگر کاری انجام می‌دهند استفاده می‌شود.

برای مثال، در کد زیر تابع `ask` یک `question` (سوال) برای پرسیدن و تعدادی تابع `handler` (کنترل‌کننده) برای فراخوانی دریافت می‌کند.

زمانی که کاربر جواب خود را وارد کرد، تابع کنترل‌کننده‌ها را فراخوانی می‌کند. ما می‌توانیم دو نوع کنترل‌کننده را رد کنیم:

- یک تابع با صفر آرگومان که فقط زمانی که کاربر یک جواب مثبت می‌دهد فراخوانی شود.
- یک تابع با چند آرگومان که در هر شرایطی فراخوانی می‌شود و یک جواب برمی‌گرداند.

برای اینکه `handler` را به درستی فراخوانی کنیم، ویژگی `handler.length` را بررسی می‌کنیم.

ایده این است که ما یک سینتکس کنترل‌کننده ساده و بدون آرگومان برای موارد مثبت داریم (نوعی که بیشتر اتفاق می‌افتد) اما می‌توانیم کنترل‌کننده‌های کلی را هم پوشش دهیم:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// برای جواب مثبت، هر دو کنترل‌کننده فراخوانی می‌شوند
// برای جواب منفی، فقط دومی
ask("سوال؟", () => alert('شما بله گفتید'), result => alert(result));
```

این یک مورد استفاده از [چندریختی](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) است -- رفتار متفاوت با آرگومان‌ها با توجه به نوع آنها یا در این مورد ما با توجه به `length`. این ایده در کتابخانه‌های جاوااسکریپت استفاده می‌شود.

## ویژگی‌های سفارشی

ما می‌توانیم ویژگی‌هایی از خودمان را هم اضافه کنیم.

اینجا می‌توانیم ویژگی `counter` را اضافه کنیم تا تعداد تمام فراخوانی‌ها را پیگیری کنیم:

```js run
function sayHi() {
  alert("سلام");

  *!*
  // بیایید تعداد اجرا کردن را بشماریم
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // مقدار اولیه

sayHi(); // سلام
sayHi(); // سلام

alert( `${sayHi.counter} بار فراخوانی شد` ); // دو بار فراخوانی شد
```

```warn header="ویژگی متغیر نیست"
یک ویژگی که به یک تابع تخصیص داده شود مانند `sayHi.counter = 0`، متغیر محلی `counter` را درون آن تعریف *نمی‌کند*. به عبارتی دیگر، یک ویژگی `counter` و متغیر `let counter` دو چیز غیر مرتبط هستند.

ما می‌توانیم با یک تابع به عنوان یک شیء رفتار کنیم، ویژگی‌هایی را درون آن ذخیره کنیم اما این موضوع روی اجرا شدن آن هیچ تاثیری ندارد. متغیرها هیچوقت از ویژگی‌های تابع استفاده نمی‌کنند و برعکس. اینها فقط دنیاهای موازی هستند.
```

ویژگی‌های تابع می‌توانند بعضی اوقات جایگزین کلوژرها شوند. برای مثال، ما می‌توانیم مثال تابع شمارنده را از فصل <info:closure> بازنویسی کنیم تا از ویژگی تابع استفاده کند:

```js run
function makeCounter() {
  // :به جای این
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count` حالا در به صورت مستقیم در خود تابع ذخیره شده است نه در محیط لغوی بیرونی آن.

این روشِ استفاده از کلوژر بهتر است یا بدتر؟

تفاوت اصلی این است که اگر مقدار `count` در یک متغیر بیرونی وجود داشته باشد، سپس کد بیرونی نمی‌تواند به آن دسترسی داشته باشد. تنها تابع‌های تودرتو ممکن است آن را تغییر دهند. و اگر فقط به یک تابع متصل باشد، سپس چنین چیزی امکان دارد:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

پس انتخاب نحوه پیاده‌سازی به اهداف ما بستگی دارد.

## Named Function Expression

Named Function Expression, or NFE, is a term for Function Expressions that have a name.

For instance, let's take an ordinary Function Expression:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

And add a name to it:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Did we achieve anything here? What's the purpose of that additional `"func"` name?

First let's note, that we still have a Function Expression. Adding the name `"func"` after `function` did not make it a Function Declaration, because it is still created as a part of an assignment expression.

Adding such a name also did not break anything.

The function is still available as `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

There are two special things about the name `func`, that are the reasons for it:

1. It allows the function to reference itself internally.
2. It is not visible outside of the function.

For instance, the function `sayHi` below calls itself again with `"Guest"` if no `who` is provided:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // use func to re-call itself
*/!*
  }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)
```

Why do we use `func`? Maybe just use `sayHi` for the nested call?


Actually, in most cases we can:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
```

That happens because the function takes `sayHi` from its outer lexical environment. There's no local `sayHi`, so the outer variable is used. And at the moment of the call that outer `sayHi` is `null`.

The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

Let's use it to fix our code:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Now all fine
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
```

Now it works, because the name `"func"` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", how the function can call itself internally.

```smart header="There's no such thing for Function Declaration"
The "internal name" feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an "internal" name.

Sometimes, when we need a reliable internal name, it's the reason to rewrite a Function Declaration to Named Function Expression form.
```

## Summary

Functions are objects.

Here we covered their properties:

- `name` -- the function name. Exists not only when given in the function definition, but also for assignments and object properties.
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.


So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
