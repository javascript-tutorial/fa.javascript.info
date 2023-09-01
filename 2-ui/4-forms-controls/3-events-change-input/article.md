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

این به این دلیل است که `clipboardData` پیاده‌سازی `DataTransfer` interface را به عهده دارد، معمولا برای drag'n'drop و copy/pasting استفاده می‌شود. این الان کمی از خارج از محتوای ماست، اما می‌نوانید methodهای آن را در [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface). پیدا کنید. 

همچنین یک asynchronous API اضافی برای دسترسی به clipboard وجود دارد. اطلاعات بیشتر در جزئیات در [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### محدودیت‌های امنیتی

در سطح سیستم عامل، clipboard یک چیز global است. یک کاربر ممکن است بین applicationهای مختلف جابه‌جا شود، چیزهای مختلفی را copy/paste کند و صفحه‌ی مرورگر نباید همه‌ی این‌ها را ببیند.

بنابراین اکثر مرورگرها فقط در محدوده اقدامات خاص کاربر، مانند copy/paste کردن و ...، دسترسی یکپارچه خواندن/نوشتن به clipboard را مجاز می‌کنند.

در تمام مرورگرها به جز Firefox ممنوع است که با `dispatchEvent` یک سری "custom" clipboard event ایجاد کنیم. و حتی اگر بخاهیم چنین eventهایی را ارسال کنیم، مضخصات به وضوح بیان می‌کنند که چنین "syntetic" eventهایی نباید به clipboard دسترسی داشته باشند.

حتی اگر کسی تصمیم بگیرد که `event.clipboardData` را در یک event handler ذخیره کند و بعدا به آن دسترسی داشته باشد -- کار نخواهد کرد.

برای تکرار، [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) تنها در زمینه‌ی user-initiated event handler کار می‌کند.

از طرفی دیگر، [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) API جدیدتری است که برای استفاده در این زمینه طراحی شده است. اگر نیاز باشد، از کاربر اجازه می‌گیرد. 

## خلاصه

Data change events:

| Event | توضیحات | Specials |
|---------|----------|-------------|
| `change`| یک مقدار تفییر کرده است. | .فعال می‌شود focus loss زمان text inputs برای |
| `input` | روی هر تغییر text inputs برای | بلافاصله فعال می‌شود `change` برعکس |
| `cut/copy/paste` | Cut/copy/paste actions. | .پشتیبانی می‌کنند `navigator.clipboard` از Firefox  دسترسی می‌دهد همچنین تمام مرورگرها به جز clipboard به `event.clipboardData` property .می‌تواند جلوگیری شود action از این|
