importance: 5

---

# ارث‌بری از SyntaxError

یک کلاس `FormatError` بسازید که از کلاس درون‌ساخت `SyntaxError` ارث‌بری می‌کند.

این کلاس باید از ویژگی‌های `message`، `name` و `stack` پشتیبانی کند.

مثالی از کاربرد:

```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (ارث‌بری می‌کند SyntaxError چون از)
```
