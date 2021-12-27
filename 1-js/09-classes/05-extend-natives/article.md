
# تعمیم دادن کلاس‌های درون‌ساخت

کلاس‌های درون‌ساخت مانند Array، Map و بقیه هم قابل تعمیم هستند.

برای مثال، اینجا `PowerArray` از `Array` نیتیو ارث‌بری می‌کند:

```js run
// اضافه کردن یک متد دیگر به آن (می‌توانیم بیشتر هم اضافه کنیم)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

لطفا به یک موضوع جالب توجه کنید. متدهای درون‌ساخت مانند `filter`، `map` و بقیه -- شیءهای جدیدی که دقیقا از `PowerArray` به ارث برده شده ساخته شده‌اند را برمی‌گردانند. پیاده‌سازی درونی آن‌ها از ویژگی `constructor` شیء برای این کار استفاده می‌کند.

در مثال بالا،
```js
arr.constructor === PowerArray
```

زمانی که `arr.filter()` فراخوانی می‌شود، از درون، آرایه‌ای جدید از نتیجه‌ها را با استفاده از `arr.constructor` ایجاد می‌کند نه `Array` پایه‌ای.

حتی فراتر از آن، می‌توانیم این عملکرد را شخصی‌سازی کنیم.

می‌توانیم یک getter استاتیک `Symbol.species` خاص را به کلاس اضافه کنیم. اگر این متد وجود داشته باشد، باید تابع سازنده‌ای که جاوااسکریپت از درون برای ایجاد المان‌های جدید درون `map`، `filter` و بقیه استفاده می‌کند را برگرداند.

اگر بخواهیم متدهای درون‌ساخت مانند `map` یا `filter` آرایه‌های معمولی برگردانند، می‌توانیم در `Symbol.species` کلاس `Array` را برگردانیم، مثل اینجا:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // متدهای درون‌ساخت از این به عنوان تابع سازنده استفاده می‌کنند
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// به عنوان سازنده، آرایه‌ای جدید تشکیل می‌دهد arr.constructor[Symbol.species] با استفاده از filter
let filteredArr = arr.filter(item => item >= 10);

*!*
// است Array نیست بلکه PowerArray یک filteredArr
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

همانطور که می‌بینید، حالا `.filter` کلاس `Array` را برمی‌گرداند. پس عملکرد تعمیم داده شده دیگر پاس داده نمی‌شود.

```smart header="مجموعه‌های دیگر هم به طور مشابه عمل می‌کنند"
مجموعه‌های دیگر، مثال `Map` و `Set`، همینطور کار می‌کنند. آن‌ها هم از `Symbol.species` استفاده می‌کنند.
```

## No static inheritance in built-ins

Built-in objects have their own static methods, for instance `Object.keys`, `Array.isArray` etc.

As we already know, native classes extend each other. For instance, `Array` extends `Object`.

Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article [](info:static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don't inherit statics from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But `Array.[[Prototype]]` does not reference `Object`, so there's no, for instance, `Array.keys()` (or `Date.keys()`) static method.

Here's the picture structure for `Date` and `Object`:

![](object-date-inheritance.svg)

As you can see, there's no link between `Date` and `Object`. They are independent, only `Date.prototype` inherits from `Object.prototype`.

That's an important difference of inheritance between built-in objects compared to what we get with `extends`.
