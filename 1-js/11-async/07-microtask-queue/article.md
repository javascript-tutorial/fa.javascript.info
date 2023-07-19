
# Microtasks

هندلرهای (handler) پرامیس `.then`/`.catch`/`.finally` همواره ناهمگام هستند.

حتی زمانی که یک پرامیس در آن واحد به سر انجام رسیده, کد هایی که در خطوط *زیرین* `.then`/`.catch`/`.finally` هستند هنوز پیش از این هندلرها (handler) اجرا می شوند.

یک نمونه:

```js run
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // ابتدا این هشدار نمایان می شود
```

اگر این کد را اجرا کنید, عبارت `code finished` را در ابتدا و سپس `promise done!` را میبینید.

این عجیب است, زیرا پرامیس قطعا از پیش به انجام رسیده است.

چرا `.then` بعدتر اجرا شد؟ چه رخ میدهد؟

## صف Microtasks

کار های ناهمگام نیازمند مدیریت درست هستند. به همین سبب، استاندارد ECMA یک صف داخلی به نام `PromiseJobs` مشخص میکند که بیشتر با نام "microtask queue" از آن یاد می شود (اصطلاح V8).

همانطور که در [خصوصیات زبان](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues) یاد شده:

- صف first-in-first-out است: کارهایی که نخست وارد صف شده اند نخست اجرا می شوند.

- اجرای یک کار تنها زمانی شروع می شود که چیز دیگری در حال اجرا نباشد.

یا، به عبارت ساده تر، زمانی که یک پرامیس آماده است، مدیر های `.then/catch/finally` آن درون صف قرار داده می شوند؛ آنها هنوز اجرا نشده اند. زمانی که موتور جاوااسکریپت از کد فعلی رها می شود، یک کار (تسک) از صف میگیرد و آن را اجرا میکند.

به همین دلیل عبارت "code finished" در نمونه بالا نخست نمایان می شود.

![](promiseQueue.svg)

هندلرهای (handler) پرامیس همواره از درون این صف داخلی می گذرند.

اگر زنجیره ای با چندین `.then/catch/finally` باشد، آنگاه هر یک از آنها به صورت ناهمگام اجرا می شود. بدان صورت که، ابتدا وارد صف می شود، سپس زمانی که کد فعلی تمام شده و هندلرهای (handler) پیشین صف شده به پایان رسیده اند، اجرا می شود.

**اگر ترتیب برای ما اهمیت داشت چه? چگونه می توانیم `code finished` را پیش از `promise done` نمایان کنیم؟**

به سادگی، فقط با استفاده از `.then` درون صف قرارش بده:

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

حالا ترتیب در نظر گرفته شده.

## rejection مدیریت نشده

ایونت `unhandledrejection` را از مقاله <info:promise-error-handling> به یاد دارید؟

حال میتوانیم به دقت ببینیم که جاوااسکریپت چگونه پی میبرد که رد شدن مدیریت نشده ای پیش آمده.

**یک "rejection مدیریت نشده" زمانی پیش می آید که یک خطای پرامیس در پایان صف خرده کار مدیریت نشده باشد.**

معمولا، اگر منتظر خطایی هستیم، `.catch` را به زنجیره پرامیس می افزاییم تا آن را مدیریت کند:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
promise.catch(err => alert('caught'));
*/!*

// اجرا نمی شود: خطا مدیریت شد
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

اما اگر فراموش کنیم که `.catch` را بیافزاییم، آنگاه، پس از اینکه صف خرده کار خالی شد، موتور جاوااسکریپت، ایونت را فراخوانی میکند:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

چه می شود اگر خطا را بعدتر مدیریت کنیم؟ مثل این کد:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

حال، اگر اجرایش کنیم، عبارت `Promise Failed!` را نخست و سپس عبارت `caught` را مشاهده خواهیم کرد.

اگر ما درباره صف Microtasks نمیدانستیم، می توانستیم شگفت زده شویم: "چرا هندلر `unhandledrejection` اجرا شد؟ ما یقینا خطا را گرفتیم و مدیریت کردیم!"

اما حال متوجه می شویم که `unhandledrejection` زمانی ایجاد می شود که Microtask کار تمام شده: موتور جاوااسکریپت پرامیس ها را بررسی میکند و، اگر هر یک از آنها در وضعیت "rejected" باشد، آنگاه ایونت فراخوانی می شود.

در نمونه بالا، `.catch` افزوده شده توسط `setTimeout` هم فراخوانی می شود. اما بعدتر فراخوانی می شود، پس از اینکه دیگر `unhandledrejection` رخ داده، پس چیزی را تغییر نمیدهد.

## چکیده

مدیریت پرامیس همواره ناهمگام است، همانطور که تمام عملیات پرامیس از درون صف داخلی "promise jobs" می گذرند، همچنین با عنوان "microtask queue" از آن یاد می شود (اصطلاح V8).

پس هندلر های `.then/catch/finally` همواره پس از به پایان رسیدن کد فعلی فراخوانی می شوند.

اگر نیاز داریم که تضمین کنیم یک تکه کد پس از `.then/catch/finally` اجرا می شود، می توانیم به یک فراخوانی زنجیره ای `.then` آن را بیافزاییم.

در بیشتر موتور های جاوااسکریپت، شامل مرورگر ها و Node.js، مفهوم Microtasks به دقت با "event loop" و "macrotasks" در هم تنیده شده. از آنجایی که این دو رابطه مستقیمی با پرامیس ها ندارند، در بخش دیگری از این دوره به آنها پرداخته شده، در مقاله <info:event-loop>.
