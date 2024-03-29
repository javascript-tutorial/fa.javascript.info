
# مدیریت ارورها با promiseها

زنجیره‌های promise در مدیریت ارورها عالی هستند. هنگام reject شدن یک promise، کنترل برنامه به نزدیک‌ترین مدیریت‌کننده rejection (رد شدن) جهش می‌کند. این موضوع در عمل خیلی مناسب است.

برای مثال، در کد پایین URL درون fetch اشتباه است (چنین سایتی وجود ندارد) و `.catch` ارور را مدیریت می‌کند:

```js run
*!*
fetch('https://no-such-server.blabla') // می‌شود reject
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (متن ممکن است تفاوت داشته باشد)
```

همانطور که می‌بینید، `.catch` حتما نباید بلافاصله وجود داشته باشد. می‌تواند بعد از یک یا چند `.then` ظاهر شود.

یا شاید سایت مشکلی ندارد اما پاسخ یک جی‌سان معتبر نباشد. آسان‌ترین راه برای گرفتن تمام ارورها اضافه کردن `.catch` به انتهای زنجیره است:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

معمولا، چنین `.catch`هایی اصلا فعال نمی‌شوند. اما اگر هر کدام از promiseهای بالا reject شوند (به دلیل مشکل شبکه یا جی‌سان نامعتبر یا هر چیزی) سپس ارور دریافت می‌شود.

## try..catch ضمنی

کد یک اجرا کننده promise و مدیریت‌کننده‌های promise یک «`try..catch` نامرئی» دور خود دارند. اگر اروری رخ دهد، دریافت می‌شود و به عنوان یک rejection با آن رفتار می‌شود.

برای مثال، این کد:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...دقیقا مانند این کد عمل می‌کند:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

«`try..catch` نامرئی» به دور اجرا کننده به صورت خودکار ارور را دریافت می‌کند و آن را به یک promise که reject شده تبدیل می‌کند.

این نه تنها در تابع اجرا کننده اتفاق می‌افتد بلکه در مدیریت‌کننده‌های آن هم این چنین است. اگر ما درون یک مدیریت‌کننده `.then` عمل `thorw` انجام دهیم، به معنی یک promise که reject شده است پس کنترل برنامه به نزدیک‌ترین مدیریت‌کننده ارور جهش می‌کند.

اینجا یک مثال داریم:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // می‌کند rejects را promise
*/!*
}).catch(alert); // Error: Whoops!
```

این برای تمام ارورها اتفاق می‌افتد نه فقط آن‌هایی که توسط دستور `throw` اتفاق می‌افتند. برای مثال، یک ارور برنامه‌نویسی:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // چنین تابعی نداریم
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

`.catch` انتهایی نه تنها تمام rejectionهای واضح را دریافت می‌کند بلکه ارورهای تصادفی در مدیریت‌کننده‌های بالا را هم دریافت می‌کند.

## throw کردن دوباره

همانطور که متوجه شده‌ایم، `.catch` در انتهای زنجیره شبیه `try..catch` است. می‌توانیم هر تعداد مدیریت‌کننده `.then` که بخواهیم داشته باشیم و سپس از یک `.catch` در انتها برای مدیریت ارورهای تمام آن‌ها استفاده کنیم.

در یک `try..catch` عادی ما می‌توانیم ارور را آنالیز کنیم و اگر نتوان آن را مدیریت کرد، دوباره throw کنیم. همین موضوع برای promiseها هم صدق می‌کند.

اگر ما درون `.catch` عمل `throw` را انجام دهیم، سپس کنترل برنامه به نزدیک‌ترین مدیریت‌کننده ارور بعدی منتقل می‌شود. و اگر ما ارور را مدیریت کنیم و با موفقیت به اتمام برسد، سپس به نزدیک‌ترین مدیریت‌کننده `.then` بعدی منتقل می‌شود.

در مثال پایین، `.catch` ارور را با موفقیت مدیریت می‌کند:

```js run
// catch -> then :اجرای برنامه
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("ارور مدیریت شد، ادامه دهید");

}).then(() => alert("مدیریت‌کننده بعدی اجرا می‌شود"));
```

اینجا بلوک `.catch` به طور معمولی به اتمام می‌رسد. پس مدیریت‌کنند `.then` بعدی فراخوانی می‌شود.

در مثال پایین ما موقعیت دیگر با `.catch` را می‌بینیم. مدیریت‌کننده `(*)` ارور را دریافت می‌کند و نمی‌تواند آن را مدیریت کند (مثلا فقط می‌داند که چگونه `URIError` را مدیریت کند) پس دوباره آن را throw می‌کند:

```js run
// catch -> catch :اجرای برنامه
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

*!*
    throw error; // بعدی جهش می‌کند catch کردن این یا ارور دیگری به throw
*/!*
  }

}).then(function() {
  /* اینجا اجرا نمی‌شود */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // چیزی برنمی‌گرداند => اجرای برنامه به راه عادی خود ادامه می‌دهد

});
```

اجرای برنامه از `.catch` اول `(*)` به بعدی `(**)` در انتهای زنجیره منتقل می‌شود.

## rejectionهای مدیریت نشده

زمانی که یک ارور مدیریت نشده است چه اتفاقی می‌افتد؟ برای مثال، ما فراموش کرده باشیم که `.catch` را به انتهای زنجیره اضافه کنیم، مانند اینجا:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // (چنین تابعی نداریم) اینجا ارور ساخته می‌شود
})
  .then(() => {
    // یکی یا بیشتر ،promise مدیریت‌کننده‌های موفقیت‌آمیز
  }); // !در انتها .catch بدون
```

در صورت وجود ارور، promise ما reject می‌شود و اجرای برنامه باید به نزدیک‌ترین مدیریت‌کننده rejection جهش کند. اما وجود ندارد. پس ارور «گیر» می‌افتد. کدی برای مدیریت آن وجود ندارد.

در عمل، درست مانند ارورهای مدیریت‌نشده در کد، این موضوع یعنی اشتباه وحشتناکی رخ داده است.

زمانی که یک ارور معمولی رخ می‌دهد و توسط `try..catch` دریافت نمی‌شود چه اتفاقی می‌افتد؟ اسکریپت همراه با یک پیام درون کنسول می‌میرد. چنین چیزی هم درباره rejectionهای مدیریت‌نشده promise اتفاق می‌افتد.

در این صورت، موتور جاوااسکریپت چنین rejectionهایی را ردیابی می‌کند و یک ارور گلوبال می‌سازد. اگر مثال بالا را اجرا کنید می‌توانید آن را درون کنسول مشاهده کنید.

در مرورگر ما می‌توانیم چنین ارورهایی را با استفاده از رویداد `unhandledrejection` دریافت کنیم:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // :دو ویژگی خاص دارد event شیء
  alert(event.promise); // [object Promise] - که ارور را ساخته است promise
  alert(event.reason); // Error: Whoops! - شیء ارور مدیریت نشده
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // نداریم catch برای مدیریت ارور
```

این رویداد بخشی از [استاندارد HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) است.

اگر اروری رخ دهد، و `.catch` نداشته باشیم، مدیریت‌کننده `unhandlesrejection` فعال می‌شود و شیء `event` را همراه با اطلاعاتی درباره ارور دریافت می‌کند تا ما بتوانیم کاری کنیم.

معمولا چنین ارورهایی قابل بازیابی نیستند پس بهترین راه خروج ما مطلع کردن کاربر درباره مشکل احتمالا گزارش دادن حادثه به سرور است.

در محیط‌های غیر مرورگر مانند Node.js راه‌هایی برای ردیابی ارورهای مدیریت نشده وجود دارد.

## خلاصه

- `.catch` هر نوع ارور درون promiseها را مدیریت می‌کند: چه فراخوانی `reject()` باشد یا چه اروری درون یک مدیریت‌کننده.
- `.then` هم به نوعی ارورها را دریافت می‌کند در صورتی که آرگومان دوم به آن داده شده باشد (که همان مدیریت‌کننده ارور است).
- ما باید `.catch` را دقیقا در مکان‌هایی قرار دهیم که می‌خواهیم ارورها را مدیریت کنیم و می‌دانیم چگونه. مدیریت‌کننده باید ارورها را بررسی کند (با کمک کلاس‌های ارورهای شخصی‌سازی شده) و ارورهای ناشناخته را دوباره throw کند (شاید آن‌ها اشتباهات برنامه‌نویسی باشند).
- اگر راهی برای نجات از یک ارور وجود نداشته باشد، استفاده نکردن از `.catch` به طور کلی مشکلی ندارد.
- در هر صورت ما باید مدیریت‌کننده رویداد `unhandledrejection` را داشته باشیم (برای مرورگرها و مشابه‌های آن برای بقیه محیط‌ها) تا ارورهای مدیریت‌نشده را ردیابی کنیم و کاربر (و احتمالا سرور خود) را از آن‌ها مطلع کنیمت تا برنامه ما هیچوقت «نمیرد».
