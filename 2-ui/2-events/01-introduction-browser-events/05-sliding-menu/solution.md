
# HTML/CSS
اول باید که HTML/CSS را بسازیم.

منو یک جزء گرافیکی مستقل روی صفحه است. پس بهتر است که همه آنرا را درون یک عنصر DOM قرار دهیم.

یک لیست از آیتم‌های منو می‌تواند مانند لیستی از `ul/li` باشد.

در اینجا یک ساختار نمونه آمده:

```html
<div class="menu">
  <span class="title">شیرینی‌ها (کلیک کنید)!</span>
  <ul>
    <li>کیک</li>
    <li>دونات</li>
    <li>عسل</li>
  </ul>
</div>
```

برای عنوان از `<spcan>` استفاده می‌کنیم، زیرا `<div>` از قبل یک ویژگی خاص `display: block` دارد و 100% عرض افقی را پر می‌کند.

مانند این:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">شیرینی‌ها (کلیک کنید)!</div>
```

پس اگر `onclick` را روی آن تعریف کنیم، کلیک‌ها را در سمت راست متن نیز دریافت می‌کند.

در صورتی که `<span>` از قبل یک ویژگی خاص `display: inline‍` دارد، تنها فضای مورد نیاز متن را اشغال می‌کند:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">شیرینی‌ها (کلیک کنید)!</span>
```

# باز و بسته کردن منو

باز و بسته کردن منو باید کمان‌ها را تغییر دهد و آیتم‌های درون لیست منو را نشان دهد یا مخفی کند.

همه‌ی این تغییرات کاملا توسط CSS کنترل می‌شود. در جاوااسکریپت باید وضعیت باز و بسته رودن را با اضافه کردن یا حذف کردن کلاس `.open` مشخص کنیم.

بدون این کلاس، منو بسته است:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

... و با `.open` کمان‌ها تغییر می‌کنند و لیست نمایش داده می‌شود:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
