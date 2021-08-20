ایده ساده‌ای است: تعداد روز داده شده را از `date` کم کنید:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...اما تابع نباید `date` را تغییر دهد. این مهم است چون کد بیرونی که به ما تاریخ را می‌دهد توقع ندارد که تاریخ تغییر کند.

برای پیاده‌سازی آن بیایید از تاریخ یک مشابه بسازیم، مانند این:

```js run
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
