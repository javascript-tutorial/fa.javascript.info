importance: 4

---

# در کد زیر "if" را به ‍"switch" تبدیل کنید

کد زیر را با استفاده از فقط یک `switch` بازنویسی کنید:

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert(0);
}
if (a == 1) {
  alert(1);
}

if (a == 2 || a == 3) {
  alert('2,3');
}
```
