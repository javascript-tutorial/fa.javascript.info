
# کلمه "var" قدیمی

```smart header="این مقاله برای فهمیدن اسکریپت‌های قدیمی است"
اطلاعات این مقاله برای فهمیدن اسکریپت‌های قدیمی مفید است.

ما کدهای جدید را اینگونه نمی‌نویسیم.
```

دقیقا در فصل اول درباره [متغیرها](info:variables)، ما سه راه تعریف متغیر را معرفی کردیم:

1. `let`
2. `const`
3. `var`

تعریف متغیر توسط `var` مانند `let` است. اکثر اوقات ما می‌توانیم `let` را با `var` جایگزین کنیم یا برعکس و توقع داشته باشیم که دستورات کار کنند:

```js run
var message = "سلام";
alert(message); // سلام
```

اما از دورن، `var` گونه‌ای بسیار متفاوت است که از زمان‌های قدیم وجود دارد. به طور کلی در اسکریپت‌های جدید استفاده نمی‌شود ولی هنوز هم در اسکریپت‌های قدیمی کمین کرده است.

اگر شما قرار نیست چنین اسکریپت‌هایی را ببینید می‌توانید این فصل را رد کنید یا مطالعه آن را به عقب بندازید.

از سویی دیگر، زمانی که اسکریپت‌های قدیمی را از `var` به `let` کوچ می‌دهیم، دانستن تفاوت‎ها برای جلوگیری از ارورهای عجیب مهم است.

## کلمه "var" محدوده بلوک ندارد

متغیرهایی که با `var` تعریف شده‌اند، یا محدوده تابع دارند یا محدوده گلوبال. آن‌ها در این بلوک‌ها قابل رویت هستند.

برای مثال:

```js run
if (true) {
  var test = true; // استفاده کنید "var" از "let" به جای
}

*!*
alert(test); // true ،هم باقی می‌ماند if متغیر بعد از
*/!*
```

چون `var` بلوک‌های کد را نادیده می‌گیرد، ما یک متغیر گلوبال `test` خواهیم داشت.

اگر ما به جای `var test` از `let test` استفاده می‌کردیم، سپس متغیر فقط درون `if` قابل رویت بود:

```js run
if (true) {
  let test = true; // "let" استفاده از
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

همین مورد برای حلقه‌ها هم صدق می‌کند: `var` نمی‌تواند در محدوده بلوک حلقه باشد:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10 ،بعد از حلقه قابل رویت است چون یک متغیر گلوبال است "i"
alert(one); // 1 ،بعد از حلقه قابل رویت است چون یک متغیر گلوبال است "one"
*/!*
```

اگر یک بلوک کد درون تابع باشد، سپس `var` یک متغیر در سطح تابع می‌شود:

```js run
function sayHi() {
  if (true) {
    var phrase = "سلام";
  }

  alert(phrase); // کار می‌کند
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

همانطور که می‌بینیم، `var` از درون `if`، `for` یا بقیه بلوک‌های کد بیرون می‌آید. به این دلیل که در زمان‌های قدیم، بلوک‌ها در جاوااسکریپت محیط‌های لغوی نداشتند و `var` یک باقی‌مانده از آن است.

## کلمه "var" تعریف‌های دوباره را قبول می‌کند

اگر ما با `let` متغیری یکسان را دوبار در محدوده بلوک یکسان تعریف کنیم، یک ارور ایجاد می‌شود:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

با `var` ما می‌توانیم یک متغیر را هر چند بار که بخواهیم دوباره تعریف کنیم. اگر ما از `var` همراه با یک متغیر از قبل تعریف شده استفاده کنیم، نادیده گرفته می‌شود:

```js run
var user = "Pete";

var user = "John"; // کاری انجام نمی‌دهد (از قبل تعریف شده) "var" این
// ...اروری ایجاد نمی‌کند

alert(user); // John
```

## متغیرهای "var" می‌توانند پایین محل استفاده‌شان تعریف شوند

متغیرهای تعریف شده با `var` زمانی که اجرای تابع شروع می‌شود (یا برای متغیرهای گلوبال زمانی که اسکریپت شروع می‌شود) پردازش می‌شوند.

به عبارتی دیگر، متغیرهای `var` بدون توجه به محل تعریف آن‌ها، از زمانی که اجرای تابع شروع می‌شود تعریف می‌شوند (با فرض اینکه تعریف کردن درون تابع تودرتو نیست).

پس این کد:

```js run
function sayHi() {
  phrase = "سلام";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...از لحاظ فنی با این کد برابر است (عبارت `var phrase` را بالا بردیم):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "سلام";

  alert(phrase);
}
sayHi();
```

...حتی با این هم برابر است (به یاد داشته باشید که بلوک‌های کد نادیده گرفته می‌شوند):

```js run
function sayHi() {
  phrase = "سلام"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

افراد به آن «بالا بردن» هم می‌گویند چون تمام `var`ها به بالای تابع «سعود می‌کنند».

پس در مثال بالا، شاخه `if (false)` هیچوقت اجرا نمی‌شود اما اصلا مهم نیست. `var` که درون آن است در ابتدای اجرای تابع پردازش می‌شود پس هنگام اجرای `(*)` متغیر وجود دارد.

**تعریف متغیر بالا می‌رود اما مقداردهی‌ها نه.**

این موضوع یک مثال بهتر نمایش داده می‌شود:

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "سلام";
*/!*
}

sayHi();
```

خط `var phrase = "سلام"` در خودش دو کار انجام می‌دهد:

1. تعریف متغیر با `var`.
2. مقداردهی متغیر با `=`.

تعریف متغیر در ابتدای اجرای تابع پردازش می‌شود («بالا می‌رود») اما مقداردهی همیشه در جایی که وجود دارد انجام می‌شود. پس کد بالا اساسا مانند کد پایین کار می‌کند:

```js run
function sayHi() {
*!*
  var phrase; // ...تعریف متغیر در ابتدا انجام می‌شود
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...مقداردهی - زمانی که اجرا به آن می‌رسد
*/!*
}

sayHi();
```

چون تمام تعریف متغیرهای `var` در ابتدای تابع پردازش می‌شوند، ما می‌توانیم به آن‌ها در هر زمانی رجوع کنیم. اما متغیرها تا زمان مقداردهی برابر با undefined هستند.

در هر دو مثال بالا، `alert` بدون هیچ اروری اجرا می‌شود چون متغیر `phrase` وجود دارد. اما مقدار آن هنوز تخصیص داده نشده است پس `undefined` را نشان می‌شود.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## Summary

There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
