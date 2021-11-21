# پروتوتایپ‌های نیتیو

ویژگی `"prototype"` به طور گسترده توسط هسته خود جاوااسکریپت استفاده می‌شود. تمام تابع‌های سازنده درون‌ساخت از آن استفاده می‌کنند.

در ابتدا به جزئیات می‌پردازیم و سپس چگونگی استفاده کردن از آن برای اضافه کردن قابلیت‌های جدید به شیءهای درون‌ساخت را بررسی می‌کنیم.

## ویژگی Object.prototype

فرض کنیم ما یک شیء خالی را خروجی می‌گیریم:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

کدی که رشته `"[object Object]"` را ایجاد می‌کند کجاست؟ این کد یک متد `toString` درون‌ساخت است اما کجاست؟ `obj` خالی است!

...اما نماد کوتاه `obj = {}` با `obj = new Object()` یکسان است، که `Object` یک تابع سازنده درون‌ساخت شیء است، که دارای `prototype` است که به یک شیء بسیار بزرگ حاوی `toString` و متدهای دیگر رجوع می‌کند.

اینجا می‌بینیم که چه اتفاقی در حال رخ دادن است:

![](object-prototype.svg)

زمانی که `new Object()` فراخوانی شود (یا یک شیء لیترال `{...}` ساخته می‌شود)، با توجه به قانونی که ما در فصل قبلی درباره آن صحبت کردیم، `[[Prototype]]` آن در `Object.prototype` قرار داده می‌شود:

![](object-prototype-1.svg)

سپس زمانی که `obj.toString()` فراخوانی می‌شود، این متد از `Object.prototype` گرفته می‌شود.

می‌توانیم آن را به این صورت بررسی کنیم:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

لطفا در نظر داشته باشید که `[[Prototype]]` دیگری در زنجیره بالای `Object.prototype` وجود ندارد:

```js run
alert(Object.prototype.__proto__); // null
```

## دیگر پروتوتایپ‌های درون‌ساخت

شیءهای دیگر درون‌ساخت مانند `Array`، `Date`، `Function` و بقیه هم متدهایی درون پروتوتایپ‌ها ذخیره می‌کنند.

برای مثال، زمانی که ما آرایه `[1, 2, 3]` را می‌سازیم، سازنده `new Array()` به صورت درونی استفاده می‌شود. پس `Array.prototype` پروتوتایپ آن می‌شود و متدها را فراهم می‌کند. این کار برای حافظه خیلی کارآمد است.

با توجه به خصوصیات زبان، تمام پروتوتایپ‌ها، `Object.prototype` را بالای خود دارند. به همین دلیل است که بعضی افراد می‌گویند «همه چیز از شیءها ارث‌بری می‌کنند».

اینجا یک تصویر کلی داریم (برای 3 سازنده درون‌ساخت تا جا شود):

![](native-prototypes-classes.svg)

بیایید به صورت دستی پروتوتایپ‌ها را بررسی کنیم:

```js run
let arr = [1, 2, 3];

// ارث‌بری می‌کند؟ Array.prototype آیا از
alert( arr.__proto__ === Array.prototype ); // true

// چطور؟ Object.prototype سپس از
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// قرار دارد null و در بالا
alert( arr.__proto__.__proto__.__proto__ ); // null
```

بعضی از متدها در پروتوتایپ‌ها ممکن است با هم تطابق داشته باشند، برای مثال `Array.prototype` متد `toString` خودش را دارد که المان‌ها را به صورت جداشده توسط کاما لیست می‌کند:

```js run
let arr = [1, 2, 3]
alert(arr); // 1,2,3 <-- Array.prototype.toString نتیجه‌ی
```

همانطور که قبلا دیدیم، `Object.prototype` هم متد `toString` را دارد اما `Array.prototype` در زنجیره نزدیک‌تر است پس نوع آرایه آن استفاده می‌شود.


![](native-prototypes-array-tostring.svg)


ابزارهای درون مرورگر مانند کنسول توسعه‌دهنده کروم هم ارث‌بری را نشان می‌دهند (ممکن است برای شیءهای درون‌ساخت نیاز باشد که `console.dir` استفاده شود):

![](console_dir_array.png)

بقیه شیءهای درون‌ساخت هم این چنین کار می‌کنند. حتی تابع‌ها -- آن‌ها شیءهایی از سازنده `Function` هستند و متدهای آن‌ها (`call`/`apply` و بقیه) از `Function.prototype` گرفته می‌شوند. تابع‌ها `toString` خودشان را هم دارند.

```js run
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true ،ارث‌بری از شیءها
```

## مقدارهای اصلی

پیچیده‌ترین چیزی که با رشته‌ها، عددها و بولین‌ها اتفاق می‌افتد.

همانطور که به یاد داریم، آن‌ها شیء نیستند. اما اگر سعی کنیم که به ویژگی‌های آن‌ها دسترسی پیدا کنیم، شیءهای دربرگیرنده موقتی با استفاده از سازنده‌های درون‌ساخت `String`، `Number` و `Boolean` ساخته می‌شوند. آن‌ها متدها را فراهم می‌کنند و سپس ناپدید می‌شوند.

این شیءها به صورت پنهانی ایجاد می‌شوند و بیشتر موتورها آن‌ها را بهینه می‌کنند اما خصوصیات زبان دقیقا به همین صورت آن‌ها را توصیف می‌کند. متدهای این شیءها هم درون پروتوتایپ‌ها قرار دارند و به صورت `String.prototype`، `Number.prototype` و `Boolean.prototype` در دسترس هستند.

```warn header="مقدارهای `null` و `undefined` دارای دربرگیرنده شیء نیستند"
مقدارهای خاص `null` و `undefined` استثنا هستند. آن‌ها دربرگیرنده شیء ندارند پس متدها و ویژگی‌هایی هم برای آن‌ها موجود نیست. و پروتوتایپ‌های متناظر هم وجود ندارد.
```

## تغییر پروتوتایپ‌های نیتیو [#native-prototype-change]

پروتوتایپ‌های نیتیو (Native prototypes) می‌توانند تغییر کنند. برای مثال، اگر ما متدی را به `String.prototype` اضافه کنیم، این متد برای تمام رشته‌ها در دسترس خواهد بود:

```js run
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

در حین فرایند توسعه، ممکن است ایده‌هایی برای متدهای درون‌ساخت جدیدی به ذهن‌مان برسد که بخواهیم آن‌ها را داشته باشیم و ممکن است مشتاق باشیم که آن‌ها را به پروتوتایپ‌های نیتیو اضافه کنیم. اما به طور کلی این کار بدی است.

```warn
پروتوتایپ‌ها گلوبال هستند، پس دریافت تناقض آسان است. اگر دو کتابخانه متد `String.prototype.show` را اضافه کنند، یکی از آن‌ها ممکن است متد دیگری را بازنویسی کند.

پس به طور کلی، تغییر یک پروتوتایپ نیتیو کار بدی محسوب می‌شود.
```

**در برنامه‌نویسی مدرن، فقط یک مورد است که تغییر دادن پروتوتایپ‌های نیتیو قابل قبول است. آن هم پلیفیل‌سازی است.**

پلیفیل‌سازی (polyfilling) عبارتی برای ایجاد یک جایگزین برای متدی است که در خصوصیات جاوااسکریپت وجود دارد اما هنوز توسط موتور جاوااسکریپت خاصی پشتیبانی نمی‌شود.

سپس می‌توانیم آن را به صورت دستی پیاده‌سازی و به پروتوتایپ درون‌ساخت اضافه کنیم.

برای مثال:

```js run
if (!String.prototype.repeat) { // اگر چنین متدی وجود نداشته باشد
  // آن را به پروتوتایپ اضافه کن

  String.prototype.repeat = function(n) {
    // بار تکرار کن n رشته را

    // در واقع کد باید نسبت به این کمی بیشتر پیچیده باشد
    // (الگوریتم کامل درون خصوصیات زبان موجود است)
    // اما حتی یک پلیفیل ناکامل هم اغلب اوقات کافی است
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa
```


## Borrowing from prototypes

In the chapter <info:call-apply-decorators#method-borrowing> we talked about method borrowing.

That's when we take a method from one object and copy it into another.

Some methods of native prototypes are often borrowed.

For instance, if we're making an array-like object, we may want to copy some `Array` methods to it.

E.g.

```js run
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

*!*
obj.join = Array.prototype.join;
*/!*

alert( obj.join(',') ); // Hello,world!
```

It works because the internal algorithm of the built-in `join` method only cares about the correct indexes and the `length` property. It doesn't check if the object is indeed an array. Many built-in methods are like that.

Another possibility is to inherit by setting `obj.__proto__` to `Array.prototype`, so all `Array` methods are automatically available in `obj`.

But that's impossible if `obj` already inherits from another object. Remember, we only can inherit from one object at a time.

Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.

## Summary

- All built-in objects follow the same pattern:
    - The methods are stored in the prototype (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
    - The object itself stores only the data (array items, object properties, the date)
- Primitives also store methods in prototypes of wrapper objects: `Number.prototype`, `String.prototype` and `Boolean.prototype`. Only `undefined` and `null` do not have wrapper objects
- Built-in prototypes can be modified or populated with new methods. But it's not recommended to change them. The only allowable case is probably when we add-in a new standard, but it's not yet supported by the JavaScript engine
