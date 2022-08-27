
این مورد زمانی است که دانستن نحوه عملکرد آن در داخل تابع عادی مفید است.

فقط کافیست که با `async` مانند Promise عمل کنیم و `then.` را به آن اضافه کنیم:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // بعد از ۱ ثانیه ۱۰ را نشان می دهند‍‍
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
