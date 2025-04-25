
# Template element (عنصر قالب)


عنصر قالب 
<template> به‌عنوان یک فضای ذخیره‌سازی برای الگوهای HTML (HTML Markup Templates) عمل می‌کند. مرورگر محتوای درون آن را نادیده می‌گیرد و فقط از نظر صحت نگارشی (Syntax) آن را بررسی می‌کند، اما ما می‌توانیم با استفاده از JavaScript به آن دسترسی پیدا کنیم و از آن برای ایجاد عناصر دیگر استفاده کنیم.

از نظر تئوری، ما می‌توانیم هر عنصر نامرئی دیگری را در HTML قرار دهیم تا به‌عنوان فضای ذخیره‌سازی برای کد HTML استفاده شود. پس چه چیزی <template> را خاص می‌کند؟

اول اینکه، محتوای آن می‌تواند هر کد HTML معتبری باشد، حتی اگر در حالت معمول نیاز به تگ محصورکننده‌ی مناسب داشته باشد.

برای مثال، ما می‌توانیم یک ردیف جدول <tr> را درون آن قرار دهیم:

```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

معمولاً اگر سعی کنیم تگ `<tr>` را داخل مثلاً یک `<div>` قرار دهیم، مرورگر ساختار نامعتبر DOM را تشخیص می‌دهد و آن را "اصلاح" می‌کند؛ یعنی به‌طور خودکار یک `<table>` به اطراف آن اضافه می‌کند. اما این چیزی نیست که ما بخواهیم. در عوض، `<template>` دقیقاً همان چیزی را که درونش قرار می‌دهیم، بدون تغییر نگه می‌دارد.

ما حتی می‌توانیم استایل‌ها و اسکریپت‌ها را نیز داخل `<template>` قرار دهیم:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```
مرورگر محتوای درون `<template>` را «خارج از سند» در نظر می‌گیرد: استایل‌ها اعمال نمی‌شوند، اسکریپت‌ها اجرا نمی‌شوند، تگ `<video autoplay>` پخش نمی‌شود و غیره.

وقتی این محتوا را وارد سند (document) کنیم، فعال می‌شود (استایل‌ها اعمال می‌شوند، اسکریپت‌ها اجرا می‌شوند و غیره).

## وارد کردن template

محتوای یک template از طریق ویژگی `content` آن در دسترس است که یک [DocumentFragment](info:modifying-document#document-fragment) محسوب می‌شود — نوع خاصی از گره DOM.

می‌توانیم با آن مانند هر گره‌ی دیگری از DOM رفتار کنیم، با یک تفاوت خاص: زمانی که آن را در جایی قرار می‌دهیم، فقط فرزندانش وارد سند می‌شوند، نه خود `DocumentFragment`.

برای مثال:

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Clone the template content to reuse it multiple times
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Now the script from <template> runs
</script>
```

بیایید یک مثال از Shadow DOM را از فصل قبلی با استفاده از `<template>` بازنویسی کنیم:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
```

در خط `(*)`، زمانی که `tmpl.content` را کپی کرده و درج می‌کنیم، از آنجایی که یک `DocumentFragment` است، فرزندان آن (یعنی `<style>` و `<p>`) به جای خودش درج می‌شوند.

این عناصر، Shadow DOM را تشکیل می‌دهند:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## خلاصه

برای جمع‌بندی:

- محتوای `<template>` می‌تواند هر HTML با ساختار نحوی صحیح باشد.
- محتوای `<template>` به‌عنوان «خارج از سند» در نظر گرفته می‌شود، بنابراین روی چیزی تأثیر نمی‌گذارد.
- ما می‌توانیم از طریق JavaScript به `template.content` دسترسی پیدا کنیم و با کپی کردن آن، در یک کامپوننت جدید استفاده‌اش کنیم.

تگ `<template>` ویژگی‌های منحصربه‌فردی دارد، زیرا:

- مرورگر ساختار نحوی HTML داخل آن را بررسی می‌کند (برخلاف استفاده از رشته قالب درون اسکریپت).
- ...اما همچنان اجازه می‌دهد که از هر تگ HTML در سطح بالا استفاده شود، حتی تگ‌هایی که بدون تگ‌های محصورکننده منطقی نیستند (مثل `<tr>`).
- وقتی محتوا وارد سند شود، تعاملی می‌شود: اسکریپت‌ها اجرا می‌شوند، ویدیوهای `<video autoplay>` پخش می‌شوند و غیره.

عنصر `<template>` به‌خودی‌خود هیچ مکانیزمی برای تکرار، اتصال داده‌ها (data binding) یا جایگزینی متغیرها ندارد، اما می‌توانیم این قابلیت‌ها را بر روی آن پیاده‌سازی کنیم.