importance: 5

---

# Output a single-linked list

بیایید فرض کنیم یک لیست پیوندی داریم (همانطور که در فصل <info:recursion> توضیح داده شد):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

تابع `printList(list)` را بنویسید که المان‌های لیست را یکی یکی نمایش دهد.

دو نوع راه‌حل بنویسید: با استفاده از حلقه و با استفاده از بازگشت.

کدام راه بهتر است: با بازگشت یا بدون آن؟
