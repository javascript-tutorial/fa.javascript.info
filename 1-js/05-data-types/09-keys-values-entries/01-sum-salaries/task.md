importance: 5

---

# ویژگی‌ها را جمع بزنید

یک شیء `salaries` داریم که تعداد دلخواهی از حقوق‌ها را شامل می‌شود.

تابع `sumSalaries(salaries)` بنویسید که جمع تمام حقوق‌ها را با استفاده از `Object.values` و حلقه‌ی `for..of` برگرداند.

اگر `salaries` خالی باشد، نتیجه باید `0` باشد.

برای مثال:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
