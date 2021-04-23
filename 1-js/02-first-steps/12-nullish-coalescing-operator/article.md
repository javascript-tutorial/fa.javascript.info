# عملگر Nullish coalescing '??'

[recent browser="new"]

عملگر nullish coalescing با دو علامت سوال `??` نوشته می‌شود.

چون که این عملگر با `null` و `undefined` به طور یکسان رفتار می‌کند، ما در این فصل از یک اصطلاح خاص استفاده می‌کنیم. می‌گوییم که یک عبارت "تعریف شده" است هرگاه که نه `null` باشد و نه `undefined`.

نتیجه‌ی `a ?? b` برابر با:
- اگر `a` تعریف شده باشد، پس `a` است،
- اگر `a` تعریف شده نباشد، پس `b` است.

به عبارتی دیگر، `??` اولین آرگومان را اگر `null/undefined` نباشد برمی‌گرداند. در غیر این صورت، آرگومان دوم برگردانده می‌شود.

عملگر nullish coalescing چیز کاملا جدیدی نیست. این عملگر تنها یک سینتکس برای گرفتن اولین مقدار "تعریف شده" از بین دو مقدار است.

ما می‌توانیم `result = a ?? b` را با استفاده از اپراتورهایی که از قبل می‌شناسیم دوباره به این شکل بنویسیم:

```js
result = (a !== null && a !== undefined) ? a : b;
```

حالا باید کاملا روشن باشد که `??` چه کاری انجام می‌دهد. بیایید ببینیم این عملگر کجا کمک‌مان می‌کند.

یک مورد متداول برای استفاده از `??` تعیین کردن مقداری پیش فرض برای متغیری است که شاید تعریف نشده باشد.

برای مثال، اینجا نشان می‌دهیم که `user` تعریف شده است، در غیر این صورت `Anonymous` است:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

در این مثال یک اسم به `user` تخصیص داده شده است:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

همچنین می‌توانیم از دنباله‌ی `??` برای انتخاب کردن اولین مقدار در یک لیست که `null/undefined` نباشد استفاده کنیم.

فرض کنیم که داده‌ی کاربری را در متغیرهای `firstName`، `lastName` یا `nickName` ذخیره کرده‌ایم. اگر کاربر تصمیم به وارد نکردن مقداری گرفته باشد، ممکن است همه آنها تعریف شده نباشند.

ما می‌خواهیم اسم کاربر را با استفاده از این متغیرها نمایش دهیم، یا اگر هیچ کدام تعریف شده نباشند "Anonymous" را نمایش  دهیم.

بیایید برای این کار از عملگر `??` استفاده کنیم:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// اولین مقدار تعریف شده را نمایش می‌دهد:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## مقایسه با ||

عملگر یا `||` هم می‌تواند به همان شکل عملگر `??` استفاده شود. در حقیقت ما می‌توانیم عملگر `??` را با عملگر `||` در کد بالا جایگزین کنیم و همان نتیجه را بگیریم. همانطور که در بخش قبلی توضیح داده شد [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

@@@needs translation@@@
@@@old part@@@
تفاوت ارزشمند این دو عبارت است از:

- `||` نخستین مقدار _truthy_ را باز می‌گرداند.
- `??` نخستین مقدار _defined_ را باز می‌گرداند.

این موضوع به خصوص هنگامی که می‌خواهیم بین `null/undefined` و `0` تفاوت داشته باشیم خودش را نشان می‌دهد.

برای نمونه در نظر بگیرید:
@@@old part@@@
@@@new part@@@
The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
@@@new part@@@
@@@needs translation@@@

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

@@@needs translation@@@
@@@old part@@@
در این‌جا به `height` مقدار `100` را در صورتی که مقدار تعریف شده‌ای نداشته باشد نسبت می‌دهیم.

مقایسه با `||`:
@@@old part@@@
@@@new part@@@
Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
@@@new part@@@
@@@needs translation@@@

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

@@@needs translation@@@
@@@old part@@@
در این‌جا, `height || 100` با مقدار صفر همان‌گونه برخورد میکنه که با `null`، `undefined` و یا هر مقدار falsy دیگری. پس صفر تبدیل به `100` می‌شود.

عبارت `height ?? 100` مقدار `100` را در صورتی باز می‌گرداند که `height` دقیقا `null` و یا `undefined` باشد. پس صفر، "همانی که هست، می‌ماند".

    این‌که کدام رویکرد بهتر است، به موضوع ما بستگی دارد. اگر مقدار صفر برای `height` قابل قبول است، بهتر است از `??` استفاده کنیم.
@@@old part@@@
@@@new part@@@
Here, we have a zero height.

- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.
@@@new part@@@
@@@needs translation@@@

## اولویت‌ها

@@@needs translation@@@
@@@old part@@@
اولویت عملگر `??` عموما پایین است: `7` در جدول [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

پس `??` پس از بسیاری از عملگرها وارد عمل می‌شود, البته پیش از `=` و `?`.

اگر تصمیم به استفاده از `??` در یک عبارت پیچیده گرفتید, حتما از پرانتز استفاده کنید:
@@@old part@@@
@@@new part@@@
The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
@@@new part@@@
@@@needs translation@@@

```js run
let height = null;
let width = null;

// مهم: از پرانتز استفاده کنید
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

@@@needs translation@@@
@@@old part@@@
در غیر این صورت, اگر پرانتز را فراموش کنیم, `*` اولویت بالاتری نسبت به `??` دارد . زودتر اجرا می‌شود.

این‌گونه خواهیم داشت:

```js
// احتمالا نتیجه‌ی نادرست می‌دهد
let area = height ?? 100 * width ?? 50;
```

هم‌چنین یک محدودیت سطح زبان (language-level) نیز برای این موضوع داریم.

**برای احتیاط, به کار بردن `??` همراه با `&&` و `||` ممنوع است.**
@@@old part@@@
@@@new part@@@
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.
@@@new part@@@
@@@needs translation@@@

کد زیر یک خطای نگارشی (سینتکس) به ما خواهد داد:

```js run
let x = 1 && 2 ?? 3; // Syntax error خطای نگارشی
```

@@@needs translation@@@
@@@old part@@@
این محدودیت قابل بحث است, اما برای جلوگیری از اشتباهات برنامه‌نویسان به زبان اضافه شده است, که به مرور مردم از `??` به جای `||` استفاده خواهند کرد.
@@@old part@@@
@@@new part@@@
The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.
@@@new part@@@
@@@needs translation@@@

از پرانتز برای این کار استفاده کنید:

```js run
*!*
let x = (1 && 2) ?? 3; // به درستی کار می‌کند
*/!*

alert(x); // 2
```

## چکیده

@@@needs translation@@@
@@@old part@@@
- عملگر nullish coalescing `??` یک راه سریع برای مشخص کردن عبارت "تعریف شده (defined)" از یک لیست به کار می‌رود.
@@@old part@@@
@@@new part@@@
- The nullish coalescing operator `??` provides a short way to choose the first "defined" value from a list.
@@@new part@@@
@@@needs translation@@@

  از آن برای تعیین کردن مقدار پیش‌فرض برای متغیرها استفاده می‌شود:

  ```js
  // ست کردن height به 100, اگر برابر null یا undefined باشد
  height = height ?? 100;
  ```

@@@needs translation@@@
@@@old part@@@
- عملگر `??` ترتیب اولویت پایینی دارد, البته بیشتر از `?` و `=`.
- به کار بردن آن با `||` یا `&&` بدون به کار بردن پرانتز ممنوع است.
@@@old part@@@
@@@new part@@@
- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
@@@new part@@@
@@@needs translation@@@
