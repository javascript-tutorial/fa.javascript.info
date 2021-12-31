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

We already know that plain objects are converted to string as `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // the same
```

That's their implementation of `toString`. But there's a hidden feature that makes `toString` actually much more powerful than that. We can use it as an extended `typeof` and an alternative for `instanceof`.

Sounds strange? Indeed. Let's demystify.

By [specification](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), the built-in `toString` can be extracted from the object and executed in the context of any other value. And its result depends on that value.

- For a number, it will be `[object Number]`
- For a boolean, it will be `[object Boolean]`
- For `null`: `[object Null]`
- For `undefined`: `[object Undefined]`
- For arrays: `[object Array]`
- ...etc (customizable).

Let's demonstrate:

```js run
// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

// what type is this?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Here we used [call](mdn:js/function/call) as described in the chapter [](info:call-apply-decorators) to execute the function `objectToString` in the context `this=arr`.

Internally, the `toString` algorithm examines `this` and returns the corresponding result. More examples:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

The behavior of Object `toString` can be customized using a special object property `Symbol.toStringTag`.

For instance:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

For most environment-specific objects, there is such a property. Here are some browser specific examples:

```js run
// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

As you can see, the result is exactly `Symbol.toStringTag` (if exists), wrapped into `[object ...]`.

At the end we have "typeof on steroids" that not only works for primitive data types, but also for built-in objects and even can be customized.

We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.

## Summary

Let's summarize the type-checking methods that we know:

|               | works for   |  returns      |
|---------------|-------------|---------------|
| `typeof`      | primitives  |  string       |
| `{}.toString` | primitives, built-in objects, objects with `Symbol.toStringTag`   |       string |
| `instanceof`  | objects     |  true/false   |

As we can see, `{}.toString` is technically a "more advanced" `typeof`.

And `instanceof` operator really shines when we are working with a class hierarchy and want to check for the class taking into account inheritance.
