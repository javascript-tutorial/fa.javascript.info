importance: 5

---

# عبارت border-left-width را به borderLeftWidth تغییر دهید

تابع `camelize(str)` را بنویسید که کلمه‌های جدا شده توسط خط تیره مانند "my-short-string" را به عبارت camel-cased مانند "myShortString" تبدیل می‌کند.

یعنی اینکه تمام خط تیره‌ها را حذف کند و هر کلمه بعد از خط تیره با حرف بزرگ شروع شود.

مثال‌ها:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

پی‌نوشت راهنمایی: از `split` برای تبدیل رشته به آرایه استفاده کنید، آن را تغییر شکل دهید و با `join` آنها را پیوند بزنید.
