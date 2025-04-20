importance: 4

---

# تاریخ مربوط را تغییر شکل دهید

تابع `formatDate(date)` بنویسید که باید `date` را به صورت زیر تغییر شکل دهد:

- اگر از `date` کمتر از 1 ثانیه گذشته باشد، سپس شکل جدید `"right now"`(همین حالا) است.
- در غیر این صورت اگر از `date` کمتر از 1 دقیقه گذشته باشد، سپس شکل چدید `"n sec. ago"`(n ثانیه قبل) است. 
- در غیر این صورت اگر کمتر از یک ساعت باشد، سپس شکل جدید `"m min. ago"`(m دقیقه پیش) است.
- در غیر این صورت، تاریخ کامل با به شکل `"DD.MM.YY HH:mm"` باشد. یعنی: `"day.month.year hours:minutes"`، همه به شکل دو رقمی مانند `10:00 31.12.16`.

برای مثال:

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// تاریخ دیروز مانند 20:00 31.12.16
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
