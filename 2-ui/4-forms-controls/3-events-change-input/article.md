# Events: change, input, cut, copy, paste

بیایید eventهای مختلفی که همراه با آپدیت داده‌ها هستند پوشش دهیم.

## Event: change

وقنی که تغییر یک element تمام می‌شود، `change` event فعال می‌شود.

برای text inputها این یعنی که event زمانی اتفاق می‌افتد که focus را از دست می‌دهد.

برای مثال وقتی که ما داریم در text field زیر تایپ می‌کنیم -- هیچ eventای وجود ندارد. اما وقتی focus را به جایی دیگر منتقل می‌کنیم، برای مثال، روی یک button کلیک می‌کنیم، یک `change` event به وجود خواهد آمد:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

برای دیگر elementها: `select` و `input type=checkbox/radio` دقیقا بعد از آن که انتخاب تغییر می‌کند فعال می‌شود:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">چیزی را انتخاب کنید</option>
  <option value="1">انتخاب 1</option>
  <option value="2">انتخاب 2</option>
  <option value="3">انتخاب 3</option>
</select>
```


## Event: input

هر بار پس از آن که یک مقدار توسط کاربر تغییر می‌کند، `input` event فعال می‌شود.

برعکس keyboard inputها، آن با هر تغییر مقداری فعال می‌شود، حتی آن‌هایی که شامل keyboard actions نمی‌شوند: paste کردن با یک موش یا استفاده از تشخیص گفتار برای دیکته کردن متن.

برای مثال:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

اگر بخواهیم تمام تغییرات یک `<input>` را هندل کنیم، آنگاه این event بهترین انتخاب است.

از طرفی دیگر، `input` event با keyboard input و فعالیت‌های دیگری که شامل تغییر value نمی‌شوند فعال نمی‌شود، مثل فشار دادن کلیدهای جهت‌دار `key:⇦` `key:⇨` زمانی که داخل input هستیم.

```smart header="جلوگیری کرد. `oninput` نمی‌توان از چیزی در"

بعد از اینکه value تغییر می‌کند، `input` event فعال می‌شود.


پس آن جا نمی‌توانیم از `event.preventDefault()` استفاده کنیم -- بسیار دیر است و تاثیری نخواهد داشت.
```

## Events: cut, copy, paste

.یک مقدار اتفاق می‌اقتد cut کردن/copy کردن/کردن paste زمان events این

.شده را فراهم می‌کنند cut/copy/paste تعلق دارند و دسترسی به داده‌ای را که [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class آن‌ها به

.نمی‌شود copy/paste استفاده کنیم، آنگاه هیچ چیز `event.preventDefault()` از action همچنین می‌توانیم برای لغو یک

:کنیم را نشان می‌دهد cut/copy/paste پیشگیری می‌کند و متنی که تلاش می‌کنیم `cut/copy/paste` events برای مثال: کد زیر از تمام 

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

لطفا توجه داشته باشید: درون `cut` and `copy` event handlers یک فراخوانی `event.clipboardData.getData(...)` یک رشته‌ی خالی برمی‌گرداند. این به این دلیل است که از نظر تکنیکی، داده هنوز در clipboard نیست. اگر از `event.preventDefault()` استفاده کنیم آن اصلا کپی نمی‌شود. 

پس مثال بالا از `document.getSelection()` استفاده می‌کند تا متن انتخاب‌شده را بگیرد. می‌توانید جزئیات بیشتری درباره‌ی document selection در مقاله‌ی <info:selection-range> پیدا کنید. 

این ممکن است که فقط متن را، بلکه همه چیز را copy/paste کنیم. برای مثال می‌توانیم یک فایل را در OS file manager کپی و paste کنیم.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "syntetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.

## Summary

Data change events:

| Event | Description | Specials |
|---------|----------|-------------|
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
