
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

جواب اندکی پیچیده‌ست که به خاطر این است که باید `null`/خالی را هم در نظر بگیریم. 

پس ما تا وقتی ورودی را می‌پذیریم که عدد عادی باشد. هردوی `null` (cancel) و خط خالی هم در این شرایط میگنجد، چونکه در فرم عددی صفر هستند. 

بعد از اینکه برنامه متوقف شد بایستی `null` و مخصوصا خط‌های خالی (خروجی `null`) را در نظر بگیریم، چون تبدیل آنها به عدد صفر برمی‌گرداند.
