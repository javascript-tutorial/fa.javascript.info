# کلاس Promise

تصور کنید که یک خواننده برتر هستید و طرفداران شب و روز درخواست آهنگ بعدی شما را دارند.

برای اینکه کمی راحت بشوید، قول می‌دهید پس از انتشار آن را برای آن‌ها ارسال کنید. شما یک لیست به طرفداران خود می‌دهید. آن‌ها می‌توانند آدرس ایمیل خود را پر کنند، به طوری که وقتی آهنگ در دسترس قرار گرفت، همه مشترکین فورا آن را دریافت کنند. و حتی اگر مشکلی پیش بیاید، مثلا آتش سوزی در استودیو، به طوری که نتوانید آهنگ را منتشر کنید، باز هم به آن‌ها اطلاع داده خواهد شد.

همه خوشحال هستند: شما، چون مردم دیگر مزاحم شما نمی‌شوند، و طرفداران، چون آهنگ را از دست نمی‌دهند.

این یک تشبیه واقعی برای چیزهایی است که اغلب در برنامه‌نویسی داریم:

1. یک «کد تولید‌کننده» که کاری انجام می‌دهد و زمانی می‌برد. به عنوان مثال، کدهایی که داده‌ها را از طریق شبکه بارگیری می‌کند. این یک «خواننده» است.
2. یک «کد مصرف‌کننده» که نتیجه‌ی «کد تولیدکننده» را پس از آماده شدن می خواهد. بسیاری از توابع ممکن است به آن نتیجه نیاز داشته باشند. اینها «طرفداران» هستند.
3. یک *Promise* (معنی لغوی: قول/وعده) یک شیء خاص جاوااسکریپت است که «کد تولید‌کننده» و «کد مصرف‌کننده» را به یکدیگر پیوند می‌دهد. از نظر تشبیه ما: این «فهرست اشتراک» است. «کد تولید‌کننده» هر مقدار زمانی را که برای تولید نتیجه وعده داده شده نیاز دارد مصرف می‌کند و Promise آن نتیجه را پس از آماده شدن برای همه کدهای مشترک شده در دسترس قرار می‌دهد.

این تشبیه خیلی دقیق نیست، زیرا Promiseهای جاوا‌اسکریپت پیچیده‌تر از یک لیست اشتراک ساده است: آن‌ها دارای ویژگی‌ها و محدودیت‌های اضافی هستند. اما برای شروع خوب است.

سینتکس سازنده برای یک شیء Promise به صورت زیر است:

```js
let promise = new Promise(function(resolve, reject) {
  // اجراکننده (کد تولیدکننده , "خواننده")
});
```

تابعی که به `new Promise` ارسال می‌شود *اجرا‌کننده* (executer) نامیده می‌شود. هنگامی که `new Promise` ایجاد می‌شود، اجرا‌کننده به طور خودکار اجرا می‌شود. این شامل کد تولید‌کننده است که در نهایت باید نتیجه را ایجاد کند. از نظر تشبیه بالا: اجراکننده «خواننده» است.

آرگومان‌های آن `resolve` و `reject`  فراخوان‌هایی هستند که توسط خود جاوا‌اسکریپت ارائه شده است. کد ما فقط در داخل اجرا‌کننده است.

وقتی اجرا‌کننده به نتیجه رسید، چه زود باشد چه دیر، مهم نیست، باید یکی از این callback ها را فراخوانی کند:

- `resolve(value)` — `value` اگر کار با موفقیت به پایان رسید، با نتیجه‌ی.
- `reject(error)` — همان شیء خطا است `error` ، اگر خطایی رخ داده باشد  

بنابراین به طور خلاصه: اجراکننده به طور خودکار اجرا می‌شود و تلاش می‌کند تا یک کار را انجام دهد. هنگامی که کار با تلاش به پایان رسید، در صورت موفقیت‌آمیز بودن، `resolve` یا در صورت وجود هر خطایی `reject` را فراخوانی می‌کند.

شیء `promise` که توسط سازنده `new Promise` برگردانده شده است دارای این ویژگی‌های داخلی است:

- `state` — در ابتدا `"pending"` سپس با فراخوانی، `resolve` به `"fulfilled"` یا زمانی که `reject` فراخوانی می‌شود به `"rejected"` تغییر می‌کند.
- `result` — در ابتدا `undefined`، سپس با فراخوانی `resolve(value)` به `value` یا زمانی که `reject(error)` فراخوانی می شود به  `error` تغییر می‌کند.

بنابراین اجرا‌کننده در نهایت `promise` را به یکی از این حالات منتقل می‌کند:

![](promise-resolve-reject.svg)

بعداً خواهیم دید که چگونه "طرفداران" می‌توانند در این تغییرات مشترک شوند.

در اینجا یک نمونه از سازنده Promise و یک تابع اجرا‌کننده ساده با «کد تولید‌کننده» داریم که زمانبر است (از طریق `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  //  ساخته می‌شود به طور خودکار اجرا می‌شود Promise این تابع زمانی که 

  // انجام شد "done" پس از 1 ثانیه سیگنال می‌دهد که کار با نتیجه 
  setTimeout(() => *!*resolve("انجام شده")*/!*, 1000);
});
```

با اجرای کد بالا می توانیم دو چیز را ببینیم:

۱. اجرا‌کننده به صورت خودکار و بلافاصله فراخوانی می‌شود (توسط `new Promise`).  
۲. اجرا‌کننده دو آرگومان دریافت می‌کند: `resolve` و `reject`. این توابع توسط موتور جاوااسکریپت از پیش تعریف شده‌اند, بنابراین ما نیازی به ایجاد آن‌ها نداریم. وقتی آماده شدیم فقط باید یکی از آن‌ها را فراخوانی کنیم.

<<<<<<< HEAD
 پس از یک ثانیه "پردازش"، اجرا‌کننده `resolve("done")` را برای ایجاد نتیجه فراخوانی می‌کند. این وضعیت شیء `promise` را تغییر می‌ده:
=======
    After one second of "processing", the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

    ![](promise-resolve-1.svg)

این نمونه‌ای از تکمیل موفقیت آمیز کار بود، یک "fulfilled promise".

و حال نمونه‌ای از رد کردن (rejecting) یک Promise توسط اجرا‌کننده با یک خطا:

```js
let promise = new Promise(function(resolve, reject) {
  // بعد از 1 ثانیه سیگنال می‌دهد که کار با یک خطا تمام شده است
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

فراخوانیِ `(...)reject` شیء Promise را به وضعیت `"rejected"` می‌برد:

![](promise-reject-1.svg)

به طور خلاصه، اجرا‌کننده باید یک کار را انجام دهد (معمولاً کاری که زمان می‌برد) و سپس `resolve` یا `reject` را برای تغییر وضعیت شیء Promise مربوطه فراخوانی کند.

به یک Promise که یا حل‌و‌فصل (resolved) می‌شود یا رد (rejected) می‌شود، «تسویه‌شده» ("settled") می‌گویند، برخلاف Promise که در ابتدا «درحال انتظار» ("pending") است.

````smart header="تنها یک نتیجه یا یک خطا می تواند وجود داشته باشد"
اجرا‌کننده باید فقط یک `resolve` یا یک `reject` را فراخوانی کند. هر تغییر وضعیتی نهایی است.

همه فراخوانی‌های دیگر از `resolve` و `reject` نادیده گرفته می‌شوند:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("انجام شده");
*/!*

  reject(new Error("…")); // نادیده گرفته شد
  setTimeout(() => resolve("…")); // نادیده گرفته شد
});
```

ایده این است که کار انجام شده توسط اجرا‌کننده ممکن است تنها یک نتیجه یا یک خطا داشته باشد.

همچنین، `resolve`/`reject` تنها یک آرگومان (یا هیچی) را انتظار دارد و آرگومان‌های اضافی را نادیده می‌گیرد.
````

```smart header="با شیءهای `Error` رد (reject) کنید"
در صورتی که مشکلی پیش بیاید، اجرا‌کننده باید `reject` را فراخوانی کند. این کار می‌تواند با هر نوع آرگومانی انجام شود (دقیقاً مانند `resolve`). اما توصیه می‌شود از اشیاء `Error` (یا اشیایی که از `Error` به ارث می‌برند) استفاده کنید. دلیل آن به زودی مشخص خواهد شد.
```

````smart header="فراخوانی بلافاصله `resolve`/`reject`"
در عمل، یک اجرا‌کننده معمولاً کاری را به صورت ناهمزمان انجام می‌دهد و پس از مدتی `resolve`/`reject` را فراخوانی می‌کند، اما مجبور نیست. همچنین می‌توانیم بلافاصله `reject` یا `resolve` را فراخوانی کنیم، مانند این:

```js
let promise = new Promise(function(resolve, reject) {
  // وقت خود را برای انجام کار صرف نمی کنیم
  resolve(123); // بلافاصله نتیجه را بدهید: 123
});
```

به عنوان مثال، این ممکن است زمانی اتفاق بیفتد که ما شروع به انجام یک کار می‌کنیم، اما بعد می‌بینیم که همه چیز قبلاً تکمیل شده و در حافظه پنهان(cache) ذخیره شده است.

مشکلی ندارد. ما بلافاصله یک Promise حل‌شده (resolved) داریم.
````

```smart header="`state` و `result` داخلی هستند"
ویژگی های `state` و `result` شیء Promise داخلی هستند. ما نمی‌توانیم مستقیماً به آن‌ها دسترسی داشته باشیم. برای این کار می‌توانیم از متدهای `.then`/`.catch`/`.finally` استفاده کنیم. در زیر توضیح داده شده‌اند.
`````

<<<<<<< HEAD
## مصرف‌کنندگان: then, catch, finally

یک شیء Promise به عنوان یک پیوند بین اجراکننده ("کد تولید‌کننده" یا "خواننده") و توابع مصرف‌کننده ("طرفداران") عمل می‌کند که نتیجه یا خطا را دریافت می‌کند. توابع مصرف‌کننده را می‌توان با استفاده از متدهای `then`، `.catch.` و `finally.` ثبت (مشترک) کرد.
=======
## Consumers: then, catch

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods `.then` and `.catch`.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

### متدِ then

مهم ترین و اساسی ترین آن `then.` است.

سینتکس عبارت است از:

```js
promise.then(
  function(result) { *!*/* یک نتیجه موفق را مدیریت کنید */*/!* },
  function(error) { *!*/* یک خطا را مدیریت کنید */*/!* }
);
```

<<<<<<< HEAD
اولین آرگومان `then.` تابعی است که با حل‌وفصل شدن (resolved) یک Promise اجرا می‌شود و نتیجه را دریافت می‌کند.

آرگومان دوم `then.` تابعی است که با رد شدن (rejected) یک Promise اجرا می‌شود و خطا را دریافت می‌کند.
=======
The first argument of `.then` is a function that runs when the promise is resolved and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected and receives the error.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

به عنوان مثال، در اینجا یک واکنش به یک Promise که با موفقیت حل‌وفصل شده (resolved) داریم:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("انجام شده!"), 1000);
});

// را اجرا می کند .then اولین تابع در resolve
promise.then(
*!*
  result => alert(result), // بعد از 1 ثانیه  "انجام شده!" را نشان می‌دهد 
*/!*
  error => alert(error) //  اجرا نمی‌شود
);
```

اولین تابع اجرا شد.

و در صورت ردشدن، تابع دوم:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// اجرا می کند .then تابع دوم را در reject 
promise.then(
  result => alert(result), // اجرا نمی‌شود
*!*
  error => alert(error) // نشان می‌دهد "Error: Whoops!" بعد از 1 ثانیه
*/!*
);
```

اگر فقط به تکمیل موفقیت‌آمیز کار علاقه داریم، می‌توانیم تنها یک آرگومان تابع را برای `then.` ارائه کنیم:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("انجام شده!"), 1000);
});

*!*
promise.then(alert); // بعد از 1 ثانیه «انجام شده!» را نشان می‌دهد
*/!*
```

### متدِ catch

اگر فقط به خطاها علاقه‌مند هستیم، می‌توانیم از `null` به عنوان اولین آرگومان استفاده کنیم: `then(null، errorHandlingFunction).`. یا می‌توانیم از `catch(errorHandlingFunction).` استفاده کنیم که دقیقاً مشابه است:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // .را بعد از 1 ثانیه نشان می‌دهد "Error: Whoops!" خطای
*/!*
```

فراخوانی `catch(f).` یک تشابه کامل از `then(null, f).` است. این فقط یک کوتاه نویسی است.

<<<<<<< HEAD
### متدِ finally
=======
## Cleanup: finally
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

درست مانند یک بند `finally` در یک `catch {...} try {...}` معمولی، در وعده‌ها(promises) نیز `finally` وجود دارد.

<<<<<<< HEAD
فراخوانی `finally(f).` شبیه به `then(f, f).` است به این معنا که `f` همیشه زمانی که Promise تسویه (settled) می‌شود اجرا می‌شود: خواه حل‌وفصل (resolve) یا رد (reject) شود.

متدِ `finally` یک کنترل‌کننده خوب برای انجام پاکسازی است، به عنوان مثال. نشانگرهای بارگیری(loading indicators) خود را متوقف می‌کنیم، زیرا بدون توجه به نتیجه، دیگر به آن‌ها نیازی نیست.

مثل این:

```js
new Promise((resolve, reject) => {
  /* را فراخوانی کنید resolve/reject کاری را انجام دهید که زمان می‌برد و سپس */
})
*!*
// تسویه شود، مهم نیست موفقیت‌آمیز باشد یا نه promise زمانی اجرا می‌شود که
  .finally(() => توقف نشانه‌گر بارگیری)
  // بنابراین نشانگر بارگیری همیشه قبل از پردازش نتیجه/خطا متوقف می‌شود
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` runs always, when the promise is settled: be it resolve or reject.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections, etc.

Think of it as a party finisher. No matter was a party good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
*/!*
  .then(result => نمایش نتیجه, err => نمایش خطا)
```

<<<<<<< HEAD
با این حال، `finally(f)` دقیقاً نام مستعار `then(f,f)` نیست. چند تفاوت ظریف وجود دارد:

۱. یک کنترل‌کننده `finally` هیچ آرگومانی ندارد. در `finally` ما نمی‌دانیم که آیا Promise موفقیت‌آمیز است یا نه. همه چیز درست است، زیرا وظیفه ما معمولاً انجام مراحل نهایی‌سازی "عمومی" است.  
۲. یک کنترل‌کننده `finally` نتایج و خطاها را به کنترل‌کننده بعدی منتقل می‌کند.

    به عنوان مثال، در اینجا نتیجه از `finally` به `then` منتقل می‌شود:
=======
Please note that `finally(f)` isn't exactly an alias of `then(f,f)` though.

There are important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

    Please take a look at the example above: as you can see, the `finally` handler has no arguments, and the promise outcome is handled by the next handler.
2. A `finally` handler "passes through" the result or error to the next suitable handler.

    For instance, here the result is passed through `finally` to `then`:

>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
<<<<<<< HEAD
      .finally(() => alert("Promise آماده است"))
      .then(result => alert(result)); // <-- نتیجه را اجرا می‌کند .then
    ```

    :و در  اینجا یک خطا در Promise وجود دارد که از `finally` به `catch` پاس داده می‌شود
=======
      .finally(() => alert("Promise ready")) // triggers first
      .then(result => alert(result)); // <-- .then shows "value"
    ```

    As you can see, the `value` returned by the first promise is passed through `finally` to the next `then`.

    That's very convenient, because `finally` is not meant to process a promise result. As said, it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through `finally` to `catch`:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("خطا");
    })
<<<<<<< HEAD
      .finally(() => alert("Promise آماده است"))
      .catch(err => alert(err));  // <-- شیء خطا را اجرا می‌کند .catch 
    ```

این بسیار راحت است، زیرا `finally` به معنای پردازش نتیجه Promise نیست. بنابراین از آن عبور می‌کند.

در فصل بعدی بیشتر در مورد زنجیره Promise و انتقال نتیجه بین کنترل‌کننده‌ها صحبت خواهیم کرد.
=======
      .finally(() => alert("Promise ready")) // triggers first
      .catch(err => alert(err));  // <-- .catch shows the error
    ```

3. A `finally` handler also shouldn't return anything. If it does, the returned value is silently ignored.

    The only exception to this rule is when a `finally` handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

To summarize:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

- A `finally` handler doesn't get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
- If a `finally` handler returns something, it's ignored.
- When `finally` throws an error, then the execution goes to the nearest error handler.

These features are helpful and make things work just the right way if we `finally` how it's supposed to be used: for generic cleanup procedures.

<<<<<<< HEAD
````smart header="ما می توانیم اجراکننده‌ها را به Promiseهای تسویه‌شده متصل کنیم"
اگر وعده‌ای در حالت انتظار است، کنترل‌کننده‌ها `then/catch/finally.` منتظر آن می‌مانند. در غیر این صورت، اگر وعده‌ای قبلاً تسویه شده باشد، آنها فقط اجرا می‌شوند:
=======
````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

```js run
// بلافاصله پس از ایجاد حل‌وفصل می‌شود Promise
let promise = new Promise(resolve => resolve("انجام شده!"));

promise.then(alert); //  (همین الآن نشان می‌دهد) انجام شده!
```

توجه داشته باشید که این باعث می‌شود Promiseها قدرتمندتر از سناریوی واقعی "فهرست اشتراک" باشد. اگر خواننده قبلا آهنگ خود را منتشر کرده باشد و سپس شخصی در لیست اشتراک ثبت نام کند، احتمالاً آن آهنگ را دریافت نخواهد کرد. اشتراک در دنیای واقعی باید قبل از رویداد انجام شود.

انعطاف Promiseها بیشتر است. ما می توانیم هر زمان که بخواهیم کنترل‌کننده‌ها را اضافه کنیم: اگر نتیجه از قبل وجود داشته باشد، آنها فقط اجرا می‌شوند.
````

<<<<<<< HEAD
در مرحله بعد، بیایید نمونه‌های عملی بیشتری را ببینیم که چگونه Promiseها می‌توانند به ما در نوشتن کد ناهمزمان کمک کنند.

## مثال: loadScript [#loadscript]

ما تابع `loadScript` را برای بارگیری یک اسکریپت از فصل قبل داریم.
=======
## Example: loadScript [#loadscript]

Next, let's see more practical examples of how promises can help us write asynchronous code.

We've got the `loadScript` function for loading a script from the previous chapter.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

اینجا یک نوع مبتنی بر callback داریم، فقط برای یادآوری آن:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`خطای بارگیری اسکریپت برای ${src}`));

  document.head.append(script);
}
```

بیایید آن را با استفاده از Promiseها بازنویسی کنیم.

تابع جدید `loadScript` نیازی به callback نخواهد داشت. درعوض، یک شی Promise ایجاد و برمی‌گرداند که پس از اتمام بارگیری حل‌وفصل می‌شود. کد بیرونی می‌تواند با استفاده از `then.`، کنترل‌کننده‌ها (توابع اشتراک) را به آن اضافه کند:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`خطای بارگیری اسکریپت برای ${src}`));

    document.head.append(script);
  });
}
```

Usage:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`اسکریپت ${script.src} بارگذاری شده است!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('کنترل‌کننده دیگر...'));
```

ما می‌توانیم بلافاصله چند مزیت را نسبت به الگوی مبتنی بر callback مشاهده کنیم:


| Promises | Callbacks |
|----------|-----------|
| Promiseها به ما این امکان را می‌دهند که کارها را به ترتیب طبیعی انجام دهیم. ابتدا `(loadScript(script` را اجرا می‌کنیم و `.then` می‌نویسیم که با نتیجه چه کنیم. | هنگام فراخوانی `loadScript(script, callback)` باید یک تابع `callback` در اختیار داشته باشیم. به عبارت دیگر، *قبل* از فراخوانی `loadScript` باید بدانیم که با نتیجه چه کنیم. |
| می‌توانیم `.then` را در یک Promise هر چند بار که بخواهیم فراخوانی کنیم. هر بار، یک `طرفدار` جدید، یک تابع اشتراک جدید، به "لیست اشتراک" اضافه می‌کنیم. اطلاعات بیشتر در مورد این در فصل بعدی: [](info:promise-chaining). | فقط یک کال‌بک می‌تواند وجود داشته باشد. |

بنابراین Promiseها جریان کد و انعطاف‌پذیری بهتری به ما می‌دهند. اما موارد بیشتری وجود دارد. آن را در فصل‌های بعدی خواهیم دید.
