# DOM سایه

دلیل استفاده از DOM سایه جداسازی یا کپسوله کردن است.DOM سایه به یک المنت اجازه می دهد تا سند DOM "سایه‌ی" خود را داشته باشد، که به طور کامل از DOM سند اصلی جداسازی شده است، سند DOM سایه می‌تواند قوانین خاص خود را داشته باشد مثل style محلی مربوط به خود.

## DOM سایه های داخلی (Built-in)

آیا تا به حال فکر کرده‌اید که چگونه کنترلرهای پیچیده مرورگر مثل المان زیر (ورودی محدود) ایجاد شده و style دهی می‌شوند؟

`<input type="range">`:

<p>
<input type="range">
</p>

مرورگر با DOM/CSS آن‌ها را پیاده سازی می‌کند. ساختار DOM این المان‌ها از دیدگاه ما پنهان است ولی با استفاده از developer tools می‌توان به آن‌ها دسترسی پیدا کرد٬ برای مثال در chrome کافی‌ است گزینه "Show user agent shadow DOM" را در Dev tools فعال کنید.

برای مثال `<"input type="range>` به شکل زیر است.

![](shadow-dom-range.png)

همه اجزای زیرمجموعه‌ی `shadow-root#` را می‌توان "shadow DOM" نامید.

چون المان‌های Shadow DOM داخلی (built-in) از المان‌های معمول DOM جدا سازی شده‌اند نمی‌توان با استفاده از انتخابگرهای معمول جاوااسکریپت مرورگر به آنها دسترسی پیدا کرد.

اگر در مثال بالا توجه کنید یک attribute به نام `pseudo` می‌بینید.`pseudo` یک ویژگی غیر استاندارد است که وجود آن دلایل تاریخی دارد اما با استفاده از آن می‌توانیم المان‌های زیرمجموعه را به شکل زیر style دهی کنیم.

```html run autorun
<style>
/* رنگ ریل را به قرمز تغییر می‌دهد */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range" />
```

فراموش نکنید که `pseudo` یک ویژگی غیر استاندارد است. مرورگر‌ها در ابتدا به پیاده‌سازی آزمایشی کنترل‌های داخلی با استفاده از المان‌های DOM کردند بعد از گذشت زمان DOM سایه استاندارد سازی شد تا توسعه دهندگان بتوانند المان‌های کنترلی خود را بسازند.

در ادامه از DOM سایه استاندارد استفاده خواهیم کرد که در [DOM spec](https://dom.spec.whatwg.org/#shadow-trees) توضیحات کاملی از آن موجود است.

## درخت سایه (Shadow Tree)

یک المان DOM می‌تواند دو نوع زیرمجموعه DOM داشته باشد:

1. درخت روشن -- یک زیر مجموعه معمولی از DOM است که از زیرمجموعه HTML ساخته شده است. تمام مثال‌های که در فصول قبل دیدیم از نوع روشن بودند.
2. درخت سایه -- یک زیرمجموعه پنهان از DOM است که در HTML نمایش داده نمی‌شود و از چشم مخفی است.

اگر المانی هر دو زیرمجموعه را داشت مرورگر فقط قسمت تاریک را نمایش خواهد داد. اما می توانیم نوعی ترکیب بندی بین درختان سایه و روشن ایجاد کنیم. جزیات بیشتر را در <info:slots-composition> خواهیم خواند.

می‌توان از درخت سایه برای پنهان سازی المان‌های داخلی استفاده کرد و از استایل دهی محلی برای المان جدید استفاده کرد.

برای مثال`<show-hello>` المان‌های داخلی خود را در درخت سایه پنهان می‌کند و مقدار نمایش داده شده را به عنوان ویژگی دریافت می‌کند.

```html run autorun height=60
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')}
    </p>`;
  }  
});
</script>

<show-hello name="John"></show-hello>
```

خروجی DOM بالا در Chrome dev tool به شکل زیر نشان داده می‌شود و تمام اجزا زیر مجموعه "shadow-root#" خواهد بود.

![](shadow-dom-say-hello.png)

در ابتدا `elem.attachShadow({mode: …})` یک درخت سایه ایجاد می‌کند.

ما در این جا ۲ محدودیت داریم:
1. هر المان در صفحه فقط می‌تواند یک سایه داشته باشد.
2. المان `elem` باید یک المان سفارشی سازی شده(custom) یا یکی از المان های "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", "span" باشد. دیگر المان ها مثل `<img>` نمی‌توانند سایه داشته باشند.

 گزینه `mode` سطح جداسازی (encapsulation) را مشخص می‌کند. و باید یکی از دو مقدار زیر را داشته باشد:
- `"open"` -- قابل دسترس باشد `elem.shadowRoot` که باعث می‌شود سایه تحت.

هر کدی قابلیت دسترسی به درخت سایه المان `elem` را دارد.
- `"closed"` -- است `null` همیشه `elem.shadowRoot`.

فقط با استفاده از مقدار(refrance) براگردانده شده از `attachShadow`(که احتمالا یک کلاس پنهان داخلی دارد) می‌توانیم به DOM سایه دسترسی پیدا کنیم. اما در مورد درخت‌های سایه بومی مرورگر مثل `<input type="range">` که بسته(`"closed"`) هستند٬ هیچ راهی برای دسترسی به این درخت‌های سایه وجود ندارد.

با [shadow root](https://dom.spec.whatwg.org/#shadowroot) که خروجی `attachShadow` است می‌توان مثل یک المان معمولی برخورد کرد و از `innerHTML` یا `append` برای پر کردن آن استفاده کرد.

به المانی که دارای shadow root باشد "shadow tree host" گفته می‌شود و با استفاده از ویژگی "host" قابل دسترسی است:

```js
// است null برابر با elem.shadowRoot در غیر این صورت {"mode" : open} با فرض
alert(elem.shadowRoot.host === elem); // true
```

## جداسازی (Encapsulation)

دسترسی DOM سایه به طول کامل از سند اصلی گرفته شده است.

1. المان‌های DOM سایه توسط `querySelector` های DOM روشن قابل شناسایی نیستنتد. به طور دقیق‌تر المان‌های داخلی DOM سایه ممکن است id هایی یکسانی با المان‌های DOM روشن داشته باشند اما این idها باید در درخت سایه یکتا باشند.
2. سند DOM سایه stylesheet مجزای مخصوص به خود را دارد. قوانین style خارجی (light DOM) در آن عمل نمی‌کنند.

به مثال زیر توجه کنید:

```html run untrusted height=40
<style>
*!*
  /* اجرا نمی‌شود (۱) #elem استایل سند بر درخت تاریک در 	
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // درخت تاریک استایل خود را دارد (۲)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
   // (۳) ‌های داخل درخت تاریک قابل دسترسی است qury فقط از <p>
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

1. استایل از سند اصلی هیچ تاثیری روی درخت تاریک ندارد.
2. اما استایل از داخل به خوبی کار می‌کند.
3. برای دریافت المان‌های داخل درخت تاریک باید از داخل درخت تاریک این query‌ها را اجرا کنیم.

## منابع

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibility: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM is mentioned in many other specifications, e.g. [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) specifies that shadow root has `innerHTML`.


## خلاصه

سایه DOM روشی است برای ایجاد یک المان محلی برای DOM.

1. `shadowRoot = elem.attachShadow({mode: open|closed})` --یک دام سایه برای `elem` می‌سازد. اگر "mode="open باشد این المان با ویژگی `elem.shadowRoot` قابل دسترسی است.
2. با استفاده از ویژگی `innerHtml` یا ویژگی های دیگر DOM موجود در `shadowRoot` می‌توان اجزای جدید به آن اضافه کرد.

المان‌های DOM سایه:
- داری فضای مجزای خود هستند.
- از انتخابگر‌های جاوا اسکریپت موجد در DOM اصلی مثل `querySelector` پنهان هستند.
- از استایل‌های موجود در درخت تاریک خود استفاده می‌کنند و نه از استایل موجود در DOM اصلی.

اگر المانی در صفحه دارای DOM سایه بود، مرورگر به صورت پیشفرض المان‌های موجود در درخت تاریک را نمایش می‌دهد و از المان‌های DOM روشن یا همان زیرمجموعه‌های HTML معمول صرف نظر می‌کند. در فصل <info:slots-composition> در مورد ترکیب این دو بیشتر مطالعه می‌کنیم.
