برای گرفتن تعداد میلی‌ثانیه‌ها تا فردا، می‌توانیم از «فردا 00:00:00» تاریخ کنونی را کم کنیم.

اول، ما «فردا» را ایجاد می‌کنیم و سپس این کار را انجام می‌دهیم:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // تاریخ فردا
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // تفاضل به میلی‌ثانیه
  return Math.round(diff / 1000); // تبدیل به ثانیه
}
```

راه حل جایگزین:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

لطفا در نظر داشته باشید که بسیاری از کشورها ساعت تابستانی دارند (DST)، پس ممکن است بعضی از روزها 23 یا 25 ساعت داشته باشند. شاید بهتر است با چنین روزهایی متفاوت رفتار کنیم.
