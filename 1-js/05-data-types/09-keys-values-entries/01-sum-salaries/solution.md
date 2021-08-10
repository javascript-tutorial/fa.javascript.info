```js run
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}
```
یا اگر می‌خواستیم، می‌توانستیم جمع را با استفاده از `Object.values` و `reduce` محاسبه کنیم:

`Object.values(salaries).reduce((a, b) => a + b) // 650`
