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

Usually events are processed in a queue. That is: if the browser is processing `onclick` and a new event occurs, e.g. mouse moved, then its handling is queued up, corresponding `mousemove` handlers will be called after `onclick` processing is finished.

The notable exception is when one event is initiated from within another one, e.g. using `dispatchEvent`. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.

For instance, in the code below the `menu-open` event is triggered during the `onclick`.

It's processed immediately, without waiting for `onclick` handler to end:


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

The output order is: 1 -> nested -> 2.

Please note that the nested event `menu-open` is caught on the `document`. The propagation and handling of the nested event is finished before the processing gets back to the outer code (`onclick`).

That's not only about `dispatchEvent`, there are other cases. If an event handler calls methods that trigger other events -- they are processed synchronously too, in a nested fashion.

Let's say we don't like it. We'd want `onclick` to be fully processed first, independently from `menu-open` or any other nested events.

Then we can either put the `dispatchEvent` (or another event-triggering call) at the end of `onclick` or, maybe better, wrap it in the zero-delay `setTimeout`:

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

Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `menu.onclick`, so event handlers are totally separate.

The output order becomes: 1 -> 2 -> nested.

## Summary

To generate an event from code, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
- `bubbles: true` if the event should bubble.
- `cancelable: true` if the `event.preventDefault()` should work.

Other constructors of native events like `MouseEvent`, `KeyboardEvent` and so on accept properties specific to that event type. For instance, `clientX` for mouse events.

For custom events we should use `CustomEvent` constructor. It has an additional option named `detail`, we should assign the event-specific data to it. Then all handlers can access it as `event.detail`.

Despite the technical possibility of generating browser events like `click` or `keydown`, we should use them with great care.

We shouldn't generate browser events as it's a hacky way to run handlers. That's bad architecture most of the time.

Native events might be generated:

- As a dirty hack to make 3rd-party libraries work the needed way, if they don't provide other means of interaction.
- For automated testing, to "click the button" in the script and see if the interface reacts correctly.

Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.
