ما نمی‌توانیم حرف اول را «جایگزین» کنیم، چون رشته‌ها در جاوااسکریپت غیر قابل تغییر هستند.

اما می‌توانیم یک رشته جدید را بر اساس رشته موجود با کاراکتر اول بزرگ شده بسازیم:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

البته یک مشکل کوچک وجود دارد. اگر `str` خالی باشد، پس `str[0]` برابر با `undefined` است و `undefined` متد `toUpperCase()` را ندارد، پس ما ارور خواهیم داشت.

آسان‌ترین روش اضافه کردن یک تست برای یک رشته خالی است، مانند:
```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
