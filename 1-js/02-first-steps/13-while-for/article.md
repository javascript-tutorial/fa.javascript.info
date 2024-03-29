# حلقه ها: while و for

ما معمولا نیاز داریم که کارها رو تکرار کنیم.

برای مثال، کالاهایی را از یک لیست یکی پس از دیگری نمایش دهیم یا کد مشابهی رو برای هر عدد از 1 تا 10 اجرا کنیم.

*حلقه ها* راهی برای تکرار یک کد برای چندین بار هستند.

## حلقه "while"
```smart header="حلقه‌های for..of و for..in"
اعلانی برای خواننده‌های پیشرفته.

این مقاله تنها حلقه‌های پایه‌ای را پوشش می‌دهد: `while`، `do..while` و `for(..;..;..)`.

اگر شما برای جستجوی انواع دیگر حلقه به این مقاله آمده‌اید، اینجا اشاراتی به آن‌ها را داریم:

- حلقه [for..in](info:object#forin) را برای حلقه زدن در ویژگی‌های شیء ببینید.
- حلقه [for..of](info:array#loops) و [iterables](info:iterable) را برای حلقه زدن در آرایه‌ها و شیءهای حلقه‌پذیر ببینید.

در غیر این صورت، لطفا خواندن را ادامه دهید.
```

حلقه `while` سینتکس زیر را دارد:

```js
while (condition) {
  // کد
  // به اصطلاح "بدنه حلقه"
}
```

تا وقتی که `condition` truthy باشد، `کد` قسمت بدنه حلقه اجرا می شود. 

برای مثال، حلقه پایین `i` را تا وقتی که `i < 3` باشد، نمایش می دهد:

```js run
let i = 0;
while (i < 3) { // 0 را نمایش می دهد، سپس 1، سپس 2
  alert( i );
  i++;
}
```

یک بار اجرا شدن بدنه حلقه را *یک تکرار* می نامند. حلقه داخل مثال بالا سه تکرار می سازد.

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

بیایید معنی این قسمت ها را با مثال یاد بگیریم. حلقه زیر `alert(i)` را برای هر `i` از `0` تا `3` (خود 3 شامل نمی شود) اجرا می کند:

```js run
for (let i = 0; i < 3; i++) { // 0 را نمایش می دهد، سپس 1، سپس 2
  alert(i);
}
```

بیایید شرح `for` را قسمت به قسمت بررسی کنیم:

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

اگر شما تازه با حلقه ها آشنا شدید، به مثال برگردید و مراحل اجرای آن را مرحله به مرحله روی یک کاغذ بازتولید کنید.

در مورد ما، دقیقا این اتفاق می افتد:

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
اینجا، متغیر "شمارنده" `i` دقیقا داخل حلقه تعریف شده است. این یک تعریف "درون خطی" متغیر نامیده می شود. این چنین متغیرهایی تنها داخل حلقه قابل رویت هستند.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // ارور، چنین متغیری وجود ندارد
```

ما می توانستیم به جای تعریف کردن یک متغیر، از یک متغیر موجود استفاده کنیم:

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

برای مثال، اگر نیاز به انجام کاری در آغاز حلقه نداشته باشیم می توانیم `begin` را حذف کنیم.

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

این کار حلقه را برابر با `while (i < 3)` می کند.

در واقع ما می توانیم همه چیز را حذف کنیم، یک حلقه بی نهایت بسازیم:

```js
for (;;) {
  // بدون محدودیت تکرار می شود
}
```

لطفا در نظر داشته باشید که هر دو نقطه ویرگول `;` داخل `for` باید وجود داشته باشند. در غیر این صورت، یک سینتکس ارور به وجود خواهد آمد.

## متوقف کردن حلقه

به طور معمول، یک حلقه زمانی که شرط آن falsy شود متوقف می شود.

اما ما می توانیم با استفاده از دستور خاص `break` آن را در هر لحظه مجبور به توقف کنیم.

برای مثال، حلقه زیر از کاربر یک سری عدد درخواست می کند، و زمانی که هیچ عددی وارد نشد "متوقف می شود":

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

اگر کاربر یک خط خالی وارد کند یا ورودی را لغو کند دستور `break` در خط `(*)` فعال می شود. حلقه را بلافاصله متوقف می کند، و کنترل را به اولین خط بعد از حلقه می سپارد. یعنی، `alert`.

ترکیب "حلقه بی نهایت + `break` در صورت نیاز" برای موقعیت هایی که یک شرط حلقه نباید در آغاز یا انتهای حلقه بررسی شود، بلکه در وسط یا حتی چند جای بدنه آن بررسی شود عالی است.

## ادامه دادن به تکرار بعدی [#continue]

دستور `continue` یک "نسخه سبک تر" از `break` است. حلقه را متوقف نمی کند. در عوض، تکرار حال حاضر را متوقف می کند و حلقه را مجبور می کند که یک تکرار جدید را شروع کند (اگر شرط اجازه دهد).

ما می توانیم در صورتی که با تکرار حال حاضر کارمان تمام شده باشد و بخواهیم به تکرار بعدی برویم از آن استفاده کنیم.

حلقه پایین از `continue` فقط برای نشان دادن مقدارهای فرد استفاده می کند.

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // اگر true باشد، قسمت باقی مانده بدنه را از قلم بنداز
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1، سپس 9 ،7 ،5 ،3
}
```

برای مقدار های زوج `i`، دستور `continue` اجرا کردن بدنه را متوقف می کند و کنترل را به تکرار بعدی `for` می دهد (به همراه عدد بعدی). پس `alert` فقط برای مقدارهای فرد صدا زده می شود.

````smart header="دستور `continue` به کم کردن تو در تو بودن کمک می کند"
یک حلقه که اعداد فرد را نمایش می دهد می توانست اینطور باشد:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

از دیدگاه فنی، این شبیه مثال بالا است. مسلما، ما می توانیم کد را داخل یک بلوک `if` بگذاریم به جای اینکه از `continue` استفاده کنیم.

اما به عنوان یک عارضه جانبی، یک سطح بیشتری از تودرتویی می سازد (صدا زدن `alert` داخل آکولادها). اگر کد داخل `if` بیشتر از چند خط باشد، ممکن است خوانایی کلی را کاهش دهد.
````

````warn header="ممنوعیت `break/continue` در سمت راست '?'"
لطفا در نظر داشته باشید که ساختارهای سینتکس که عبارت نیستند نمی توانند با عملگر ternary `?` استفاده شوند. به خصوص، دستورهایی مثل `break/continue` مجاز نیستند.

برای مثال، اگر ما این کد را در نظر بگیریم:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...و آن را با استفاده از علامت سوال دوباره بنویسیم:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue اینجا مجاز نیست
```

...متوقف می شود: چون یک سینتکس ارور وجود دارد.

این یک دلیل دیگری برای استفاده نکردن از عملگر علامت سوال `?` به جای `if` است.
````

## برچسب هایی برای break/continue

بعضی اوقات ما نیاز داریم که از چند حلقه تو در تو به یک باره خارج شویم.

برای مثال، در کد پایین ما با `i` و `j` حلقه می زنیم، و برای مختصات های `(i, j)` از `(0,0)` تا  `(2,2)` prompt می کنیم:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`مقدار در متخصات (${i},${j})`, '');

    // اگر ما بخواهیم از اینجا به تمام (پایین) خارج شویم چه کار کنیم؟
  }
}

alert('تمام!');
```

ما به راهی نیاز داریم که فرایند را در صورتی که کاربر ورودی را لغو کند متوقف کنیم.

`break` معمولی بعد از `input` فقط حلقه داخلی را متوقف می کند. این کافی نیست -- برچسب ها، به کمک می آیند!

یک *برچسب* مشخص کننده ای است که قبل از یک حلقه همراه دو نقطه می آید:
```js
labelName: for (...) {
  ...
}
```

دستور `break <labelName>` در حلقه پایین به برچسب مورد نظر می رسد:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`مقدار در مختصات (${i},${j})`, '');

    // اگر یک رشته خالی وارد شود یا لغو شود، سپس از هر دو حلقه خارج شو
    if (!input) *!*break outer*/!*; // (*)

    // یک کاری با مقدار انجام بده...
  }
}
alert('تمام!');
```

در کد بالا، `break outer` برای پیدا کردن برچسب `outer` بالا را جست و جو می کند و از آن حلقه خارج می شود.

پس کنترل به صورت مسقیم از `(*)` به `alert('تمام!')` می رسد.

همچنین ما می توانیم برچسب را به یک خط جداگانه منتقل کنیم:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

دستور `continue` هم می تواند به همراه برچسب استفاده شود. در این مورد، اجرای کد به تکرار بعدی از حلقه برچسب زده شده می رود.

````warn header="برچسب ها اجازه \"پرش\" به جایی را نمی دهند"
برچسب ها به ما اجازه نمی دهند که به جای دلخواهی از کد بپریم.

برای مثال، انجام دادن این کار غیر ممکن است:
```js
break label; // پرش به برچسب پایین (کار نمی کند)

label: for (...)
```

یک دستور `break` باید در داخل بلوک کد باشد. از نظر فنی، آن بلوک می تواند هر بلوک کد برچسب زده باشد
```js
label: {
  // ...
  break label; // کار می کند
  // ...
}
```

...اگرچه، %99.9 مواقع `break` در داخل حلقه ها استفاده می شود، همانطور که در مثال های بالا دیدیم.

یک `continue` فقط می تواند در داخل حلقه باشد.
````

## خلاصه

ما سه نوع حلقه را پوشش دادیم:

- `while` -- شرط قبل از هر تکرار بررسی می شود.
- `do..while` -- شرط بعد از هر تکرار بررسی می شود.
- `for (;;)` -- شرط قبل از هر تکرار بررسی می شود، تنظیمات بیشتر هم ممکن است.

برای ساخت یک حلقه "بی نهایت"، معمولا ساختار `while(true)` استفاده می شود. چنین حلقه ای، درست مثل هر حلقه، می تواند با دستور `break` متوقف شود.

اگر ما نخواهیم که در تکرار حال حاضر کاری کنیم و دوست داشته باشیم که به تکرار بعدی برویم، می توانیم از دستور `continue` استفاده کنیم.

`break/continue` از برچسب های قبل از حلقه پشتیبانی می کنند. یک برچسب تنها راه `break/continue` برای فرار از یک حلقه تو در تو و رفتن به حلقه بیرونی است. 