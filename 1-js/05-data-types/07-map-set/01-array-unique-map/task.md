importance: 5

---

# اعداد یکتای آرایه را جداسازی کنید

فرض کنیم `arr` یک آرایه باشد.

تابع `unique(arr)` را بسازید که باید آرایه‌ای شامل المان‌های خاص `arr` را برگرداند.

برای مثال:

```js
function unique(arr) {
  /* کد شما */
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O
```

پی‌نوشت: اینجا رشته‌ها استفاده شده‌اند اما می‌توانند هر مقداری از هر نوعی باشند.

پی‌نوشت دوم: از `Set` برای ذخیره مقدارهای یکتا استفاده کنید.
