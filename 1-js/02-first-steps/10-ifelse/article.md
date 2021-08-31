# انشعاب شرطی: if، '?'

بعضی اوقات، ما نیاز داریم که کارهای مختلفی را بر اساس شرایط مختلف انجام دهیم.

برای انجام این کار، ما از دستور `if` و عملگر شرطی (سه‌تایی) که ما برای سادگی به عنوان عملگر «علامت سوال» `?` به آن اشاره خواهیم کرد، استفاده می‌کنیم.

## دستور "if" 

دستور `if(...)` شرطی را در پرانتزها ارزیابی می‌کند و اگر نتیجه آن `true` باشد، یک بلوک کد را اجرا می‌کند.

برای مثال:

```js run
let year = prompt('در چه سالی مشخصات ECMAScript-2015 منتشر شد؟', '');

*!*
if (year == 2015) alert( 'درست گفتید!' );
*/!*
```

در مثال بالا، شرط یک بررسی برابری ساده است (`year == 2015`) اما می‌تواند خیلی پیچیده‌تر باشد.

اگر ما بخواهیم بیشتر از یک دستور را اجرا کنیم، باید کدمان را درون آکولاد قرار دهیم:

```js
if (year == 2015) {
  alert( "درست است!" );
  alert( "شما باهوش هستید!" );
}
```

ما پیشنهاد می‌کنیم که کدتان را هر بار که از دستور `if` استفاده می‌کنید، درون آکولاد `{}` بگذارید حتی اگر تنها یک دستور برای اجرا کردن دارید. انجام دادن این کار خوانایی را افزایش می‌دهد.

## تبدیل به بولین

دستور `if (…)` عبارت درون پرانتزها را ارزیابی می‌کند و نتیجه را به بولین تبدیل می‌کند.

بیایید قوانین تبدیل را از فصل <info:type-conversions> به یاد بیاریم:

- عدد `0`، یک رشته خالی `""`، `null`، `undefined` و `NaN` همگی به `false` تبدیل می‌شوند. به همین دلیل به آنها مقدارهای "falsy" می‌گویند.
- مقدارهای دیگر به `true` تبدیل می‌شوند پس "truthy" نامیده می‌شوند.

پس کد زیر با این شرط هیچگاه اجرا نمی‌شود:

```js
if (0) { // است falsy ،مقدار 0
  ...
}
```

...و درون با این شرط -- همیشه اجرا می‌شود:

```js
if (1) { // است truthy ،مقدار 1
  ...
}
```

همچنین ما می‌توانیم یک مقدار بولین که از قبل ارزیابی شده است را به `if` بدهیم، مانند اینجا:

```js
let cond = (year == 2015); // false است یا true برابری بعد از ارزیابی یا

if (cond) {
  ...
}
```

## عبارت "else"

دستور `if` ممکن است یک بلوک اختیاری "else" هم شامل شود. این بلوک زمانی که شرط falsy باشد اجرا می‌شود.

برای مثال:
```js run
let year = prompt('در چه سالی مشخصات ECMAScript-2015 منتشر شد؟', '');

if (year == 2015) {
  alert( 'شما درست حدس زدید!' );
} else {
  alert( 'چطور اشتباه گفتید؟' ); // هر مقداری به جز 2015
}
```

## چند شرط: "else if"

گاهی اوقات، ما می‌خواهیم که چند نوع از یک شرط را آزمایش کنیم. عبارت `else if` به امکان همچین کاری را می‌دهد.

برای مثال:

```js run
let year = prompt('در چه سالی مشخصات ECMAScript-2015 منتشر شد؟', '');

if (year < 2015) {
  alert( 'کم گفتید...' );
} else if (year > 2015) {
  alert( 'زیاد گفتید' );
} else {
  alert( 'دقیقا!' );
}
```

در کد بالا، جاوااسکریپت در ابتدا `year < 2015` را بررسی می‌کند. اگر falsy باشد، به شرط بعدی `year > 2015` می‌رود. اگر آن هم falsy باشد، `alert` آخر نمایش داده می‌شود.

بلوک‌های `else if` بیشتری هم می‌تواند وجود داشته باشد. `else` آخری اختیاری است.

## عملگر سه‌گانه '?'

گاهی اوقات، ما نیاز داریم که بر اساس شرطی، یک متغیر را مقداردهی کنیم.

برای مثال:

```js run no-beautify
let accessAllowed;
let age = prompt('چند سال دارید؟', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

عملگر «سه‌گانه» یا «علامت سوال» به ما اجازه انجام این کار با روشی کوتاه‌تر و ساده‌تر را می‌دهد.

این عملگر با یک علامت سوال `?` نمایش داده می‌شود. عبارت رسمی «سه‌گانه» به معنی انی است که عملگر سه عملوند دارد. در واقع این عملگر، تنها عملگری در جاوااسکریپت است که این تعداد عملوند دارد.

سینتکس آن:
```js
let result = condition ? value1 : value2;
```

بعد از اینکه `condition` ارزیابی شود: اگر truthy باشد سپس `value1` برگردانده می‌شود، در غیر این صورت -- `value2`.

برای مثال:

```js
let accessAllowed = (age > 18) ? true : false;
```
 
به طور فنی، ما می‌توانیم پرانتزهای دور `age > 18` را حذف کنیم. عملگر علامت سوال اولویت پایینی دارد پس بعد از مقایسه `>` اجرا می‌شود.

این مثال کار یکسانی با مثال قبل انجام می‌دهد:

```js
// در هر صورت اول اجرا می‌شود "age > 18" عملگر مقایسه
// (نیازی نیست که آن را درون پرانتز بگذاریم)
let accessAllowed = age > 18 ? true : false;
```

اما پرانتزها کد را خواناتر می‌کنند، پس ما پیشنهاد می‌کنیم که از آنها استفاده کنید.

````smart
در مثال بالا، شما می‌توانید از عملگر علامت سوال استفاده نکنید چون خود مقایسه `true/false` برمی‌گرداند.

```js
// نتیجه یکسان است
let accessAllowed = age > 18;
```
````

## Multiple '?'

A sequence of question mark operators `?` can return a value that depends on more than one condition.

For instance:
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

It may be difficult at first to grasp what's going on. But after a closer look, we can see that it's just an ordinary sequence of tests:

1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon '":"', checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon '":"', checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon '":"', returning `'What an unusual age!'`.

Here's how this looks using `if..else`:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Non-traditional use of '?'

Sometimes the question mark `?` is used as a replacement for `if`:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

**It's not recommended to use the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.
