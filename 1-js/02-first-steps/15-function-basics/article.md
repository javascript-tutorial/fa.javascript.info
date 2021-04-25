# توابع (Functions)

اغلب اوقات ما نیاز داریم یک مجموعه‌ای از دستورها را در خیلی از جاهای کد چندین بار اجرا کنیم.

برای مثال، می‌خواهیم که پیغامی زیبا برای کسی که وارد صفحه‌ای می‌شود یا خارج می‌شود یا جاهایی دیگر نمایش دهیم.

توابع بلوک‌های ساختمانی اصلی یک برنامه‌اند. آنها به کد اجازه‌ی فراخوانی شدن چند باره را بدون تکرار می‌دهند.

ما مثال‌هایی از توابع درون سیستمی مثل `alert(message)`، `prompt(message, default)` و `confirm(question)` را دیده‌ایم. اما میتوانیم توابع خودمان را هم بسازیم.

## تعریف توابع (Function Declaration)

برای ساختن یک تابع ما به تعریف کردن تابع نیاز خواهیم داشت.‌(*function declaration*)

چیزی شبیه کد پایین:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

کلمه‌ی کلیدی `function` اول می‌آید، سپس *اسم تابع* و سپس لیستی از *پارامترها* داخل پرانتز (با کاما جدا می‌شوند، در مثال بالا داخل پرانتزها خالی‌ست) و در نهایت کد تابع، با نام "بدنه‌ی تابع"، که توسط دو براکت محصور شده است.

```js
function name(parameters) {
  ...body...
}
```

تابع جدید ما می‌تواند با اسمش صدا زده شود: `showMessage()`.

برای نمونه:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

فراخوانی `showMessage()` کد درون تابع را اجرا می‌کند. در اینجا ما پیغام را دوبار خواهیم دید.

این مثال یکی از اهداف اصلی توابع را نشان می‌دهد: اجتناب از کد تکراری.

اگر ما نیاز داشته باشیم نحوه‌ای که پیغام نشان داده می‌شود را عوض کنیم، تنها لازم است که کد را در یک قسمت تغییر دهیم: تابعی که آن را خروجی می‌دهد.

## متغیرهای محلی (Local variables)

اگر یک متغیر در درون تابع تعریف شود، فقط در درون همان تابع قابل استفاده است. 

برای نمونه:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // local variable
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```

## متغیرهای بیرونی (Outer variables)

یک تابع می‌تواند به متغیر درونی دسترسی داشته باشد، به عنوان مثال:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

تابع دسترسی کامل به متغیر بیرونی دارد. همینطور میتواند آنرا تغییر هم بدهد.

برای مثال:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* before the function call

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

متغیر بیرونی فقط در مواقعی مورد استفاده قرار می‌گیرد که متغیر محلی‌ای وجود نداشته باشد.

اگر یک متغیر هم‌نام در درون تابع تعریف شود، جانشین متغیر بیرونی می‌شود. برای مثال، در کد زیر، تابع از متغیر محلی `userName` استفاده می‌کند و متغیر بیرونی نادیده گرفته می‌شود:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // تعریف یک متغیر محلی
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

```smart header="متغیرهای سراسری (Global Variables)"
متغیرهای تعریف شده بیرون از هر تابعی، مثل `userName` در کد بالا، سراسری نامیده می‌شوند.

متغیرهای سراسری برای هر تابعی قابل استفاده است (مگر اینکه متغیری محلی آن را تغییر دهد).

معمولا، یک تابع تمام متغیرهای مربوط به کارش را تعریف می‌کند. متغیرهای سراسری فقط اطلاعات سطح-پروژه را ذخیره می‌کنند و مهم است که این متغیرها قابل دسترسی از هرجایی باشند. کدهای جدید متغیرهای سراسری کمی دارند یا اصلا ندارند. اکثر متغیرها در درون تابع‌ هایشان تعریف می‌شوند.
```

## پارامترها

ما می‌توانیم اطلاعات دلخواهی را به توابع با کمک پارامترها پاس بدهیم. (همچنین به آنها *آرگومان‌های تابع* گفته می‌شود.)

در مثال زیر، تابع دو پارامتر دارد: `from` و `text`.

```js run
function showMessage(*!*from, text*/!*) { // arguments: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

وقتی تابع در خطوط `(*)` و `(**)` صدا زده می‌شود، مقادیر داده شده در متغیرهای محلی `from` و `text` کپی می‌شوند. سپس، تابع از آنها استفاده می‌کند.

مثالی دیگر: یک متغیر `from` داریم و به تابع پاس می‌دهیم. توجه کنید: تابع، `from` را تغییر می‌دهد، اما تغییر در بیرون دیده نمی‌شود، چراکه تابع همیشه یک کپی از مقدار آن را می‌گیرد:


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // make "from" look nicer
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

## مقادیر پیش‌فرض

اگر پارامتری فراهم نشده باشد، مقادیر آن `undefined` می‌شوند.

برای مثال، تابع `showMessage(from, text)`، می‌تواند با یک آرگومان صدا زده شود:

```js
showMessage("Ann");
```

این یک خطا نیست. خروجی این فراخوانی `"Ann: undefined"` است. `text` نداریم پس پیش‌فرض این است که `text === undefined`.

اگر ما بخواهیم یک مقدار "پیش‌فرض" برای `text` در این حالت استفاده کنیم، می‌توانیم آن را بعد از `=` مشخصش کنیم:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

حالا اگر پارامتر `text` پاس داده نشود، مقدار `"no text given"` را می‌گیرد.

اینجا `"no text given"` یک رشته است، اما می‌تواند عبارت پیچیده‌تری باشد، که تنها در حالتی ارزیابی و مقداردهی می‌شود که پارامتری وجود نداشته باشد. بنابراین این هم ممکن است:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}
```

```smart header="ارزیابی پارامترهای پیش‌فرض"
در جاوااسکریپت، یک پارامتر پیش‌فرض هربار که تابع بدون پارامتر مریوطه صدا زده بشود، ارزیابی می‌شود.

در مثال بالا، `anotherFunction()` هربار که `showMessage()` بدون پارامتر `text` صدا زده بشود، فراخوانی می‌شود.
```

### Alternative default parameters

Sometimes it makes sense to set default values for parameters not in the function declaration, but at a later stage, during its execution.

To check for an omitted parameter, we can compare it with `undefined`:

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Or we could use the `||` operator:

```js
// if text parameter is omitted or "" is passed, set it to 'empty'
function showMessage(text) {
  text = text || 'empty';
  ...
}
```

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when falsy values, such as `0`, are considered regular:

```js run
// if there's no "count" parameter, show "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## بازگردانی مقدار یک (Returning a value)

یک تابع می‌تواند مقداری را در فراخوانی کد به عنوان یک جواب بازگرداند.

ساده‌ترین مثال یک تابعی‌ست که جمع دو عدد را حساب می‌کند:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

`return` میتواند در هرجایی از تابع باشد. وقتی اجرای تابع به آن می‌رسد، تابع متوقف می‌شود و مقدار به کد صدازده شده، بازگردانده ‌می‌شود (که در کد بالا `result` است.)

`return` ممکن است در یک تابع بارها ظاهر شود. برای مثال:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

همچنین ممکن است که `return` را بدون مقدار استفاده کرد. این باعث می‌شود که تابع در همان لحظه خارج شود.

برای مثال:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

در کد بالا، اگر `checkAge(age)`، `false` برگرداند، سپس، `showMovie` به `alert` نمیرسد.
````smart header="یک تابع با مقدار خالی `return` یا بدون آن، `undefined` بازمیگرداند."

اگر یک تابع مقداری را برنگرداند، مثل این میماند که `undefined` را برگردانده باشد:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

مقدار `return` خالی، مثل `return undefined` است:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="هرگز خط خالی بین `return` و مقدار نگذارید"

برای جمله‌ای طولانی در `return`، شاید وسوسه کننده به نظر برسد که در یک خطی جدا بدین شکل بگذاریم:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```

اما این کار نمیکند چون جاوااسکریپت بعد `return` یک `;` فرض میگیرد. مثل:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

بنابراین، به یک بازگردانی خالی تبدیل می‌شود. باید مقدار را دقیقا در همان خط بگذاریم.
````

## نامگذاری یک تابع [#function-naming]

توابع، اعمال هستند. بنابراین اسم آنها عموما یک فعل است. باید خلاصه باشد و با بیشترین دقت ممکن، فعالیت تابع را توصیف کند که اگر کسی کد را مطالعه می‌کرد متوجه نوع فعالیت تابع بشود.

این یک روش معمول است که تابع را با پیشوند فعلی شروع کنیم که کارش را به گنگی توصیف کند. یک توافقی در تیم باید بر معنی‌های این پیشوندها باشد.

برای نمونه، توابعی که با `"show"` شروع میشوند، معمولی چیزی را نمایش می‌دهند.
توابعی که با این‌ها شروع میشوند...

- `"get…"` -- یک مقداری را بازمیگرداند،
- `"calc…"` -- چیزی را محاسبه می‌کند،
- `"create…"` -- چیزی را می‌سازد،
- `"check…"` -- چیزی را بررسی می‌کند و مقدار بولی برمی‌گرداند و غیره.

نمونه‌هایی از چنین نام‌هایی:

```js no-beautify
showMessage(..)     // پیغامی را نشان می‌دهد.
getAge(..)          // سن را برمی‌گرداند که به نحوی مقدارش به آن رسیده
calcSum(..)         // جمع میکند و جواب را برمی‌گرداند
createForm(..)      // یک فرم میسازد و عموما آن را برمی‌گرداند
checkPermission(..) // یک سطح دسترسی را بررسی میکند و صحیح و غلط برمیگرداند
```

با پیشوند‌ها در جای خود، نگاهی به نام تابع، درکی از نوع کار و مقداری که برمیگرداند را به ما می‌دهد.

```smart header="یک تابع، یک فعالیت"
یک تابع بایستی چیزی که از نامش پیداست را انجام بدهد، نه بیشتر.

دو فعالیت مستقل،‌ عموما به دو تابع نیاز دارند، حتی اگر عموما باهم نامیده می‌شوند (در این حالت می‌توانیم یک تابع سومی بسازیم که دوتای دیگر را صدا می‌زند)

مثال هایی از شکستن این قانون:
- `getAge` -- کار خوبی نیست اگر یک `alert` را نشان بدهد با سن (فقط باید دریافت کند).

- `createForm` -- کار خوبی نیست اگر document را تغییر بدهد یا فرمی به آن اضافه کند (باید فقط آنرا بسازد و برگرداند).


- `checkPermission` -- کار خوبی نیست اگر پیام `access granted/denied` را نشان دهد (فقط باید بررسی را اجرا کند و مقدار را برگرداند).

این مثال‌ها معانی مشترکی از پیشوند‌ها را فرض می‌کنند. اینکه چه معنی‌ای برای شما دارد توسط خود شما و تیمتان مشخص می‌شود. شاید خیلی برایتان عادی باشد که کدتان متفاوت رفتار کند. اما شما باید یک درک قاطع از اینکه آنها چه معنی ای میدهند و هر تابعی چه کاری را میکند و چه کاری را نمیکند
```

```smart header="نام‌های خیلی کوتاه تابع"
توابعی که بیشتر مورد استفاده قرار می‌گیرند، بعضی اوقات اسم‌های خیلی کوتاهی دارند.
برای مثال، فریمورک [jQuery](http://jquery.com) یک تابع را با `$` تعریف می‌کند. کتابخانه‌ [LoDash](http://lodash.com/) هم تابع اصلی‌ش با نام `_` است.
اینها استثنا هستند. عموما اسم‌های توابع باید مختصر و توصیفی باشند.
```

## Functions == Comments

توابع باید کوتاه باشند و دقیقا یک کار مشخص را انجام بدهند. اگر آن کار بزرگ است شاید نیاز باشد که تابع را به چند تابع کوچکتر بشکانیم. گاهی اوقات دنبال کردن این قانون کار ساده‌ای نیست اما قطعا در کل چیز مفید و خوبی‌ست.

یک تابع مجزا نه تنها برای آزمودن و Debug کردن ساده‌تر است بلکه حتی وجود داشتنش هم توصیفی از نحوه کارکرد است. 
برای نمونه، دو تابع `showPrimes(n)` زیر را مقاسیه کنید. هر یک [prime numbers](https://en.wikipedia.org/wiki/Prime_number) را تا `n` خروجی می‌دهد.
حالت اول:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

در حالت دوم، از یک تابع افزوده‌ای به نام `isPrime(n)` استفاده می‌شود:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

حالت دوم قابل فهم‌تر است، نه؟ تفاوت حالت دوم این است که به جای کد، یک تابع با نام (`isPrime`) اضافه شده است. بعضی اوقات به اینجور کدها، کدهای خود-توصیف میگویند.
بنابراین، حتی اگر ما قصد استفاده دوباره تابع را نداریم، توابع می‌توانند ساخته شوند.
## خلاصه

یک تعریف تابع شبیه این است:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- مقادیر پاس داده شده به یک تابع به عنوان پارامتر، در متغیرهای محلی کپی می‌شوند.
- یک تابع ممکن است به متغیرهای بیرونی هم دسترسی داشته باشد. اما کد بیرون از تابع، متغیرهای محلی را نمی‌بیند.
- یک تابع میتواند یک مقدار را برگرداند. در غیراینصورت مقدار `undefined` را برمی‌گرداند.

برای قابل فهم کردن و تمیز کردن کد، توصیه می‌شود از متغیرهای محلی و پارامترهای تابع را استفاده کنیم تا متغیرهای بیرونی.
فهم اینکه یک تابع پارامترها را میگیرد و با آنها کار می‌کند و سپس یک خروجی می‌دهد همیشه ساده‌تر است تا اینکه یک تابع که هیچ پارامتری نمی‌گیرد اما متغیرهای بیرونی را تغییر می‌دهد.

نامگذاری تابع:

- یک نام، واضحا توضیح می‌دهد که تابع چه کاری انجام می‌دهد. وقتی یک تابعی در کد صدا زده می‌شود، یک اسم خوب سریعا باعث می‌شود ما متوجه شویم که چه کاری می‌کند و چه چیزی را برمی‌گرداند.
- یک تابع، یک فعالیت است، بنابراین اسم توابع عموما افعال خطابی هستند.

پیشوندهای توابع شناخته‌شده زیادی مثل `create…`، `show…`، `get…`، `check…` و غیره وجود دارد. از آنها برای نشان دادن اینکه تابع چه کاری می‌کند استفاده کنید.
توابع، بلوک‌های اصلی ساختمان یک کد هستند. ما مباحث پایه‌ای را پوشش دادیم حالا می‌توانیم آنها را بسازیم و استفاده کنیم. اما این تنها شروع راه است. باز به این مبحث برخواهیم گشت و دقیق‌تر خواهیم شد.
