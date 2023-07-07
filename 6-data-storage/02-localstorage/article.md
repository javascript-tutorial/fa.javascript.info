# LocalStorage, sessionStorage

اشیای ذخیره‌سازی وب `localStorage` و `sessionStorage` اجازه می‌دهند تا داده‌ها را به صورت جفت key/value در مرورگر ذخیره کنیم.

چیزی که راجع به آن ها جالب است باقی ماندن داده پس از رفرش کردن صفحه است (به واسطه `sessionStorage`) و حتی باز و بسته کردن مرورگر (به واسطه `localStorage`). خیلی زود خواهیم دید.

ما قبلا کوکی‌ها را داشتیم چرا اشیا اضافی؟

- برخلاق کوکی‌ها اشیای ذخیره‌سازی وب با هر ریکوئست به سرور ارسال نمی‌شوند. به همین خاطر می‌توانیم خیلی بیشتر ذخیره‌سازی کنیم. بیشتر مرورگرهای مدرن حداقل ۵ مگابایت داده (یا بیشتر) را اجازه می‌دهند و تنظیماتی برای پیکربندی دارند.
- همچنین برخلاف کوکی‌ها سرور نمی‌تواند اشیای ذخیره‌سازی را از طریق HTTP هدرها دستکاری کند. همه چیز از طریق جاوااسکریپت انجام می‌شود.
- ذخیره‌سازی محدود به آریجین (domain/protocol/port triplet) می‌باشد. پروتکل‌های متفاوت و یا زیردامنه‌های متفاوت اشیای ذخیره‌سازی متفاوتی دارند و نمی‌توانند به یکدیگر دسترسی پیدا کنند.

هردو اشیای ذخیره‌سازی متودها و ویژگی‌های یکسانی را مهیا می‌کنند.

- `setItem(key, value)` -- اعمال key/value pair.
- `getItem(key)` -- گرفتن مقدار با key.
- `removeItem(key)` -- حذف key همراه با مقدار آن.
- `()clear` -- حذف همه چیز.
- `key(index)` -- گرفتن عدد ایندکس key `index`.
- `length` -- عدد تعداد مقادیر ذخیره شده.

همانطور که می‌بینید (`setItem/getItem/removeItem`) مشابه یک `Map` collection می‌باشد اما اجازه دسترسی به آن با `key(index)` دارید.

اجازه بدید ببینیم چطور کار می‌کند.

## localStorage demo

ویژگی‌های اصلی `localStorage`:

- اشتراک گذاشته شده بین تمام تب ها و پنجره ها در آریجین یکسان (Same Origin).
- داده ها منقضی نمی‌شوند و حتی پس از بسته شدن مرورگر و ریستارت شدن سیستم عامل باقی می‌ماند.

برای مثال اگر شما این کد را اجرا کنید

```js run
localStorage.setItem('test', 1);
```

و مرورگر را باز و بسته کنید و یا صفحه‌ای مشابه در یک پنجره متفاوت باز کنید، شما با خروجی زیر مواجه می‌شوید:

```js run
alert( localStorage.getItem('test') ); // 1
```

ما تنها باید در آریجین یکسان (Same Origin) (domain/port/protocol) باشیم. مسیر url می‌تواند متفاوت باشد.

`localStorage` بین تمام پنجره ها با آریجین یکسان به اشتراک گذاشته شده است به همین دلیل اگر داده‌ای را در یک پنجره set کنیم تغییر در دیگر پنجره ها قابل مشاهده است.

## دسترسی شی‌مانند (Object-like access)

همچنین ما می‌توانیم از یک روش شی‌مانند ساده key ها را set و get کنیم. مانند این:

```js run
// set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
```

این روش مجاز است و کار می‌کند اما به طور کلی پیشنهاد نمی‌شود چون:

1. اگر key ساخته شده توسط کاربر باشد، می‌تواند هرچیزی مانند `length` یا `toString` یا دیگر متودهای داخلی `localStorage` باشد. در این مورد `getItem/setItem` به خوبی کار می‌کند درحالی که دسترسی شی مانند (Object-like access) به مشکل می‌خورد:

    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error, can't assign length
    ```

2. رویدادی (Event) به نام `storage` وجود دارد که هنگامی که اطلاعات را تغییر می‌دهیم رخ می‌دهد. این رویداد (event) در روش دسترسی شی‌مانند (object-like access) کار نمی‌کند. در ادامه این را مشاهده خواهیم کرد.

## پیمایش keyها (Looping over keys)

همانطور که دیدیم متودها عملکردهای ‍"get/set/remove به وسیله key" را فراهم می‌کند. اما چطور تمام مقادیر ذخیره شده یا keyها را دریافت کنیم؟

متاسفانه، اشیاء ذخیره‌سازی قابل پیمایش (iterable) نیستند.

یکی از راه‌ها این است که روی آن‌ها به صورت آرایه حلقه بزنید:

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

راه دیگر استفاده از `for key in localStorage` می‌باشد، همانطور که با اشیاء معمولی انجام می‌دهیم.

این روش keyها را پیمایش می‌کند و  همچنین متودهای داخلی را در خروجی نمایش می‌دهد که نیازی به آن ها نداریم.

```js run
// bad try
for(let key in localStorage) {
  alert(key); // shows getItem, setItem and other built-in stuff
}
```

پس ما باید فیلد‌های prototype را با`hasOwnProperty` فیلتر کنیم. بررسی کنید:

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // skip keys like "setItem", "getItem" etc
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

<!-- ...Or just get the "own" keys with `Object.keys` and then loop over them if needed: -->
یا فقط keyهای "خود" را با `Object.keys` دریافت کنیم و سپس اگر لازم بود حلقه‌ بر روی آن اجرا کنیم.

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

دومین روش کار می‌کند چون `Object.keys` فقط keyهایی را بر می‌گرداند که متعلق به شی هستند و prototype را نادیده می‌گیرد.

## فقط رشته‌ها (Strings only)

لطفا توجه داشته باشید هر دوی key و value باید رشته (string) باشند.

اگر نوع داده‌ای دیگری بودند مانند عدد یا شی، آن ها به طور خودکار به رشته تبدیل می‌شدند:

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

می‌توانیم از `JSON` برای ذخیره‌سازی اشیاء استفاده کنیم:

```js run
localStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

همچنین رشته کردن (Stringify) کل شی ذخیره‌سازی امکان‌پذیر است برای مثال برای اهدافی مانند دیباگ کردن:

```js run
// added formatting options to JSON.stringify to make the object look nicer
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

شی `sessionStorag` خیلی کمتر از `localStorage` استفاده می‌شود.

ویژگی‌ها و متودها یکسان هستند اما خیلی محدودتر:

- `sessionStorage` تنها درون تب مرورگر فعلی وجود دارد.
  - تب‌های دیگر با صفحه یکسان storage متفاوتی خواهند داشت.
  - اما بین iframes در تب‌های مشترک به اشتراک گذاشته شده است (تصور کنید از آریجین مشترک می‌آیند)
- داده حتی با رفرش کردن صفحه باقی می‌ماند اما باز و بسته کردن تب، داده را از بین می‌برد.

بذارید در عمل نگاه کنیم.

کد زیر را اجرا کنید

```js run
sessionStorage.setItem('test', 1);
```

سپس صفحه را رفرش کنید. اکنون همچنان می‌توانید داده را دریافت کنید:

```js run
alert( sessionStorage.getItem('test') ); // after refresh: 1
```

اما اگر همین صفحه را در تب دیگر باز کنید و مجدد تلاش کنید، کد بالا `null` را بر می‌گرداند. معنی‌اش این است: چیزی پیدا نشد.

`sessionStorage` تنها محدود به آریجین نمی‌باشد و به تب مرورگر هم محدود می‌شود. `sessionStorage` به همین دلیل کم استفاده می‌شود.

## Storage event

وقتی داده در `localStorage` یا `sessionStorage` آپدیت می‌شود رویداد [storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) با ویژگی‌های زیر رخ می‌هد:

- `key` - کلید keyی که عوض شده است (`null` اگر `()clear.` صدا زده شده باشد).
- `oldValue` - مقدار قبلی (`null` اگر key به تازگی اضافه شده باشد).
- `newValue` – مقدار جدید (`null` اگر key حذف شده باشد).
- `url` – آدرس (url) داکیومنت در جایی که آپدیت رخ داده.
- `storageArea` – یکی از اشیاء `localStorage` یا `sessionStorage` که در آن آپدیت رخ داده.

نکته مهم این است: رویداد بر روی تمام اشیاء `window` که در آن فضای ذخیره‌سازی در دسترس است، فعال می‌شود، به جز شیئی که باعث آن شده است.

بیایید بیشتر تشریح کنیمش.

تصور کنید دو پنجره با سایت یکسان دارید. `localStorage` بین آن ها به اشتراک گذاشته شده است.

```online
شاید بخواهید برای امتحان کردن کد زیر این صفحه را در دو پنجره مرورگر باز کنید.
```

اگر دو پنجره درحال گوش دادن به `window.onstorage` باشند هرکدام به آپدیتی که در پنجره دیگر رخ می‌دهد واکنش نشان می‌دهند.

```js run
// triggers on updates made to the same storage from other documents
window.onstorage = event => { // can also use window.addEventListener('storage', event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

توجه داشته باشید رویداد شامل `event.url` هم می باشد --url داکیومنتی که داده در آن آپدیت شده است

همچنین `event.storageArea` شامل شی storage می‌باشد -- رویداد برای `sessionStorage` و `localStorage` یکسان می‌باشد پس `event.storageArea` اشاره می‌کند به آن مورد که تغییر کرده است. ممکن هست حتی بخواهیم چیزی را در جواب به تغییر آن پاسخ دهیم.

**این اجازه می‌دهد پنجره‌های متفاوت از آریجین مشترک بتوانند پیام رد و بدل کنند**

مرورگرهای مدرن همچنین [Broadcast channel API](mdn:/api/Broadcast_Channel_API) را پشتیبانی می‌کنند. API مخصوص برای آریجین مشترک (same-origin) ارتباط درون پنجره‌ای، ویژگی‌های کامل‌تری دارد اما کمتر پشتیبانی می‌شود. Libraryهایی وجود دارد که API را مبتنی بر  polyfill `localStorage` می‌کند تا در همه‌جا قابل دسترسی باشد.

## جمع‌بندی

اشیای ذخیره‌سازی وب `localStorage` و `sessionStorage` اجازه می‌دهند تا داده‌ها را به صورت جفت key/value در مرورگر ذخیره کنیم.

- هردوی `key` و `value` باید رشته باشند.
- محدودیت 5mb+ می‌باشد، به مرورگر بستگی دارد.
- آنها منقضی نمی‌شوند.
- داده ها محدود به آریجین می‌باشند (domain/port/protocol).

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| بین تمام تب ها و پنجره‌های آریجین یکسان اشتراک گذاشته شده است | در تب مرورگر شامل iframes از آریجین یکسان قابل مشاهده است |
| با باز و بسته شدن مرورگر باقی می‌ماند | با رفرش شدن باقی می‌ماند اما نه با بستن تب |

API:

- `setItem(key, value)` -- اعمال key/value pair.
- `getItem(key)` -- گرفتن مقدار با key.
- `removeItem(key)` -- حذف key همراه با مقدار آن.
- `()clear` -- حذف همه چیز.
- `key(index)` -- گرفتن عدد ایندکس key `index`.
- `length` -- عدد تعداد مقادیر ذخیره شده.
- از `Object.keys` برای گرفتن تمام keyها استفاده کنید.
- ما به keyها به واسطه object properties دسترسی پیدا می‌کنیم، در این مورد رویداد`storage` رخ نمی‌دهد 

Storage event:

- با صدا زدن `setItem`, `removeItem`, `clear` رخ می‌دهد.
- شامل تمام داده مربوط به operation (`key/oldValue/newValue`) داکیومنت `url` و `storageArea` شی ذخیره‌سازی می‌باشد
- در تمام شی های `window` که به storage دسترسی دارند به جز آن که ایجادش کرده است رخ می‌دهد (درون تب برای `sessionStorage` گلوبالی برای `localStorage`)
