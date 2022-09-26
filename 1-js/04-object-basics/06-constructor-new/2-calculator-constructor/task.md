importance: 5

---

# ماشین حساب جدید بسازید

یک تابع سازنده `Calculator` بسازید که شیء هایی با 3 متد ایجاد می کند.

<<<<<<< HEAD
- `read()` با استفاده از `prompt` برای دو مقدار درخواست می کند و آنها را در ویژگی های خود به خاطر می سپارد.
- `sum()` مجموع این ویژگی ها را بر می گرداند.
- `mul()` حاصل ضرب این ویژگی ها را بر می گرداند.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

برای مثال:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[دمو]
