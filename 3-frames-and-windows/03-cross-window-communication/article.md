# ارتباط بین پنجره‌ای

سیاست "Same Origin" (همان سایت) دسترسی پنجره‌ها و فریم‌ها به یکدیگر را محدود می‌کند.

ایده این است که اگر یک یک کاربر دو صفحه‌ی باز داشته باشد: یکی از `john-smith.com` و دیگری از `gmail.com`، آنگاه آن‌ها نمی‌خواهند که که یک script از `john-smith.com` تمام نامه‌‌های شما از `gmail.com` را بخواند. بنابراین، هدف سیاست "Same Origin" این است که کاربران را از دزدی اطلاعات حفظ کند.

## Same Origin [#same-origin]

اگر URLها یک protocol، domain و ports داشته باشند، می‌گویند که "same origin" دارند. 

این URLها همگی یک منبع را به اشتراک می‌گذارند.

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

## Cross-window messaging

The `postMessage` interface allows windows to talk to each other no matter which origin they are from.

So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding Javascript functions. That makes it safe for users.

The interface has two parts.

### postMessage

The window that wants to send a message calls [postMessage](mdn:api/Window.postMessage) method of the receiving window. In other words, if we want to send the message to `win`, we should call  `win.postMessage(data, targetOrigin)`.

Arguments:

`data`
: The data to send. Can be any object, the data is cloned using the "structured serialization algorithm". IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.

`targetOrigin`
: Specifies the origin for the target window, so that only a window from the given origin will get the message.

The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read its `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at the right site. Important when the data is sensitive.

For instance, here `win` will only receive the message if it has a document from the origin `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

If we don't want that check, we can set `targetOrigin` to `*`.

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

To receive a message, the target window should have a handler on the `message` event. It triggers when `postMessage` is called (and `targetOrigin` check is successful).

The event object has special properties:

`data`
: The data from `postMessage`.

`origin`
: The origin of the sender, for instance `http://javascript.info`.

`source`
: The reference to the sender window. We can immediately `source.postMessage(...)` back if we want.

To assign that handler, we should use `addEventListener`, a short syntax `window.onmessage` does not work.

Here's an example:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // something from an unknown domain, let's ignore it
    return;
  }

  alert( "received: " + event.data );

  // can message back using event.source.postMessage(...)
});
```

The full example:

[codetabs src="postmessage" height=120]

## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have these references:
- From the opener window: `window.open` -- opens a new window and returns a reference to it,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.

For iframes, we can access parent/children windows using:
- `window.frames` -- a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:
- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows with any origins to talk:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.
