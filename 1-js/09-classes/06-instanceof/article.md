# چک کردن کلاس: "instanceof"

عملگر `instanceOf` به ما این امکان را می‌دهد که بررسی کنیم یک شیء به کلاسی مشخص تعلق دارد یا خیر. این عملگر ارث‌بری را هم محسوب می‌کند.

چنین بررسی‌ای ممکن است در موارد بسیاری ضروری باشد. برای مثال، می‌توانیم برای ساخت یک تابع *چندریخت (polymorphic)* از آن استفاده کنیم، تابعی که بر اساس نوع آرگومان‌ها با آن‌ها به صورت متفاوت رفتار می‌کند.

## عملگر instanceof [#ref-instanceof]

سینتکس اینگونه است:
```js
obj instanceof Class
```

اگر `obj` به `Class` یا کلاسی که از آن ارث‌بری می‌کند تعلق داشته باشد، این عملگر مقدار `true` را برمی‌گرداند.

برای مثال:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// است؟ Rabbit آیا شیءای از کلاس
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

با تابع‌های سازنده هم کار می‌کند:

```js run
*!*
// به جای کلاس
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...و با کلاس‌های درون‌ساخت مانند `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

لطفا در نظر داشته باشید که `arr` هم به کلاس `Object` تعلق دارد. به این دلیل که `Array` به صورت پروتوتایپی از `Object` ارث‌بری می‌کند.

معمولا، `instanceof` زنجیره پروتوتایپ را بررسی می‌کند. ما هم می‌توانیم یک منطق سفارشی در متد ایستای `Symbol.hasInstance` ایجاد کنیم.

الگوریتم `obj instanceof Class` تقریبا اینگونه عمل می‌کند:

1. اگر متد ایستای `Symbol.hasInstance` وجود داشته باشد، سپس آن را فراخوانی کن: `Class[Symbol.hasInstance](obj)`. این متد باید `true` یا `false` را برگرداند و کار تمام است. ما اینگونه رفتار `instanceof` را شخصی‌سازی می‌کنیم.

    برای مثال:

    ```js run
    // تا instanceof راه‌اندازی بررسی کردن
    // فرض کند (animal) را یک جانور canEat هر چیزی شامل ویژگی
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true :فراخوانی شده Animal[Symbol.hasInstance](obj)
    ```

2. اکثر کلاس‌ها `Symbol.instanceof` را ندارند. در این صورت، منطق استاندارد استفاده می‌شود: `obj instanceOf Class` بررسی می‌کند که آیا `Class.prototype` برابر با یکی از پروتوتایپ‌ها در زجیره پروتوتایپی `obj` هست یا نه.

    به عبارتی دیگر، یکی پس از دیگری آن را مقایسه می‌کند:
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // را برگردان true ،است true اگر جواب
    // را برگردان false ،در غیر این صورت، اگر ما به انتهای زنجیره رسیدیم
    ```

    در مثال بالا `rabbit.__proto__ === Rabbit.prototype` برقرار است، پس بلافاصله جواب مشخص می‌شود.

    در صورت وجود ارث‌بری، تساوی در مرحله دوم رخ می‌دهد:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Animal.prototype (مساوی نیست)
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (!مساوی است)
    */!*
    ```

این هم تصویر چیزی که `rabbit instanceof Animal` با `Animal.prototype` مقایسه می‌کند:

![](instanceof.svg)

راستی، همچنین متدی به نام [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf) وجود دارد که اگر `objA` جایی در زنجیره پروتوتایپ `objB` وجود داشته باشد `true` را برمی‌گرداند. پس بررسی `obj instanceof Class` می‌تواند به صورت `Class.prototype.isPrototypeOf(obj)` بازنویسی شود.

جالب است که سازنده `Class` خودش در بررسی شرکت نمی‌کند! فقط زنجیره پروتوتایپ‌ها و `Class.prototype` مهم هستند.

زمانی که ویژگی `prototype` بعد از اینکه شیء ساخته شد تغییر کند، این موضوع می‌تواند باعث ایجاد پیامدهای جالبی شود.

مثل اینجا:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// پروتوتایپ را تغییر دادیم
Rabbit.prototype = {};

// !نیست (rabbit) دیگر یک خرگوش
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## Bonus: Object.prototype.toString for the type
## کمک: متد Object.prototype.toString برای نوع

ما از قبل می‌دانیم که شیءهای ساده به صورت `[object Object]` به رشته تبدیل می‌شوند:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // یکسان
```

این پیاده‌سازی `toString` آن‌ها است. اما در واقع یک ویژگی پنهانی وجود دارد که `toString` را از آن خیلی قدرتمندتر می‌کند. می‌توانیم از این متد به عنوان یک `typeof` پیشرفته‌تر و یک جایگزین برای `instanceof` استفاده کنیم.

عجیب به نظر می‌رسد؟ واقعا هم هست. بیایید آن را ساده‌تر بیان کنیم.

با توجه به [مشخصات زبان](https://tc39.github.io/ecma262/#sec-object.prototype.tostring)، `toString` درون‌ساخت می‌تواند از شیء استخراج شود و در زمینه (context) هر مقدار دیگری اجرا شود. و نتیجه‌اش به آن مقدار بستگی دارد.

- برای یک عدد، `[object Number]` خواهد بود
- برای یک بولین، `[object Boolean]` خواهد بود
- برای `null`: `[object Null]`
- برای `undefined`: `[object Undefined]`
- برای آرایه‌ها: `[object Array]`
- ...و غیره (قابل شخصی‌سازی).

بیایید نشان دهیم:

```js run
// را درون یک متغیر کپی می‌کنیم toString برای راحتی متد 
let objectToString = Object.prototype.toString;

// این چه نوعی از داده است؟
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

اینجا ما از [call](mdn:js/function/call) همانطور که در فصل [](info:call-apply-decorators) توضیح داده شد برای اجرای تابع `objectToString` با زمینه `this=arr` استفاده کردیم.

از درون، الگوریتم `toString` مقدار `this` را بررسی می‌کند و نتیجه مربوط را برمی‌گرداند. مثال‌های بیشتر:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### متد Symbol.toStringTag

رفتار `toString` شیء می‌تواند با استفاده از ویژگی شیء خاص `Symbol.toStringTag` شخصی‌سازی شود.

برای مثال:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

برای اکثر شیءهایی که مختص به محیط هستند، چنین ویژگی‌ای وجود دارد. اینجا چند مثال مختص به مرورگر را داریم:

```js run
// :برای شیء و کلاس مختص به محیط toStringTag
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

همانطور که می‌بینید، نتیجه دقیقا `Symbol.toStringTag` (اگر وجود داشته باشد) جایگذاری شده درون `[object ...]` است.

در نهایت ما «انواعی از استروئیدها» را داریم که نه تنها برای انواع داده اصلی کار می‌کند، بلکه برای شیءهای درون‌ساخت هم کار می‌کند و حتی می‌تواند شخصی‌سازی شود.

زمانی که می‌خواهیم نوع داده را به عنوان یک رشته دریافت کنیم تا اینکه فقط بررسی کنیم، می‌توانیم به جای `instanceof` از `{}.toString.call` برای شیءهای درون‌ساخت استفاده کنیم.

## Summary

Let's summarize the type-checking methods that we know:

|               | works for   |  returns      |
|---------------|-------------|---------------|
| `typeof`      | primitives  |  string       |
| `{}.toString` | primitives, built-in objects, objects with `Symbol.toStringTag`   |       string |
| `instanceof`  | objects     |  true/false   |

As we can see, `{}.toString` is technically a "more advanced" `typeof`.

And `instanceof` operator really shines when we are working with a class hierarchy and want to check for the class taking into account inheritance.
