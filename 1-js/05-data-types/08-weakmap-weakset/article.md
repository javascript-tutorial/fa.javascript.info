# ساختارهای WeakMap و WeakSet

همانطور که از فصل <info:garbage-collection> می‌دانیم، موتور جاوااسکریپت تا زمانی که یک مقدار «قابل دسترس» باشد و ممکن باشد استفاده شود، آن را در حافظه نگه می‌دارد.

برای مثال:
```js
let john = { name: "John" };

// به آن رجوع می‌کند john ،می‌توان به شیء دسترسی پیدا کرد

// بازنویسی مرجع
john = null;

*!*
// شیء از حافظه پاک می‌شود
*/!*
```

معمولا ویژگی‌های یک شیء یا المان‌های یک آرایه یا ساختارهای دیگر داده تا زمانی که در حافظه باشد، قابل دسترس فرض و در حافظه حفظ می‌شوند.

برای مثال، اگر ما یک شیء را درون یک آرایه بگذاریم، سپس تا زمانی که آرایه زنده باشد، شیء هم زنده خواهد بود، حتی اگر هیچ رجوع دیگری به آن نباشد.

مانند اینجا:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // بازنویسی مرجع

*!*
// به آن رجوع می‌شد، درون آرایه ذخیره شده است john شیءای که قبلا توسط
// به همین دلیل زباله‌روبی نمی‌شود
// آن را دریافت کنیم array[0] می‌توانیم با
*/!*
```

مشابه همین مورد، اگر ما از شیءای به عنوان کلید در یک `Map` معمولی استفاده کنیم، سپس تا زمانی که `Map` وجود داشته باشد، آن شیء هم وجود خواهد داشت. این شیء حافظه را اشغال می‌کند و زباله‌روبی نمی‌شود.

برای مثال:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // بازنویسی مرجع

*!*
// ،ذخیره شده است map درون john
// آن را دریافت کنیم map.keys() می‌توانیم با استفاده از
*/!*
```

`WeakMap` به صورت اساسی از این جنبه تفاوت دارد. این ساختار از زباله‌روبی کلیدهایی که شیء هستند جلوگیری نمی‌کند.

بیایید با مثال‌ها ببینیم که به چه معنی است.

## ساختار WeakMap

اولین تفاوت بین `Map` و `WeakMap` این است که کلیدها باید شیء باشند نه مقدار اولیه:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // به درستی کار می‌کند (کلید از نوع شیء)

*!*
// نمی‌توان از رشته به عنوان کلید استفاده کرد
weakMap.set("test", "Whoops"); // شیء نیست "test" ارور می‌دهد چون
*/!*
```

حالا اگر ما بخواهیم از شیء به عنوان کلید در آن استفاده کنیم و هیچ رجوع دیگری به شیء نباشد -- این شیء به طور خودکار از حافظه پاک می‌شود (همچنین از map).

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // بازنویسی مرجع

// !از حافظه پاک شد john
```

با `Map` معمولی در مثال بالا مقایسه کنید. حالا اگر `john` فقط به عنوان کلید `WeakMap` وجود داشته باشد -- به صورت خودکار از map (و حافظه) پاک می‌شود.

ساختار `WeakMap` از حلقه‌زدن و متدهای `keys()`، `values()`، `entries()` پشتیبانی نمی‌کند، پس هیچ راهی برای گرفتن تمام کلیدها یا مقدارها نیست.

`WeakMap` فقط متدهای زیر دارد:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

چرا چنین محدودیت‌هایی وجود دارد؟ به خاطر دلایل فنی. اگر یک شیء تمام رجوع‌های دیگر به خود را از دست بدهد (مانند `john` در کد بالا)، سپس باید به طور خودکار زباله‌روبی شود. اما از لحاظ فنی مشخص نیست که *زباله‌روبی چه زمانی اتفاق می‌افتد*.

موتور جاوااسکریپت درباره آن تصمیم می‌گیرد. ممکن است پاک‌سازی حافظه را بلافاصله انجام دهد یا صبر کند تا حذف‌های بیشتری رخ دهند. پس به طور فنی، تعداد کنونی المان‌های `WeakMap` معلوم نیست. موتور ممکن است آن را پاک کرده باشد یا این کار را در چند قسمت انجام دهد. به این دلیل، متدهایی که به تمام کلیدها/مقدارها دسترسی پیدا می‌کنند، پشتیبانی نمی‌شوند.

حالا ما کجا به چنین ساختار داده‌ای احتیاج داریم؟

## کاربرد: داده اضافی

حوزه اصلی کاربرد `WeakMap` یک *حافظه داده اضافی* است.

اگر در حال کار کردن با شیءای هستیم که به کد دیگری «تعلق دارد»، شاید یک کتابخانه شخص ثالث، و بخواهیم داده‌هایی که به آن تخصیص داده شده را ذخیره کنیم که فقط تا زمانی که شیء زنده است وجود داشته باشند، سپس `WeakMap` دقیقا چیزی است که نیاز داریم.

ما با استفاده از شیء به عنوان کلید، داده را در یک `WeakMap` قرار می‌دهیم و زمانی که شیء زباله‌روبی شد، داده هم به طور خودکار ناپدید می‌شود.

```js
weakMap.set(john, "مستندات مخفی");
// ازبین برود، مستندات مخفی هم به طور خودکار نابود می‌شوند john اگر
```

بیایید یک مثال ببینیم.

برای مثال، ما کدی داریم که تعداد بازدید را برای کاربران ذخیره می‌کند. اطلاعات درون یک map ذخیره شده است: یک شیء user کلید است و تعداد بازدید مقدار است. زمانی که کاربر خارج شود (شیء آن زباله‌روبی شود)، ما دیگر نمی‌خواهیم تعداد بازدید آنها را داشته باشیم.

یک مثال از تابع شمارنده با استفاده از `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => تعداد بازدید

// افزایش تعداد بازدید
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

و اینجا قسمت دیگری از کد را داریم، شاید یک فایل دیگر از آن استفاده کند:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // را می‌شمارد john تعداد بازدید

// ما را ترک کند john بعدا که
john = null;
```

حالا، شیء `john` باید زباله‌روبی شود اما در حافظه می‌ماند، به دلیل اینکه در `visitsCountMap` کلید است.

ما نیاز داریم که `visitsCountMap` را زمانی که کاربران را حذف می‌کنیم پاک کنیم، در غیر این صورت به طور نامحدود در حافظه گسترده‌تر می‌شود. چنین پاک کردنی در معماری‌های پیچیده کاری خسته‎کننده می‌شود.

می‌توانیم با استفاده از `WeakMap` از این موضوع دوری کنیم:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => تعداد بازدید

// افزایش تعداد بازدید
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

حالا ما حتما نباید `visitsCountMap` را تمیز کنیم. بعد از اینکه شیء `john` غیرقابل دسترس شود، یعنی به جز کلید `WeakMap` هیچ رجوعی نداشته باشد، همراه با اطلاعاتی که کلید آنها این شیء بود، از حافظه پاک می‌شوند.

## Use case: caching

Another common example is caching. We can store ("cache") results from a function, so that future calls on the same object can reuse it.

To achieve that, we can use `Map` (not optimal scenario):

```js run
// 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Now we use process() in another file:
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
```

## WeakSet

`WeakSet` behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

Being "weak", it also serves as additional storage. But not for arbitrary data, rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet will be cleaned automatically
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

`WeakMap` is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

`WeakSet` is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

That comes at the cost of not having support for `clear`, `size`, `keys`, `values`...

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "primary" object storage. Once the object is removed from the primary storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
