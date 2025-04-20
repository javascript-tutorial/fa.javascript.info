
# Fetch

جاوااسکریپت می‌تواند در هنگام نیاز، درخواست‌های شبکه را به سرور ارسال کرده و اطلاعات جدید را دریافت کند.

برای مثال ما می‌توانیم برای موارد زیر از درخواست شبکه استفاده کنیم:

- افزودن به سبد خرید
- دریافت اطلاعات کاربران
- دریافت بروز ترین اطلاعات از سمت سرور
- و غیره

و تمامی این موارد بدون بروزرسانی (Refresh) مجدد صفحه انجام میشود.

کلمه "AJAX" کوتاه شده (<b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) میباشد و مربوط به درخواست های شبکه در جاوااسکرپیت است.به هر حال، ما نیازی به XML نداریم و این عبارت از تاریخچه AJAX باقی مانده است. شاید اسم آن را شنیده باشید.

چندین روش برای ارسال به شبکه و دریافت اطلاعات از سرور وجود دارد.

متد `fetch()` مدلی جدید و همه کاره است، بنابراین با این روش شروع میکنیم. متاسفانه این روش توسط مرورگرهای قدیمی پشتیبانی نمیشود (می‌تواند pollyfill شود) اما در بین مرورگر های جدیدتر پشتیبانی بسیار خوبی دارد.

دستور اصلی آن به این شکل است:

```js
let promise = fetch(url, [options])
```

- **`url`** -- لینک برای دسترسی سرور
- **`options`** -- پارامتر های اختیاری:هدرها،متدها و غیره

بدون استفاده از پارامتر `options` این یک درخواست ساده GET است که محتوای آدرس `url` را دانلود میکند.

مرورگر بلافاصله بعد از درخواست شروع به کار میکند و یک پاسخ (Promise) برمیگرداند، جواب برگشتی برای دریافت نتیجه استفاده میشود.

دریافت پاسخ معمولا یک فرایند دو مرحله‌ای است.

**در ابتدا `promise` از طریق `fetch` برگردانده میشود، خروجی یک نمونه از کلاس داخلی [Response](https://fetch.spec.whatwg.org/#response-class) است که شامل اطلاعاتی مثل Header و غیره است.**

در این مرحله میتوانیم وضعیت HTTP که از طریق Promise آماده شده را بررسی کنیم تا ببینیم آیا موفقیت آمیز بوده یا خیر؛ تا به اینجا بدنه (body) دریافت نکردیم.

اگر `fetch` قادر به ارسال درخواست HTTP نباشد Promise را رد میکند، مثلا اگر مشکلات شبکه وجود داشته باشد یا سایت مورد نظر در دسترس نباشد. پاسخ‌های غیر معمول HTTP مانند خطاهای 500 یا 404 اروری ایجاد نمی‌کنند.

ما میتوانیم وضیعیت HTTP را در ویژگی‌های پاسخ (response properties) دریافتی مشاهده کنیم:

- **`status`** -- کد وضعیت HTTP ، به عنوان مثال 200.
- **`ok`** -- مقدار بولی برمیگرداند،اگر وضعیت HTTP از کد 200 تا 299 باشد `true` برمیگرداند.

برای مثال:

```js
let response = await fetch(url);

if (response.ok) { // از 200 تا 299 بود HTTP اگر وضعیت
  // دریافت پاسخ بدنه (در زیر توضیح داده شده)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**در مرحله دوم برای دریافت بدنه پاسخ (response body)، باید متدی دیگر را فراخوانی کنیم.**

کلاس `Response` چندین متد مختلف بر پایه promise دارد که می‌توانیم بدنه پاسخ را به صورت فرمت‌های مختلف دریافت کنیم:

- **`response.text()`** -- خواندن پاسخ و برگرداندن آن به صورت متن
- **`response.json()`** -- تبدیل پاسخ به JSON
- **`response.formData()`** -- برگرداندن پاسخ به صورت شی `FormData` (در [فصل بعد](info:formdata) توضیح داده خواهد شد)
- **`response.blob()`** -- برگرداندن پاسخ به صورت [Blob](info:blob) (داده های باینری و دودویی)
- **`response.arrayBuffer()`** -- برگرداندن پاسخ به صورت [ArrayBuffer](info:arraybuffer-binary-arrays) (داده های باینری سطح پایین)
- علاوه بر اینها `response.body` یک شی [ReadableStream](https://streams.spec.whatwg.org/#rs-class) است که به شما امکان میدهد بدنه را به صورت پیوسته یا جداجدا بخوانید.مثالی از این مورد را بعدا خواهید دید.

به عنوان مثال بیاید یک شی JSON با آخرین کامیت ها را از گیت هاب دریافت کنیم:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // JSON خواندن فایل و تبدیل آن به 
*/!*

alert(commits[0].author.login);
```

یا بدون استفاده از `await` و با استفاده از جاوااسکپریت خام:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

برای دریافت متن پاسخ به جای `await response.text()` از `.json()` استفاده کنید:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // خواندن پاسخ به صورت متنی

alert(text.slice(0, 80) + '...');
```

به عنوان یک نمونه برای خواندن به صورت فرمت دودویی، بیایید لوگوی سایت [fetch specification](https://fetch.spec.whatwg.org) را دریافت کنیم (به فصل [Blob](info:blob) برای دریافت جزئیات درباره عملیات روی `Blob` مراجعه کنید):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // blob دانلود به عنوان شی
*/!*

// برای استفاده از آن <img> ساخت تگ
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// نمایش عکس
img.src = URL.createObjectURL(blob);

setTimeout(() => { // مخفی کردن عکس بعد از سه ثانیه
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
ما فقط می‌توانیم به یک روش بدنه را بخوانیم.

اگر قبلا پاسخ را به صورت `response.text()`دریافت کردید دیگر نمی‌توانید پاسخ را به صورت `response.json()` دریافت کنید، زیرا محتوای بدنه از قبل پردازش شده است.

```js
let text = await response.text(); // پاسخ پردازش میشود
let parsed = await response.json(); // با شکست مواجه میشود (پاسخ از قبل پردازش شده است)
```
````

## Response headers

ریسپانس هدرها در یک شی مانند Map به نام headers در `response.headers` در دسترس هستند.

دقیقا Map نیست اما دارای متدهای مشابهی است که امکان دریافت headers را براساس نام یا حلقه زدن روی آنها فراهم میکند.

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// گرفتن یک هدر
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// تکرار بر روی همه هدرها
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## Request headers

برای تنظیم یک ریکوئست هدر در `fetch` می‌توان از گزینه `headers` استفاده کرد. این گزینه شامل یک شی خروجی به صورت زیر است:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

اما لیستی از [هدرهای ممنوعه HTTP](https://fetch.spec.whatwg.org/#forbidden-header-name) وجود دارد که ما نمیتوانیم از آنها استفاده کنیم:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

این هدرها اطمینان میدهند که HTTP به درستی و ایمن اجرا میشود، بنابراین کنترل این هدرها به صورت انحصاری توسط مرورگر انجام میشود.

## POST requests

برای فرستادن رکوئست از طریق `POST` یا هر درخواست دیگری باید از گزینه‌های `fetch` استفاده کنید:

- **`method`** -- HTTP-method مانند : `POST`,
- **`body`** -- بدنه درخواست، یکی از موارد زیر است:
  - یک رشته (مثلا JSON رمزنگاری شده)
  - شی `FormData` برای ارسال داده ها به صورت `multipart/form-data`
  - `Blob`/`BufferSource` برای ارسال داده های باینری
  - [URLSearchParams](info:url) برای ارسال داده با رمزنگاری `x-www-form-urlencoded` ، به ندرت استفاده میشود.

بیشترین استفاده معمولا از طریق JSON انجام میشود.

به عنوان مثال،این کد یک شی `user` را به صورت JSON ارسال میکند:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

توجه داشته باشید اگر ریکوئست `body` به صورت رشته باشد، هدر `Content-Type` به صورت پیشفرض برابر با `text/plain;charset=UTF-8` است.

اما چون قصد ارسال JSON را داریم، از گزینه `headers` برای ارسال `application/json` استفاده میکنیم تا `Content-Type` مناسبی برای JSON باشد.

## ارسال عکس

ما همچنین می‌توانیم از طریق `fetch` شی با داده‌های دودویی `Blob` یا `BufferSource` را ارسال کنیم.

در این مثال یک عنصر `<canvas>` وجود دارد که با حرکت موس روی آن می‌توانیم خط رسم کنیم.با کلیک روی دکمه ارسال ، تصویر به سرور ارسال میشود:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="ارسال" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // سرور با نمایش حجم عکس پاسخ میدهد
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

لطفا توجه داشته باشید که در اینجا ما هدر `Content-Type` را به صورت دستی تنظیم نمیکنیم،زیرا یک شی `Blob` از قبل ست شده است (در اینجا این هدر `image/png` است همانطور که توسط تابع `toBlob` تولید میشود). برای شی `Blob` این مقدار برای `Content-Type` تنظیم میشود.

تابع `submit()` می‌تواند بدون استفاده از `async/await` به صورت زیر نوشته شود:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## خلاصه

یک درخواست fetch معمولا شامل دوفراخوانی `await` است:

```js
let response = await fetch(url, options); // پردازش اولیه ریسپانس هدر
let result = await response.json(); // JSON خواندن بدنه به صورت
```

یا بدون `await`:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* نتیجه فرایند */)
```

ویژگی های ریسپانس (Response properties):
- `response.status` -- کد پاسخ HTTP
- `response.ok` -- `true` اگر کد وضعیت از 200 تا 299 باشد.
- `response.headers` -- شی‌ای مانند Map با هدرهای HTTP.

متدهای دریافت پاسخ بدنه (response body):
- **`response.text()`** -- برگردان پاسخ به صورت متن
- **`response.json()`** -- تبدیل پاسخ به JSON
- **`response.formData()`** -- برگرداندن پاسخ به صورت شی `FormData` (در [فصل بعد](info:formdata) توضیح داده خواهد شد)
- **`response.blob()`** -- برگرداندن پاسخ به صورت [Blob](info:blob) (داده های باینری و دودویی)
- **`response.arrayBuffer()`** -- برگرداندن پاسخ به صورت [ArrayBuffer](info:arraybuffer-binary-arrays) (داده های باینری سطح پایین)

گزینه‌های fetch تا الان:
- `method` -- HTTP-method
- `headers` -- یک شی با درخواست‌های هدر (هر هدری مجاز نیست)
- `body` -- داده‌هایی که میخواهیم ارسال کنیم (request body) می‌تواند به صورت `string`, `FormData`, `BufferSource`, `Blob` یا `UrlSearchParams` باشد.

در فصل‌های بعدی،گزینه‌ها و موارد بیشتری از`fetch` را خواهیم دید.
