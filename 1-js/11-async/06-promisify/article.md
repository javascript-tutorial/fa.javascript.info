# پرومیس‌سازی (Promisification)

«Promisification» (پرومیس‌سازی) یک واژه‌ی طولانی برای یک تبدیل ساده است. این تبدیل به معنای تبدیل تابعی است که از callback استفاده می‌کند، به تابعی که یک Promise برمی‌گرداند.

چنین تبدیلاتی در دنیای واقعی بسیار موردنیاز هستند، چرا که بسیاری از توابع و کتابخانه‌ها بر پایه‌ی callback طراحی شده‌اند. اما Promise‌ها راحت‌تر و خواناتر هستند، بنابراین منطقی است که آن‌ها را جایگزین کنیم.

برای درک بهتر، بیایید یک مثال ببینیم.

برای نمونه، تابعی به نام loadScript(src, callback) را داریم که در فصل مربوط به callback‌ها معرفی شده بود.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
```

این تابع یک اسکریپت را با آدرس src مشخص‌شده بارگذاری می‌کند، و سپس در صورت بروز خطا، callback(err) را صدا می‌زند، یا در صورت بارگذاری موفق، callback(null, script) را فراخوانی می‌کند. این یک قرارداد رایج در استفاده از callback‌هاست که قبلاً هم آن را دیده‌ایم.

حالا بیایید آن را promisify (پرومیس‌سازی) کنیم.

ما یک تابع جدید به نام loadScriptPromise(src) می‌سازیم که همان کار را انجام می‌دهد (اسکریپت را بارگذاری می‌کند)، اما به‌جای استفاده از callback، یک Promise برمی‌گرداند.

به‌عبارت دیگر، فقط src را به آن می‌دهیم (بدون callback) و یک Promise دریافت می‌کنیم که در صورت بارگذاری موفق، با script حل (resolve) می‌شود، و در غیر این صورت، با خطا رد (reject) می‌شود.

اینجا نمونه‌ی آن را می‌بینید:

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)
```

همان‌طور که می‌بینیم، تابع جدید یک لفاف (wrapper) دور تابع اصلی loadScript است. این تابع، loadScript را صدا می‌زند و callback مخصوص خودش را به آن می‌دهد، که این callback، نتیجه را به صورت resolve یا reject به Promise تبدیل می‌کند.

اکنون loadScriptPromise به‌خوبی با کدهای مبتنی بر Promise سازگار است. اگر Promise‌ها را بیشتر از callback‌ها دوست داریم (و به‌زودی دلایل بیشتری برای آن خواهیم دید)، از این نسخه استفاده خواهیم کرد.

در عمل، ممکن است بخواهیم بیش از یک تابع را promisify کنیم، بنابراین منطقی است که از یک تابع کمکی (helper) استفاده کنیم.

ما این تابع کمکی را promisify(f) می‌نامیم: این تابع، یک تابع f که قرار است promisify شود را می‌گیرد و یک تابع wrapper برمی‌گرداند.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
}

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```
ممکن است کد کمی پیچیده به نظر برسد، اما در اصل همان چیزی است که قبلاً برای promisify کردن تابع loadScript نوشتیم.

یک فراخوانی به promisify(f)، یک wrapper (لفاف) دور تابع f برمی‌گرداند (*). این لفاف، یک Promise بازمی‌گرداند و تابع اصلی f را با یک callback سفارشی که نتیجه را پیگیری می‌کند، صدا می‌زند (**).

در اینجا، promisify فرض می‌کند که تابع اصلی، یک callback با دقیقاً دو آرگومان (err, result) انتظار دارد. این همان الگویی است که معمولاً با آن مواجه هستیم. در چنین حالتی، callback سفارشی ما دقیقاً با همین فرمت تعریف شده و promisify به‌خوبی کار می‌کند.

اما اگر تابع f اصلی، یک callback با آرگومان‌های بیشتری بخواهد؟ مثل callback(err, res1, res2, ...)؟

ما می‌توانیم تابع کمکی خود را بهبود دهیم. بیایید یک نسخه‌ی پیشرفته‌تر از promisify بسازیم.

وقتی به صورت promisify(f) فراخوانی می‌شود، باید مانند نسخه‌ی قبلی کار کند.
اما وقتی به صورت promisify(f, true) فراخوانی شود، باید یک Promise بازگرداند که با آرایه‌ای از نتایج callback حل (resolve) می‌شود. این دقیقاً مناسب callback‌هایی است که چند آرگومان بازگشتی دارند.

```js
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```
همان‌طور که می‌بینید، این نسخه در اصل همان نسخه‌ی قبلی است، با این تفاوت که resolve بسته به این‌که manyArgs مقدار truthy داشته باشد یا نه، یا فقط با یک آرگومان صدا زده می‌شود یا با همه‌ی آرگومان‌ها.

برای فرمت‌های خاص‌تر callback‌ها — مثلاً آن‌هایی که اصلاً err ندارند و فقط به شکل callback(result) هستند — می‌توانیم آن‌ها را به‌صورت دستی promisify کنیم، بدون استفاده از تابع کمکی.

همچنین ماژول‌هایی هم وجود دارند که توابع promisify انعطاف‌پذیرتری ارائه می‌دهند، مثلاً ماژولی به نام es6-promisify.
در Node.js نیز یک تابع داخلی به نام util.promisify برای این کار وجود دارد.

```smart
پرومیس‌سازی (Promisification) یک روش عالی است، به‌ویژه زمانی که از async/await استفاده می‌کنید (که در ادامه‌ی فصل info:async-await به آن پرداخته خواهد شد)، اما جایگزین کامل callback‌ها نیست.

به خاطر داشته باشید که یک Promise فقط می‌تواند یک نتیجه داشته باشد، اما از نظر فنی، یک callback ممکن است چندین بار فراخوانی شود.

بنابراین، پرومیس‌سازی فقط برای توابعی مناسب است که callback را فقط یک بار فراخوانی می‌کنند. فراخوانی‌های بعدی نادیده گرفته خواهند شد.
```
