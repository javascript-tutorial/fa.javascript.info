# انیمیشن دایره با فراخوانی
در تمرینِ <info:task/animate-circle> یک دایره با که انیمیشن گذاری بزرگ میشود نشان داده شده است.

حالا برای ما فقط یک دایره کافی نیست ما میخواهیم یک پیغام درون آن داشته باشیم. پیغام باید *بعد * از تمام شدن انیمیشن به نمایش دربیاید (دایره کامل بزرگ شود) در غیر اینصورت زننده و بدشکل خواهد بود.
در راه حل داده شده برای تمرین تابع `showCircle(cx, cy, radius)` یک دایره رسم میکند ولی چیزی برای نشان دادن اتمام آن وجود ندارد.

یک آرگومانِ فراخوان به آن اضافه کنید که در زمان اتمام انیمیشن اجرا شود : `showCircle(cx, cy, raduis, callback)`.
تابع `callback` باید `<div>` را به عنوان آرگومان بگیرد.

و یک مثال:

```js
showCircle(150, 150, 100, div => {
    div.classList.add("message-ball");
    div.append("Hello, world!");
});
```
پیش نمایش:

[iframe src="solution" height=250]

راه حل اراعه شده در تمرینِ <info:task/animate-circle> را به عنوان پایه استفاده کنید.