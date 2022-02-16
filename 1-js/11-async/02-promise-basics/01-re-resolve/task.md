
# آیا یک Promise دوباره resolve می‌شود؟


خروجی کد زیر چیست؟

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
