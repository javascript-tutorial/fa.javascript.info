importance: 5

---

# بررسی خالی بودن

تابع `isEmpty(obj)` را بنویسید که اگر شیء هیچ ویژگی‌ای نداشته `true` را برمی‌گرداند، در غیر این صورت `false` را.

باید مانند این کد عمل کند:

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false
```

