```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('بعد از 3 ثانیه اجرا می‌شود'));
```

لطفاً توجه داشته باشید که در این تمرین `resolve` بدون آرگومان فراخوانی می‌شود. ما هیچ مقداری را از `delay` بر نمی‌گردانیم، فقط از تاخیر اطمینان حاصل می‌کنیم.
