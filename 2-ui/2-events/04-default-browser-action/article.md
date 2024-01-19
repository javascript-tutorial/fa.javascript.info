# اقدامات پیشفرض مرورگر

بسیاری از رویدادها اقدامات خودبه‌‍خودی از سمت مرورگر را در پی دارند

برای نمونه:

- یک کلیک بر روی لینک - شما را به آدرس موردنظر میرساند
- یک کلیک روی دکمه ارسال فرم - تایید و ارسال فرم به سرور آغاز می‌شود.
- فشردن دکمه ماوس برروی متن و حرکت دادن آن - متن را انتخاب می‌کند

اگر بخواهیم که یک رویداد را در جاوااسکریپت مدیریت کنیم، ممکن است نخواهیم تا اکشن پیشفرض مرورگر اتفاق بیفتد، و بخواهیم که رفتار متفاوتی به جای آن را پیاده‌سازی کنیم.

## جلوگیری از اقدامات مرورگر

دو راه برای اینکه به مرورگر بگوییم نمیخواهیم تا رفتار پیشفرض را انجام دهد وجود دارد:

- راه اصلی استفاده از آبجکت `event` است. متدی به نام `event.preventDefault()` وجود دارد.
- اگر هندلر با استفاده از `on<event>` مشخص شده باشد (نه با `addEventListener`) آنگاه بازگرداندن مقدار `false` به طرز مشابه عمل خواهد کرد.

در این فایل HTML, کلیک بر روی یک لینک منجر به تغییر آدرس مروگر نمی‌شود; مرورگر کاری نمی‌کند:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

در مثال بعدی ما از این تکنیک برای ایجاد یک منو با جاوااسکریپت استفاده خواهیم کرد.

```warn header="Returning `false` from a handler is an exception"
مقدار بازگردانده شده توسط یک هندلر معمولا نادیده گرفته می‌شود.

تنها استثنا برگردانده شند `return false` از یک هندلر اختصاص داده شده با استفاده از `on<event>` است.

در همه‌ی موارد دیگر مقدار `return` نادیده گرفته می‌شود. به طور خاص بازگرداندن `true` هیچ معنایی ندارد.

````

### مثال: منو

برای مثال منوی یک سایت را درنظر بگیرید:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
````

با مقدار CSS اینطور به نظر می‌رسد:

[iframe height=70 src="menu" link edit]

آیتم‌های منو به شکل به شکل لینک با تگ `<a>` پیاده‌سازی شده‌اند نه به شکل دکمه با تگ `<button>`. دلایلی مختلفی برای انجام اینکار وجود دارد. برای مثال:

- بسیاری از افراد علاقه دارند تا از "کلیک راست " استفاده کنند و گزینه "open in a new window" برای باز کردن مقصد در یک صفحه جدید استفاده کنند. اگر از `<button>` یا `<span>` استفاده کنیم امکان اینکار وجود نخواهد داشت.
- موتورهای جستجو تگ `<a href="...">` را هنگام ایندکس کردن دنبال میکنند.

بنابراین ما از `<a>` در مارک‌آپ استفاده میکنیم. اما چون معمولا تمایل داریم تا کلیک‌ها را در جاوااسکریپت هندل کنیم بنابراین باید از رفتار پیشفرض مرورگر جلوگیری کنیم.

مثل اینجا:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...can be loading from the server, UI generation etc

*!*
  return false; // prevent browser action (don't go to the URL)
*/!*
};
```

اگر `return  false` را حذف کنیم آنگاه پس از اجرای کد ما مرورگر "رفتار پیشفرض" خود را انجام خواهد داد -- مرورگر شما را به آدرس موجود در `href` هدایت خواهد کرد. و ما به آن اینجا نیاز نداریم چون میخواهیم که کلیک توسط خودمان مدیریت شود.

درضمن استفاده از event delegation در اینجا منوی ما را بسیار انعطاف پذیر می‌کند. چون می‌توانیم از لیست‌های تودرتو استفاده کرده و آنرا با استفاده از CSS استایل دهیم. مثل استایل "slide down"

````smart header="Follow-up events"
Certain events flow one into another. If we prevent the first event, there will be no second.
رویدادهای مشخص در یکدیگر جاری میشوند. اگر از اولی جلوگیری کنیم رویداد دومی وجود نخواهد داشت.

برای مثال رویداد `mousedown` برروی `<input>` منجر به فوکوس آن و رویداد فوکوس می‌شود. اگر از رویداد `mousedown` جلوگیری کنیم آنگاه فوکوسی نخواهیم داشت.

تلاش کنید تا برروی اولین `<input>` کلیک کنید -- رویداد `focus` رخ خواهد داد. اما اگر برروی دومی کلیک کنید فوکوسی وجود نخواهد داشت.

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

این بخاطر آن است که اکشن مرورگر برروی `mousedown` لغو شده است. فوکوس کردن همچنان امکان‌پذیر است اگر ما راه دیگری برای وارد کردن اینپوت استفاده کنیم.  برای مثال کلید `Tab` برای انتقل از اینپوت اول به دوم. اما بدون استفاده از کلیک ماوس.
````

# <<<<<<< HEAD

## گزینه هندلر "passive"

آپشن اختیاری `passive: true` از `addEventListener` این سیگنال را به مرورگر میدهد که مرورگر هندلر `preventDefault()` را صدا نخواهد کرد..

چرا ممکن است که به این آپشن نیاز پیدا کنیم؟

ایونت هایی همچون `touchmove` در دیوایس‌های موبایلی وجود دارند (زمانی که یوزر انگشت خود را برروی صفحه‌نمایش حرکت می‌دهد) که به صورت پیشفرض باعث اسکرول می‌شوند اما این اسکرول خوردن میتواند با وجود `preventDefault()` در هندلر جلوگیری شود.

بنابراین زمانی که مرورگر چنین ایونتی را شناسایی میکند اول از همه باید همه‌ی هندلرهارا بررسی کرده و اگر `preventDefault` جایی صدا زده نشده باشد میتواند با اسکرول خوردن ادامه یابد که این میتواند سبب تاخیرها و لرزش‌های غیرضروری شود.

گزینه `passive: true` به مرورگر میگوید که هندلر قصد لغو اسکرول را ندارد آنگاه مرورگر بلافاصله عمل اسکرول را انجام می‌دهد و تجربه خوب و روانی را برای کاربر به وجود می‌آورد و درضمن رویداد هم هندل می‌شود.

در بعضی از مرورگرها (فایرفاکس و کروم) مقدار `passive` به صورت پیشفرض برای رویدادهای `touchstart` و `touchmove` مقدار `true` دارد.

> > > > > > > bae0ef44d0208506f6e9b7f3421ee640ab41af2b

## event.defaultPrevented

ویژگی `event.defaultPrevented` اگر از اکشن پیشفرض جلوگیری شده باشد `true` بوده و درغیراینصورت `false` خواهد بود.

یک مورد استفاده جالب برای این وجود دارد.

به یاد دارید که در فصل <info:bubbling-and-capturing> راجع به `()event.propagation` اینکه چرا bubbling خوب نیست صحبت کردیم؟

گاهی اوقات برای اینکه به باقی ایونت هندلرها خبر بدهیم که ایونت هندل شده میتوانیم از `event.defaultPrevented` استفاده کنیم.

بیاید تا با هم یک مثال عملی را ببینیم.

به صورت پیشفرض مروگر در پاسخ به ایونت `contextmenu` (کلیک راست ماوس) یک منو با آپشن‌های استاندارد را نمایش می‌دهد. ما می‌توانیم از این موضوع جلوگیری کرده و منوی خودمان را نمایش دهیم. به اینصورت:

```html autorun height=50 no-beautify run
<button>Right-click shows browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click shows our context menu
</button>
```

حالا علاوه بر context menu میخواهیم تا یک منو به وسعت داکیومنت پیاده‌سازی کنیم.

با کلیک‌راست نزدیک‌ترین context menu ظاهر خواهد شد.

```html autorun height=80 no-beautify run
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function (event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function (event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

مشکل این است زمانی که برروی `elem` کلیک کنیم دو منو خواهیم داشت: منوی تعریف شده برروی دکمه و (زمانی که رویداد bubble up می‌کند) منوی تعریف شده در داکیومنت.

چطور این مسئله را فیکس کنیم؟ یکی از راه‌حل ها این است: "زمانی که که میخواهیم کلیک‌راست را در هندلر دکمه هندل کنیم بیاید تا bubbling آن را متوقف کرده" و از `()event.stopPropagation` استفاده کنیم.

```html autorun height=80 no-beautify run
<p>Right-click for the document menu</p>
<button id="elem">
  Right-click for the button menu (fixed with event.stopPropagation) کلیک راست
  برای منوی دکمه (با event.stopPropagation فیکس شده)
</button>

<script>
    elem.oncontextmenu = function(event) {
      event.preventDefault();
  *!*
      event.stopPropagation();
  */!*
      alert("Button context menu");
    };

    document.oncontextmenu = function(event) {
      event.preventDefault();
      alert("Document context menu");
    };
</script>
```

حالا منوی تعریف شده برروی دکمه همانطور که میخواستیم کار می‌کند. اما هزینه اینکار بالاست. ما برای همیشه دسترسی به اطلاعات راجع به کلیک راست را برای کدهای بیرونی قطع میکنیم که شامل شمارنده‌هایی که آمار و امثالهم را جمع میکنند میشود. که اینکار هوشمندانه نیست.

یک راه‌حل جایگزین بررسی هندلر `document` و اینکه آیا اکشن جلوگیری شده یا نه می‌باشد. اگر اینگونه است آنگاه رویداد هندل شده و نیازی به واکنش به آن نیست.

```html autorun height=80 no-beautify run
<p>
  Right-click for the document menu (added a check for event.defaultPrevented)
</p>
<button id="elem">Right-click for the button menu</button>

<script>
    elem.oncontextmenu = function(event) {
      event.preventDefault();
      alert("Button context menu");
    };

    document.oncontextmenu = function(event) {
  *!*
      if (event.defaultPrevented) return;
  */!*

      event.preventDefault();
      alert("Document context menu");
    };
</script>
```

حالا همه چیز به درستی کار میکند. این راه حل حتی اگر المنت‌های تودرتویی داشته باشیم که هرکدام منوی خودشان را داشته باشند هم کار می‌کند. فقط اطمینان حاصل کنید که `event.defaultPrevented` در هر یک از هندلرهای `contextmenu` چک می‌شود.

```smart header="event.stopPropagation() and event.preventDefault()"
As we can clearly see, `event.stopPropagation()` and `event.preventDefault()` (also known as `return false`) are two different things. They are not related to each other.
به خوبی میتوانیم ببینیم که `event.stopPropagation()` و `event.preventDefault()` (که همچنین به عنوان `return false` شناخته می‌شود) دو چیز متفاوت از هم هستند که به یکدیگر ربطی ندارند.
```

```smart header="Nested context menus architecture"
همچنین راه‌های جایگزینی برای پیاده‌‍سازی منوهای تودرتو وجود دارد.
There are also alternative ways to implement nested context menus. One of them is to have a single global object with a handler for `document.oncontextmenu`, and also methods that allow us to store other handlers in it.

آبجت هرگونه کلیک راستی را گرفته، نگاهی به هندلرهای آن می‌اندازد و هندلر مناسب را اجرا میکند.

اما در اینصورت هر تکه کدی که بخواهد context menu داشته باشد باید راجع به آن آبجکت بداند و به جای هندلر `contextmenu` خودش از کمک آن آبجکت گلوبال استفاده کند.
```

## خلاصه

اکشن های دیفالت مختلفی وجود دارند:

- `mousedown` -- starts the selection (move the mouse to select).
- `click` on `<input type="checkbox">` -- checks/unchecks the `input`.
- `submit` -- clicking an `<input type="submit">` or hitting `key:Enter` inside a form field causes this event to happen, and the browser submits the form after it.
- `keydown` -- pressing a key may lead to adding a character into a field, or other actions.
- `contextmenu` -- the event happens on a right-click, the action is to show the browser context menu.
- ...there are more...

اگر بخواهیم تا ایونت را به طور خاص با جاوااسکریپت هندل کنیم می‌توانیم از همه‌ی اکشن‌های پیشفرض جلوگیری کنیم.

برای جلوگیری از یک اکشن پیشفرض میتوانیم از `event.preventDefault()` یا `return false` استفاده کنیم. دومین متد تنها برای هندلرهای اختصاص یافته با `on<event>` کار می‌کند.

اگر از اکشن پیشفرض جلوگیری شده باشد مقدار `event.defaultPrevented` به `true` تغییر می‌کند در غیراینصورت `false` می‌شود.

```warn header="Stay semantic, don't abuse"
Technically, by preventing default actions and adding JavaScript we can customize the behavior of any elements. For instance, we can make a link `<a>` work like a button, and a button `<button>` behave as a link (redirect to another URL or so).

But we should generally keep the semantic meaning of HTML elements. For instance, `<a>` should perform navigation, not a button.

Besides being "just a good thing", that makes your HTML better in terms of accessibility.

Also if we consider the example with `<a>`, then please note: a browser allows us to open such links in a new window (by right-clicking them and other means). And people like that. But if we make a button behave as a link using JavaScript and even look like a link using CSS, then `<a>`-specific browser features still won't work for it.
```
