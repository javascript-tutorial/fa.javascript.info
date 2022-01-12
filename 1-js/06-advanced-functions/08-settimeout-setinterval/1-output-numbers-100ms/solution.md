
با استفاده از `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// :کاربرد
printNumbers(5, 10);
```

با استفاده از `setTimeout` تودرتو:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// :کاربرد
printNumbers(5, 10);
```

در نظر داشته باشید که در هر دو راه‌حل، یک تاخیر اولیه قبل از اولین خروجی وجود دارد. تابع بعد `1000 میلی‌ثانیه` از اولین بار فراخوانی می‌شود.

اگر ما بخواهیم که تابع بلافاصله اجرا شود، سپس می‌توانیم یک فراخوانی اضافی در خطی جداگانه اضافه کنیم، مثل اینجا:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
