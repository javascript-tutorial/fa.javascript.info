# انواع داده

<<<<<<< HEAD
یک متغیر در جاوا اسکریپت می‌تواند هر نوع داده‌ای را در خود ذخیره کند. یک متغیر می‌تواند در یک لحظه حاوی رشته‌ای اِز کاراکترها و در لحظه دیگر یک عدد باشد.
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
// no error
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
زبان‌های برنامه‌نویسی‌ای که چنین امکانی به شما می‌دهند "Dynamically Typed" نامیده می‌شوند. به این معنی که انواعی از داده وجود دارد و متغیرها محدود به آنها نیستند.
در جاوا اسکریپت هفت نوع پایه‌ای از انواع داده وجود دارد که الان به صورت کلی به آنها می‌پردازیم و در بخش‌های بعدی در مورد هرکدام با جزئیات صحبت خواهیم کرد.

## عدد
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
let n = 123;
n = 12.345;
```

نوع *number* (عدد) اعداد صحیح و اعداد اعشاری را شامل می‌شود. عملیات مختلفی در مورد اعداد وجود دارد مانند ضرب `*` ، تقسیم `/` ، جمع `+` ، تفریق `-` و غیره.
همینطور بجز اعداد معمولی، اعداد خاصی نیز وجود دارند که به همین نوع از متغیرها مربوط می‌شوند. یعنی : بینهایت، منفی بینهایت و `NaN` .

- بینهایت : نماد بیانگر علامت ریاضیاتیِ [∞](https://en.wikipedia.org/wiki/Infinity) است. این مقدار خاص بوده که از هر عدد دیگری بزرگتر است.

از تقسیم هر عددی با صفر به این مقدار می‌رسیم :

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

     یا به طور مستقیم نیز به آن دسترسی داریم :

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN`: بیانگر یک اشکال محاسباتی است و در نتیجه یک عملیات ریاضیاتی غلط یا تعریف نشده بوجود می‌آید. برای نمونه:

    ```js run
    alert( "not a number" / 2 ); // NaN, such division is erroneous
    ```

   هر عملی بر روی `NaN` نتیجه `NaN` خواهد داشت :

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

<<<<<<< HEAD
    در نتیجه اگر `NaN` در عملیات ریاضیاتی‌ای وجود داشته باشد، بر روی تمام معادله تاثیر می‌گذارد (نتیجه معادله برابر `NaN` خواهد بود).

```smart header="عملگرهای ریاضیاتی امن هستند"
عملیات ریاضی در جاوا اسکریپت امن است. ما هر نوع عملی می‌توانیم انجام دهیم مانند تقسیم بر صفر. اسکریپت ما هیچگاه با خطا مواجه نخواهد شد. در بدترین حالت `NaN` را به عنوان نتیجه خواهیم گرفت.
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result.

```smart header="Mathematical operations are safe"
Doing maths is "safe" in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error ("die"). At worst, we'll get `NaN` as the result.
```

Special numeric values formally belong to the "number" type. Of course they are not numbers in the common sense of this word.

We'll see more about working with numbers in the chapter <info:number>.

## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(-2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox/Chrome/Edge, but not in Safari/IE.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```

## رشته کاراکترها

یک رشته کاراکتر در جاوا اسکریپت باید در بین کوتِیشِن‌ها محصور شوند.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

در جاوا اسکریپت سه نوع کوتِیشِن داریم :

1. Double qoutes مانند `"Hello"`.
2. Single qoutes مانند `'Hello'`.
3. Backticks مانند <code>&#96;Hello&#96;</code>.

Double quotes و Single quotes همان کوتِیشِن‌های عادی هستند و در جاوا اسکریپت تفاوتی با هم ندارند.
Backticks امکان توسعه به ما می‌دهند. بوسیله‌ی آنها می‌توانیم داخل یک رشته کاراکتر عبارات و دستورات جاوا اسکریپت بنویسیم.

```js run
let name = "John";

// embed a variable
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// embed an expression
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

عبارتی که در `${…}` قرار می‌گیرد اجرا شده و نتیجه آن در رشته مورد نظر قرار می‌گیرد.

توجه داشته باشید که quote ها چنین قابلیتی را ندارند :

```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)
```

در مورد رشته‌ها در بخش‌های بعدی بیشتر صحبت خواهیم کرد.

```smart header="نوع داده‌ای برای کاراکترها وجود ندارد"
در زبان‌هایی مانند C و یا Java نوع داده‌ای خاصی مختص به کاراکترها تحت عنوان `char` وجود دارد.

در جاوا اسکریپت چنین نوعی نداریم. فقط یک نوع داده برای رشته‌ها داریم که آن `string` است، که شامل یک یا چند کاراکتر می‌تواند باشد.
```

## نوع Boolean

نوع Boolean فقط یکی از دو مقدار `true` و `false` را شامل می‌شود.

این نوع معمولا برای ذخیره مقدار yes یا no استفاده می‌شود. `true` به معنی yes و `false` به معنی no می‎‌باشد.

برای نمونه :

```js
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked
```

مقدار Booealn معمولا به عنوان یک نتیجه‌ی مقایسه بدست می‌آیند :

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")
```

در مورد Boolean ها در بخش‌های بعدی صحبت خواهیم کرد.

## مقدار "null"

مقدار `null` یکی دیگر از انواع داده در جاوا اسکریپت می‌باشد.

```js
let age = null;
```

در جاوا اسکریپت `null` مانند بعضی از زبان‌های برنامه‌نویسی به معنی وجود نداشتن یک شیء یا به معنی null pointer نیست. 

Null صرفا یک مقدار خاص است که نمایانگر "خالی بودن" ، "هیچ بودن" و "مشخص نبودن مقدار" می‌باشد.

<<<<<<< HEAD
در مثال بالا مقدار `age` به هر دلیلی نا مشخص یا خالی است.
=======
The code above states that `age` is unknown.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## مقدار "undefined"

مقدار `undefined` نیز مانند `null` یک نوع مجزا در جاوا اسکریپت است.

`undefined` بدین معنی‌ است که "مقداری اختصاص نیافته است".

 اگر متغیری تعریف کنیم و مقداری به آن اختصاص ندهیم، مقدار آن `undefined` خواهد بود :

```js run
let age;

alert(age); // shows "undefined"
```

<<<<<<< HEAD
از لحاظ فنی، امکان تخصیص دادن `undefined` به هر متغیری وجود دارد :
=======
Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
اما ما چنین کاری را توصیه نمی‌کنیم و برای تخصیص مقدار "خالی" یا "مجهول" از `null` استفاده می‌کنیم و از `undefined` برای بررسی اینکه به متغیری مقدار تخصیص یافته یا خیر استفاده می‌کنیم.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.

## Objects and Symbols
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Object ها و Symbol ها

<<<<<<< HEAD
نوع `object` از انواع خاص است.

انواعی که تا بدین جا مطالعه کردیم از انواع "اولیه" بودند چراکه مقدار آنها فقط شامل یک چیز می‌شد. اما object ها برای ذخیره مجموعه‌ای از داده‌ها به شکلی پیچیده‌تر استفاده می‌شوند. پس از آنکه در مورد انواع اولیه بیشتر مطالعه کردیم، در مورد object ها بیشتر خواهیم آموخت.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

نوع `symbol` برای ایجاد یک شناسه منحصر به فرد برای object ها مورد استفاده قرار می‌گیرد. به منظور تکمیل عنوان این بخش این نوع داده را نیز در اینجا عنوان کردیم ولی بهتر است جزئیات آن را در بخش‌های بعدی بررسی کنیم.

## عملگر typeof [#type-typeof]

این عملگر نوع عبارت را نشان می‌دهد. معمولا زمانی که می‌خواهیم سریع نوع یک مقدار را بررسی کنیم یا زمانی‌که می‌خواهیم پردازشی بر اساس نوع یک مقدار انجام دهیم، کاربرد دارد.

این عملگر به دو شکل قابل استفاده است :

1. به عنوان عملگر : `typeof x`.
2. به عنوان فانکشن : `typeof (x)`.

با صدا زدن `typeof x` رشته کاراکتری حاوی نوع آن مقدار نمایش داد می‌شود :

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

سه خط آخر احتمالا نیاز به توضیحات بیشتری دارد.

<<<<<<< HEAD
1. `Math` یک آبجکت در اصطلاحا built-in (از پیش نوشته شده در هسته زبان) است که عملیات متنوع ریاضیاتی در اختیار ما قرار می‌دهد. در اینجا صرفا یک مثال از آن را نمایش دادیم و در بخش Numbers با آن بیشتر آشنا خواهیم شد.
2. خروجی `typeof null` همانطور که می‌بینید `"object"` است و این صحیح نیست. این یک خطا در نوع کار `typeof` می‌باشد که به منظور سازگاری باقی مانده است. مطمئنا `null` یک object نیست. خودِ null یکی از انواع داده در جاوا اسکریپت است. 
3. نوع `alert` یک فانکشن است چراکه `alert` یکی از فانکشن‌های جاوا اسکریپت می‌باشد. ما در بخش‌های بعدی با فانکشن‌ها بیشتر آشنا خواهیم شد و خواهیم آموخت که نوعی تحت عنوان فانکشن نداریم و خودِ فانکشن‌ها در اصل از نوعِ object هستند. اما عملگر `typeof` به آنها به طرز دیگری برخورد می‌کند. 
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31


## خلاصه

<<<<<<< HEAD
در جاوا اسکریپت 7 نوع داده‌ی پایه‌ای داریم :
=======
- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

- `number` که شامل اعداد صحیح و اعداد اعشاری می‌شود.
- `string` برای رشته کاراکترها. یک string می‌تواند یک یا چند کاراکتر داشته باشد. هیچ نوع داده‌ای تحت عنوان char در جاوا اسکریپت وجود ندارد.
- `boolean` برای `true` و یا `false`.
- `null` برای مقادیر مجهول. null یک نوع مستقل بوده که یک مقدار تحت عنوان `null` دارد.
- `undefined` برای مقادیر تخصیص نیافته. یک نوع مستقل بوده که یک مقدار تحت عنوان `undefined` دارد.
- `object` برای ذخیره ساختارهای پیچیده‌تر اطلاعات.
- `symbol` برای شناسه‌های یکتا.

عملگر `typeof` به شما اجازه می‌دهد نوع مقدار ذخیره شده در یک متغیر را تشخصی دهید.

به دو طریق : `typeof x` و یا `typeof(x)`.
نوع متغیر را باز می‌گرداند مانند `"string"`.
برای `null` مقدار `"object"` را نمایش می‌دهد. این یک خطا در خودِ زبان است. در واقع null یک object نیست.