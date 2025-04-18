# پرومیس‌سازی (Promisification)

«پرومیس‌سازی» واژه‌ای طولانی برای یک تبدیل ساده است. این به معنای تبدیل یک تابعی است که از callback استفاده می‌کند، به تابعی که یک promise بازمی‌گرداند.

چنین تبدیل‌هایی در دنیای واقعی اغلب لازم هستند، چرا که بسیاری از توابع و کتابخانه‌ها مبتنی بر callback هستند. اما استفاده از promiseها راحت‌تر و خواناتر است، بنابراین منطقی است که آن‌ها را پرومیس‌سازی کنیم.

برای مثال، تابع loadScript(src, callback) را از فصل info:callbacks در نظر بگیرید.

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

بیایید آن را پرومیس‌سازی کنیم. تابع جدید loadScriptPromise(src) همان نتیجه را به دست می‌دهد، اما فقط src را به عنوان ورودی می‌پذیرد (بدون callback) و یک promise بازمی‌گرداند.

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// usage:
// loadScriptPromise('path/script.js').then(...)
```

اکنون loadScriptPromise به خوبی با کدی که بر پایه‌ی promise نوشته شده سازگار است.

همان‌طور که می‌بینیم، این تابع تمام کار را به تابع اصلی loadScript واگذار می‌کند و callback مخصوص به خود را به آن می‌دهد که نتیجه را به resolve/reject در promise تبدیل می‌کند.

در عمل، احتمالاً نیاز خواهیم داشت که توابع زیادی را پرومیس‌سازی کنیم، بنابراین منطقی است که از یک تابع کمکی استفاده کنیم. ما آن را promisify(f) می‌نامیم: این تابع، یک تابع f را که می‌خواهیم پرومیس‌سازی کنیم دریافت می‌کند و یک تابع جدید (wrapper) بازمی‌گرداند.

این تابع wrapper همان کاری را انجام می‌دهد که در کد بالا دیدیم: یک promise بازمی‌گرداند و فراخوانی تابع اصلی f را انجام می‌دهد، و نتیجه را از طریق یک callback سفارشی دنبال می‌کند.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
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
};

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

در اینجا فرض می‌کنیم که تابع اصلی، یک callback با دو آرگومان (err, result) را انتظار دارد. این رایج‌ترین حالتی است که با آن مواجه می‌شویم. در این صورت، callback سفارشی ما دقیقاً در قالب مناسب قرار دارد و promisify برای چنین حالتی بسیار خوب عمل می‌کند.

اما اگر تابع اصلی f یک callback با آرگومان‌های بیشتری بخواهد، مثل callback(err, res1, res2, ...) چه می‌شود؟

در اینجا نسخه پیشرفته‌تری از promisify را داریم: اگر آن را به صورت promisify(f, true) فراخوانی کنیم، نتیجه‌ی promise به صورت یک آرایه از نتایج callback خواهد بود: [res1, res2, ...].

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
};

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

برای قالب‌های غیرمعمول‌تر از callback، مثل آن‌هایی که اصلاً err ندارند، مانند callback(result)، می‌توانیم این توابع را به صورت دستی پرومیس‌سازی کنیم، بدون استفاده از تابع کمکی.

همچنین ماژول‌هایی وجود دارند که توابع پرومیس‌سازی انعطاف‌پذیرتری ارائه می‌دهند، مانند es6-promisify. در Node.js نیز یک تابع داخلی به نام util.promisify برای این کار وجود دارد.

```smart
پرومیس‌سازی رویکرد بسیار خوبی است، به‌ویژه زمانی که از async/await استفاده می‌کنید (به فصل بعدی مراجعه کنید)، اما جایگزین کامل و همیشگی برای callbackها نیست.

به خاطر داشته باشید که یک promise فقط می‌تواند یک نتیجه داشته باشد، اما یک callback از نظر فنی ممکن است چندین بار فراخوانی شود.

بنابراین، پرومیس‌سازی فقط برای توابعی مناسب است که callback را تنها یک بار صدا می‌زنند. فراخوانی‌های بعدی نادیده گرفته خواهند شد.
```
