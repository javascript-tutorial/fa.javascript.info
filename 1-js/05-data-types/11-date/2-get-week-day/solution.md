متد `date.getDay()` عدد روز هفته را برمی‌گرداند که از یکشنبه شروع می‌شود.

بیایید یک آرایه از روزهای هفته بسازیم تا بتوانیم اسم روز درست را با عدد آن دریافت کنیم:

```js run
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
