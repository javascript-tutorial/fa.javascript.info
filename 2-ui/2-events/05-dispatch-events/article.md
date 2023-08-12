# Dispatching custom events

ما نه تنها می توانیم handler ها را اختصاص دهیم، بلکه می توانیم رویدادها را از جاوا اسکریپت نیز تولید کنیم.

از رویدادهای سفارشی می توان برای ایجاد "مولفه های گرافیکی" استفاده کرد. به عنوان مثال، یک عنصر ریشه از منوی مبتنی بر JS خودمان ممکن است رویدادهایی را ایجاد کند که می‌گوید چه اتفاقی در منو می‌افتد:

باز کردن (باز کردن منو)، انتخاب (یک مورد انتخاب شده است) و غیره. کد دیگری ممکن است به رویدادها گوش دهد و آنچه را که در منو اتفاق می افتد مشاهده کند.

ما می‌توانیم نه تنها رویدادهای کاملاً جدیدی را که برای اهداف خود اختراع می‌کنیم، بلکه همچنین رویدادهای داخلی مانند کلیک، پایین آوردن ماوس و غیره را ایجاد کنیم. ممکن است برای آزمایش خودکار مفید باشد.
## Event constructor

کلاس های رویداد داخلی یک سلسله مراتب را تشکیل می دهند، مشابه کلاس های عنصر DOM. ریشه کلاس رویداد داخلی است.

ما می توانیم اشیاء رویداد را مانند این ایجاد کنیم: [Event](https://dom.spec.whatwg.org/#events) 

```js
let event = new Event(type[, options]);
```

پارامتر ها: 
Arguments:

- *نوع*: event type,  یک رشته مانند `"click"` .
- *گزینه ها*: شی ای با دو ویژگی اختیاری.
- *Bubbles*:اگر true  بود یعنی  bubbled  می شود. 
- *لغو شدن (true/false)*: اگر ویزگی مقدار true را داشت عمل پیش فرض آن لغو میشود،
- به صورت پیش فرض: `{bubbles: false, cancelable: false}`.
  
  ## dispatchEvent

پس از ایجاد یک event، باید آن را روی یک element با استفاده از فراخوانی elem.dispatchEvent(event) اجرا کنیم.

سپس handler ها به آن واکنش نشان می دهند که گویی یک رویداد معمولی مرورگر است. اگر رویداد با bubble flag ها ایجاد شده باشد، bubbled می شود.

در مثال زیر رویداد کلیک در جاوا اسکریپت آغاز می شود. handler به همان روشی کار می کند که اگر روی دکمه کلیک شده باشد:
```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

راهی برای تشخیص یک user event "واقعی" از event تولید شده توسط اسکریپت وجود دارد.

ویژگی 'event.isTrusted' برای رویدادهایی که از اقدامات واقعی کاربر ناشی می شوند 'true' و برای رویدادهای تولید شده توسط اسکریپت 'false' است.


## Bubbling example


می‌توانیم یک bubbling event با نام `"hello"` ایجاد کنیم و آن را در `document` بگیریم.

تنها چیزی که نیاز داریم این است که `bubbles` را روی "true" تنظیم کنیم:

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // catch on document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...dispatch on elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // the handler on document will activate and display the message.

</script>
```


نکات:

1. باید از `addEventListener` برای custom  کردن  event  ها استفاده کرد، زیرا `on<event>` فقط برای built-in event وجود دارد و `document.onhello` کار نمیکند. 
2. باید `bubbles:true` را  set  کنیم مگرنه event  bubble up  نخواهد شد.

مکانیک bubbling برای built-in (`click`) و custom (`hello`) یکسان است.  هم چنین مراحلی برای گرفتن و bubbling نیز وجود دارد.

## MouseEvent, KeyboardEvent and others

موارد زیر شامل یک لیست کوتاه از کلاس هایی برای UI Events از [UI Event specification](https://www.w3.org/TR/uievents) هستند: 

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

 اگر میخواهید رویدادی به وجود بیاوریم، باید به جای `new Event` از کلاس های بالا استفاده کنیم. برای مثال `new MouseEvent("click")`.
 
 انتخاب constructor درست این امکان را میدهد که  property های استاندارد را برای هر نوع از  event  مشخص کنیم.

 مانند `clientX/clientY` برای mouse event:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```
لطفا به یاد داشته باشد: constructor های generic `Event` اجازه این کار را نمیدهد.

بیایید این روش را امتحان کنیم:

```js run
let event = new Event("click", {
  bubbles: true, // only bubbles and cancelable
  cancelable: true, // work in the Event constructor
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, the unknown property is ignored!
*/!*
```
از نظر فنی، می‌توانیم با اختصاص مستقیم `event.clientX=100` پس از ایجاد، آن را حل کنیم. بنابراین این موضوع راحت و پیروی از قوانین است. event های ایجاد شده توسط مرورگر همیشه نوع مناسبی دارند.

لیست کاملی از  property  ها برای event های مختلف UI به تفکیک، برای مثال، [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Custom events
برای انواع events های کاملاً جدید خودمان مانند  `"hello"` باید از "CustomEvent جدید" استفاده کنیم. از نظر فنی [CustomEvent](https://dom.spec.whatwg.org/#customevent) با «رویداد» یکسان است،البته با یک استثنا.

در آرگومان دوم (object) می‌توانیم یک ویژگی «detail» برای هر اطلاعات که می‌خواهیم با event ارسال کنیم، اضافه کنیم.

برای مثال:

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // additional details come with the event to the handler
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```
ویژگی "detail" می تواند هر داده ای را داشته باشد. از نظر فنی می‌توانیم بدون آن زندگی کنیم، زیرا می‌توانیم هر ویژگی را پس از ایجاد یک شی `new Event` معمولی به آن اختصاص دهیم. اما `CustomEvent` فیلد  `detail` ویژه ای را برای جلوگیری از conflicts با سایر properti های رویداد فراهم می کند.

علاوه بر این، event class توضیح می‌دهد که «چه نوع رویدادی» است، و اگر event is custom است، باید از  `CustomEvent` استفاده کنیم تا مشخص شود که چیست.

## event.preventDefault()

بسیاری از رویدادهای مرورگر دارای یک "default action" هستند، مانند پیمایش یک لینک، شروع یک انتخاب و غیره.

برای event های جدید و custom events، قطعاً هیچ اقدام پیش‌فرض مرورگر وجود ندارد، اما کدی که چنین رویدادی را ارسال می‌کند ممکن است برنامه‌های خاص خود را داشته باشد که پس از راه‌اندازی رویداد چه کاری انجام دهد.

با فراخوانی `event.preventDefault()`، یک کنترل کننده رویداد ممکن است سیگنالی ارسال کند که آن اقدامات باید لغو شوند.

در آن صورت فراخوانی به `elem.dispatchEvent(event)` false برمی گردد. و کدی که آن را ارسال کرده می داند که نباید ادامه یابد.

بیایید یک مثال عملی ببینیم - یک خرگوش پنهان (ممکن است منوی بسته شدن یا چیز دیگری باشد).

در زیر می‌توانید یک تابع #rabbit and hide() را مشاهده کنید که رویداد "hide" را روی آن ارسال می‌کند تا به همه علاقه‌مندان اطلاع دهد که خرگوش قرار است مخفی شود.

هر کنترل‌کننده‌ای می‌تواند با `rabbit.addEventListener('hide',...)` به آن رویداد گوش دهد و در صورت نیاز، عمل را با استفاده از  `event.preventDefault()` لغو کند. سپس خرگوش ناپدید نمی شود:

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // without that flag preventDefault doesn't work
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('The action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```
نکته: event  حتما باید  flag `cancelable: true` را داشته باشد یا اینکه `event.preventDefault()` فراخوانی نمیشود. 

## Events-in-events are synchronous

معمولا رویدادها در یک صف پردازش می شوند. یعنی: اگر مرورگر در حال پردازش `onclick` باشد و یک رویداد جدید رخ دهد، به عنوان مثال: ماوس حرکت می کند، سپس handling آن در صف قرار می گیرد، پس از اتمام پردازش `onclick`، کنترل کننده های مربوط به `mousemove` فراخوانی می شوند.

استثنا قابل توجه زمانی است که یک رویداد از درون رویداد دیگری آغاز می شود، به عنوان مثال: با استفاده از `dispatchEvent` چنین رویدادهایی بلافاصله پردازش می‌شوند: کنترل‌کننده‌های رویداد جدید فراخوانی می‌شوند و سپس مدیریت رویداد فعلی از سر گرفته می‌شود.

به عنوان مثال، در کد زیر، رویداد  `menu-open` در حین کلیک فعال می شود.

بلافاصله پردازش می شود، بدون اینکه منتظر پایان کنترل کننده `onclick` باشد:

بدون اینکه برای `onclick` handler صبر کند تا تمام شود، شروع به process شدن میشود:   

```html run autorun
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // triggers between 1 and 2
  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

ترتیب خروجی این است: 1 -> تودرتو (nested) -> 2 
لطفاً توجه داشته باشید که منوی رویداد تودرتو که باز است در `document` وجود دارد. انتشار و مدیریت رویداد تودرتو قبل از اینکه پردازش به کد خارجی بازگردد (`onclick`) به پایان می رسد.

این فقط مربوط به `dispatchEvent` نیست، موارد دیگری نیز وجود دارد. اگر یک کنترل کننده رویداد متدهایی را فراخوانی کند که رویدادهای دیگر را راه‌اندازی می‌کنند، آنها نیز به صورت همزمان و به صورت تودرتو پردازش می‌شوند.

بیایید بگوییم که آن را دوست نداریم. ما می خواهیم ابتدا `onclick` به طور کامل پردازش شود، مستقل از `menu-open` یا هر رویداد تو در تو.

سپس می‌توانیم `dispatchEvent` (یا یک تماس event-triggering) را در انتهای `onclick` قرار دهیم یا، شاید بهتر، آن را در `setTimeout` با تاخیر صفر قرار دهیم:

```html run
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```
حالا `dispatchEvent` یه صورت asynchronously بعد از اینکه اجرای کد فعلی به اتمام رسید،  run  میشود، که شامل `menu.onclick`. پس event handler ها به صورت جدت و مستقل فعالیت میکنند. 

خروجی خ.اهد بود:1 -> 2 -> nested.



## Summary

برای تولید یک event code، ابتدا باید یک event object ایجاد کنیم.

سازنده  `Event(name, options)` یک نام رویداد دلخواه و `options` object را با دو ویژگی می‌پذیرد:
-  `bubbles: true` اگر رویداد باید حباب شود.
- `cancelable: true`  اگر `event.preventDefault()` باید کار کند.

سایر سازنده‌های native events مانند `MouseEvent`, `KeyboardEvent` و غیره ویژگی‌های خاص آن نوع رویداد را می‌پذیرند. به عنوان مثال، `clientX` برای رویدادهای ماوس.

برای custom events باید از سازنده `CustomEvent` استفاده کنیم. این یک گزینه اضافی به نام `detail` دارد، ما باید داده های رویداد خاص را به آن اختصاص دهیم. سپس همه کنترل کننده ها می توانند به عنوان `event.detail` به آن دسترسی داشته باشند.

علیرغم امکان فنی ایجاد browser events مانند `click` یا `keydown`، ما باید با دقت زیادی از آنها استفاده کنیم.

ما نباید browser events را ایجاد کنیم زیرا این یک روش هک برای اجرای کنترلرها است. این معماری در بیشتر مواقع بد است.

هم چنین native events ممکن است ایجاد شوند:

- به عنوان یک dirty hack برای اینکه کتابخانه های شخص ثالث به روش مورد نیاز کار کنند، اگر ابزارهای تعامل دیگری را ارائه ندهند.
- برای تست خودکار، روی دکمه "click the button" در اسکریپت و ببینید که آیا رابط به درستی واکنش نشان می دهد.

 همک چنین custom events با نام خود ما اغلب برای مقاصد معماری ایجاد می شوند تا نشان دهند که چه اتفاقی در منوها، اسلایدر ها و غیره می افتد.
