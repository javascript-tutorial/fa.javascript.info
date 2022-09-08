# ارور در setTimeout

شما چه فکری می‌کنید؟ آیا `.catch` فعال می‌شود؟ جواب خود را توضیح دهید.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
