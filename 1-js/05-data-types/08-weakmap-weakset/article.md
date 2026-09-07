
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

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) به صورت اساسی از این جنبه تفاوت دارد. این ساختار از زباله‌روبی کلیدهایی که شیء هستند جلوگیری نمی‌کند.

بیایید با مثال‌ها ببینیم که به چه معنی است.

## ساختار WeakMap

اولین تفاوت بین [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) و [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) این است که کلیدها باید شیء باشند نه مقدار اولیه:

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

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

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

ما نیاز داریم که `visitsCountMap` را زمانی که کاربران را حذف می‌کنیم پاک کنیم، در غیر این صورت به طور نامحدود در حافظه گسترده‌تر می‌شود. چنین پاک کردنی در معماری‌های پیچیده کاری خسته ‎کننده می‌شود.

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

## کاربرد: کَش کردن (caching)

یکی دیگر از مثال‌های متداول کَش کردن است. ما می‌توانیم نتایج یک تابع را ذخیره («کَش») کنیم تا فراخوانی‌های آینده که شیء یکسانی را می‌گیرند، دوباره از آن استفاده کنند.

برای این کار، ما می‌توانیم از `Map` استفاده کنیم (این سناریو بهینه نیست):

```js run
// 📁 cache.js
let cache = new Map();

// نتیجه را محاسبه و ذخیره کن
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* محاسبات نتیجه برای */;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// :در فایل دیگری استفاده کنیم process() حالا می‌توانیم از
*/!*

// 📁 main.js
let obj = {/* فرض می‌کنیم یک شیء داریم */};


let result1 = process(obj); // محاسبه شد

// ...بعدا، از یک جای دیگر کد...
let result2 = process(obj); // نتیجه ذخیره شده از کَش گرفته می‌شود

// :بعدا، زمانی که شیء دیگر نیاز نباشد...
obj = null;

alert(cache.size); // 1 (!ای وای! شیء هنوز در کش موجود است و حافظه را اشغال می‌کند)
```

برای چند فراخوانی `process(obj)` همراه با شیء یکسان، تنها نتیجه را اولین بار محاسبه می‌کند و سپس آن را از `cache` می‌گیرد. ویژگی منفی این است که زمانی که شیء دیگر احتیاج نباشد، ما باید `cache` را از آن تمیز کنیم.

اگر ما `Map` را با `WeakMap` جایگزین کنیم، سپس این مشکل ایجاد نمی‌شود. نتیجه کش‌شده بعد از اینکه شیء زباله‌روبی شد، از حافظه به طور خودکار حذف می‌شود.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// نتیجه را محاسبه و ذخیره کن
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* محاسبات نتیجه برای */;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* شیء */};

let result1 = process(obj);
let result2 = process(obj);

// :بعدا، زمانی که شیء دیگر نیاز نباشد...
obj = null;

// است WeakMap را دریافت کرد، چون یک  cache.size نمی‌توان
// اما یا 0 است یا به زودی 0 می‌شود
// زباله‌روبی شود، داده کش‌شده هم پاک می‌شود obj زمانی که
```

## ساختار WeakSet

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) هم رفتار مشابهی دارد:

- این ساختار مانند `Set` است اما فقط می‌توانیم شیءها را به `WeakSet` اضافه کنیم (نه مقدارهای اصلی).
- یک شیء تا زمانی که از جایی دیگر قابل دسترس باشد در set وجود خواهد داشت.
- مانند `Set`، این ساختار از [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add)، [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) و [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete) پشتیبانی می‌کند اما `size` و `keys()` ندارد و نمی‌توان در آن حلقه زد.

به دلیل اینکه "weak(ضعیف)" است، به عنوان حافظه اضافی هم نقشش را ایفا می‌کند. اما نه برای هر داده دلخواهی، بلکه ترجیحا برای گزاره‌های «بله/خیر» استفاده می‌شود. اینکه یک شیء در `WeakSet` وجود داشته باشد، ممکن است به معنای چیزی درباره آن باشد.

برای مثال، ما می‌توانیم کاربران را به `WeakSet` اضافه کنیم تا پیگیری کنیم که چه کسی سایت ما را دیده است:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // سایت ما را دید John
visitedSet.add(pete); // Pete سپس
visitedSet.add(john); // John و دوباره

// الان 2 کاربر دارد visitedSet

// سایت را دیده است؟ John چک می‌کنیم که آیا
alert(visitedSet.has(john)); // true

// سایت را دیده است؟ Mary چک می‌کنیم که آیا
alert(visitedSet.has(mary)); // false

john = null;

// به طور خودکار از آن شیء تمیز می‌شود visitedSet
```

بزرگ‌ترین محدودیت `WeakMap` و `WeakSet` این است که نمی‌توان در آن حلقه زد و تمام محتوای حال حاضر را گرفت. این موضوع ممکن است اذیت کننده باشد اما باعث نمی‌شود که `WeakMap/WeakSet` کار اصلی خودشان را انجام ندهند -- اینکه یک حافظه «اضافیِ» داده، برای شیءهایی باشند که در جایی دیگر ذخیره/مدیریت می‌شوند.

## خلاصه

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) یک مجموعه شبیه به `Map`است که فقط شیءها را به عنوان کلید قبول می‌کند و همان شیء و داده‌های تخصیص داده شده به آن را زمانی که شیء از طرق دیگر غیر قابل دسترس شود، حذف می‌کند.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) یک مجموعه شبیه به `Set` است که فقط شیءها را ذخیره می‌کند و زمانی که آنها از طرق دیگر غیر قابل دسترس شوند، حذف‌شان می‌کند.

فایده‌های اصلی‌شان این است که یک رجوع ضعیف به شیءها دارند، پس شیءها به راحتی می‌توانند با زباله‌روبی از بین بروند.

اما به این قیمت که از `clear`، `size`، `keys`، `values` و... پشتیبانی نمی‌کنند.

`WeakMap` و `WeakSet` به عنوان ساختار داده‌های «ثانویه» در کنار حافظه شیء «اصلی» استفاده می‌شوند. زمانی که شیء از حافظه اصلی حذف شود و فقط به عنوان کلید `WeakMap` یا عضوی در `WeakSet` باشد، به طور خودکار حذف می‌شود.
