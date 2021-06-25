لطفا جزئیات کوچک اما مهم راه حل را در نظر داشته باشید. ما `value` را درست بعد از `prompt` به عدد تبدیل نمی‌کنیم، چون بعد از `value = +value` ما نمی‌توانیم بین یک رشته خالی (نشان‌دهنده توقف) و صفر (مقداری معتبر) فرقی قائل شویم. در عوض آن را بعدا انجام می‌دهیم.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("لطفا یک عدد وارد کنید.", 0);

    // آیا باید متوقف کنیم؟
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

