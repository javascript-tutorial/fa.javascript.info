# درامدی بر رویدادهای مرورگر

*یک رویداد* نشانه‌ای از چیزی است که اتفاق افتاده است. همه‌ی عناصر درخت DOM این نشانه‌ها را تولید می‌کنند (اما رویدادها محدود به درخت DOM نیستند).

در اینجا صرفا برای آشنایی اولیه، لیستی از پرکاربردترین رویدادهای DOM اورده شده:

**رویدادهای موس:**
- `click` -- زمانی که موس روی یک عنصر کلیک می‌کند (دستگاه‌های لمسی این رویدادها هنگام ضربه زدن ایجاد می‌کنند).
- `contextmenu` -- زمانی که موس روی یک عنصر راست‌کلیک می‌کند.
- `mouseover` / `mouseout` -- زمانی که اشاره‌گر موس روی/بیرون یک عنصر می‌رود..
- `mousedown` / `mouseup` -- زمانی که کلید موس روی عنصر فشرده/رها می‌شود.
- `mousemove` -- زمانی که اشاره‌گر موس حرکت می‌کند.

**رویدادهای صفحه‌کلید:**
- `keydown` و `keyup` -- زمانی که یک کلید از صفحه‌کلید فشرده/رها می‌شود.

**رویدادهای عناصر form:**
- `submit` -- زمانی که بازدیدکننده یک `<form>` را ثبت می‌کند.
- `focus` -- زمانی بازدیدکننده روی یک عنصر تمرکز کند, برای مثال یک `<input>`.

**رویدادهای :**
- `DOMContentLoaded` -- زمانی که سند HTML لود و پردازش شود، همچنین درخت DOM نیز کاملا تشکیل شده است.

**رویدادهای CSS:**
- `transitionend` -- زمانی که یک انیمیشن CSS تمام می‌شود.

رویدادهای متعدد دیگری نیز وجود دارد. درباره  جزئیات مخصوص به هرکدام از رویدادها در بخش‌های بعدی صحبت می‌کنیم.

## کنترل‌کننده‌های رویدادها

برای واکنش به این رویداد‌ها باید یک *کنترل‌کننده* به آن اختصاص دهیم -- یک تابع که در زمان اتفاق افتادن یک رویداد اجرا می‌شود.

کنترل‌کننده‌ها یک روش برای اجرای کدهای JavaScript در جواب به رفتارهای کاربر هستند.

چندین راه برای اختصاص کنترل‌کننده‌ها وجود دارد. برای آشنا شدن با آنها، از ساده‌ترین روش شروع می‌کنیم.

### صفت HTML

یک کنترل‌کننده می‌تواند درون HTML با یک صفتی به نام `on<event>` تعریف شود.

برای مثال اگر بخواهیم یک کنترل‌کننده `click` برای یک `input` اختصاص دهیم، مشابه مثال زیر از `onclick` استفاده می‌کنیم:

```html run
<input value="روی من کلیک کن" *!*onclick="alert('کلیک!')"*/!* type="button">
```

در زمان کلیک موس، کدی که داخل `onclick` است اجرا خواهد شد.

توجه کنید که داخل `onclick` ما از سینگل کوتیشن استفاده کردیم، چون که خود صفت درون یک دابل‌کوتیشن تعریف شده. اگر فراموش کنیم که کد داخل یک صفت است و از دابل‌کوتیشن استفاده کنیم، مثل این: `onclick="alert("کلیک!")"`، کد ما کار نخواهد کرد.

صفت HTML جای آنچنان مناسبی برای نوشتن کد‌های طولانی نیست. پس بهتر است یک تابع جاوااسکریپت ایجاد کنیم و درون این صفت آنرا صدا بزنیم.

اینجا یک کلیک، تابع `countRabbits()` را فراخوانی می‌کند:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("تعداد خرگوش " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="خرگوش‌ها را بشمار!">
```

همانطور که می‌دانیم، صفت‌های HTML به بزرگی و کوچکی حروف (case-sensitive) وابسته نیستند، پس ‍`ONCLICK` مانند `onClick` و `onCLICK` کار می‌کند ... اما معمولا صفت‌ها با حروف کوچک نوشته می‌شوند، مانند: `onclick`.

### خاصیت DOM

ما با استفاده از یک خاصیت DOM به نام `on<event>` می‌توانیم یک کنترل‌کننده تعریف کنیم.

برای مثال، `elem.onclick`:

```html autorun
<input id="elem" type="button" value="روی من کلیک کن">
<script>
*!*
  elem.onclick = function() {
    alert('ممنونم');
  };
*/!*
</script>
```

اگر که کنترل‌کننده توسط یک صفت HTML تعریف‌شده باشد، مرورگر آنرا می‌خواند و یک تابع جدید از مقدار آن صفت ایجاد می‌کند و آنرا به خاصیت متناظر DOM اختصاص می‌دهد.

پس این روش درواقع شبیه روش قبلی است.

این دو قطعه کد همانند هم عمل می‌کنند:

1. Only HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('کلیک!')"*/!* value="دکمه">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="دکمه">
    <script>
    *!*
      button.onclick = function() {
        alert('کلیک!');
      };
    */!*
    </script>
    ```

در مثال اولی، ما از صفت HTML برای مقدار دهی به `button.onclick` استفاده کردیم، درصورتی که در مثال دوم، این کار با کد انجام شده. تنها تفاوتشان همین است.

**از آنجایی که فقط یک خاصیت `onclick` روی عنصر وجود دارد، نمی‌توانیم بیشتر از یک کنترل‌کننده‌ برای این رویداد تعریف کنیم.**

در مثال زیر، وقتی که یک کنترل‌کننده توسط جاواسکریپت به عنصر اختصاص می‌دهیم، می‌بینیم که جایگزین کنترل‌کننده قبلی می‌شود.

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('قبل')" value="روی من کلیک کن">
<script>
*!*
  elem.onclick = function() { // کنترل‌کننده فعلی را رونویسی می‌کند
    alert('بعد'); // فقط این پیام نمایش داده می‌شود
  };
*/!*
</script>
```

برای برداشتن یا حذف یک کنترل کننده، می‌توانیم از `elem.onclick = null` استفاده کنیم.

## دسترسی به عنصر: this

مقدار `this` داخل یک کنترل‌کننده خود عنصر است. عنصری که کنترل‌کننده روی آن تعریف شده.

در کد زیر `button` محتویات خود را با `this.innerHTML` نمایش می‌دهد:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">روی من کلیک کن</button>
```

## اشتباهات احتمالی

اگر که به تازگی می‌خواهید با رویدادها کار کنید، به این نکات مهم توجه کنید.

ما می‌توانیم تابعی که از قبل تعریف شده و وجود دارد را به عنوان کنترل‌کننده استفاده کنیم.

```js
function sayThanks() {
  alert('ممنونم!');
}

elem.onclick = sayThanks;
```

اما مراقب باشید: تابع باید به صورت `sayThanks` به خاصیت DOM اختصاص یابد، نه به صورت `sayThanks()`.

```js
// درست
button.onclick = sayThanks;

// اشتباه
button.onclick = sayThanks();
```

اگر که ما پرانتزها را اضافه کنیم تابع `sayThanks()` صدا زده می‌شود. پس مورد دوم درواقع *خروجی* حاصل از اجرای تابع را، که `undefined` است (چون تابع چیزی را باز نمی‌گرداند)، به عنوان کنترل‌کننده به `onclick` اختصاص می‌دهد، که قاعدتا کار نمی‌کند.

...از سوی دیگر، ما در کد HTML به پرانتز ها نیاز داریم:

```html
<input type="button" id="button" onclick="sayThanks()">
```

توضیح و توجیه این تفاوت آسان است. زمانی که مرورگر مقدار صفت را می‌خواند، یک کنترل‌کننده با بدنه‌‌ای شامل محتویات آن صفت می‌سازد.

پس چیزی شبیه این خاصیت ایجاد می‌شود:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- محتویات صفت اینجا قرار می‌گیرد
*/!*
};
```

**برای کنترل‌کننده‌ها از `setAttribute` استفاده نکنید.**

این چنین فراخوانی‌ای کار نخواهد کرد:

```js run no-beautify
// یک کلیک روی <body> باعث بروز خطا می‌شود،
// چون که صفت‌ها همیشه رشته هستند، و تابع تبدیل به رشته می‌شود
document.body.setAttribute('onclick', function() { alert(1) });
```

**بزرگی و کوچکی حروف برای خاصیت‌های DOM اهمیت‌دارد.**

کنترل‌کننده‌ ‌را به `elem.onclick` اختصاص دهید، نه به `elem.ONCLICK`، چونکه خصوصیات عناصر DOM به بزرگی و کوچکی حروف حساس هستند.

## addEventListener

The fundamental problem of the aforementioned ways to assign handlers -- we can't assign multiple handlers to one event.

Let's say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.

We'd like to assign two event handlers for that. But a new DOM property will overwrite the existing one:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // replaces the previous handler
```

Developers of web standards understood that long ago and suggested an alternative way of managing handlers using special methods `addEventListener` and `removeEventListener`. They are free of such a problem.

The syntax to add a handler:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Event name, e.g. `"click"`.

`handler`
: The handler function.

`options`
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not call `preventDefault()`, we'll explain that later in <info:default-browser-action>.

To remove the handler, use `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Removal requires the same function"
To remove a handler we should pass exactly the same function as was assigned.

This doesn't work:

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

The handler won't be removed, because `removeEventListener` gets another function -- with the same code, but that doesn't matter, as it's a different function object.

Here's the right way:

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Please note -- if we don't store the function in a variable, then we can't remove it. There's no way to "read back" handlers assigned by `addEventListener`.
````

Multiple calls to `addEventListener` allow to add multiple handlers, like this:

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

As we can see in the example above, we can set handlers *both* using a DOM-property and `addEventListener`. But generally we use only one of these ways.

````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Only with `addEventListener`.

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and DOM is built.

```js
// will never run
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// this way it works
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
So `addEventListener` is more universal. Although, such events are an exception rather than the rule.
````

## Event object

To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keydown", but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an *event object*, puts details into it and passes it as an argument to the handler.

Here's an example of getting pointer coordinates from the event object:

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Some properties of `event` object:

`event.type`
: Event type, here it's `"click"`.

`event.currentTarget`
: Element that handled the event. That's exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then we can get the element from  `event.currentTarget`.

`event.clientX / event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when we come to different events in details.

````smart header="The event object is also available in HTML handlers"
If we assign a handler in HTML, we can also use the `event` object, like this:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

That's possible because when the browser reads the attribute, it creates a handler like this:  `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.
````


## Object handlers: handleEvent

We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.

For instance:


```html run
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use a class for that:


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Now event handlers are clearly separated, that may be easier to support.

## Summary

There are 3 ways to assign event handlers:

1. HTML attribute: `onclick="..."`.
2. DOM property: `elem.onclick = function`.
3. Methods: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can't write lots of code in there.

DOM properties are ok to use, but we can't assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler -- it gets an event object as the first argument. That object contains the details about what's happened.

We'll learn more about events in general and about different types of events in the next chapters.
