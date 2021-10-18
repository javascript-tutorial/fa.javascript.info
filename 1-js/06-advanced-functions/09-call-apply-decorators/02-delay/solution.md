راه‌حل:

```js
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}
```

لطفا به چگونگی استفاده از تابع کمانی در اینجا توجه کنید. همانطور که می‌دانیم، تابع‌های کمانی `this` و `arguments` خودشان را ندارند پس `f.apply(this, arguments)` مقدار `this` و `arguments` را از دربرگیرنده می‌گیرند.

اگر ما یک تابع معمولی را قرار دهیم، `setTimeout` آن را بدون آرگومان‌ها و `this=window` (در مرورگر) فراخوانی خواهد کرد، پس ما باید کمی بیشتر کد بنویسیم تا آن‌ها از طریق دربرگیرنده رد و بدل کنیم: 

```js
function delay(f, ms) {

  // قرار دهیم setTimeout و آرگومان‌ها را از طریق دربرگیرنده درون this متغیرهایی اضافه کردیم تا
  return function(...args) {
    let savedThis = this;
    setTimeout(function() {
      f.apply(savedThis, args);
    }, ms);
  };

}
```
