importance: 5

---

# Deposit calculator

یک interface ایجاد کنید که اجازه می‌دهد مجموع سپرده بانکی و درصد را وارد کنید، سپس محاسبه می‌کند که پس از دوره‌های زمانی مشخص چقدر خواهد بود.

اینجا نسخه‌ی نمایشی هست:

[iframe src="solution" height="350" border="1"]

هر تغییری در input باید بلافاصله پردازش شود.

فرمول این است:
```js
// initial: مبلغ اولیه پول
// interest: مثلا 0.05 یعنی 5% در هر سال
// years: تعداد سال برای صبر کردن
let result = Math.round(initial * (1 + interest) ** years);
```
