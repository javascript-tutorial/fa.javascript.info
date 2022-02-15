
# دایره متحرک با وعده(promise)

تابع `showCircle` را در راه‌حل تمرین <info:task/animate-circle-callback> بازنویسی کنید تا به جای پذیرش کال‌بک، یک وعده را برگرداند.

کاربرد جدید:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("سلام دنیا!");
});
```

راه‌حل تمرین <info:task/animate-circle-callback> را به عنوان پایه در نظر بگیرید.
