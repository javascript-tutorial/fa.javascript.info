بیایید یک تاریخ با استفاده از ماه بعد بسازیم اما برای روز 0 را قرار دهیم:
```js run
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

به صورت طبیعی، روزها از 1 شروع می‌شوند اما از لحاظ فنی ما می‌توانیم هر عددی را قرار دهیم، شیء date به طور خودکار خودش را تنظیم می‌کند. پس زمانی که ما 0 قرار می‌دهیم، به این معنی است که «یک روز قبل از اولین روز ماه» یا به عبارتی دیگر: «آخرین روز ماه قبل».
