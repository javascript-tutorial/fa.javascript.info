# عملگر Nullish coalescing '??'

[recent browser="new"]

@@@needs translation@@@
@@@old part@@@
عملگر nullish coalescing `??` یک سینتکس کوتاه شده است انتخاب نخستین متغیر تعریف شده است.

نتیجه‌ی گزاره‌ی `a ?? b` برابر است با:

- `a` به شرطی که `null` یا `undefined` نباشد,
- `b`, در غیر این صورت.

پس, `x = a ?? b` یک معادل کوتاه شده برای عبارت زیر است:

```js
x = a !== null && a !== undefined ? a : b;
```

حال به بررسی یک نمونه‌ی طولانی می‌پردازیم.

تصور کنین که ما یک کاربر داریم و متغیرهای, `firstName`, `lastName` یا `nickName` را برای نام، نام خانوادگی و نام مستعار داریم. همه‌ی آن‌ها ممکن است که تعریف نشده باشند(undefined) به شرطی که کاربر آن‌ها را وارد نکرده باشد.

ما می‌خواهیم که نام کاربر را نمایش دهیم: یکی از سه متغیر بالا, یا عبارت "ناشناس" به شرطی که چیزی تعریف نشده باشد.

از عملگر `??` برای انتخاب اولین متغیر تعریف شده استفاده می‌کنیم:
@@@old part@@@
@@@new part@@@
Here, in this article, we'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The nullish coalescing operator is written as two question marks `??`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.


In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:

```js
result = (a !== null && a !== undefined) ? a : b;
```

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `Anonymous` if `user` isn't defined:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

Of course, if `user` had any value except `null/undefined`, then we would see it instead:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be undefined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are undefined.

Let's use the `??` operator for that:
@@@new part@@@
@@@needs translation@@@

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

@@@needs translation@@@
@@@old part@@@
// نخستین مقداری که null یا undefined نیست را نمایش می‌دهد
@@@old part@@@
@@@new part@@@
// shows the first defined value:
@@@new part@@@
@@@needs translation@@@
*!*
alert(firstName ?? lastName ?? nickName ?? "ناشناس"); // Supercoder
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
The OR `||` operator exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

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

- The `height || 100` checks `height` for being a falsy value, and it really is.
    - so the result is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

If the zero height is a valid value, that shouldn't be replaced with the default, then `??` does just the right thing.
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
The precedence of the `??` operator is rather low: `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). So `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

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
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch to `??` from `||`.
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
