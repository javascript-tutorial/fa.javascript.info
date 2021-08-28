importance: 5

---

# مرجع‌های بازگشتی را حذف کنید

در موارد ساده‌ای از مرجع‌های دایره‌ای، ما می‌توانیم یک ویژگی متخلف را توسط اسم آن از سریالی کردن منع کنیم.

اما گاهی اوقات به دلیل اینکه ممکن است هم در مرجع‌های دایره‌ای و هم در ویژگی‌های عادی استفاده شده باشد، نمی‌توانیم از اسم آن استفاده کنیم. پس می‌توانیم ویژگی را با استفاده از مقدار آن بررسی کنیم.

تابع `replacer` بنویسید که هر چیزی را به رشته تبدیل کند اما ویژگی‌هایی که به `meetup` رجوع می‌کنند را حذف کند:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circular references
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* کد شما */
}));

/* :نتیجه باید اینگونه باشد
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
