# ارتباط بین پنجره‌ای

سیاست "Same Origin" (در همان سایت) دسترسی پنجره‌ها و فریم‌ها به یکدیگر را محدود می‌کند.

ایده این است که اگر یک یک کاربر دو صفحه‌ی باز داشته باشد: یکی از `john-smith.com` و دیگری از `gmail.com`، آنگاه آن‌ها نمی‌خواهند که که یک script از `john-smith.com` تمام نامه‌‌های شما از `gmail.com` را بخواند. بنابراین، هدف سیاست "Same Origin" این است که کاربران را از دزدی اطلاعات حفظ کند.

## Same Origin [#same-origin]

اگر URLها یک protocol، domain و ports داشته باشند، می‌گویند که "same origin" دارند. 

این لینک‌ها همگی یک منبع را به اشتراک می‌گذارند.

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

این یکی‌ها نه:

- <code>http://<b>www.</b>site.com</code> (another domain: `www.` matters)
- <code>http://<b>site.org</b></code> (another domain: `.org` matters)
- <code><b>https://</b>site.com</code> (another protocol: `https`)
- <code>http://site.com:<b>8080</b></code> (another port: `8080`)

سیاست "Same Origin" بیان می‌کند که:

- اگر ما ارجاعی به پنجره‌ای دیگر داشته باشیم، برای مثال یک popup که با `window.open` ایجاد شده یا یک پنجره داخل `<iframe>`، و آن پنجره از منبع یکسان بیاید،‌آنگاه ما به آن پنجره دسترسی کامل داریم.
- ذر غیر این صورت اگر از یک منبع دیگر بیاید،‌ آنگاه نمی‌توانیم به محتوای آن صفحه دسترسی داشته باشیم: متغیرها، document، هر چیزی. تنها استثنا `location` است: ما می‌توانیم آن را تغییر دهیم. (در نتیجه کاربر را هدایت کنیم). اما نمی‌توانیم از location *بخوانیم* (در نتیجه نمی‌توانیم ببینیم که کاربر در حال حاضر کجا است،‌ هیچ نشت اطلاعاتی وجود ندارد).

### در عمل: iframe

یک تگ `<iframe>` میزبان یک پنجره‌ی جاسازی‌شده‌ی جداگانه با `document` جداگانه‌ی خود و اشیای `window` است.

می‌توان با استفاده از property‌ها به آن‌ها دسترسی داشت:

- برای گرفتن پنجره‌ی داخل `<iframe>` از `iframe.contentWindow` استفاده می‌شود.
- برای گرفتن documdnt داخل `<iframe>` از `iframe.contentDocument` استفاده می‌شود، کوتاه‌شده‌ی `iframe.contentWindow.document`.

وقتی به چیزی داخل پنجره‌ی جاسازی شده دسترسی پیدا می‌کنیم، مرورگر چک می‌کند که آیا iframe همان منبع را دارد یا نه. اگر اینطور نباشد،‌ دسترسی رد می‌شود (نوشتن بر `location` یک استثنا است،‌ آن همچنان مجاز است).

For instance, let's try reading and writing to `<iframe>` from another origin:
برای مثال، بیایید تلاش کنیم خواندن و نوشتن بر `<iframe>` از یک منبع دیگر را امتحان کنیم. 
```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // می‌توانیم ارجاع‌ها به پنجره‌ی درونی را بگیریم
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ... داخل آن نه document اما
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // خطای امنیتی (یک منبع دیگر)
    }

    // را بخوانیم iframe یک صفحه درون URL همچنین ما نمی‌توانیم
    try {
      // بخوانیم Location object را از URL نمی‌توانیم
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // خطای امنیتی
    }

    // ... !(بارگذاری کنیم iframe و در نتیجه چیز دیگری را) بنویسیم location ما می‌توانیم بر
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // آن را اجرا کند location را پاک می‌کند، نه اینکه بعد از تغییر handler این
  };
</script>
```

کد بالا خطاهای هر عملیاتی را نشان می‌هد به جز:

- گرفتن ارجاع به پنجره‌ی درونی `iframe.contentWindow` - آن مجاز است.
- نوشتن بر `location`

بر خلاف آن، اگر `<iframe>` منبع یکسانی داشته باشد،‌ ما می‌توانیم با آن هر کاری بکنیم:

```html run
<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // هر کاری می‌کند
    iframe.contentDocument.body.prepend("سلام، دنیا");
  };
</script>
```

```smart header="`iframe.onload` در مقابل `iframe.contentWindow.onload`"
اساسا `iframe.onload` event (در تگ `<iframe>`) همان `iframe.contentWindow.onload` (در شی پنجره‌ی جداسازی‌شده)‌ است. وقتی که پنجره‌ی جاسازی شده به طور کامل با تمام منابع load می‌شود، فعال می‌شود.

...اما نمی‌توانیم به `iframe.contentWindow.onload` برای یک iframe از مبدا دیگری دسترسی پیدا کنیم،‌بنابراین از `iframe.onload` استفاده می‌کنیم.
```

## پنجره‌ها در زیردامنه‌ها: document.domain

طبق تعریف، دو URL با دامنه‌های مختلف، منشأ متفاوتی دارند.

اما اگر پنجره‌ها دامنه‌ی سطح دوم یکسانی داشته باشند، برای مثال `john.site.com`، `peter.site.com` و `site.com` (به طوری که دامنه‌ی سطح دوم مشترک آن‌ها `site.com` باشد) ما می‌توانیم مرورگر را مجبور کنیم این تفاوت را نادیده بگیرد، به طوری که می‌توان آن‌ها را به عنوان "same origin" برای اهداف ارتباط بین پنجره‌ای در نظر گرفت.

برای اینکه کار کند، هر پنجره باید کد زیر را اجرا کند:

```js
document.domain = 'site.com';
```

همه‌اش همین است. حالا آن‌ها می‌توانند بدون محدودیت با هم تعامل داشته باشند. باز هم، این فقط برای صفحاتی با همان دامنه‌ی سطح دوم امکان پذیر است.

```warn header="منسوخ شده، اما همچنان کار می‌کند"
امروزه `document.domain` property در حال حذف از [مشخصات](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction) است. پیام دادن بین پنجره‌ای (به زودی در زیر توضیح داده می‌شود) جایگزین پیشنهادی است.

گقته می‌شود تا کنون تمام مرورگرها از آن پشتیبانی می‌کنند. و پشتیبانی برای آینده حفظ خواهد شد، نه برای شکستن کدهای قدیمی که به `document.domain` متکی هستند.
```


## Iframe: تله‌ی اشتباه document

وقتی یک iframe از همان منبع می‌آید، و ما ممکن است به `document` آن دسترسی پیدا کنیم، یک تله وجود دارد. این به چیزهای متقاطع مربوط نیست، اما مهم است که بدانید.

به محض ایجاد یک iframe بلافاصله یک document دارد. اما آن document با documentای که در آن بارگذاری می‌شود متفاوت است!

بنابراین اگر فورا با document کاری انجام دهیم، احتمالا از بین خواهد رفت.

اینجا، نگاه کنید:


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // !بارگذاری شده مشابه اولیه نیست document
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

ما نباید با document یک iframe که هنوز بارگذاری نشده است کار کنیم، زیرا آن *docment اشتباه* است. اگر روی آن هر event handlerای تنظیم کنیم، نادیده گرفته خواهند شد. 

چگونه می‌توان لحظه‌ای که document وجود دارد را تشخیص داد؟

وقتی `iframe.onload` راه‌اندازی می‌شود، قطعا document مناسب در محل قرار می‌گیرد. اما فقط زمانی فعال می‌شود که کل iframe با تمام منابعش بارگذاری شود.

می‌توانیم با استفاده از چک‌های `setInterval` آن لحظه را زودتر بگیریم:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // جدید باشد document هر 100 میلی‌ثانیه چک می‌کند که
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("!جدید اینجا است document");

    clearInterval(timer); // را کنسل می‌کند، دیگر به آن نیازی نیست setInterval
  }, 100);
</script>
```

## مجموعه: window.frames

یک راه جایگزین برای دریافت یک شی پنجره برای `<iframe>` -- این است که از مجموعه‌ی نام‌گذاری‌شده‌ی `window.frames` آن را بگیریم:

- با عدد: `window.frames[0]` -- شی پنجره برای اولین فریم در document.
- با نام: `window.frames.iframeName` -- شی پنجره برای فریم با نام `name="iframeName"`.
  
برای مثال:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

یک فریم ممکن است فریم‌های دیگری هم درون خود داشته باشد. اشیای `پنجره‌ی` مربوطه یک سلسله مراتب را تشکیل می‌دهند.

لینک‌های هدایت‌کننده این‌ها هستند:

- `window.frames` -- مجموعه‌ی پنجره‌های "فرزند" (برای فریم‌های تو در تو).
- `window.parent` -- ارجاع به پنجره‌ی "والد" (بیرونی).
- `window.top` -- ارجاع به بالاترین پنجره‌ی والد.

برای مثال:

```js run
window.frames[0].parent === window; // true
```

می‌توانیم از `top` property استفاده کنیم که چک کنیم که document جاری درون یک فریم باز است یا نه:

```js run
if (window == top) { // جاری window == window.top?
  alert('در بالاترین پنجره است، نه در یک فریم script');
} else {
  alert('!در یک فریم اجرا می‌شود script');
}
```

## "sandbox" iframe attribute

برای جلوگیری از اجرای کد غیرقابل اعتماد، `sandbox` attribute امکان حذف برخی از اقدامات داخل `<iframe>` را فراهم می‌کند. با تلقی iframe به‌عنوان منبع دیگری و/یا اعمال محدودیت‌های دیگر، iframe را "sandboxes" می‌کند.

یک "مجموعه‌ی پیش‌فرض" از محدودیت‌ها بر `<iframe sandbox src="...">` اعمال شده است. ما اگر فهرستی از محدودیت‌ها که نباید به‌عنوان مقدار attribute اعمال شوند، ارائه کنیم، راحت می‌شود. مثل این: `<iframe sandbox="allow-forms allow-popups">`.

به عبارتی دیگر، یک `"sandbox"` attribute خالی سخت‌ترین محدودیت‌ها را ممکن می‌کند. اما می‌توانیم فهرستی از محدودیت‌هایی که می‌خواهیم حذف کنیم، با فاصله قرار دهیم.

اینجا لیستی از محدودیت‌ها هست:

`allow-same-origin`
: به صورت پیش‌فرض، `"sandbox"` سیاست "different origin" را بر iframe جبر می‌کند. به عبارت دیگر، مرورگر را مجبور می‌کند که `iframe` را به عنوان آمده از یک منبع دیگر در نظر بگیرد، حتی اگر `src` آن به سایت یکسان اشاره کند. با تمام محدودیت‌های ضمنی برای اسکریپت‌ها. این گزینه آن ویژگی را حذف می‌کند.

`allow-top-navigation`
: اجازه می‌دهد که `iframe` در `parent.location` تغییر ایجاد کند.

`allow-forms`
: اجازه می‌دهد که از `iframe` فرم‌ها submit شوند. 

`allow-scripts`
: اجازه می‌دهد که scriptها از `iframe` اجرا شوند. 

`allow-popups`
: به popupها از `iframe` با  `window.open` اجازه می‌دهد.

برای اطلاعات بیشتر به [راهنما] (mdn:/HTML/Element/iframe) مراجعه کنید.

مثال زیر یک iframe sandbox را با مجموعه پیش‌فرض محدودیت‌ها نشان می‌دهد: `<iframe sandbox src="...">`. مقداری JavaScript و یک فرم دارد.

لطفا توجه داشته باشید که هیچ چیز کار نمی‌کند. بنابراین مجموعه‌ی پیش‌فرض واقعاً سخت است:

[codetabs src="sandbox" height=140]


```smart
.از منبع دیگری باشد، نمی‌تواند محدودیت‌های همان منبع را کاهش دهد iframe فقط *اضافه کردن* محدودیت‌های بیشتر است. نمی‌تواند آن‌ها را حذف کند. به ویژه اگر `"sandbox"` attribute هدف از
```

## پیام‌رسانی بین‌ پنجره‌ای

رابط `postMessage` به پنجره‌ها اجازه ‌می‌دهد بدون توجه به اینکه از کدام منبع هستند با یکدیگر صحبت کنند.

بنابراین، این یک راه دور از سیاست "Same Origin" است. این به یک پنجره از `john-smith.com` اجازه می‌دهد که با `gmail.com` صحبت کند و اطلاعات رد و بدل کند،‌ اما فقط در صورتی که هر دو توافق کنند و توابع Javascript مربوطه را فراخوانی کنند. این برای کاربران امن است.

این رابط دو بخش دارد.

### postMessage

پنجره‌ای که می‌خواهد یک پیام بفرستد [postMessage](mdn:api/Window.postMessage) method از پنجره‌ی دریافت‌کننده را فراخوانی می‌کند. به عبارت دیگر، اگر می‌خواهیم به `win` یک پیام بفرستیم،‌ باید `win.postMessage(data, targetOrigin)` را فراخوانی کنیم.

آرگومان‌ها:

`data`
: داده‌ای که قرستاده می‌شود. می‌تواند هر objectای باشد، داده با استفاده از "الگوریتم سریال‌سازی ساختار یافته" clone می‌شود. اینترنت اکسپلورر فقط از رشته‌‌ها پشتیبانی می‌کند، بنابراین باید اشیای پیچیده را `JSON.stringify` کنیم تا از آن مرورگر پشتیبانی کنند.

`targetOrigin`
: مبدا پنجره‌ی مورد نظر را مشخص می‌کند، به طوری که فقط یک پنجره از مبدا داده شده پیام را دریافت می‌کند.

این `targetOrigin` یک اقدام امنیتی است. به یاد داشته باشید، اگر پنجره‌ی هدف از منشا دیگری باشد، نمی‌توانیم `location` آن را در پنجره‌ی فرستنده بخوانیم. پس ما نمی‌توانیم مطمئن باشیم در حال حاضر کدام سایت در پنجره‌ی مورد نظر باز است: کاربر می‌تواند از آن دور شود و پنجره‌ی فرستنده هیچ ایده‌ای در این باره نداشته باشد. 

مشخص کردن `targetOrigin` تضمین می‌کند که پنجره فقط در صورتی که در سایت درست باشد داده‌ها را دریافت می‌کند. زمانی که داده‌ها حساس هستند اهمیت دارد.

برای مثال، اینجا `win` تنها در صورتی پیام را می‌گیرد که document ای از منبع `http://example.com` داشته باشد:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

اگر آن چک را نخواهیم، می‌توانیم `targetOrigin` را به `*` تنظیم کنیم.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

برای دریافت یک پیام، پنجره‌ی هدف باید روی `message` event یک handler داشته باشد. وقتی فعال می‌شود که `postMessage` فراخوانی می‌شود (‌و `targetOrigin` check موفقیت‌آمیز است).

شی event، دارای propertyهای مخصوص است.

`data`
: داده از `postMessage`.

`origin`
: منبع فرستنده، برای مثال `http://javascript.info`.

`source`
: ارجاع به پنچره‌ی فرستنده. اگر بخواهیم می‌توانیم بلافاصله `source.postMessage(...)` را برگردانیم.

برای اختصاص دادن آن handler،‌ باید از `addEventListener` استفاده ککنیم، syntax کوتاه‌شده‌ی `window.onmessage` کار نمی‌کند.

اینجا یک مثال هست:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // چیزی از یک دامنه‌ی ناشناخته،‌ بیایید آن را نادیده بگیریم
    return;
  }

  alert( "دریافت شده: " + event.data );

  // پیام ارسال کند event.source.postMessage(...) می‌تواند با استفاده از
});
```

مثال کامل:

[codetabs src="postmessage" height=120]

## خلاصه

برای فراخوانی methodها و دسترسی به محتوای یک پنجره‌ی دیگر،‌ باید ابتدا یک ارجاع به آن داشته باشیم.

برای popupها این ارجاعات را داریم:
- از پنجره‌ی بازکننده: `window.open` -- یک پنجره‌ی جدید باز می‌کند و یک ارجاع به آن را برمی‌گرداند،
- از popip (نجره‌ی بازشونده): `window.opener` -- ارجاعی به پتجره‌ی بازکننده از یک popup است.

برای iframeها،‌ می‌توانیم به پنجره‌های والد/فرزند دسترسی داشته باشیم با استفاده از:
- `window.frames` -- مجموعه‌ای از شی‌های پنجره‌ی تو در تو,
- `window.parent` و `window.top` ارجاعات به پنجره‌ی والد و بالاترین پنجره‌ها هستند,
- `iframe.contentWindow` پنجره‌ی داخل یک تگ `<iframe>` است.

اگر پنجره‌ها منبع یکسانی داشته باشند (host, port, protocol)، آنگاه پنجره‌ها می‌توانند هر کاری می‌خواهند با یکدیگر بکنند.

در غیر این صورت تنها اقدامات ممکن عبارت‌اند از:
- تغییر `location` یک پنجره‌ی دیگر (دسترسی write-only)
- ارسال کردن یک پیام به آن.

استثناها این‌ها هستند:
- پنجره‌هایی که دامنه‌ی سطح دوم یکسانی دارند: `a.site.com` و `b.site.com`. آنگاه تنظیم کردن `document.domain='site.com'` در هر دوی آن‌ها، آن‌ها را در وضعیت "same origin" قرار می‌دهد.
- اگر یک iframe دارای `sandbox` attribute باشد، به اجبار در وضعیت "different origin" قرار می‌گیرد،‌ مگر اینکه `allow-same-origin` در مقدار attribute مشخص شده باشد. می‌توان از آن برای اجرای کدهای نامعتبر در iframes از همان سایت استفاده کرد.

رابط `postMessage` اجازه می‌دهد که دو پنجره با هر منبعی با هم صحبت کنند:

1. فرستنده `targetWin.postMessage(data, targetOrigin)` را فراخوانی می‌کند.
2. اگر `targetOrigin` برابر `'*'` نباشد، آنگاه مرورگر چک می‌کند که پنجره‌ی `targetWin` منبع `targetOrigin` را داشته باشد.
3. اگر چنین باشد،‌ آنگاه `targetWin` آن `message` event را با propertyهای مخصوص فعال می‌کند:
    - `origin` -- .منبع پنجره‌ی فرستنده (مثل `http://my.site.com`)
    - `source` -- .ارجاع به پنجره‌ی فرستنده
    - `data` -- .داده، هر شی‌ای در هر جایی به جز اینکه اینترنت اکسپلورر تنها از رشته‌ها پشتیبانی می‌کند. 

   ما باید از `addEventListener`استفاده کنیم تا handler را برای این event درون پنجره‌ی هدف تنظیم کنیم.
