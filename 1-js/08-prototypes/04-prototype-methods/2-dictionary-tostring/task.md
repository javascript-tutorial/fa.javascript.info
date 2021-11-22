importance: 5

---

# toString را به فرهنگ لغت اضافه کنید

یک شیء `dictionary` وجود دارد که به عنوان `Object.create(null)` ایجاد شده است تا هر جفت `key/value` را ذخیره کند.

متد `dictionary.toString()` را به آن اضافه کنید، که باید فهرستی از کلیدها با کاما را برگرداند. `toString` شما نباید در `for..in` روی شیء نشان داده شود.

به این صورت باید کار کند:

```js
let dictionary = Object.create(null);

*!*
// dictionary.toString کد شما برای افزودن متد
*/!*

// اضافه کردن مقداری داده
dictionary.apple = "سیب";
dictionary.__proto__ = "تست"; // یک ویژگی معمولی است __proto__ در اینجا

// در حلقه وجود دارند __proto__ تنها سیب و
for(let key in dictionary) {
  alert(key); // "__proto__" سپس ،"apple"
}  

// شما در عمل toString
alert(dictionary); // "سیب,__proto__"
```
