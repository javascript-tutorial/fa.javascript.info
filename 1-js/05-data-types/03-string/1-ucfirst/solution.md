ما نمی‌توانیم حرف اول را «جایگزین» کنیم، چون رشته‌ها در جاوااسکریپت غیر قابل تغییر هستند.

اما می‌توانیم یک رشته جدید را بر اساس رشته موجود با کاراکتر اول بزرگ شده بسازیم:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

البته یک مشکل کوچک وجود دارد. اگر `str` خالی باشد، پس `str[0]` برابر با `undefined` است و `undefined` متد `toUpperCase()` را ندارد، پس ما ارور خواهیم داشت.

<<<<<<< HEAD
دو روش پیش روی‌مان داریم:

1. از `str.charAt(0)` استفاده کنیم، چون همیشه یک رشته برمی‌گرداند (شاید رشته خالی).
2. یک تست برای رشته خالی اضافه کنیم.

روش دوم را اینجا داریم:
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
