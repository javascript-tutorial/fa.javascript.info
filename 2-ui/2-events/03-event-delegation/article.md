
# Event delegation

کپچر (capture) و bubbling ایونت ها به ما این توانایی را میدهد که از یکی از قویترین الگوهای کنترل ایونت هندلینگ یعنی *event delegation* استفاده کنیم.

ایده این است که اگر تعداد زیادی المنت داریم و میخواهیم به یک شکل آنها رو هندل کنیم به جای اینکه به تک تک آنها هندلر مجزا اختصاص دهیم، یک هندلر را برای المنت والد مشترک آنها اختصاص میدهیم.

در هندلری که اختصاص میدهیم با استفاده از `event.target` محل وقوع رویداد را متوجه میشویم و بنابراین میتوانیم آنرا هندل کنیم.

Let's see an example -- the [Ba-Gua diagram](http://en.wikipedia.org/wiki/Ba_gua) reflecting the ancient Chinese philosophy.
بیاید تا با هم یک مثال رو بررسی کنیم -- [دیاگرام Ba-Gua] (http://en.wikipedia.org/wiki/Ba_gua) که یک فلسفه چینی باستانی رو نشون میده

به این شکل :

[iframe height=350 src="bagua" edit link]

The HTML is like this:
اچ‌تی‌ام‌ال به این صورت هست:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 more lines of this kind...</tr>
  <tr>...2 more lines of this kind...</tr>
</table>
```

جدول 9 سلول دارد اما این عدد امکان دارد 99 یا 9999 باشد. مهم نیست.

**ماموریت ما این است که سلول `<td>` که روی آن کلیک شد را هایلایت کنیم**

به جای آنکه هندلر `onclick` را به هریک از تگ های `<td>` اساین کنیم (که ممکن است تعداد زیادی از آنها داشته باشیم)، هندلر "catch-all" را برروی المنت `<table>` اساین میکنیم.

اینکار باعث استفاده از `event.target` برای گرفتن المنت کلیک شده و هایلایت آن می‌شود.

کد:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // where was the click?

  if (target.tagName != 'TD') return; // not on TD? Then we're not interested

  highlight(target); // highlight it
};
*/!*

function highlight(td) {
  if (selectedTd) { // remove the existing highlight if any
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // highlight the new td
}
```

این کد به اینکه چند سلول داخل جدول قرار دارد اهمیتی نمیدهد. میتوانیم المنت‍‌های `<td>` رو به شکل دینامیکی هر زمان که خواستیم اضافه/کم کنیم و همچنان هایلایت کردن کار خواهد کرد.

اما همچنان یک اشکال وجود دارد.

کلیک ممکن است نه روی `<td>` بلکه درون آن اتفاق بیفتد.

در اینصورت اگر به داخل HTML نگاهی بندازیم میتوانیم تگ های درون `<td>` را ببینمی. مثل المنت `<strong>`

```html
<td>
*!*
  <strong>Northwest</strong>
*/!*
  ...
</td>
```

طبیعتا زمانی که یک کلیک بر روی `<strong>` انجام میشود آنگاه مقدار `event.target` برابر آن خواهد شد.

![](bagua-bubble.svg)

در هندلر `table.onclick` ما باید مقدار `event.target` را گرفته و از این طریق مشخص کنیم که آیا کلیک درون `<td>` اتفاق افتاده یا نه.

کد بهبود یافته شده:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

توضیحات:
1. The method `elem.closest(selector)` returns the nearest ancestor that matches the selector. In our case we look for `<td>` on the way up from the source element.
2. If `event.target` is not inside any `<td>`, then the call returns immediately, as there's nothing to do.
3. In case of nested tables, `event.target` may be a `<td>`, but lying outside of the current table. So we check if that's actually *our table's* `<td>`.
4. And, if it's so, then highlight it.

در نتیحه ما یک کد هایلایتر سریع و کارا داریم که عملکرد آن به تعداد سلول‌های `<td>` در جدول ارتباطی ندارد.

## Delegation example: actions in markup

استفاده‌های دیگری هم برای event delegation وجود دارد

در نظر بگیرید که میخواهیم یک منو با دکمه‌های "Save", "Load"، "Search" و مانند آن بسازیم آبجکتی با متدهای `save`, `load`, `search` و ... وجود دارد. چطور میتوانیم این متدهارا به دکمه‌های مربوطه وصل کنیم؟

The first idea may be to assign a separate handler to each button. But there's a more elegant solution. We can add a handler for the whole menu and `data-action` attributes for buttons that has the method to call:
اولین ایده‌ای که به ذهن میرسد ممکن است این باشد که برای هریک از دکمه‌ها هندلر مجزا اساین کنیم. اما راه‌حل بهتری هم وجود دارد. می‌توانیم یک هندلر به کل منو و اتریبیوت‌های `data-action` دکمه‌ها اضافه کنیم.

```html
<button *!*data-action="save"*/!*>Click to Save</button>
```

هندلر اتریبیوت را خوانده و متد را اجرا میکند. نگاهی به این مثال واقعی بیندازید:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

Please note that `this.onClick` is bound to `this` in `(*)`. That's important, because otherwise `this` inside it would reference the DOM element (`elem`), not the `Menu` object, and `this[action]` would not be what we need.

So, what advantages does delegation give us here?

```compare
+ We don't need to write the code to assign a handler to each button. Just make a method and put it in the markup.
+ The HTML structure is flexible, we can add/remove buttons at any time.
```

We could also use classes `.action-save`, `.action-load`, but an attribute `data-action` is better semantically. And we can use it in CSS rules too.

## The "behavior" pattern

We can also use event delegation to add "behaviors" to elements *declaratively*, with special attributes and classes.

The pattern has two parts:
1. We add a custom attribute to an element that describes its behavior.
2. A document-wide handler tracks events, and if an event happens on an attributed element -- performs the action.

### Behavior: Counter

For instance, here the attribute `data-counter` adds a behavior: "increase value on click" to buttons:

```html run autorun height=60
Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // if the attribute exists...
      event.target.value++;
    }

  });
</script>
```

If we click a button -- its value is increased. Not buttons, but the general approach is important here.

There can be as many attributes with `data-counter` as we want. We can add new ones to HTML at any moment. Using the event delegation we "extended" HTML, added an attribute that describes a new behavior.

```warn header="For document-level handlers -- always `addEventListener`"
When we assign an event handler to the `document` object, we should always use `addEventListener`, not `document.on<event>`, because the latter will cause conflicts: new handlers overwrite old ones.

For real projects it's normal that there are many handlers on `document` set by different parts of the code.
```

### Behavior: Toggler

One more example of behavior. A click on an element with the attribute `data-toggle-id` will show/hide the element with the given `id`:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Show the subscription form
</button>

<form id="subscribe-mail" hidden>
  Your mail: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

Let's note once again what we did. Now, to add toggling functionality to an element -- there's no need to know JavaScript, just use the attribute `data-toggle-id`.

That may become really convenient -- no need to write JavaScript for every such element. Just use the behavior. The document-level handler makes it work for any element of the page.

We can combine multiple behaviors on a single element as well.

The "behavior" pattern can be an alternative to mini-fragments of JavaScript.

## خلاصه

الگوی Event delegation واقعا باحال است! این الگو یکی از مفیدترین الگوها برای ایونت‌های DOM است.

این الگو معمولا برای کنترل تعداد زیادی از المان‌های مشابه استفاده می‌شود اما این تنها کاربرد آن نیست.

الگوریت:

1. یک هندلر برای کل کانتینر قرار دهید.
2. در هندلر المنت سورس را از طریق `event.target` بیابید.
4. اگر ایونت درون المنتی که موردنظر ماست اتفاق افتاده است آنگاه ایونت را هندل کنید.

فواید:

```compare
+ عدم نیاز به اضافه کردن تعداد زیادی هندلر باعث ذخیره حافظه و ساده‌سازی شروع میشود
+ کد کمتر: زمان اضافه و کم کردن المان‌ها نیازی به تغییر در هندلرها نیست.
+ تغییرات DOM: میتواینم با استفاده از `innerHTML` و ابزارهای مشابه آن تعداد زیادی المان را کم/زیاد کنیم.
```

بدون شک این الگو هم محدودیت‌های خودش را دارد:

```compare
- First, the event must be bubbling. Some events do not bubble. Also, low-level handlers should not use `event.stopPropagation()`.
- Second, the delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the load is negligible, so we don't take it into account.
```
