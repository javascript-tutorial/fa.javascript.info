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

اگر چیزی را در input وارد کنیم و سپس سعی کنیم از `key:Tab` استفاده کنیم یا روی input کلیک کنیم، `onblur` فوکوس را برمی‌گرداند. 

لطفا توجه داشته باشید که ما نمی‌توانیم با فراخوانی `event.preventDefault()` از "از دست دادن focus" در `onblur` جلوگیری کنیم، چون `onblur` *پس از* اینکه عنصر focus را از دست می‌دهد کار می‌کند. 

اگرچه در عمل، قبل از اینکه چیزی مثل این را پیاده‌سازی کنیم،‌باید خوب فکر کنیم، چون به طور کلی *باید به کاربر error نمایش دهیم* اما *نباید مانع پیشرفت آن‌ها* در پر کردن form خودمان شویم. ممکن است آن‌ها بخواهند ابتدا fieldهای دیگر را پر کنند. 

```warn header="JavaScript-initiated focus loss"
ممکن است به دلایل مختلفی رخ دهد focus از دست رفتن

:هم می‌تواند باعث آن شود. برای مثال javascript می‌کند اما خود click یکی از آن‌ها وقتی است که بازدیدکننده روی جای دیگری

(`focus` event) نادیده گرفته می‌شود، برمی‌گردد `alert` و وقتی که (`blur` event) در عنصر می‌شود focus فوکوس را به خودش منتقل می‌کند، پس باعث از بین رفتن `alert` یک -

برگردانده نمی‌شود focus می‌شود. اگر آن بعدا دوباره وارد شود focus پاک شود، آنگاه آن هم باعث از بین رفتن DOM از element اگر یک -

.شوند trigger بدرفتاری کنند -- زمانی که نیاز نیست `focus/blurs` این ویژگی‌ها گاهی باعث می‌شوند -

توسط کاربر را ردیابی کنیم، خودمان باید از ایجاد آن اجتناب کنیم. focus-loss مراقب باشید. اگر می‌خواهیم events بهترین دستورالعمل این است که موقع کار با این
```
## اجازه focus کردن روی هر عنصری را می‌دهد: tabindex

به صورت پیش‌فرض، بیشتر عناصر از focus پشتیبانی نمی‌کنند.

این لیست کمی میان مرورگرها تفاوت می‌کند اما یک چیز همیشه درست است: پشتیبانی از `focus/blur` برای elementهایی که یک کاربر می‌تواند با آن‌ها تعامل داشته باشد:‌ `<button>`, `<input>`, `<select>`, `<a>` و ... تضمین شده است.

از طرفی دیگر، عناصری که برای format کردن چیزی وجود دارند،‌ مثل `<div>`، `<span>`، `<table>` -- به طور پیش‌فرض غیر قابل focus هستند. متد `elem.focus()` روی آن‌ها کار نمی‌کند و eventهای `focus/blur` هیچ وقت trigger نمی‌شوند. 

می‌توانیم این را با `tabindex` که یک HTML-attribute است تغییر دهیم.

هر elementای اگر `tabindex` داشته باشد، قابل focus می‌شود. هنگامی که `key:Tab` (یا چیزی شبیه آن) برای جابه‌جایی بین آن‌ها استفاده می‌شود،‌ مقدار attribute برابر order number آن element می‌شود. 


یعنی: اگر ما دو element داشته باشیم که اولی `tabindex="1"` داشته باشد و دومی `tabindex="2"` داشته باشد، آنگاه وقتی در اولین element هستیم و `key:Tab` را فشار می‌دهیم -- focus را به دومی می‌برد.

ترتیب تغییر به این صورت است: elementهایی با `tabindex` از `1` و بالاتر ابتدا می‌روند (در ترتیب `tabindex`) و بعد از آن، elementهای بدون `tabindex` (مثلا یک `<input>` معمولی)

عناصری که با `tabindex` تطبیق پیدا نمی‌کنند، به ترتیب document source (به ترتیب پیش‌فرض) تغییر می‌کنند. 

دو مقدار استثنا وجود دارند:‌

- مقدار `tabindex="0"` یک element را میان عناصری که `tabindex` ندارند قرار می‌دهد. یعنی،‌ وقتی elementها را تغییر می‌دهیم، elementهایی با `tabindex=0` بعد از elementهایی با `tabindex ≥ 1` می‌آیند.

    معمولا برای focusable کردن یک element استفاده می‌شود، اما ترتیب switching پیش‌فرض را حفظ کنید. برای اینکه یک element به صورت همتراز با `<input>` باشد. 

- مقدار `tabindex="-1"` فقط امکان programmatic focusing روی یک element را فراهم می‌کند. `key:Tab` همچین کلیدهایی را نادیده می‌گیرد اما `elem.focus()` کار می‌کند.

برای مثال، اینجا یک لیست داریم. روی اولین item کلیک کنید و `key:Tab` را فشار دهید.

```html autorun no-beautify
روی اولین item کلیک کنید و Tab را فشار دهید. order را پیگری کنید. لطفا توجه داشته باشد که تعداد زیادی Tab بعدی می‌تواند focus را از iframe داخل مثال خارج کند.
<ul>
  <li tabindex="1">یک</li>
  <li tabindex="0">صفر</li>
  <li tabindex="2">دو</li>
  <li tabindex="-1">منهای یک</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

ترتیب به این صورت است: `1 - 2 - 0`. به طور نرمال، `<li>` از focus پشتیبانی نمی‌کند اما `tabindex` آن را به همراه eventها و style دادن با `:focus` مهیا می‌کند.

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
