تابع سازنده `new Date` از منطقه زمانی محلی استفاده می‌کند. پس تنها چیز مهم به یاد داشتن این است که ماه‌ها از صفر شروع می‌شوند.

پس فوریه عدد 1 را دارد.

اینجا یک مثال داریم که دارای اعداد برای اجزاء تاریخ است:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
ما می‌توانستیم یک تاریخ از یک رشته بسازیم، مانند این:

```js run
//new Date(datastring)
let d2 = new Date("February 20, 2012 03:12:00");
alert( d2 );
```
