# Async/await

یک روش خاص برای کار با Promise ها به شیوه راحتتر وجود دارد که به آن "async/await" گفته می شود. فهمیدن و استفاده از آن به شکل غافلگیر کننده راحت است.

## توابع Async

بیایید با کلیدواژه `async` شروع کنیم. این کلیدواژه قبل از یک تابع قرار می گیرد، مانند زیر:

```js
async function f() {
  return 1;
}
```

وجود کلمه "async" قبل از یک تابع یک معنی ساده می دهد: تابع همیشه یک Promise برمی گرداند. سایر مقادیر به صورت خودکار با یک Promise انجام شده در بر گرفته می شوند.

برای نمونه، این تابع یک Promise انجام شده با مقدار `1` را برمی گرداند؛ بیایید امتحان کنیم:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

... ما می‌توانیم به طور مستقیم یک Promise را برگردانیم، که همان خواهد بود:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

بنابراین، `async` تضمین می کند که تابع یک Promise برمی گرداند و قسمت های غیر Promise آن را در بر می گیرد. ساده است، نه؟ اما فقط این نیست. کلیدواژه دیگری به اسم `await` وجود دارد که فقط داخل توابع `async` کار می کند.

## Await

به شکل زیر استفاده می شود:

```js
// تنها در توابع async کار می کند
let value = await promise;
```

کلیدواژه `await` باعث می شود که جاوااسکریپت تا اجرا شدن آن Promise صبر کند و مقدار آن را برگرداند.

در اینجا مثالی از یک Promise داریم که در مدت ۱ ثانیه با موفقیت اجرا می شود:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // صبر می کند تا پرامیس با موفقیت اجرا شود (*)
*/!*

  alert(result); // "done!"
}

f();
```

اجرای تابع در خط `(*)` متوقف می شود و زمانی که Promise اجرا شد ادامه می یابد، به صورتی که ‍`result` نتیجه آن می شود. بنابراین قطعه کد بالا مقدار "!done" را طی یک ثانیه نمایش می دهد.

تاکید می کنیم: `await` در واقع اجرای تابع را تا زمان به اتمام رسیدن اجرای Promise به تعلیق در می آورد و در ادامه با نتیجه آن اجرای تابع ادامه می یابد. این اتفاق هزینه ای برای منابع پردازشی ندارد؛ زیرا موتور جاوااسکریپت می تواند به طور همزمان کارهای دیگری مانند اجرای اسکریپت های دیگر، مدیریت سایر اتفاقات و غیره را انجام دهد.

این روش روش زیباتری برای گرفتن نتیجه Promise نسبت به `promise.then` است و خواندن و نوشتن آن نیز راحت تر است.

````warn header="نمی توان از `await` در تابع عادی استفاده کرد"
اگر تلاش کنیم تا از `await` در یک تابع غیر async استفاده کنیم، خطای syntax ای وجود خواهد داشت:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

اگر فراموش کنیم که `async` را قبل از تابع قرار دهیم این خطا را می گیریم. همانطور که قبلا هم گفته شد، `await` فقط در تابع `async` کار می کند.
````

بیایید مثال `showAvatar()` از بخش <info:promise-chaining> را با استفاده از `async/await` مجدد بنویسیم:

۱. ما نیاز داریم که فراخوانی های `then.` را با `await` جایگزین کنیم.
۲. همچنین باید تابع را `async` کنیم تا آنها کار کنند.

```js run
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

بسیار تمیز و آسان برای خواندن، درسته؟ خیلی بهتر از قبل شد.

````smart header="مرورگر های پیشرفته امکان اجرا شدن `await` در سطوح بالا یک ماژول را می دهند."
در مرورگر های پیشرفته، `await` زمانی که داخل یک ماژول هستیم، به خوبی در سطوح بالا کار می کند. ما ماژول ها را در مقاله <info:modules-intro> پوشش خواهیم داد..

برای مثال:

```js run module
// ما فرض می کنیم که این کد در سطح بالا در داخل یک ماژول اجرا می شود
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

اگر ما از ماژول یا [مرورگر های قدیمی](https://caniuse.com/mdn-javascript_operators_await_top_level) که این ویژگی را پشتیبانی کنند استفاده نکنیم، یک راهکار کلی وجود دارد: دربرگرفتن در یک تابع بدون نام async.

مانند زیر:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await`، \"thenables\" می پذیرد"
مانند `promise.then`، `await` به ما این امکان را می دهد تا از thenable objects استفاده کنیم (آنهایی با متد قابل فراخوانی `then`). ایده این است که object ثالث ممکن است promise نباشد اما قابل انطباق با promise باشد: اگر از `then.` پشتیبانی کند، این مورد برای با `await` استفاده شدن کافیست.

اینجا پیش نمایشی از یک کلاس `Thenable` می بینیم که `await` نمونه ای از آن را پذیرفته است:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // بعد از ۱۰۰۰ میلی ثانیه با مقدار this.num * 2 حل می شود
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // برای ۱ ثانیه صبر می کند و سپس result مقدار ۲ را می گیرد
  let result = await new Thenable(1);
  alert(result);
}

f();
```

اگر `await` شیء غیر Promise ای که دارای `then.` است را دریافت کند، آن متد را به طوری فراخوانی می کند که توابع `resolve` و `reject` به عنوان پارامتر به آن متد هنگام فراخوانی داده شده است (همانطور که برای یک اجرا شونده `Promise` معمولی این کار را انجام می دهد). سپس `await` صبر می کند تا یکی از آن دو فراخوانی شود (در مثال بالا، این اتفاق در خط `(*)` رخ می دهد) و با مقدار result به کار خود ادامه می دهد.
````

````smart header="متد async در کلاس"
برای تعریف یک متد async در کلاس، کافیست آن را `async` قید کنید:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (این حالت همانند حالت رو به رو است (result => alert(result)))
```
منظور یکی است: این روش تضمین می کند که مقدار بازگشتی یک Promise است و استفاده از `await` را امکان پذیر می کند.

````
## مدیریت خطا

اگر یک Promise به صورت عادی اجرا شود، پس از آن `await promise` نتیجه را برمی گرداند. اما در صورت رد شدن، باعث بروز خطا می شود همانند حالتی که در آن خط عبارت `throw` وجود داشته است.

این کد:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

... همانند کد زیر است:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

در شرایط واقعی، ممکن است Promise مدتی طول بکشد تا به خطا بخورد. در این حالت قبل از اینکه `await` به بروز خطا منجر شود، تاخیری وجود دارد.

ما می توانیم آن خطا را، مانند یک `throw` عادی، با استفاده از `try..catch` بگیریم:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

در شرایط بروز خطا، قسمت کنترل وارد بلوک `catch` می شود. ما همچنین می توانیم چندین خط را در بر بگیریم:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // خطاها هم از fetch و هم از response.json() گرفته می شود
    alert(err);
  }
}

f();
```

اگر `try..catch` نداشتیم، در این صورت با فراخوانی تابع `()f` یک Promise ساخته می شود که رد شده است. ما می توانیم برای مدیریت این حالت `catch.` را به آن اضافه کنیم:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() به یک Promise رد شده تبدیل می شود
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

اگر فراموش کنیم که `catch.` را اضافه کنیم، در نتیجه به خطای unhandled promise error می خوریم (در کنسول قابل مشاهده است). همانطور که در بخش <info:promise-error-handling> توضیح داده شد، ما میتوانیم با استفاده از یک مدیریت اتفاق `unhandledrejection` کلی چنین خطاهایی را مدیریت کنیم.


```smart header="`async/await` و `promise.then/catch`"
زمانی که ما از `async/await` استفاده می کنیم، کمتر پیش میاید که به `then.` نیاز شود؛ زیرا `await` خود فرآیند متوقف شدن را مدیریت می کند. همچنین می توانیم به جای `catch.` از `try..catch` عادی استفاده کنیم. این کار معمولا (و نه همیشه) بسیار راحت تر است.

اما در کد سطح بالا، زمانی که ما بیرون از هر تابع `async` ای هستیم، ما به دلایلی  سینتکسی نمی توانیم از `await` استفاده کنیم؛ بنابراین این یک کار عادی است که برای مدیریت نتیجه نهایی یا برخوردن با خطاهای احتمالی `then/catch.` را اضافه کنیم، مانند خط `(*)` در مثال بالا.
```

````smart header="`async/await` به خوبی با `Promise.all` کار می کند"
زمانی که نیاز داریم تا زمان اجرای چند Promise صبر کنیم، می توانیم همه آنها را در یک `Promise.all` قرار دهیم و سپس از `await` استفاده کنیم:

```js
// برای آرایه از نتیجه ها صبر می کنیم
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

در شرایط بروز خطا به صورت معمول خطا از Promise ناموفق به `Promise.all` منتقل می شود و سپس به یک exception تبدیل شده که می توان با قرار دادن `try..catch` آن را مدیریت کرد.

````

## خلاصه

کلیدواژه `async` قبل از یک تابع دو تاثیر می گذارد:

۱. کاری می کند که همیشه یک Promise برگرداند.
۲. اجازه می دهد که در داخل آن از `await` استفاده کنیم.

کلیدواژه `await` قبل از Promise باعث می شود تا اجرا شدن آن صبر کند و سپس:

۱. اگر خطایی رخ دهد، یک exception به وجود می آید - مانند حالتی که `throw error` در آن محل فراخوانی شود.
۲. در غیر این صورت، نتیجه را برمی گرداند.

این دو در کنار هم چهارچوبی عالی برای نوشتن کد های همزمان (asynchronous) فراهم می کنند که هم برای نوشتن و هم برای خواندن راحت است.

با `async/await` به ندرت نیاز به نوشتن `promise.then/catch` داریم اما نباید فراموش کنیم که آنها بر پایه Promise ها هستند چون برخی اوقات (مانند بیرونی ترین منطقه) ما باید از این متد ها استفاده کنیم. همچنین زمانی که می خواهیم چند کار را به طور همزمان انجام دهیم `Promise.all` گزینه مناسبی است.
