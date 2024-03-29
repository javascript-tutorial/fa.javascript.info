بیایید المان‌های آرایه را بررسی کنیم:
- برای هر المان بررسی می‌کنیم که آیا آرایه حاصل دارای آن المان هست یا نه.
- اگر بود، المان را نادیده می‌گیریم، در غیر این صورت آن را به نتایج اضافه می‌کنیم.

```js run
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

این کد کار می‌کند، اما احتمالا یک اشکال عملکردی دارد.

متد `result.includes(str)` درون آرایه `result` را بررسی می‌کند و هر المان را با `str` مقایسه می‌کند تا المان مورد نظر را پیدا کند.

ینابراین اگر `100` المان درون `result` وجود داشته باشد و هیچ کدام با `str` برابر نباشد، سپس تمام `result` را بررسی می‌کند و دقیقا `100` مقایسه انجام می‌دهد. و اگر `result` بزرگ باشد، مثلا `10000`، سپس به تعداد `10000` مقایسه وجود خواهد داشت.

این به خودی خود مشکل محسوب نمی‌شود، چون موتورهای جاوااسکریپت بسیار سریع هستند، پس بررسی یک آرایه با `10000` المان چند میکروثانیه طول می‌کشد.

اما ما در حلقه `for` چنین آزمایشی را برای هر المان درون `arr` انجام می‌دهیم.

پس اگر `arr.length` برابر با `10000` باشد ما چیزی مثل `10000*10000` = 100 میلیون مقایسه خواهیم داشت. این مقدار بسیار زیاد است.

بنابراین این راه حل تنها برای آرایه‌های کوچک مناسب است.

بعدا در فصل <info:map-set> ما یاد می‌گیریم که چگونه آن را بهینه کنیم.
