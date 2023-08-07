# Focus: متمرکز کردن/محو کردن


یک element وقتی focus دریافت می‌کند که کاربر روی آن click کند یا از کلید `key:Tab` در صفحه‌کلید استفاده کند. همچنین یک attribute به نام `autofocus` در HTML وجود دارد که وقتی صفحه load می‌شود، به صورت پیش‌فرض focus را روی یک element می‌گذارد و روش‌های دیگری برای دریافت focus. 

قرار دادن focus روی یک element به طور کلی یعنی: "آماده شدن برای دریافت داده در اینجا"، پس این زمانی است که می‌توانیم code را برای مقداردهی اولیه برای عملکرد مورد نیاز اجرا کنیم. 

لحظه‌ای که focus از دست می‌رود ("blur") حتی می‌تواند مهم‌تر باشد. آن وقتی است که کاربر روی جایی دیگر click می‌کند یا `key:Tab` را فشار می‌دهد تا به form بعدی برود یا راه‌های دیگری نیز وجود دارد. 

از دست دادن داده به طور کلی یعنی "داده وارد شده است"، پس ما می‌توانیم کد را اجرا کنیم تا آن را چک کنیم یا حتی آن را در server ذخیره کنیم و چیزهای دیگر.

هنگام کار با focus eventها،‌ ویژگی‌های مهمی وجود دارند. ما در ادامه بیشترین تلاش خود را می‌کنیم تا آن‌ها را پوشش دهیم. 

## Events focus/blur

هنگام متمرکز شده از `focus` استفاده می‌شود و `blur` -- برای زمانی که element آن focus را از دست می‌دهد. 

بیایید برای اعتبارسنجی یک input field از آن‌ها استفاده کنیم. 

در مثال زیر:

- کنترل‌کننده‌ی `blur` چک می‌کند که یک email وارد شده است یا نه، و اگر نه -- یک error نشان می‌دهد. 
- کنترل‌کننده‌ی `focus` پیام error را پنهان می‌کند (در حالت `blur` دوباره چک می‌شود):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

ایمیلتان لطفا: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // ایمیل نیست
    input.classList.add('invalid');
    error.innerHTML = '.لطفا یک ایمیل درست وارد کنید'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // را پاک می‌کند، چون کاربر می‌خواهد دوباره چیزی را وارد کند error علامت
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

زبان HTML مدرن به ما اجازه می‌دهد که بسیاری از اعتبارسنجی‌ها را با input attributeها انجام دهیم: `required`، `pattern` و چیزهای دیگر. و بعضی وقت‌ها دقیقا چیزهایی هستند که ما نیاز داریم. وقتی که می‌خواهیم انعطاف‌پذیری بیشتری داشته باشیم، می‌توانیم از javascript استفاده کنیم. همچنین اگر داده درست باشد، ما می‌توانیم داده‌ی تغییرداده‌شده را به صورت خودکار به سرور بفرستیم.


## متدهای focus/blur

تابع‌های `elem.focus()` و `elem.blur()` برای این هستند که focus را روی element فعال/غیرفعال کنند. 

برای مثال، بیایید کاری کنیم که اگر مقدار نامعتبر باشد، نتواند input را ترک کند:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

ایمیلتان لطفا: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="کنید focus ایمیل را نامعتبر کنید و سعی کنید اینجا">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // نیست email
      // را نشان می‌دهد error
      this.classList.add("error");
*!*
      // ... را برگردانید focus و
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

این روی تمام مرورگرها به جز Firefox کار می‌کند ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

If we enter something into the input and then try to use `key:Tab` or click away from the `<input>`, then `onblur` returns the focus back.

Please note that we can't "prevent losing focus" by calling `event.preventDefault()` in `onblur`, because `onblur` works *after* the element lost the focus.

In practice though, one should think well, before implementing something like this, because we generally *should show errors* to the user, but *should not prevent their progress* in filling our form. They may want to fill other fields first.

```warn header="JavaScript-initiated focus loss"
A focus loss can occur for many reasons.

One of them is when the visitor clicks somewhere else. But also JavaScript itself may cause it, for instance:

- An `alert` moves focus to itself, so it causes the focus loss at the element (`blur` event), and when the `alert` is dismissed, the focus comes back (`focus` event).
- If an element is removed from DOM, then it also causes the focus loss. If it is reinserted later, then the focus doesn't return.

These features sometimes cause `focus/blur` handlers to misbehave -- to trigger when they are not needed.

The best recipe is to be careful when using these events. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.
```
## Allow focusing on any element: tabindex

By default, many elements do not support focusing.

The list varies a bit between browsers, but one thing is always correct: `focus/blur` support is guaranteed for elements that a visitor can interact with: `<button>`, `<input>`, `<select>`, `<a>` and so on.

On the other hand, elements that exist to format something, such as `<div>`, `<span>`, `<table>` -- are unfocusable by default. The method `elem.focus()` doesn't work on them, and `focus/blur` events are never triggered.

This can be changed using HTML-attribute `tabindex`.

Any element becomes focusable if it has `tabindex`. The value of the attribute is the order number of the element when `key:Tab` (or something like that) is used to switch between them.

That is: if we have two elements, the first has `tabindex="1"`, and the second has `tabindex="2"`, then pressing `key:Tab` while in the first element -- moves the focus into the second one.

The switch order is: elements with `tabindex` from `1` and above go first (in the `tabindex` order), and then elements without `tabindex` (e.g. a regular `<input>`).

Elements without matching `tabindex` are switched in the document source order (the default order).

There are two special values:

- `tabindex="0"` puts an element among those without `tabindex`. That is, when we switch elements, elements with `tabindex=0` go after elements with `tabindex ≥ 1`.

    Usually it's used to make an element focusable, but keep the default switching order. To make an element a part of the form on par with `<input>`.

- `tabindex="-1"` allows only programmatic focusing on an element. The `key:Tab` key ignores such elements, but method `elem.focus()` works.

For instance, here's a list. Click the first item and press `key:Tab`:

```html autorun no-beautify
Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

The order is like this: `1 - 2 - 0`. Normally, `<li>` does not support focusing, but `tabindex` full enables it, along with events and styling with `:focus`.

```smart header="The property `elem.tabIndex` works too"
We can add `tabindex` from JavaScript by using the `elem.tabIndex` property. That has the same effect.
```

## Delegation: focusin/focusout

Events `focus` and `blur` do not bubble.

For instance, we can't put `onfocus` on the `<form>` to highlight it, like this:

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

The example above doesn't work, because when user focuses on an `<input>`, the `focus` event triggers on that input only. It doesn't bubble up. So `form.onfocus` never triggers.

There are two solutions.

First, there's a funny historical feature: `focus/blur` do not bubble up, but propagate down on the capturing phase.

This will work:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // put the handler on capturing phase (last argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Second, there are `focusin` and `focusout` events -- exactly the same as `focus/blur`, but they bubble.

Note that they must be assigned using `elem.addEventListener`, not `on<event>`.

So here's another working variant:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Summary

Events `focus` and `blur` trigger on an element focusing/losing focus.

Their specials are:
- They do not bubble. Can use capturing state instead or `focusin/focusout`.
- Most elements do not support focus by default. Use `tabindex` to make anything focusable.

The current focused element is available as `document.activeElement`.
