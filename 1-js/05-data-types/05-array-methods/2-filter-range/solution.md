``` js run
function filterRange(arr, a, b) {
  // برای خوانایی بهتر به دور عبارت براکت اضافه کردیم
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (مقدارهای مورد نظر)

alert( arr ); // 5,3,8,1 (تغییر داده نشده)
```
