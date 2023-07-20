
# زنجیره‌ای کردن Promise

بیایید به مشکلی که در فصل <info:callbacks> ذکر شد برگردیم: ما دنباله‌ای از کارهای ناهمگام داریم که یکی پس از دیگری اجرا شوند - برای مثال، بارگیری اسکریپت‌ها. چگونه می‌توانیم آن را به خوبی کدنویسی کنیم؟

Promiseها چند دستورالعمل برای انجام آن فراهم می‌کنند.

در این فصل ما زنجیره‌ای کردن promise را پوشش می‌دهیم.

اینگونه بنظر می‌رسد:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

ایده کار این است که نتیجه از طریق زنجیره‌ای از مدیریت‌کننده‌های `.then` پاس داده شود.

اینجا روند برنامه اینگونه است:
1. شیء promise اول در 1 ثانیه resolve می‌شود `(*)`.
2. سپس مدیریت‌کننده `.then` فراخوانی می‌شود `(**)` که به نوبه خود یک promise جدید می‌سازد (که با مقدار `2` حل‌وفصل می‌شود).
3. `then` بعدی `(***)` نتیجه قبلی را دریافت می‌کند، آن را پردازش می‌کند (دو برابرش می‌کند) و آن را به مدیریت‌کننده بعدی انتقال می‌دهد.
4. ...و این چرخه ادامه دارد.

همانطور که نتیجه در طول زنجیره مدیریت‌کننده‌ها پاس داده می‌شود، ما می‌توانیم دنباله‌ای از فراخوانی‌های `alert` را ببینیم: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

تمام این کد کار می‌کند چون هر فراخوانی `.then` یک promise جدید برمی‌گرداند پس ما می‌توانیم `.then` بعدی را روی آن فراخوانی کنیم.

زمانی که یک مدیریت‌کننده مقداری را برمی‌گرداند، این مقدار به نتیجه آن promise تبدیل می‌شود پس `.then` بعدی همراه آن فراخوانی می‌شود.

**یک ارور کلاسیک افراد تازه‌کار: از لحاظ فنی ما می‌توانیم تعداد زیادی `.then` را هم به یک promise اضافه کنیم. این کار زنجیره‌ای کردن نیست.**

برای مثال:
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

کاری که اینجا کردیم فقط اضافه کردن چند مدیریت‌کننده به یک promise است. آن‌ها نتیجه را به یکدیگر پاس نمی‌دهند؛ در عوض به صورت جداگانه آن را پردازش می‌کنند.

تصویر را اینجا داریم (آن را با زنجیره‌ای کردن بالا مقایسه کنید):

![](promise-then-many.svg)

تمام `.then` ها روی promise یکسان نتیجه یکسانی دریافت می‌کنند -- نتیجه همان promise. پس در کد بالا تمام `alert`ها مقدار یکسانی را نمایش می‌دهند: `1`.

در عمل ما به ندرت چند مدیریت‌کننده برای یک promise نیاز داریم. زنجیره‌ای کردن خیلی بیشتر استفاده می‌شود.

## برگرداندن promiseها

یک مدیریت‌کننده (handler) که در `.then(handler)` استفاده شده ممکن است یک promise تولید کند و آن را برگرداند.

در این صورت مدیریت‌کننده‌های بعدی تا زمانی که آن تسویه شود صبر می‌کنند و سپس نتیجه آن را دریافت می‌کنند.

برای مثال:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

اینجا اولین `.then` مقدار `1` را نشان می‌دهد و در خط `(*)` مقدار `new Promise(…)` را برمی‌گرداند. بعد از یک ثانیه resolve می‌شود و نتیجه (آرگومان `resolve`، اینجا `result * 2` است) را به مدیریت‌کننده از `.then` دوم پاس می‌دهد. آن مدیریت‌کننده در خط `(**)` است و `2` را نمایش و کار یکسانی را انجام می‌دهد.

پس خروجی مانند مثال قبل یکسان است: 1 -> 2 -> 4 اما حالا بین فراخوانی‌های `alert` یک ثانیه تاخیر وجود دارد.

برگرداندن promiseها به ما امکان ساخت زنجیره‌هایی از عملیات ناهمگام را می‌دهد.

## مثال: loadScript

بیایید از این ویژگی با `loadScript` که بر اساس promise است و در [فصل قبل](info:promise-basics#loadscript) تعریف شد استفاده کنیم تا اسکریپت‌ها را یکی یکی و به ترتیب بارگیری کنیم:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // از تابع‌های تعریف شده در اسکریپت‌ها استفاده می‌کنیم
    // تا نشان دهیم آن‌ها واقعا بارگیری شده‌اند
    one();
    two();
    three();
  });
```

این کد می‌تواند با استفاده از تابع‌های کمانی کمی کوتاه‌تر شود:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // اسکریپت‌ها بارگیری شده‌اند، ما می‌توانیم از تابع‌هایی که آنجا تعریف شده‌اند استفاده کنیم
    one();
    two();
    three();
  });
```


اینجا هر فراخوانی `loadScript` یک promise برمی‌گرداند و `.then` بعدی زمانی که آن resolve شد اجرا می‌شود. سپس بارگیری اسکریپت بعدی را آغاز می‌کند. پس اسکریپت‌ها یکی پس از دیگری بارگیری می‌شوند.

ما می‌توانیم کارهای ناهمگام بیشتری را به زنجیره اضافه کنیم. لطفا توجه کنید که کد هنوز «flat» است - به سمت پایین رشد می‌کند، نه به سمت راست. نشانه‌ای از «هرم عذاب وجود ندارد.

از لحاظ فنی، ما می‌توانستیم `.then` را به طور مستقیم به هر `loadScript` اضافه کنیم، مثلا اینگونه:

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // دسترسی دارد script3 و script2 ،script1 این تابع به متغیرهای
      one();
      two();
      three();
    });
  });
});
```

این کد کار یکسانی را انجام می‌دهد: 3 اسکریپت را به ترتیب بارگیری می‌کند. اما «به سمت راست رشد می‌کند». پس مشکلی یکسان با callbackها داریم.

کسانی که استفاده از promiseها را شروع می‌کنند گاهی اوقات درباره زنجیره‌سازی نمی‌دانند پس کد را اینگونه می‌نویسند. به طور کلی، زنجیره‌سازی ترجیح داده می‌شود.

گاهی نوشتن `.then` به صورت مستقیم مشکلی ندارد چون تابع تودرتو به محدوده بیرونی دسترسی دارد. در مثال بالا تودرتوترین callback به تمام متغیر های `script1`، `script2` و `script3` دسترسی دارد. اما این بیشتر از آن که یک قانون باشد، یک استثنا است.


````smart header="Thenableها"
اگر بخواهیم دقیق باشیم، یک مدیریت‌کننده ممکن است دقیقا یک promise برنگرداند اما شیءای به اصطلاح "thenable" را برگرداند - یک شیء دلخواه که متد `.then` را دارد. با این شیء درست مانند یک promise رفتار می‌شود.

ایده این است که کتابخانه‌های شخص ثالث ممکن است شیءهای «سازگار با promise» خودشان را پیاده‌سازی کنند. این شیءها ممکن است مجموعه‌ای از متدهای خودشان را داشته باشند اما با promiseها نیز سازگار باشند چون آن‌ها `.then` را پیاده‌سازی می‌کنند.

اینجا مثالی از یک شیء thenable داریم:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // می‌شود resolve بعد از 1 ثانیه this.num*2 با
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // بعد از 1000 میلی ثانیه 2 را نشان می‌دهد
```

جاوااسکریپت در خط `(*)` شیء برگردانده شده توسط مدیریت‌کننده `.then` را بررسی می‌کند: اگر متدی قابل فراخوانی به نام `then` دارد، سپس آن متد را با فراهم کردن تابع‌های نیتیو `resolve` و `reject` به عنوان آرگومان فراخوانی می‌کند (مانند یک اجرا کننده) و تا زمانی که یکی از آن‌ها فراخوانی شود صبر می‌کند. در مثال بالا `resolve(2)` بعد از 1 ثانیه فراخوانی شده است `(**)`. سپس نتیجه به پایین زنجیره پاس داده می‌شود.

این ویژگی به ما اجازه می‌دهد که شیءهای شخصی‌سازی را با زنجیره‌های promise بدون اینکه اجباری به ارث‌بری از `Promise` داشته باشیم ادغام کنیم.
````


## مثال بزرگتر: fetch

در برنامه‌نویسی فرانت‌اند، اغلب اوقات promiseها برای درخواست‌های شبکه استفاده می‌شوند. پس بیایید یک مثال گسترده از آن ببینیم.

ما از متد [fetch](info:fetch) برای اینکه اطلاعات کاربر را از سرور ریموت بارگیری کنیم استفاده خواهیم کرد. این متد پارامترهای اختیاری زیادی دارد که در [فصل‌های جداگانه](info:fetch) پوشش داده شده‌اند اما سینتکس پایه آن بسیار ساده است:

```js
let promise = fetch(url);
```

این یک درخواست شبکه‌ای به `url` می‌فرستد و یک promise را برمی‌گرداند. زمانی که سرور همراه با headerها پاسخ می‌دهد، promise همراه با یک شیء `response` تسویه می‌شود اما *قبل از اینکه تمام پاسخ دانلود شود*.

برای خواندن پاسخ کامل، ما باید متد `response.text()` را فراخوانی کنیم: این متد یک promise برمی‌گرداند که بعد از دانلود شدن کامل متن از سرور ریموت، همراه با متن به عنوان نتیجه resolve می‌شود.

کد پایین یک درخواست به `user.json` می‌فرستد و متن آن را از سرور بارگیری می‌کند:

```js run
fetch('/article/promise-chaining/user.json')
  // زیر زمانی که سرور ریموت پاسخ می‌دهد اجرا می‌شود .then
  .then(function(response) {
    // جدید برمی‌گرداند promise زمانی که بارگیری می‌شود، یک response.text()
    // می‌شود resolve که همراه با متن کامل پاسخ
    return response.text();
  })
  .then(function(text) {
    // ...و اینجا محتوای فایل ریموت را داریم
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

شیء `response` که از `fetch` برگردانده شده است متد `response.json()` هم دارد که داده ریموت را می‌خواند و آن را به صورت جی‌سان می‌کند. در این مورد ما، این حتی مناسب‌تر است پس بیایید به آن سوییچ کنیم.

ما از تابع‌های کمانی هم برای ساده‌بودن استفاده خواهیم کرد:

```js run
// محتوای ریموت را به صورت جی‌سان تجزیه می‌کند response.json() درست مانند کد بالا اما
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan ،اسم کاربر را گرفتیم
```

حالا بیایید با کاربر بارگیری شده کاری کنیم.

برای مثال، می‌توانیم یک درخواست دیگر به GitHub بفرستیم، پروفایل کاربر را بارگیری کنیم و آواتار را نمایش دهیم:

```js run
// می‌سازیم user.json یک درخواست برای
fetch('/article/promise-chaining/user.json')
  // آن را به صورت جی‌سان بارگیری می‌کنیم
  .then(response => response.json())
  // یک درخواست می‌فرستیم GitHub به
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // پاسخ را به صورت جی‌سان بارگیری می‌کنیم
  .then(response => response.json())
  // (کنیم animate شاید آن را) را برای 3 ثانیه نمایش می‌دهیم (githubUser.avatar_url) تصویر آواتار
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

این کد کار می‌کند؛ برای دانستن جزئیات کامنت‌ها را بخوانید. اگرچه، یک مشکل احتمالی درون آن وجود دارد، یک ارور معمول برای کسانی که شروع به استفاده از promiseها کرده‌اند.

به خط `(*)` نگاه کنید: چگونه می‌توانیم *بعد* از اینکه نمایش آواتار تمام شد و حذف شد کاری را انجام دهیم؟ برای مثال، ما می‌خواهیم فرمی را برای ویرایش آن کاربر نشان دهیم یا چیز دیگری. تا اینجای کار، راهی وجود ندارد.

برای اینکه زنجیره را قابل گسترش کنیم، نیاز داریم که یک promise برگردانیم تا هنگامی که نمایش آواتار تمام شد resolve شود.

مثلا اینگونه:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser); // (**)
*/!*
    }, 3000);
  }))
  // بعد از 3 ثانیه فعال می‌شود
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

یعنی اینکه مدیریت‌کننده `.then` در خط `(*)` حالا یک `new Promise` برمی‌گرداند که فقط بعد از فراخوانی `resolve(githubUser)` در `setTimeout` خط `(**)` تسویه می‌شود. `.then` بعدی در زنجیره برای آن صبر خواهد کرد.

به عنوان یک عادت خوب، یک عمل ناهنگام باید همیشه یک promise برگرداند. این باعث می‌شود که بتوان بعد از آن عملیاتی را برنامه‌ریزی کرد؛ حتی اگر نخواهیم زنجیره را الان گسترش دهیم، ممکن است بعدا به آن نیاز داشته باشیم.

در نهایت، می‌توانیم کد را به تابع‌های قابل استفاده دوباره تقسیم کنیم:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// :استفاده از آن‌ها
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

## خلاصه

اگر مدیریت‌کننده یک `.then` (یا `catch/finally`، مهم نیست) یک promise برگرداند، بقیه زنجیره تا زمانی که آن تسویه شود منتظر می‌مانند. زمانی که تشویه شد، نتیجه آن (یا ارور) به بعدی‌ها پاس داده می‌شود.

اینجا تصویر آن را داریم:

![](promise-handler-variants.svg)
