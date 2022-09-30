importance: 5

---

# ماشین حساب جدید بسازید

یک تابع سازنده `Calculator` بسازید که شیء هایی با 3 متد ایجاد می کند.

- `read()` با استفاده از `prompt` برای دو مقدار درخواست می کند و آنها را با نام‌های `a` و `b` به عنوان ویژگی‌ های شیء به خاطر می سپارد.
- `sum()` مجموع این ویژگی ها را بر می گرداند.
- `mul()` حاصل ضرب این ویژگی ها را بر می گرداند.

برای مثال:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[دمو]
