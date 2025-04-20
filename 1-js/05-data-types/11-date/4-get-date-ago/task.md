importance: 4

---

# چند روز قبل کدام روز ماه بود؟

یک تابع `getDateAgo(date, days)` بسازید که روز ماه را به اندازه `days` روز قبل از `date` برگرداند. 

برای مثال، اگر امروز 20ام باشد، سپس `getDateAgo(new Date(), 1)` باید 19ام را برگرداند و `getDateAgo(new Date(), 2)` باید 18ام باشد.

باید به ازای `days=365` یا بیشتر به درستی کار کند:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

پی‌نوشت: تابع نباید `date` داده شده را تغییر دهد.
