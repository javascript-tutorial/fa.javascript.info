# محیط مرورگر و خصوصیات (Specs)

زبان جاوا اسکریپت در ابتدا برای مرورگر‌های وب ساخته شد. از آن زمان، پیشرفت بسیاری کرده و به زبانی پراستفاده و پلتفرم‌ها شده است‌.
 
یک پلتفرم می‌تواند یک مرورگر، وب-سرور، یا یک ماشین لباسشویی  یا هر میزبان دیگری باشد. هرکدام از این‌ها عملکرد مختص به آن پلتفرم را فراهم می‌کند. مشخصه‌ی جاوااسکریپت (JavaScript specification) آن را یک محیط میزبانی (*host environment*) مینامد.

یک محیط میزبانی اشیا و توابع اضافی مربوط به پلتفرم را به هسته‌ی اصلی زبان می‌افزاید. مرورگرهای وب ابزاری برای کنترل کردن صفحات وب می‌دهند. Node.JS قابلیت‌های سمت سرور را فراهم میسازد و غیره.

در ادامه یک نگاه سریع به اتفاقی‌ست که وقتی ما جاوااسکریپت را در مرورگر وب اجرا می‌کنیم، می‌افتد:
![](windowObjects.png)

یک شئ پایه‌‌ای (root) به نام `window` داریم که دو نقش دارد:

۱. اولا، یک شئ سراسری (Global Object) برای کد جاوااسکریپت است، همینطور که در بخش <info:global-object> توضیح داده‌ شد.

۲. دوما، صفحه‌ی مرورگر (Browser Window) را نمایش میدهد و توابعی برای کنترل آن فراهم می‌سازد.

برای نمونه، ما اینجا به عنوان یک شئ سراسری استفاده‌ش میکنیم:

```js run
function sayHi() {
  alert("Hello");
}

// global functions are accessible as properties of window
window.sayHi();
```

و ما اینجا به عنوان یک صفحه‌ی مرورگر از آن برای دیدن ارتفاع صفحه استفاده می‌کنیم:
```js run
alert(window.innerHeight); // inner window height
```

<<<<<<< HEAD
توابع و مشخصه‌های مربوط به صفحه (window-specific) بیشتری وجود دارد که در بخش‌های بعدی به آنها خواهیم پرداخت. 
## Document Object Model (DOM)
=======
There are more window-specific methods and properties, we'll cover them later.

## DOM (Document Object Model)
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

شئ `document` دسترسی مارا به محتویات صفحه فراهم می‌سازد. ما میتوانیم هرچیزی که در صفحه‌ از آن استفاده می‌شود را بسازیم یا تغییر بدهیم.

برای نمونه:
```js run
// رنگ پس‌زمینه را به قرمز تغییر میدهیم
document.body.style.background = "red";

// سپس بعد از یک ثانیه به حالت قبل بازمیگردانیم
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
در اینجا ما از `document.body.style` استفاده کردیم، اما بیشتر هم هست. خیلی بیشتر! توابع و مشخصه‌ها در خصوصیات (Specification) توضیح داده شده‌ند.
1. [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) -- مستندات در این لینک است <https://www.w3.org/TR/dom>.
2. [WhatWG](https://en.wikipedia.org/wiki/WHATWG), موجود در <https://dom.spec.whatwg.org>.

هردوی این گروه‌ها کامل با یکدیگر موافق نیستند بنابراین دو مجموعه‌ی استانداردها وجود دارد. اما خیلی مشابه یکدیگر هستند و تا ۹۹٪ به یکدیگر شباهت دارند. البته تفاوت‌های بسیار ریزی وجود دارند که احتمالا حتی متوجهشان نخواهید شد.

به نظر شخصی من، <https://dom.spec.whatwg.org> برای استفاده مناسب است.

در دوران گذشته، هیچ استانداردی وجود نداشت -- هر مرورگر هرطور که دلش میخواست کد خودش را می‌نوشت. مرورگرهای متفاوت مجموعه‌ها، توابع، مشخصه‌های مختلفی برای چیزهای یکسان داشتند، توسعه‌دهندگان هم مجبور بودند برای هرکدام کدی جدا بنویسند. واقعا زمان تاریک و به هم ریخته‌ای بود!

حتی الان هم ممکن است که با کدهای قدیمی‌ای مواجه شویم که مشخصه‌های مربوط به مرورگر را استفاده می‌کنند و ناسازگاری دارند. اما نیازی نیست که اینها را یاد بگیرید مگر اینکه واقعا به آنها نیاز داشته باشید (احتمال اینکه به آنها نیاز داشته باشید خیلی کم است)، ما هم در این روند آموزش، چیزهای به روز را یاد می‌دهیم. 

سپس استاندارد‌های DOM به وجود آمدند، تا همگان را به توافق برسانند. اولین انتشار آن "DOM Level 1"، سپس با DOM Level 2 توسعه یافت، سپس DOM Level 3 و الان DOM Level 4 است. گروه WhatWG از نام‌گذاری با اعداد خسته شد و الان به آن فقط "DOM" می‌گویند. ما هم همینکار را می‌کنیم.
```smart header="DOM فقط برای مرورگرها نیست"
خصوصیات DOM ساختار یک document را توصیف می‌کند و اشیائی برایی تغییر آن فراهم می‌کند. همینطور ابزارهای غیر-مرورگری‌ای هستند که از آن استفاده می‌کنند.

برای مثال، ابزار سمت سرور که صفحات HTML را دانلود و پردازش می‌کنند از DOM استفاده ‌می‌کنند. اگرچه ممکن است فقط یک قسمتی از خصوصیات‌ش را پشتیبانی کنند.
=======
Here we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification:

- **DOM Living Standard** at <https://dom.spec.whatwg.org>

```smart header="DOM is not only for browsers"
The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use it too.

For instance, server-side tools that download HTML pages and process them use the DOM. They may support only a part of the specification though.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
```

```smart header="CSSOM برای استایل دادن"
قوانین CSS و شیوه‌نامه (stylesheets) مشابه HTML ساختاربندی نشده‌ند. یک خصوصیت مجزا [CSSOM](https://www.w3.org/TR/cssom-1/) که نمایان شدنشان به شکل اشیا و نحوه نوشته و خوانده شدنشان را توصیف میکند.

CSSOM همراه با DOM برای تغییر و تصحیح قوانین استایل برای document استفاده می‌گردد.
اگرچه در عمل، CSSOM به ندرت مورد استفاده‌ میگیرد، به این علت که قوانین CSS عموما ثابت (Static) هستند. ما به ندرت نیاز داریم که قوانین CSS را در جاوا اسکریپت حذف یا اضافه کنیم، بنابراین ما الان به آنها نخواهیم پرداخت.
```

<<<<<<< HEAD
## BOM (قسمتی از خصوصیت HTML)
=======
## BOM (Browser object model)
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

مدل اشیا مرورگر (Browser Object Model یا BOM)، اشیا افزوده‌ای هستند که توسط مرورگر فراهم میشوند (محیط میزبانی یا host environment) تا با هرچیزی به جز document کار کنند. 

برای نمونه:

- شئ [navigator](mdn:api/Window/navigator) اطلاعات پس‌زمینه در مورد مرورگر و سیستم‌های عامل فراهم می‌کند. مشخصه‌های زیادی هستند، اما دو مورد معروف آن: `navigator.userAgent` که درباره مرورگر کنونی‌ست و `navigator.platform` که درباره پلتفرم است (کمک میکند که بین ویندوز/لینوکس/مک و بقیه بتوانیم تمایز قائل شویم).
- شئ [location](mdn:api/Window/location) به ما اجازه خواندن URL کنونی را می‌دهد و می‌تواند مرورگر به صفحه‌ی جدیدی انتقال یابد.

نحوه‌ی استفاده از شئ `location`:

```js run
alert(location.href); // shows current URL
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

<<<<<<< HEAD
توابع `alert/confirm/prompt` همچنین قسمتی از BOM هستند: مستقیما به document مربوط نیستند اما توابع مختص مرورگر برای ارتباط با کاربر را نمایش می‌دهند. 

```smart header="HTML خصوصیت"
BOM قسمتی از [HTML specification](https://html.spec.whatwg.org) عمومی است.
بله، درست متوجه‌ شدید. خصوصیت HTML در <https://html.spec.whatwg.org> نه تنها درباره "HTML زبان" (tags, attributes) است، بلکه مجموعه‌ای از اشیا، توابع و افزونه‌های DOM مربوط به مرورگر را هم پوشش می‌دهد. این معنی HTML در حالتی کلی‌ست.
```
=======
Functions `alert/confirm/prompt` are also a part of BOM: they are directly not related to the document, but represent pure browser methods of communicating with the user.

BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

## خلاصه

در بحث استانداردها داریم:

خصوصیت DOM
: ساختمان document، تغییرها و اتفاقات (events) را توصیف می‌کند. <https://dom.spec.whatwg.org> 

خصوصیت CSSOM
: شیوه‌نامه و قواعد استایل دادن، تغییر آنها با اتصال آنها به documents را توصیف می‌کند. <https://www.w3.org/TR/cssom-1/> 

خصوصیت HTML
: زبان HTML (چیزهایی مثل tags) و همینطور BOM و توابع مرورگر مختلف را توصیف می‌کند: `setTimeout`، `alert`، `location` و غیره. <https://html.spec.whatwg.org>. خصوصیت DOM را می‌گیرد و با بسیاری از مشخصه‌ها و توابع آنرا بسط می‌دهد.

<<<<<<< HEAD
حالا میرویم برای یادگیری DOM، چراکه document نقش اصلی در رابط کاربری را دارد.

به لینک‌های بالا توجه داشته باشید چراکه خیلی اطلاعات برای یادگرفتن دارند که پوش دادن آنها در اینجا غیرممکن است.

هنگامی که می‌خواهید راجب یک مشخصه یا یک تابع مطالعه کنید، راهنمای Mozilla در <https://developer.mozilla.org/en-US/search> منبع خوبیست اما خواندن خصوصیت مربوطه بهتر است: پیچیده‌ةر است وخواندش طولانی‌تر است اما دانش پایه‌ای شما را کامل و درست می‌کند.
=======
Additionally, some classes are described separately at <https://spec.whatwg.org/>.

Please note these links, as there's so much stuff to learn it's impossible to cover and remember everything.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it's often convenient to use an internet search "WHATWG [term]" or "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now we'll get down to learning DOM, because the document plays the central role in the UI.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
