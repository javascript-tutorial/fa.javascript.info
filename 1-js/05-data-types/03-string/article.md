# رشته‌ها

در جاوااسکریپت، داده‌ی متنی به عنوان رشته (string) ذخیره می‌شود. نوع جداگانه‌ای برای یک کاراکتر مفرد وجود ندارد.

فرمت درونی برای رشته‌ها همیشه [UTF-16](https://en.wikipedia.org/wiki/UTF-16) است، و به رمزگذاری صفحه بستگی ندارد.

## کوتیشن‌ها

بیایید انواع کوتیشن‌ها را یادآوری کنیم.

رشته‌ها می‌توانند در کوتیشن‌های تکی، دوتایی یا backtickها محصور شوند:

```js
let single = 'کوتیشن تکی';
let double = "کوتیشن دوتایی";

let backticks = `هاbacktick`;
```

کوتیشن‌های تکی و دوتایی اساسا یکسان هستند. اگرچه، backtickها، با پیچیدن هر عبارتی در `{...}$`، به ما اجازه می‌دهند که آن عبارت را درون رشته قرار دهیم:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

یکی دیگر از مزایای استفاده از backtickها این است که اجازه می‌دهند تا رشته را در چند خط بنویسیم:

```js run
let guestList = `مهمان‌ها:
 * John
 * Pete
 * Mary
`;

alert(guestList); // لیستی از مهمان‌ها، در چند خط
```

طبیعی به نظر می‌رسد نه؟ اما کوتیشن‌های تکی یا دوتایی این چنین کار نمی‌کنند.

اگر ما با استفاده از آنها تلاش کنیم در چند خط بنویسیم، یک ارور به وجود خواهد آمد:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

کوتیشن‌های تکی و دوتایی از زمان بسیار قدیم در زبان وجود داشتند زمانی که نیاز به رشته‌های چند خطی خیلی به چشم نمی‌آمد. Backtickها بعدها به وجود آمدند و به این ترتیب چند کاره هستند.

Backtickها به ما اجازه می‌دهند که یک "تابع الگو" قبل از backtick اول مشخص کنیم. سینتکس اینگونه است: <code>func&#96;string&#96;</code>. تابع `func` به طور خودکار صدا زده می‌شود، رشته را دریافت می‌کند و عبارات را ایجاد می‌کند و می‌تواند با آنها فرایندی انجام دهد. به این "الگوهای برچسب گذاری شده" می‌گویند. این ویژگی پیاده‌سازی الگوهای سفارشی را آسان‌تر می‌کند، اما در عمل خیلی کم استفاده می‌شود. می‌توانید درباره آن در [کتاب راهنما](mdn:/JavaScript/Reference/Template_literals#Tagged_templates) بیشتر بخوانید.

## کاراکترهای خاص

اینکه با کوتیشن‌های تکی و دوتایی رشته‌های چند خطی بسازیم، با استفاده از "کاراکتر خط جدید"، که به صورت `\n` نوشته می‌شود، امکان پذیر است که یک خط جدید را مشخص می‌کند:

```js run
let guestList = "مهمان‌ها:\n * John\n * Pete\n * Mary";

alert(guestList); // لیستی چند خطی از مهمان‌ها
```

برای مثال، این دو خط برابر هستند، فقط به طور متفاوتی نوشته شده‌اند:

```js run
let str1 = "Hello\nWorld"; // "ایجاد دو خط با استفاده از "نماد خط جدید

// هاbacktick ایجاد دو خط با استفاده از خط جدید و 
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

کاراکترهای "خاص" دیگر و غیر متداول هم هستند.

لیست کامل آنها:

| کاراکتر | توضیحات |
|-----------|-------------|
|`\n`|خط جدید|
|`\r`|Carriage return: به تنهایی استفاده نمی‌شود. فایل‌های متنی ویندوز از ترکیب دو کاراکتر `\r\n` برای نمایش یک خط جدید استفاده می‌کند. |
|`\'`, `\"`|کوتیشن‌ها|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- برای سازگاری نگه داشته شده‌اند، امروزی استفاده نمی‌شوند. |
|`\xXX`|کاراکتر Unicode همراه با Unicode بر پایه 16 (hexadecimal) داده شده، برای مثال `'\x7a'` برابر است با `'z'`.|
|`\uXXXX`|یک نماد Unicode با کدی بر پایه 16 (hex) `XXXX` با کدگذاری UTF-16، برای مثال `\u009A` که یک Unicode برای نماد کپی‌رایت است `©`. باید دقیقا 4 رقم hex داشته باشد. |
|`\u{X…XXXXXX}` (1 تا 6 کاراکتر hex)|یک نماد Unicode با کدگذاری UTF-32 است. بعضی از کاراکترهای کمیاب با دو نماد Unicode کدگذاری می‌شوند و 4 بایت حجم می‌گیرند. به این روش می‌تونیم کدهای طولانی را جایگذاری کنیم. |

مثال‌هایی با Unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫 ،(طولانی Unicode) یک حرف کمیاب چینی
alert( "\u{1F60D}" ); // 😍 ،(طولانی دیگر Unicode یک) یک نماد صورت خندان
```

تمام کاراکترهای خاص با یک کاراکتر backslash `\` شروع می‌شوند. همچنین به آن "کاراکتر فرار (escape)" هم می‌گویند.

اگر بخواهیم یک کوتیشن را درون رشته‌ای قرار دهیم ممکن است از آن استفاده کنیم.

برای مثال:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

همانطور که می‌بینید، باید قبل از کوتیشن داخلی backslash `\` بیاریم، وگرنه در غیر این صورت کوتیشن پایان رشته را نمایش می‌دهد.

قطعا فقط کوتیشن‌هایی که با کوتیشن‌های پایانی یکسان هستند باید فراری شوند. پس، به عنوان یک راه حل زیباتر، به جای آن می‌توانیم به کوتیشن‌های دوتایی یا backtickها سوییچ کنیم:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

در نظر داشته باشید که backslash `\` برای خوانایی درست رشته توسط جاوااسکریپت به کار برده می‌شود، سپس محو می‌شود. رشته‌ای که درون حافظه است `\` ندارد. می‌توانید این موضوع را به صراحت در `alert` مثال بالایی ببینید.

اما اگر نیاز به نمایش یک backslash `\` واقعی در بین رشته داشته باشیم چه کار کنیم؟

این کار شدنی است و ما باید آن را دو برابر کنیم مثل `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## طول رشته

ویژگی `length` دارای طول رشته است:

```js run
alert( `My\n`.length ); // 3
```

در نظر داشته باشید که `\n` یک کاراکتر "خاص" مفرد است، پس طول در واقع `3` است.

```warn header="`length` یک ویژگی است"
بعضی اوقات افرادی که زمینه‌ای در بعضی زبان‌های برنامه نویسی دیگر دارند اشتباها `str.length()` را به جای نوشتن `str.length` صدا می‌زنند. اینگونه کار نمی‌کند.

لطفا در نظر داشته باشید که `str.length` یک ویژگی عددی است نه یک تابع. نیازی به اضافه کردن پرانتر بعد از آن نیست.
```

## دسترسی داشتن به کاراکترها

برای دریافت یک کاراکتر در موقعیت `pos`، از براکت‌ها استفاده کنید یا متد [str.charAt(pos)](mdn:js/String/charAt) را صدا بزنید. اولین کاراکتر از موقعیت صفر شروع می‌شود:

```js run
let str = `Hello`;

// اولین کاراکتر
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// آخرین کاراکتر
alert( str[str.length - 1] ); // o
```

براکت‌ها روش مدرن دریافت کاراکتر هستند، در حالی که `charAt` بنا به دلایلی مربوط به تاریخچه زبان وجود دارد.

تنها تفاوت میان آنها این است که اگر کاراکتری پیدا نشود، `[]` مقدار `undefined` را برمی‌گرداند، و `charAt` یک رشته خالی را برمی‌گرداند:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (یک رشته خالی)
```

همچنین ما می‌توانیم با استفاده از `for..of` در رشته حلقه بزنیم:

```js run
for (let char of "Hello") {
  alert(char); // H، e، l، l، o، (و غیره "l" سپس ،"e" سپس ،"H" می‌شود char)
}
```

## رشته‌ها تغییرناپذیر هستند

رشته‌ها در جاوااسکریپت نمی‌توانند تغییر کنند. اینکه یک کاراکتر را تغییر دهیم غیر ممکن است.

بیایید برای نشان دادن اینکه کار نخواهد کرد امتحانش کنیم:

```js run
let str = 'Hi';

str[0] = 'h'; // ارور می‌دهد
alert( str[0] ); // کار نمی‌کند
```

یک راه حل این است که رشته‌ای کاملا جدید بسازیم و `str` را به جای رشته‌ی قدیمی برابر با آن قرار دهیم.

برای مثال:

```js run
let str = 'Hi';

str = 'h' + str[1]; // رشته را جایگزین می‌کنیم

alert( str ); // hi
```

در بخش‌های بعدی مثال‌های بیشتری از این خواهیم دید.

## تغییر بزرگی و کوچکی حروف

متدهای [toLowerCase()](mdn:js/String/toLowerCase) و [toUpperCase()](mdn:js/String/toUpperCase) بزرگی و کوچکی حروف را تغییر می‌دهند:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

یا اگر بخواهیم یک کاراکتر را به حرف کوچک آن تبدیل کنیم اینگونه عمل می‌کنیم:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## جستجو برای یک زیر رشته

چند راه برای گشتن به دنبال یک زیر رشته در یک رشته وجود دارد.

### متد str.indexOf

متد اول [str.indexOf(substr, pos)](mdn:js/String/indexOf) است.

این متد به دنبال `substr` درون `str` می‌گردد، و از موقعیت `pos` داده شده شروع می‌کند، و موقعیتی که زیر رشته مورد نظر پیدا شد یا اگر چیزی پیدا نشد `-1` را برمی‌گرداند.

برای مثال:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0 ،در شروع رشته پیدا شد 'Widget' چون
alert( str.indexOf('widget') ); // -1 ،چیزی پیدا نشد، جستجو به بزرگی یا کوچکی حروف حساس است

alert( str.indexOf("id") ); // 1 ،(است id دارای ..idget) در موقعیت 1 پیدا شد "id"
```

پارامتر اختیاری دوم به ما اجازه جستجو از موقعیت داده شده را می‌دهد.

برای مثال، اولین `"id"` که وجود دارد در موقعیت `1` است. برای پیدا کردن بعدی، بیایید جستجو را از موقعیت `2` شروع کنیم:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

اگر ما مشتاق این هستیم که تمام آنها را پیدا کنیم، می‌توانیم `indexOf` را دورن یک حلقه اجرا کنیم. تمام صدازدن‌های جدید با موقعیتی بعد از موقعیت زیر رشته‌ی پیدا شده قبلی انجام می‌شود:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // بیایید به دنبال آن بگردیم

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // جستجو را از موقعیت بعدی ادامه بده
}
```

الگوریتم یکسان را می‌توان کوتاه‌تر نوشت:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`متد str.lastIndexOf(substr, position)`"
یک متد مشابه [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) هم وجود دارد که از انتهای رشته تا آغاز آن جستجو می‌کند.

این متد زیر رشته‌های پیدا شده را با ترتیب برعکس لیست می‌کند.
```

یک چیز ناخوشایند در رابطه با `indexOf` در `if` وجود دارد. ما نمی‌توانیم آن را اینگونه درون `if` بگذاریم:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // !کار نمی‌کند
}
```

در مثال بالا `alert` نمایش نمی‌دهد زیرا `str.indexOf("Widget")` مقدار `0` را برمی‌کرداند (به این معنی که زیر رشته مورد نظر را در موقعیت آغازین پیدا کرد). درست است، اما `if` مقدار `0` را با `false` برابر فرض می‌کند.

بنابراین، ما باید در واقع `-1` را بررسی کنیم، به این شکل:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // !حالا کار می‌کند
}
```

### ترفند bitwise NOT

یکی از ترفندهای قدیمی که اینجا استفاده می‌شود عملگر [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` است. این عملگر عدد را به یک عدد صحیح 32 بیتی تبدیل می‌کند (و بخش اعشاری را در صورت وجود حذف می‌کند) و سپس تمام بیت‌ها را در نمایش دودویی خودش معکوس می‌کند.

در عمل، این به معنی یک چیز ساده است: برای اعداد صحیح 32 بیتی `~n` برابر است با `-(n+1)`.

برای مثال:

```js run
alert( ~2 ); // -3, the same as -(2+1)
alert( ~1 ); // -2, the same as -(1+1)
alert( ~0 ); // -1, the same as -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1)
*/!*
```

همانطور که می‌بینیم، `~n` تنها فقط وقتی که `n == -1` باشد برابر با صفر است (برای هر عدد صحیح 32 بیتی تخصیص داده شده‌ی `n`).

بنابراین، آزمایش `if ( ~str.indexOf("...") )` فقط زمانی که نتیجه `indexOf` برابر با `-1` نباشد truthy است. به عبارتی دیگر، زمانی که یک زیر رشته پیدا شود.

افراد از آن برای کوتاه کردن بررسی `indexOf` استفاده می‌کنند:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // کار می‌کند
}
```

اینکه از ویژگی‌های زبان با روشی که واضح نباشد استفاده کنیم معمولا پیشنهاد نمی‌شود، اما این ترفند مخصوص در کدهای قدیمی بسیار استفاده می‌شود، پس ما باید آن را متوجه شویم.

فقط به یاد داشته باشید: `if (~str.indexOf(...))` به صورت «اگر پیدا شد» خوانده می‌شود.

اگر بخواهیم دقیق باشیم، همانطور که اعداد بزرگ هم توسط عملگر `~` 32 بیتی می‌شوند، اعداد دیگری هم وجود دارند که نتیجه `0` را می‌دهند، کوچک‌ترین آنها `~4294967295=0` است. این روش چنین بررسی‌ای را فقط زمانی که رشته آنقدر طولانی نباشد به درستی انجام می‌دهد.

در حال حاضر ما این روش را فقط در کدهای قدیمی می‌بینیم، چون جاوااسکریپت مدرن متد `.includes` را فراهم کرده است (قسمت پایینی).

### includes, startsWith, endsWith

The more modern method [str.includes(substr, pos)](mdn:js/String/includes) returns `true/false` depending on whether `str` contains `substr` within.

It's the right choice if we need to test for the match, but don't need its position:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

The optional second argument of `str.includes` is the position to start searching from:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
```

The methods [str.startsWith](mdn:js/String/startsWith) and [str.endsWith](mdn:js/String/endsWith) do exactly what they say:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
```

## Getting a substring

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.

`str.slice(start [, end])`
: Returns the part of the string from `start` to (but not including) `end`.

    For instance:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    If there is no second argument, then `slice` goes till the end of the string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
    ```

    Negative values for `start/end` are also possible. They mean the position is counted from the string end:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end`.

    This is almost the same as `slice`, but it allows `start` to be greater than `end`.

    For instance:

    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Negative arguments are (unlike slice) not supported, they are treated as `0`.

`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.

    In contrast with the previous methods, this one allows us to specify the `length` instead of the ending position:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
    ```

    The first argument may be negative, to count from the end:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
    ```

Let's recap these methods to avoid any confusion:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` | negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |

```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character in alphabetical order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letters with diacritical marks are "out of order":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    This may lead to strange results if we sort these country names. Usually people would expect `Zealand` to come after `Österreich` in the list.

To understand what happens, let's review the internal representation of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    We can also add Unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).

- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, it's code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.

So, the browser needs to know the language to compare.

Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.

For instance:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical of hieroglyphs characters or other rare symbols.

You can skip the section if you don't plan to support them.
```

### Surrogate pairs

All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair".

The length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```

Note that surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` shows a length of `2`.

`String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). These methods are actually the same as `fromCodePoint/codePointAt`, but don't work with surrogate pairs.

Getting a symbol can be tricky, because surrogate pairs are treated as two characters:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

In the case above:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, UTF-16 allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their Unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
