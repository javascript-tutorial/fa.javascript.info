importance: 4

---

# تابع را با کمک '?' یا '||' بازنویسی کنید

تابع زیر `true` را برمیگرداند اگر پارامتر `age` از `18` بزرگتر باشد.
فلان را برمیگرداند

در غیر اینصورت برای تأیید سوال می‌پرسد و سپس جواب را بر‌میگرداند:

```js
function checkAge(age) {
<<<<<<< HEAD
if (age > 18) {
return true;
} else {
return confirm('Do you have your parents permission to access this page?');
}
=======
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
>>>>>>> f72405a263e1d1adbc8d17179ee46af70842bb55
}
```

بازنویسی کنید، تا همین رفتار، بدون `if`، در یک خط اجرا شود.

دو حالت از `checkAge` بسازید:
۱. با استفاده از عملگر علامت سوال `?`
۲. با استفاده از OR `||`
