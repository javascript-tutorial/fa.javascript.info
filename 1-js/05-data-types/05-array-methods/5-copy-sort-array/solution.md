برای ایجاد یک کپی و اجرای مرتب‌سازی روی آن، می‌توانیم از `slice()` استفاده کنیم:

```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert( sorted );
alert( arr );
```

