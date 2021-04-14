دلیل آن این است که prompt ورودی کاربر را به عنوان رشته برمی‌گرداند.

پس متغیرها به ترتیب مقدارهای `"1"` و `"2"` را خواهند داشت.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

کاری که باید بکنیم این است که رشته‌ها را قبل از `+` به عدد تبدیل کنیم. برای مثال، از `Number()` استفاده کنیم یا `+` را قبل از آنها بیاوریم.

برای مثال، درست قبل از `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

یا داخل `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

از هر دو شکل unary و binary `+` در آخرین کد استفاده شد. بامزه به نظر می‌رسد نه؟
