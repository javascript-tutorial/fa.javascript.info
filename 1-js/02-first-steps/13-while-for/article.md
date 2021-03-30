# حلقه ها: while و for

ما معمولا نیاز داریم که کارها رو تکرار کنیم.

برای مثال، از یک لیست کالاها را یکی پس از دیگری نمایش دهیم یا کد مشابهی رو برای هر عدد از 1 تا 10 اجرا کنیم.

*حلقه ها* راهی برای تکرار یک کد برای چندین بار هستند.

## حلقه "while"

حلقه `while` سینتکس زیر را دارد:

```js
while (condition) {
  // کد
  // به اصطلاح "بدنه حلقه"
}
```

تا وقتی که `condition` برابر با truthy باشد، `کد` قسمت بدنه حلقه اجرا می شود. 

برای مثال، حلقه پایین `i` را نمایش می دهد تا وقتی که `i < 3`:

```js run
let i = 0;
while (i < 3) { // 0 را نمایش می دهد، سپس 1، سپس 2
  alert( i );
  i++;
}
```

یک بار اجرا شدن بدنه حلقه *یک تکرار* نامیده می شود. حلقه داخل مثال بالا سه تکرار می سازد.

اگر `i++` از مثال بالا جا می ماند، حلقه (در تئوری) برای همیشه اجرا می شد. در عمل، مرورگر راه هایی را برای متوقف کردن چنین حلقه هایی مهیا می کند، و در جاوااسکریپت سمت سرور، ما می توانیم فرایند را نابود کنیم.

هر عبارت یا متغیری می تواند یک شرط حلقه باشد، نه فقط مقایسه ها: شرط توسط `while` ارزیابی می شود و به boolean تبدیل می شود.

برای مثال، یک راه کوتاه تر برای نوشتن `while (i != 0)` `while (i)` است:

```js run
let i = 3;
*!*
while (i) { // وقتی که i برابر با 0 شود، شرط falsy شده، و حلقه متوقف می شود
*/!*
  alert( i );
  i--;
}
```

````smart header="آکولادها برای بدنه تک خطی الزامی نیستند"
اگر بدنه حلقه یک دستور واحد داشته باشد، ما می توانیم آکولادها `{...}` را حذف کنیم:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## حلقه "do..while"

بررسی شرط با استفاده از سینتکس `do..while` می تواند به *پایین* بدنه حلقه منتقل شود.

```js
do {
  // بدنه حلقه
} while (condition);
```

حلقه اول بدنه را اجرا می کند، سپس شرط را بررسی می کند، و تا وقتی که truthy باشد، دوباره و دوباره آن(بدنه) را اجرا می کند.

برای مثال:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

این شکل از سینتکس باید فقط زمانی استفاده شود که شما بخواهید بدنه حلقه جدای از اینکه شرط truthy باشد **حداقل یک بار** اجرا شود. معمولا، شکل دیگر ترجیح داده می شود: `while(...) {...}`.

## حلقه "for"

حلقه `for` پیچیده تر است، اما این حلقه بیشترین استفاده را هم دارد.

اینطور به نظر می رسد:

```js
for (begin; condition; step) {
  // ... بدنه حلقه ...
}
```

بیایید معنی این قسمت ها را با مثال یاد بگیریم. حلقه زیر `alert(i)` را برای هر `i` از `0` تا `3` (اما شامل نمی شود) اجرا می کند:

```js run
for (let i = 0; i < 3; i++) { // 0 را نمایش می دهد، سپس 1، سپس 2
  alert(i);
}
```

بیایید دستور `for` را قسمت به قسمت بازرسی کنیم:

| قسمت  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin(آغاز) | `i = 0`    | به محض ورود به حلقه اجرا می شود.                                      |
| condition(شرط) | `i < 3`| قبل از هر تکرار حلقه بررسی می شود. اگر false باشد حلقه متوقف می شود.              |
| body(بدنه) | `alert(i)`| تا زمانی که شرط truthy باشد همچنان اجرا می شود.                         |
| step(قدم) | `i++`      | در هر تکرار بعد از بدنه اجرا می شود. |

الگوریتم کلی حلقه مثل قسمت پایین کار می کند:

```
begin را اجرا کن
→ (if condition → body را اجرا کن و step را اجرا کن)
→ (if condition → body را اجرا کن و step را اجرا کن)
→ (if condition → body را اجرا کن و step را اجرا کن)
→ ...
```

یعنی اینکه، `begin` یک بار اجرا می شود، و سپس این تکرار می شود: بعد از هر بار آزمایش `condition`، `body` و `step` اجرا می شوند. 

اگر شما در حلقه ها تازه وارد هستید، این می تواند کمک کند که به مثال برگردید و چگونگی اجرا شدن آن را مرحله به مرحله روی یک کاغذ بنویسید.

اینکه در این مورد ما چه اتفاقی می افتد اینجا آورده شده:

```js
// for (let i = 0; i < 3; i++) alert(i)

// begin را اجرا کن
let i = 0
// if condition → body را اجرا کن و step را اجرا کن
if (i < 3) { alert(i); i++ }
// if condition → body را اجرا کن و step را اجرا کن
if (i < 3) { alert(i); i++ }
// if condition → body را اجرا کن و step را اجرا کن
if (i < 3) { alert(i); i++ }
// ...پایان، چون حالا i == 3
```

````smart header="تعریف درون خطی متغیر"
اینجا، متغیر "شمارنده" `i` دقیقا داخل حلقه تعریف شده است. این یک تعریف "درون خطی" متغیر نامیده می شود. این چنین متغیرهایی تنها داخل حلقه قابل دیدن هستند.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // ارور، چنین متغیری وجود ندارد
```

به جای تعریف کردن یک متغیر، ما می توانستیم از یک متغیر موجود استفاده کنیم:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // استفاده از یک متغیر موجود
  alert(i); // 0, 1, 2
}

alert(i); // 3، قابل دیدن است، چون بیرون از حلقه تعریف شده است
```

````


### قسمت های قابل جا انداختن

هر قسمت `for` را می توان از قلم انداخت.

برای مثال، ما می توانیم `begin` را حذف کنیم اگر نیاز به انجام کاری در آغاز حلقه ندشته باشیم.

مثل اینجا:

```js run
let i = 0; // ما i را داریم که از قبل تعریف شده و تخصیص داده شده است.

for (; i < 3; i++) { // نیازی به "begin" نیست
  alert( i ); // 0, 1, 2
}
```

همچنین ما می توانیم قسمت `step` را حذف کنیم:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

این کار حلقه را شبیه `while (i < 3)` می کند.

در واقع ما می توانیم همه چیز را حذف کنیم، یک حلقه بی نهایت بسازیم:

```js
for (;;) {
  // بدون محدودیت تکرار می شود
}
```

لطفا در نظر داشته باشید که هر دو نقطه ویرگول `;` داخل `for` باید وجود داشته باشند. در غیر این صورت، یک ارور سینتکس به وجود خواهد آمد.

## شکستن حلقه

به طور معمول، یک حلقه زمانی که شرط آن falsy شود متوقف می شود.

اما ما می توانیم با استفاده از دستور خاص `break` آن را در هر لحظه مجبور به توقف کنیم.

برای مثال، حلقه زیر از کاربر یک سری عدد درخواست می کند، و زمانی که هیچ عددی وارد نشد "می شکند":

```js run
let sum = 0;

while (true) {

  let value = +prompt("یک عدد وارد کنید", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'مجموع: ' + sum );
```

دستور `break` اگر کاربر یک خط خالی وارد کند یا ورودی را لغو کند در خط `(*)` فعال می شود. حلقه را بلافاصله متوقف می کند، و کنترل را به اولین خط بعد از حلقه می سپارد. یعنی، `alert`.

ترکیب "حلقه بی نهایت + `break` در صورت نیاز" برای موقعیت هایی که یک شرط حلقه نباید در آغاز یا انتهای حلقه بررسی شود، بلکه در وسط یا حتی چند جای بدنه آن بررسی شود عالی است.

## Continue to the next iteration [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.

The loop below uses `continue` to output only odd values:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.

For example, if we take this code:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...and rewrite it using a question mark:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

We need a way to stop the process if the user cancels the input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient -- labels, come to the rescue!

A *label* is an identifier with a colon before a loop:
```js
labelName: for (...) {
  ...
}
```

The `break <labelName>` statement in the loop below breaks out to the label:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move the label onto a separate line:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.

For example, it is impossible to do this:
```js
break label; // jump to the label below (doesn't work)

label: for (...)
```

A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:
```js
label: {
  // ...
  break label; // works
  // ...
}
```

...Although, 99.9% of the time `break` used is inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
````

## Summary

We covered 3 types of loops:

- `while` -- The condition is checked before each iteration.
- `do..while` -- The condition is checked after each iteration.
- `for (;;)` -- The condition is checked before each iteration, additional settings available.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
