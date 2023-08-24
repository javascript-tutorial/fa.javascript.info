یک modal window می‌تواند بااستفاده از یک `<div id="cover-div">` نیمه‌شفاف که تمام پنچره را می‌پوشاند پیاده‌سازی شود،‌ مثل این:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

از آنجایی که `<div>` همه چیز را می‌پوشاند، آن تمام کلیک‌ها را می‌گیرد،نه صفحه‌ی زیر آن.

همچنین با `body.style.overflowY='hidden'` می‌توانیم از scroll کردن صفحه جلوگیری کنیم.

فرم نباید در `<div>` باشد، بلکه باید کنار آن باشد، زیرا نمی‌خواهیم که `opacity` داشته باشد.
