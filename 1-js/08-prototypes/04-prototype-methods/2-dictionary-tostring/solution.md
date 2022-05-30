
این روش می‌تواند همه کلیدهای شمارش‌پذیر را با استفاده از `Object.keys` گرفته و فهرست آنها را خروجی کند.

برای غیرقابل شمارش کردن `toString`، بیایید آن را با استفاده از یک توصیفگر مشخص کنیم. سینتکس `Object.create` به ما اجازه می‌دهد تا یک شیء را با توصیفگرهای ویژگی به عنوان آرگومان دوم ارائه کنیم.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // toString تعریف ویژگی
    value() { // مقدار یک تابع است
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "سیب";
dictionary.__proto__ = "تست";

// در حلقه هستند __proto__ و apple
for(let key in dictionary) {
  alert(key); // "__proto__" سپس ،"apple"
}  

// toString لیست خصوصیات جدا شده با کاما توسط
alert(dictionary); // "apple,__proto__"
```

وقتی یک ویژگی را با استفاده از یک توصیفگر ایجاد می‌کنیم، پرچم‌های آن به طور پیش‌فرض `false` هستند. بنابراین در کد بالا، `dictionary.toString` غیرقابل شمارش است.

<<<<<<< HEAD
برای بررسی به فصل [](info:property-descriptors) مراجعه کنید.
=======
See the chapter [](info:property-descriptors) for review.
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96
