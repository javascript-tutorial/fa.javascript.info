
# پلیفیل‌ها و ترنسپایلرها

زبان جاوااسکریپت پیوسته در حال تکامل است. پیشنهادهایی برای بهتر شدن آن به‌طور منظم صورت می‌گیرد، این پیشنهاد‌ها بررسی می‌شوند و اگر ارزشمند باشند، به لیست <https://tc39.github.io/ecma262/> اضافه می‌شوند و سپس برای [تشخیص](http://www.ecma-international.org/publications/standards/Ecma-262.htm) پیش می‌روند.

تیم‌های مسئول موتورهای جاوااسکریپت تصمیم می‌گیرند کدام یک را اول پیاده‌سازی کنند. ممکن است تصمیم بگیرند پیشنهادهایی که هنوز به‌صورت پیش‌نویس هستند را اول پیاده‌سازی کنند و پیشنهادهایی که در مرحلهٔ تشخیص هستند را به بعدتر موکول کنند، به دلیل اینکه کمتر جالب هستند و یا فقط سخت‌تر هستند.

<<<<<<< HEAD
پس کاملا طبیعی است که یک موتور فقط بخشی از یک استاندارد را پیاده‌سازی کند.
=======
So it's quite common for an engine to implement only part of the standard.
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96

یک صفحه‌ی خوب برای این که ببینید در حال حاضر چه چیزهایی پشتیبانی می‌شود اینجاست <https://kangax.github.io/compat-table/es6/> (خیلی بزرگ است، ما چیزهای زیادی برای مطالعه داریم).

به عنوان توسعه‌دهنده، ما همیشه دوست داریم از ویژگی‌ها و امکانات جدید استفاده کنیم. هر چه جدیدتر، بهتر!

از طرف دیگر، دوست داریم کدهایمان روی مرورگرهای قدیمی‌تر که امکانات جدید را نمی‌فهمند هم کار کنند. اما چطور می‌شود این کار را انجام داد؟

دو ابزار برای این کار وجود دارد:

1. ترنسپایلرها (Transpilers).
2. پلیفیل‌ها (Polyfills).

هدف ما در این فصل این است که درک کنیم این دو چگونه کار می‌کنند و جایگاه آن‌ها در توسعه وب چیست.

## ترنسپایلرها

یک [ترنسپایلر](https://en.wikipedia.org/wiki/Source-to-source_compiler) در واقع قطعه‌ای نرم‌افزار است که می‌تواند کد مدرن و جدید را parse کند ("بخواند و بفهمد") و سپس همان کد را با syntax قدیمی بازنویسی کند به‌طوری که خروجی کد یکسان باشد.

برای مثال جاوااسکریپت تا سال ۲۰۲۰ "nullish coalescing عملگر" `??` را نداشت. و اگر کاربری از یک مرورگر منسوخ‌شده استفاده کند، ممکن است کدی مانند `height = height ?? 100` را متوجه نشود.

یک ترنسپایلر این کد را آنالیز می‌کند و `height ?? 100` را به‌صورت `(height !== undefined && height !== null) ? height : 100` بازنویسی می‌کند.

```js
// قبل از اجرا شدن ترنسپایلر
height = height ?? 100;

// بعد از اجرا شدن ترنسپایلر
height = height !== undefined && height !== null ? height : 100;
```

کد بازنویسی شده مناسب موتورهای قدیمی‌تر جاوااسکریپت است.

معمولا توسعه‌دهنده ترنسپایلر را روی کامپیوتر خودش اجرا می‌کند و سپس کد transpileشده را روی سرور deploy می‌کند.

<<<<<<< HEAD
حالا که صحبتش شد، بهتر است بدانید [Babel](http://babeljs.io/) یکی از برجسته‌ترین ترنسپایلرها است.

سیستم‌های build پروژه مدرن مثل [webpack](https://webpack.js.org/) این امکان را می‌دهند که بعد از هر بار تغییر کد، ترنسپایلر به‌صورت اتوماتیک اجرا شود و برای همین ادغام کردن آن در روند توسعه کار بسیار ساده‌ای است.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96

## پلیفیل‌ها

فیچر‌ها و امکانات جدید یک زبان می‌توانند علاوه بر syntax و عملگرهای جدید، تابع‌های جدید نیز باشند.

برای مثال `Math.trunc(n)` یک تابع است که بخش دهدهی یک عدد را حذف می‌کند. مانند `Math.trunc(1.23)` که `1` را بر می‌گرداند.

در برخی از موتورهای (خیلی قدیمی) جاوااسکریپت تابع `Math.trunc` وجود ندارد و چنین کدی اجرا نمی‌شود.

از آن‌جایی که داریم راجع‌به تابع‌های جدید صحبت می‌کنیم و بحث تغییر syntax نیست، اینجا چیزی برای transpile وجود ندارد. فقط باید تابع ناموجود را تعریف کنیم.

اسکریپتی که تابع‌های جدید آپدیت و یا اضافه می‌کند، «پلیفیل» نام دارد. در واقع جای خالی را پر می‌کند و پیاده‌سازی‌های لازم را انجام می‌دهد.

در این مثال خاص، پلیفیلی که برای `Math.trunc` وجود دارد یک اسکریپت است که آن را پیاده‌سازی کرده است. مانند زیر:

```js
if (!Math.trunc) { // اگر چنین تابعی وجود ندارد
  // آن زا پیاده‌سازی کن
  Math.trunc = function (number) {
    // Math.ceil و Math.floor جتی در موتورهای قدیمی جاوااسکریپت هم حضور دارند
    // و در همین tutorial جلوتر آموزش داده می‌شوند
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

<<<<<<< HEAD
جاوااسکریپت یک زبان به‌شدت داینامیک است. اسکریپت‌ها می‌توانند هر تابعی را تغییر دهند یا اضافه کنند. حتی تابع‌های built-in.

دو کتابخانه جالب پلیفیل‌ها:
- [core js](https://github.com/zloirock/core-js) که از چیزهای زیادی پشتیبانی می‌کند و اجازه می‌دهد فقط فیچرهای مورد نیاز خود را اضافه کنید.
- [polyfill.io](http://polyfill.io) سرویسی که یک اسکریپت با پلیفیل‌ها ارائه می‌دهد. بسته به فیچرها و مرورگر کاربر.
=======
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

Two interesting polyfill libraries are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96


## خلاصه

در این فصل ما می‌خواهیم به شما انگیزه بدهیم تا بروید و فیچرهای جدید زبان را یاد بگیرید. حتی اگر هنوز توسط موتورهای جاوااسکریپت به‌خوبی پشتیبانی نمی‌شوند.

<<<<<<< HEAD
فراموش نکنید که از یک ترنسپایلر (اگر از syntax یا عملگرهای مدرن استفاده می‌کنید) و پلیفیل‌ها (برای اضافه کردن تابع‌هایی که ممکن است موجود نباشند) استفاده کنید. و با این کار مطمئن خواهید بود که کد شما کار می‌کند.

برای مثال، بعدها که با جاوااسکریپت آشنایی بیشتری پیدا کنید، می‌توانید یک سیستم build کد با [webpack](https://webpack.js.org/) و پلاگین [babel-loader](https://github.com/babel/babel-loader) راه‌اندازی کنید.
=======
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96

منابع خوبی که نشان می‌دهند فیچرهای مختلف در چه حالتی از پشتیبانی قرار دارند:
- <https://kangax.github.io/compat-table/es6/> - برای جاوااسکریپت.
- <https://caniuse.com/> - برای تابع‌های مربوط به مرورگر.

پانوشت گوگل کروم معمولا نسبت به فیچرهای زبان به‌روزترین است. اگر دموی یک آموزش کار نکرد، آن را امتحان کنید. البته بیشتر دموهای آموزش با هر مرورگر مدرنی کار می‌کنند.

