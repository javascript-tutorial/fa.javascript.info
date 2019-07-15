importance: 4

---

# آیا "else" لازم است؟

تابع زیر `true` را برمیگرداند اگر پارامتر `age` از `18` بزرگتر باشد.

در غیر اینصورت برای تأیید سوال می‌پرسد و سپس جواب را بر‌میگرداند:

```js
function checkAge(age) {
if (age > 18) {
return true;
*!*
} else {
// ...
return confirm('Did parents allow you?');
}
*/!*
}
```

آیا اگر `else` را حذف کنیم تابع جور دیگری کار می‌کند؟

```js
function checkAge(age) {
if (age > 18) {
return true;
}
*!*
// ...
return confirm('Did parents allow you?');
*/!*
}
```

آیا هیچ تفاوتی در رفتار این دو حالت وجود دارد؟
