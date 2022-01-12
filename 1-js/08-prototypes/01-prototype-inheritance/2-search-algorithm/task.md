importance: 5

---

# الگوریتم جست و جو

این تمرین دو بخش دارد.

شیءهای زیر داده شده‌اند:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. از `__proto__` برای مقداردهی پروتوتایپ‌ها استفاده کنید به طوری که جست و جوی هر ویژگی این مسیر را دنبال کند: `pockets` -> `bed` -> `table` -> `head`. برای مثال، `pockets.pen` باید `3` باشد (در `table` پیدا شد) و `bed.glasses` باید `1` باشد (در `head` پیدا شد).
2. این سوال را جواب دهید: دریافت `glasses` به صورت `pockets.glasses` سریع‌تر است یا `head.glasses`؟ اگر نیاز بود بنچمارک انجام دهید.
