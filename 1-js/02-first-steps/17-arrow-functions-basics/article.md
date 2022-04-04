# مفاهیم ساده‌ی Arrow functions

یک راه ساده‌تر و کوتاه‌تر دیگر برای ساختن تابع‌ها وجود دارد‌؛ راهی که معمولا از Function Expressions بهتر است.

به‌خاطر شکلی که دارد، arrow functions نام گرفته است.

```js
let func = (arg1, arg2, ..., argN) => expression;
```

...این کد یک تابع `func` می‌سازد که آرگومان‌های `arg1..argN` را می‌پذیرد و با استفاده از این آرگومان‌ها `expression` سمت راست را ارزیابی می‌کند و نتیجه آن را برمی‌گرداند.

به بیانی دیگر، این کد نسخه‌ی کوتاه‌شده کد زیر است:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

بیایید مثال دیگری ببینیم:

```js run
let sum = (a, b) => a + b;

/* این arrow function نسخه‌ی کوتاه تابع زیر است:

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3
```

همانطور که می‌بینید `(a, b) => a + b` بدین معنی‌ست که این تابع دو آرگومان با نام‌های `a` و `b` می‌پذیرد. و هنگام اجرا شدن، مقدار `a + b` را حساب می‌کند و نتیجه را برمی‌گرداند.

- اگر فقط یک آرگومان داشته باشیم می‌توانیم پرانتزهای دور آرگومان را حذف کنیم و کد را از این هم کوتاه‌تر کنیم.

  برای مثال:

  ```js run
  *!*
  let double = n => n * 2;
  // معادل است با: let double = function(n) { return n * 2 }
  */!*

  alert( double(3) ); // 6
  ```

<<<<<<< HEAD
- اگر آرگومان ورودی نداریم، پرانتزها خالی می‌مانند (ولی حتما باید حاضر باشند):
=======
- If there are no arguments, parentheses are empty, but they must be present:
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

  ```js run
  let sayHi = () => alert("Hello!");

  sayHi();
  ```

از Arrow functionها به همان شکل Function Expressionها استفاده می‌شود.

برای مثال، برای ساخت یک تابع به‌شکل داینامیک مانند زیر عمل می‌کنیم:

```js run
let age = prompt("What is your age?", 18);

let welcome = age < 18 ? () => alert("Hello") : () => alert("Greetings!");

welcome();
```

ممکن است در ابتدا غریبه و ناخوانا به نظر برسند اما وقتی چشمتان به آن عادت می‌کند، همه چیز عوض می‌شود.

و برای کدهای یک خطی بسیار مناسب هستند. مخصوصا وقتی خسته‌تر از آن هستیم که کلمات زیادی بنویسیم.

## وقتی Arrow Functionها چندخطی می‌شوند

<<<<<<< HEAD
مثال‌های بالا از سمت چپ فلش `<=` آرگومان گرفتند و سمت راست را با آن محاسبه کردند.

گاهی کد پیچیده‌تری داریم که چند expression یا statement دارد. در این مواقع باید کد را درون کمانک قرار دهیم. و درون کمانک نیز از `return` استفاده کنیم.
=======
The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f

مانند این:

```js run
let sum = (a, b) => {  // کمانک یک تابع چندخظی را دربرمی‌گیرد
  let result = a + b;
*!*
  return result; // استفاده کنیم "return" اگر از آکولاد استفاده کنیم، سپس باید صراحتا از
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="باز هم هست"
ما در اینجا از کوتاهی و مختصری arrow functionها گفتیم. ولی فقط این نیست!

این توابع ویژگی‌های جالب دیگری هم دارند.

برای این که عمیق واردش بشویم، نیاز داریم اول بخش‌های دیگری از جاوااسکریپت را بشناسیم. برای همین در فصل دیگری به arrow functionها برمی‌گردیم <info:arrow-functions>.

فعلا می‌توانیم از arrow functionها برای اعمال و callbackهای یک خطی استفاده کنیم.
```

## خلاصه

<<<<<<< HEAD
توابع Arrow function مناسب کدهای تک‌خطی هستند. و به‌صورت‌های مختلفی می‌توان از آن‌ها استفاده کرد.

1. بدون کمانک: `(...args) => expression` -- سمت راست یک expression یا عبارت است: تابع آن را می‌خواند و نتیجه را برمی‌گرداند.
2. با کمانک: `(...args) => { body }` -- کمانک‌ها به ما این امکان را می‌دهند تا چند statement را داخل تابع بنویسیم, اما در این صورت باید حتما از `return` برای بازگرداندن نتیجه استفاده کنیم.
=======
Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 45934debd9bb31376ea5da129e266df5b43e545f
