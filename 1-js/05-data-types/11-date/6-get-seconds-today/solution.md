برای دریافت تعداد ثانیه‌ها، ما می‌توانیم با استفاده از روز کنونی و ساعت 00:00:00 یک تاریخ بسازیم، سپس آن را از «الان» کم کنیم.

تفاضل برابر با تعداد میلی‌ثانیه‌ها از شروع امروز است که ما باید برای دریافت ثانیه‌ها آن را بر 1000 تقسیم کنیم:

```js run
function getSecondsToday() {
  let now = new Date();
  
  // با استفاده از سال/ماه/روز کنونی یک شیء بسازید
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // تفاضل به میلی‌ثانیه
  return Math.round(diff / 1000); // ایجاد ثانیه
}

alert( getSecondsToday() );
```

یک راه حل جایگزین می‌تواند این باشد که ساعت/دقیقه/ثانیه را دریافت کنیم و آنها را به ثانیه تبدیل کنیم:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
