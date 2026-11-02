importance: 5

---

# کوتاه کردن متن

یک تابع `truncate(str, maxlength)` بسازید که طول `str` را بررسی می‌کند و اگر از `maxlength` بیشتر باشد، پایان رشته `str` را با کاراکتر حذف `"…"` جایگذاری کند، تا طول آن برابر با `maxlength` شود.

نتیجه تابع باید رشته کوتاه‌شده باشد (در سورت نیاز).

برای مثال:

```js
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
```
