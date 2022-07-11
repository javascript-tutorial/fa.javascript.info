
# متد‌های پروتوتایپ، اشیاء بدون __proto__

در فصل اول این بخش، اشاره کردیم که متدهای مدرنی برای راه‌اندازی یک پروتوتایپ وجود دارد.

<<<<<<< HEAD
`__proto__` قدیمی و تا حدودی منسوخ در نظر گرفته می‌شود (فقط در بخش مرورگر از استاندارد جاوااسکریپت).

متدهای جدید شامل:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- یک شیء خالی با `proto` داده شده به عنوان `[[Prototype]]` و توصیفگرهای ویژگی اختیاری ایجاد می‌کند.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- `[[Prototype]]` `obj` را برمی‌گرداند.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- `[[Prototype]]` `obj` را روی `proto` قرار می‌دهد.

اینها باید به جای `__proto__` استفاده شوند.
=======
Setting or reading the prototype with `obj.__proto__` is considered outdated and somewhat deprecated (moved to the so-called "Annex B" of the JavaScript standard, meant for browsers only).

The modern methods to get/set a prototype are:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.

The only usage of `__proto__`, that's not frowned upon, is as a property when creating a new object: `{ __proto__: ... }`.

Although, there's a special method for this too:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

برای مثال:

```js run
let animal = {
  eats: true
};

// به عنوان پروتوتایپ animal ایجاد یک شیء جدید با
*!*
let rabbit = Object.create(animal); // same as {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // نمونه اولیه خرگوش را به {} تغییر می‌دهد
*/!*
```

<<<<<<< HEAD
`Object.create` یک آرگومان دوم اختیاری دارد: توصیفگرهای ویژگی. ما می‌توانیم ویژگی‌های اضافی را برای شیء جدید در آنجا ارائه دهیم، مانند این:
=======
The `Object.create` method is a bit more powerful, as it has an optional second argument: property descriptors.

We can provide additional properties to the new object there, like this:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

توصیفگرها به همان قالبی هستند که در فصل <info:property-descriptors> توضیح داده شد.

می‌توانیم از `Object.create` برای انجام شبیه‌سازی شیء استفاده کنیم که بهتر از کپی کردن ویژگی‌ها در `for..in` است:

```js
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

این فراخوانی یک کپی واقعاً دقیق از `obj` می‌سازد، شامل همه ویژگی‌ها: قابل شمارش و غیرقابل شمارش، ویژگی‌های داده و تنظیم‌کننده‌ها/دریافت‌کننده‌ها - همه چیز، و با `[[Prototype]]` صحیح.

<<<<<<< HEAD
## تاریخچه مختصر

اگر همه راه‌ها را برای مدیریت `[[Prototype]]` حساب کنیم، بسیار زیاد است! راه‌های زیادی برای انجام همین کار!

چرا؟
=======

## Brief history

There're so many ways to manage `[[Prototype]]`. How did that happen? Why?
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

این به دلایل تاریخی است.

<<<<<<< HEAD
- ویژگی `"prototype"` یک تابع سازنده از زمان‌های بسیار قدیم کار کرده است.
- بعداً، در سال 2012، `Object.create` در استاندارد ظاهر شد. توانایی ایجاد اشیاء با یک نمونه اولیه داده شده را می‌دهد، اما توانایی دریافت/تنظیم آن را فراهم نمی‌کند. بنابراین مرورگرها دسترسی غیر استاندارد `__proto__` را پیاده‌سازی کردند که به کاربر اجازه می‌داد در هر زمان یک نمونه اولیه را دریافت/تنظیم کند.
- بعداً، در سال 2015، `Object.setPrototypeOf` و `Object.getPrototypeOf` به استاندارد اضافه شدند تا عملکردی مشابه `__proto__` داشته باشند. از آنجایی که `__proto__` به طور عملی در همه‌جا پیاده سازی شد، به نوعی منسوخ شد و به ضمیمه B استاندارد راه یافت، یعنی: اختیاری برای محیط‌های غیر مرورگر.

در حال حاضر ما همه این راه‌ها را در اختیار داریم.

چرا `__proto__` با توابع `getPrototypeOf/setPrototypeOf` جایگزین شد؟ این یک سوال جالب است، که ما را ملزم می‌کند تا بفهمیم چرا `__proto__` بد است. برای دریافت پاسخ به ادامه مطلب بروید.
=======
The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.

- The `prototype` property of a constructor function has worked since very ancient times. It's the oldest way to create objects with a given prototype.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
- Later, in the year 2022, it was officially allowed to use `__proto__` in object literals `{...}` (moved out of Annex B), but not as a getter/setter `obj.__proto__` (still in Annex B).

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`?

Why was `__proto__` partially rehabilitated and its usage allowed in `{...}`, but not as a getter/setter?

That's an interesting question, requiring us to understand why `__proto__` is bad.

And soon we'll get the answer.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

```warn header="اگر سرعت مهم است، `[[Prototype]]` را در اشیاء موجود تغییر ندهید"
به صورت تکنیکی، ما می‌توانیم ‌`[[Prototype]]` را در هر زمان دریافت/تنظیم کنیم. اما معمولا ما فقط یک بار در زمان ساخت شیء تنظیم می‌کنیم و دیگر آن را تغییر نمی‌دهیم: `rabit` از `animal` ارث می‌برد، و این تغییر نخواد کرد.

و موتورهای جاوااسکریپت برای این کار بسیار بهینه شده‌اند. تغییر یک نمونه اولیه "on-the-fly" با `Object.setPrototypeOf` یا `obj.__proto__=` یک عملیات بسیار کند است زیرا بهینه سازی‌های داخلی برای عملیات دسترسی به ویژگی شیء را شکست می‌دهد. بنابراین از آن اجتناب کنید، مگر اینکه بدانید در حال انجام چه کاری هستید، یا سرعت جاوااسکریپت اصلا برای شما مهم نیست.
```

## اشیاء "بسیار ساده". [#very-plain]

همانطور که می‌دانیم، اشیاء می‌توانند به عنوان آرایه‌های انجمنی برای ذخیره جفت‌های کلید/مقدار استفاده شوند.

...اما اگر بخواهیم کلیدهای *ارائه شده توسط کاربر* را در آن ذخیره کنیم (مثلاً یک فرهنگ لغت وارد شده توسط کاربر)، می‌توانیم یک اشکال جالب را ببینیم: همه کلیدها به جز `"__proto__"` به خوبی کار می‌کنند.

این مثال را بررسی کنید:

```js run
let obj = {};

let key = prompt("کلید چیست؟", "__proto__");
obj[key] = "یک مقدار";

alert(obj[key]); // [object Object], not "یک مقدار"!
```

<<<<<<< HEAD
در اینجا، اگر کاربر `__proto__` را تایپ کند، انتساب نادیده گرفته می‌شود!

این نباید ما را شگفت‌زده کند. ویژگی `__proto__` خاص است: باید یک شیء یا `null` باشد. یک رشته نمی‌تواند به یک پروتوتایپ تبدیل شود.
=======
Here, if the user types in `__proto__`, the assignment in line 4 is ignored!

That could surely be surprising for a non-developer, but pretty understandable for us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype. That's why an assignment a string to `__proto__` is ignored.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

اما ما *قصد* اجرای چنین رفتاری را نداشتیم، درست است؟ ما می‌خواهیم جفت‌های کلید/مقدار را ذخیره کنیم، و کلید با نام `"__proto__"`  به درستی ذخیره نشده است. پس این یک اشکال است!

<<<<<<< HEAD
در اینجا عواقب آن وحشتناک نیست. اما در موارد دیگر ممکن است مقادیر شیء را نسبت دهیم، و سپس نمونه اولیه ممکن است واقعاً تغییر کند. در نتیجه، اجرا به روش‌های کاملاً غیرمنتظره اشتباه می‌شود.
=======
Here the consequences are not terrible. But in other cases we may be storing objects instead of strings in `obj`, and then the prototype will indeed be changed. As a result, the execution will go wrong in totally unexpected ways.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

بدتر از آن -- معمولاً توسعه دهندگان اصلاً به چنین امکانی فکر نمی‌کنند. این امر باعث می‌شود تا متوجه چنین اشکالاتی سخت و حتی آنها را به آسیب پذیری تبدیل کند، به خصوص زمانی که جاوااسکریپت در سمت سرور استفاده می‌شود.

<<<<<<< HEAD
موارد غیرمنتظره در زمان مقداردهی به `toString`، که یک تابع پیش‌فرض است، و به دیگر متد‌های داخلی رخ می‌دهند.
=======
Unexpected things also may happen when assigning to `obj.toString`, as it's a built-in object method.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

چگونه می توانیم از این مشکل جلوگیری کنیم؟

<<<<<<< HEAD
ابتدا، می‌توانیم به جای اشیاء ساده، از `Map` برای ذخیره‌سازی استفاده کنیم، سپس همه چیز خوب است.

اما `Object` نیز می‌تواند در اینجا به خوبی به ما کمک کند، زیرا سازندگان زبان مدت‌ها پیش به این مشکل فکر کرده‌اند.

`__proto__` ویژگی یک شیء نیست، بلکه یک ویژگی دسترسی به `Object.prototype` است:
=======
First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine:

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
```

...But `Object` syntax is often more appealing, as it's more concise.

Fortunately, we *can* use objects, because language creators gave thought to that problem long ago.

As we know, `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

![](object-prototype-2.svg)

بنابراین، اگر `obj.__proto__` خوانده یا تنظیم شود، گیرنده/تنظیم کننده مربوطه از پروتوتایپ آن فراخوانی می‌شود و `[[Prototype]]` را می‌گیرد.

همانطور که در ابتدای این بخش آموزشی گفته شد: `__proto__` راهی برای دسترسی به `[[Prototype]]` است، این خود `[[Prototype]]` نیست.

حال اگر قصد داشته باشیم از یک شیء به عنوان آرایه انجمنی استفاده کنیم و از چنین مشکلاتی خلاص شویم، می‌توانیم با یک ترفند کوچک این کار را انجام دهیم:

```js run
*!*
let obj = Object.create(null);
// or: obj = { __proto__: null }
*/!*

let key = prompt("کلید چیست؟", "__proto__");
obj[key] = "یک مقدار";

alert(obj[key]); // "یک مقدار"
```

`Object.create(null)` یک شیء خالی فاقد پروتوتایپ ایجاد می‌کند (`[[Prototype]]` برابر با `null` است):

![](object-prototype-null.svg)

بنابراین، هیچ گیرنده/ تنظیم کننده ارثی برای `__proto__` وجود ندارد. اکنون به عنوان یک ویژگی داده معمولی پردازش می‌شود، بنابراین مثال بالا درست کار می‌کند.

چنین اشیایی را می‌توانیم اشیاء «بسیار ساده» یا «فرهنگی خالص» بنامیم، زیرا آنها حتی از شیء ساده معمولی `{...}` ساده‌تر هستند.

یک نقطه ضعف این است که چنین اشیایی فاقد هرگونه متد شیء داخلی هستند، به عنوان مثال. `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // (toString نبود) ارور
```

... اما این معمولا برای آرایه های انجمنی خوب است.

توجه داشته باشید که اکثر متدهای مرتبط با شیء، `Object.something(...)` هستند، مانند `Object.keys(obj)` -- آنها در پروتوتایپ نیستند، بنابراین آنها به کار بر روی چنین اشیایی ادامه می‌دهند:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## خلاصه

<<<<<<< HEAD
متدهای مدرن برای راه‌اندازی و دسترسی مستقیم به نمونه اولیه عبارتند از:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- یک شیء خالی با یک `proto` داده شده به عنوان `[[Prototype]]` (می‌تواند `null` باشد) و توصیف کننده‌های ویژگی اختیاری ایجاد می‌کند.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- `[[Prototype]]` را از `obj` برمی‌گرداند (همانند دریافت‌کننده `__proto__`).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- `[[Prototype]]` `obj` را روی `proto` تنظیم می‌کند (همانند تنظیم‌کننده `__proto__`).

اگر بخواهیم کلیدهای تولید شده توسط کاربر را در یک شیء قرار دهیم، گیرنده/تنظیم کننده `__proto__` داخلی ناامن است. فقط به این دلیل که کاربر ممکن است `"__proto__"` را به‌عنوان کلید وارد کند، و خطایی رخ می‌دهد، امیدواریم که پیامدهای خفیف، اما عموماً غیرقابل پیش‌بینی داشته باشد.

بنابراین می‌توانیم از `Object.create(null)` برای ایجاد یک شیء «بسیار ساده» بدون `__proto__` استفاده کنیم، یا برای آن به اشیاء `Map` روی آوریم.

همچنین، `Object.create` یک راه آسان برای کپی کردن سطحی یک شیء با تمام توصیفگرها ارائه می‌دهد:
=======
- To create an object with the given prototype, use:

    - literal syntax: `{ __proto__: ... }`, allows to specify multiple properties
    - or [Object.create(proto, [descriptors])](mdn:js/Object/create), allows to specify property descriptors.

    The `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523

- Modern methods to get/set the prototype are:

<<<<<<< HEAD
ما همچنین روشن کردیم که `__proto__` یک گیرنده/تنظیم کننده برای `[[Prototype]]` است و مانند سایر روش‌ها در `Object.prototype` قرار دارد.

می‌توانیم یک شیء بدون نمونه اولیه با `Object.create(null)` ایجاد کنیم. چنین اشیایی به عنوان "فرهنگ های خالص" استفاده می‌شوند، آنها هیچ مشکلی با `"__proto__"` به عنوان کلید ندارند.

متدهای دیگر:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- آرایه‌ای از نام‌ها/مقدارها/جفت‌های کلید-مقدار خصوصیات رشته‌ای خود را شمارش‌پذیر برمی‌گرداند.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- آرایه‌ای از همه کلیدهای نمادین خود را برمی‌گرداند.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- آرایه‌ای از تمام کلیدهای رشته خود را برمی‌گرداند.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- آرایه‌ای از همه کلیدهای خود را برمی‌گرداند.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): اگر `obj` کلید خود را (نه ارثی) به نام `key` داشته باشد، `true` را برمی‌گرداند.

همه متدهایی که ویژگی‌های شیء را برمی‌گردانند (مانند `Object.keys` و دیگران) -- ویژگی‌های «خود» را برمی‌گردانند. اگر موارد ارثی را می‌خواهیم، می‌توانیم از `for..in` استفاده کنیم.
=======
    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

- Getting/setting the prototype using the built-in `__proto__` getter/setter isn't recommended, it's now in the Annex B of the specification.

- We also covered prototype-less objects, created with `Object.create(null)` or `{__proto__: null}`.

    These objects are used as dictionaries, to store any (possibly user-generated) keys.

    Normally, objects inherit built-in methods and `__proto__` getter/setter from `Object.prototype`, making corresponding keys "occupied" and potentially causing side effects. With `null` prototype, objects are truly empty.
>>>>>>> 82ed8f11b40bd40797427a5dd1763edbe1fca523
