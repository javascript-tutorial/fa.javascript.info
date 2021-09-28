# بالارفتن و گرفتن

با یک مثال شروع می‌کنیم.

این کنترل‌کننده به `<div>` اختصاص داده شده، اما در صورتی که هر تگ داخل آنرا مانند `<em>` یا `<code>` کلیک کنید، باز هم اجرا می‌شود:

```html autorun height=60
<div onclick="alert('کنترل‌کننده!')">
  <em>اگر روی <code>EM</code> کلیک کنید، کنترل‌کننده روی <code>DIV</code> اجرا می‌شود.</em>
</div>
```

این رفتار کمی عجیب نیست؟ چرا کنترل‌کننده‌ی روی `<div>` باید زمانی که اجرا شود که کلیک در اصل روی `<em>` بوده است؟

## بالا رفتن حبابی

رفتار بالارفتن حبابی ساده است.

**وقتی که رویدادی روی یک عنصر اتفاق می‌افتد، اول کنترل‌کننده‌ها را روی خودش اجرا می‌کند، بعد روی عنصر پدرش اجرا می‌کند، و همینطور تا بالاترین اجداد آن.**

فرض کنیم که سه عنصر تو در تو به صورت ‍`FORM > DIV > P` با یک کنترل‌کننده روی هر کدام از آن‌ها داشته باشیم:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

یک کلیک روی `<p>` اول باعث فراخوانی `onlick` به صورت زیر می‌شود:
1. روی `<p>`.
2. روی `<div>` بیرونی.
3. روی `<form>` بیرونی.
4. همینطور بالا می‌رود تا روی شئ `document` هم اجرا شود.

![](event-order-bubbling.svg)

پس اگر روی `<p>` کلیک کنیم، سه پیام به صورت روبرو مشاهده می‌کنیم: `p` -> `div` -> `form`.

این روند اصلاحا "بالارفتن حبابی" یا "bubbling" است، چون رویدادها از داخلی‌ترن عنصر تا عنصرهای والد مانند یک حباب در آب، بالا می‌روند.

```warn header="*تقریبا* همه رویدادها بالا می‌روند."
کلمه کلیدی در این جمله "تقریبا" است.

برای مثال، یک رویداد `focus` بالا نمی‌روند. مثال‌های دیگری نیز وجود دارد که با آنها آشنا خواهیم شد. با این حال این یک استثنا است تا یک قانون. بیشتر رویدادها بالا می‌روند.
```

## event.target

یک کنترل‌کننده روی یک عنصر والد همیشه می‌تواند جزئیاتی درباره اینکه رویداد درواقعیت کجا اتفاق افتاده است را بگیرد.

**عمیق‌ترین عنصری که باعث فراخوانی یک رویداد شده را عنصر *هدف* می‌نامند، که می‌توانیم با `event.target` به آن دسترسی یابیم.**

به تفاوت آن با `this` دقت کنید (=`event.currentTarget`):

- `event.target` -- عنصر "هدف" است که رویداد را برای اولین بار فراخوانی کرده، در طول روند بالارفتن تغییر نمی‌کند.
- ‍`this` -- عنصر "فعلی" است، که رویداد در حال حاضر روی آن در حال اجرا است.

برای مثال، اگر فقط یک کنترل‌کننده روی `form.onclick` داشته باشیم، سپس می‌تواند همه کلیک‌های داخل فرم را "بگیرد". بدون توجه به اینکه کلیک کجا اتفاق افتاده، همه راه را تا `<form>` بالا می‌رود و کنترل‌کننده را اجرا می‌کند.

درون کنترل‌کننده `form.onclick`:

- `this` (=`event.currentTarget`) همان عنصر `<form>`‌ است، چون کنترل‌کننده روی آن اجرا شده.
‍‍- `event.target` عنصری درون فرم که در اصل کلیک روی آن اتفاق افتاده.

ببینید:

[codetabs height=220 src="bubble-target"]

امکان دارد که `event.target` همان `this` باشد -- زمانی این اتفاق می‌افتد که دقیقا روی خود `<form>` کلیک شود.

## جلوگیری از بالارفتن

A bubbling event goes from the target element straight up. Normally it goes upwards till `<html>`, and then to `document` object, and some events even reach `window`, calling all handlers on the path.

But any handler may decide that the event has been fully processed and stop the bubbling.

The method for it is `event.stopPropagation()`.

For instance, here `body.onclick` doesn't work if you click on `<button>`:

```html run autorun height=60
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
If an element has multiple event handlers on a single event, then even if one of them stops the bubbling, the other ones still execute.

In other words, `event.stopPropagation()` stops the move upwards, but on the current element all other handlers will run.

To stop the bubbling and prevent handlers on the current element from running, there's a method `event.stopImmediatePropagation()`. After it no other handlers execute.
```

```warn header="Don't stop bubbling without a need!"
Bubbling is convenient. Don't stop it without a real need: obvious and architecturally well thought out.

Sometimes `event.stopPropagation()` creates hidden pitfalls that later may become problems.

For instance:

1. We create a nested menu. Each submenu handles clicks on its elements and calls `stopPropagation` so that outer menu don't trigger.
2. Later we decide to catch clicks on the whole window, to track users' behavior (where people click). Some analytic systems do that. Usually the code uses `document.addEventListener('click'…)` to catch all clicks.
3. Our analytic won't work over the area where clicks are stopped by `stopPropagation`. Sadly, we've got a "dead zone".

There's usually no real need to prevent the bubbling. A task that seemingly requires that may be solved by other means. One of them is to use custom events, we'll cover them later. Also we can write our data into the `event` object in one handler and read it in another one, so we can pass to handlers on parents information about the processing below.
```


## Capturing

There's another phase of event processing called "capturing". It is rarely used in real code, but sometimes can be useful.

The standard [DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) describes 3 phases of event propagation:

1. Capturing phase -- the event goes down to the element.
2. Target phase -- the event reached the target element.
3. Bubbling phase -- the event bubbles up from the element.

Here's the picture of a click on `<td>` inside a table, taken from the specification:

![](eventflow.svg)

That is: for a click on `<td>` the event first goes through the ancestors chain down to the element (capturing), then it reaches the target, and then it goes up (bubbles), calling handlers on its way.

**Before we only talked about bubbling, because the capturing phase is rarely used. Normally it is invisible to us.**

Handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.

To catch an event on the capturing phase, we need to set the 3rd argument of `addEventListener` to `true`.

There are two possible values for that optional last argument:

- If it's `false` (default), then the handler is set on the bubbling phase.
- If it's `true`, then the handler is set on the capturing phase.

Note that while formally there are 3 phases, the 2nd phase ("target phase": the event reached the element) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase.

If one puts capturing and bubbling handlers on the target element, the capture handler triggers last in the capturing phase and the bubble handler triggers first in the bubbling phase.

Let's see it in action:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

The code sets click handlers on *every* element in the document to see which ones are working.

If you click on `<p>`, then the sequence is:

1. `HTML` -> `BODY` -> `FORM` -> `DIV` (capturing phase, the first listener):
2. `P` (target phase, triggers two times, as we've set two listeners: capturing and bubbling)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note that `P` shows up two times: at the end of capturing and at the start of bubbling.

There's a property `event.eventPhase` that tells us the number of the phase on which the event was caught. But it's rarely used, because we usually know it in the handler.

## Summary

The event handling process:

- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` to the root, calling handlers assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.

Each handler can access `event` object properties:

- `event.target` -- the deepest element that originated the event.
- `event.currentTarget` (=`this`) -- the current element that handles the event (the one that has the handler on it)
- `event.eventPhase` -- the current phase (capturing=1, bubbling=3).

Any event handler can stop the event by calling `event.stopPropagation()`, but that's not recommended, because we can't really be sure we won't need it above, maybe for completely different things.

The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logic behind that.

In real world, when an accident happens, local authorities react first. They know best the area where it happened. Then higher-level authorities if needed.

The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular `<td>` may be suited for that exactly `<td>`, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

Bubbling and capturing lay the foundation for "event delegation" -- an extremely powerful event handling pattern that we study in the next chapter.
