
# پرچم‌های ویژگی و توصیف‌کننده‌ها

همانطور که می‌دانیم، شیءها می‌توانند ویژگی‌هایی را ذخیره کنند.

تا حالا، یک ویژگی برای ما فقط جفتی ساده از «کلید-مقدار» بود. اما یک ویژگی شیء در واقع چیزی منعطف‌تر و قدرتمندتر است.

در این فصل ما درباره گزینه‌های اضافی پیکربندی مطالعه خواهیم کرد و در فصل بعد خواهیم دید که چگونه به طور پنهانی آن‌ها را به تابع‌های گیرنده/تنظیم‌کننده (getter/setter functions) تبدیل کنیم.

## پرچم‌های ویژگی (Property flags)

ویژگی‌های شیء، در کنار **`value`** دارای سه صفت (attribute) هم هستند (اصطلاحا «پرچم» یا flag هم می‌گویند):

- **`writable`** -- اگر `true` باشد، مقدار می‌تواند تغییر کند، در غیر این صورت مقدار فقط برای خواندن است.
- **`enumerable`** -- اگر `true` باشد، ویژگی در حلقه‌ها لیست می‌شود، در غیر این صورت لیست نمی‌شود.
- **`configurable`** -- اگر `true` باشد، ویژگی می‌تواند حذف شود و این صفت‌ها می‌توانند تغییر کنند، در غیر این صورت هیچ‌کدام مقدور نیست.

چون این‌ها معمولا نمایان نمی‌شوند، هنوز آن‌ها را ندیدیم. زمانی که «از راه عادی» یک ویژگی ایجاد می‌کنیم، تمام آن‌ها `true` هستند. اما می‌توانیم هر زمان تغییرشان دهیم.

اول بیایید ببینیم چگونه این پرچم‌ها بدست آوریم.

متد [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) به ما اجازه می‌دهد تا اطلاعات *کاملی* درباره یک ویژگی بدست آوریم.

سینتکس آن:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: شیءای که از آن اطلاعات دریافت می‌کنیم.

`propertyName`
: اسم ویژگی.

مقدار برگردانده شده، یک شیء به اصطلاح «توصیف‌کننده ویژگی(property descriptor)» است: این شیء شامل مقدار و تمام پرچم‌ها می‌شود.

برای مثال:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* :توصیف‌کننده ویژگی
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

برای تغییر پرچم‌ها، می‌توانیم از [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) استفاده کنیم.

سینتکس آن:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: شیء و ویژگی‌ای که توصیف‌کننده روی آن اعمال می‌شود.

`descriptor`
: شیء توصیف‌کننده ویژگی برای اعمال کردن.

اگر ویژگی وجود داشته باشد، `defineProperty` پرچم‌های آن را بروزرسانی می‌کند. در غیر این صورت، این متد ویژگی را همراه با مقدار و پرچم‌های داده شده ایجاد می‌کند؛ در این صورت، اگر پرچمی قرار داده نشود، `false` فرض می‌شود.

برای مثال، اینجا ویژگی `name` با تمام پرچم‌های falsy ساخته شده است:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

این خروجی را با `user.name` بالا «که به صورت عادی ساخته شده» مقایسه کنید: حالا تمام پرچم‌ها falsy هستند. اگر این چیزی که ما می‌خواهیم نیست، پس بهتر است درون `descriptor` آن‌ها را برابر با `true` قرار دهیم.

حالا بیایید با استفاده از مثال تاثیر پرچم‌ها را ببینیم.

## غیر قابل نوشتن

بیایید با تغییر دادن پرچم `writable` کاری کنیم که `user.name` غیر قابل نوشتن شود:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // مقدار داد 'name' ارور: نمی‌توان به ویژگی فقط‌خواندنی
*/!*
```

حالا هیچ‌کس نمی‌تواند اسم کاربر ما را تغییر دهد، مگر اینکه `defineProperty` خودش را برای باطل کردن توصیف‌کننده‌ی ما اعمال کند.

<<<<<<< HEAD
```smart header="ارورها فقط در حالت سخت‌گیرانه ایجاد می‌شوند"
در حالت غیر سخت‌گیرانه، زمانی که بر روی ویژگی‌های غیرقابل نوشتن می‌نویسیم، هیچ اروری رخ نمی‌دهد. اما همچنان این کار انجام نمی‌شود. در حالت غیر سخت‌گیرانه، کارهای نقص‌کننده‌ی پرچم بی سر و صدا نادیده گرفته می‌شوند.
=======
```smart header="Errors appear only in strict mode"
In non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
```

اینجا مثالی مشابه داریم اما ویژگی از اول ایجاد شده است:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // است true برای ویژگی‌های جدید ما باید به طور واضح لیست کنیم که چه چیزی
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## غیر قابل شمارش

حالا بیایید یک `toString` سفارشی به `user` اضافه کنیم.

طبیعتا، یک `toString` درون‌ساخت برای شیءها غیر قابل شمارش است و در `for..in` ظاهر نمی‌شود. اما اگر ما `toString` خودمان را اضافه کنیم، سپس به طور پیش‌فرض درون `for..in` نمایش داده می‌شود، مثلا اینگونه:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// :به طور پیش‌فرض هر دو ویژگی ما لیست می‌شوند
for (let key in user) alert(key); // name, toString
```

اگر ما نخواهیم که اینطور باشد، می‌توانیم `enumerable:false` را تنظیم کنیم. سپس این ویژگی درون حلقه `for..in` ظاهر نمی‌شود، درست مانند متد درون‌ساخت آن:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// :ما ظاهر نمی‌شود toString حالا
*/!*
for (let key in user) alert(key); // name
```

ویژگی‌های غیر قابل شمارش از `Object.keys` هم حذف می‌شوند:

```js
alert(Object.keys(user)); // name
```

## غیر قابل تنظیم

پرچم غیر قابل تنظیم (`configurable:false`) بعضی اوقات برای شیءها و ویژگی‌های درون‌ساخت ارائه می‌شود.

یک ویژگی غیر قابل تنظیم نمی‌تواند حذف شود و صفت‌های آن نمی‌توانند تغییر کنند.

برای مثال، `Math.PI` غیر قابل نوشتن، غیر قابل شمارش و غیر قابل تنظیم است:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
پس یک برنامه‌نویس نمی‌تواند مقدار `Math.PI` را تغییر دهد یا آن را دوباره بنویسد.

```js run
Math.PI = 3; // writable: false ارور، چون 

// هم کار نمی‌کند Math.PI حذف
```

همچنین ما نمی‌توانیم `Math.PI` را تغییر دهیم تا دوباره `writable`(قابل نوشتن) باشد:

```js run
// configurable: false ارور، چون
Object.defineProperty(Math, "PI", { writable: true });
```

هیچ کاری نمی‌توانیم با `Math.PI` انجام دهیم.

غیر قابل تنظیم کردن یک ویژگی راهی یک‌طرفه است. ما نمی‌توانیم آن را با `defineProperty` دوباره تغییر دهیم.

**لطفا در نظر داشته باشید: `configurable: false` از تغییرات پرچم‌های ویژگی و حذف آن جلوگیری می‌کند در حالی که تغییر مقدار آن مجاز است.**

اینجا `user.name` غیر قابل تنظیم است اما همچنان می‌توانیم آن را تغییر دهیم (چون قابل نوشتن است):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // به درستی کار می‌کند
delete user.name; // ارور
```

و اینجا ما کاری می‌کنیم که `user.name` برای همیشه «مهر و موم شده» بماند، درست مانند `Math.PI` درون‌ساخت:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// یا پرچم‌های آن را تغییر دهیم user.name نمی‌توانیم
// :هیچ کدام این‌ها کار نخواهند کرد
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="تنها تغییر ممکن روی صفت: writable true -> false"
یک استثنای کوچک درباره تغییر پرچم‌ها وجود دارد.

ما می‌توانیم برای یک ویژگی غیر قابل تنظیم `writable: true` را به `false` تغییر دهیم و به این ترتیب از تغییر مقدار آن جلوگیری کنیم (تا لایه‌ای دیگر از حفاظت را اضافه کنیم). اما برعکس آن ممکن نیست.
```

## متد Object.defineProperties

یک متد [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) وجود دارد که امکان توصیف چند ویژگی با هم را ایجاد می‌کند.

سینتکس آن:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

برای مثال:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

پس ما می‌توانیم چند ویژگی را یک‌باره تنظیم کنیم.

## متد Object.getOwnPropertyDescriptors

برای گرفتن تمام توصیف‌کننده‌های ویژگی با هم، می‌توانیم از متد [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) استفاده کنیم.

این متد همراه با `Object.defineProperties` می‌تواند به عنوان راهی «همراه با پرچم‌ها» برای کپی کردن یک شیء استفاده شود:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

طبیعتا زمانی که ما یک شیء را کپی می‌کنیم، از عملگر مقداردهی برای کپی کردن ویژگی‌ها استفاده می‌کنیم، مانند اینجا:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...اما این روش پرچم‌ها را کپی نمی‌کند. پس اگر ما کپی‌برداری «بهتری» بخواهیم `Object.defineProperties` ترجیح داده می‌شود.

تفاوتی دیگر این است که `for..in` ویژگی‌های سمبلی (symbolic) و ویژگی‌های غیر قابل شمارش را نادیده می‌گیرد، اما `Object.getOwnPropertyDescriptors` *تمام* توصیف‌کننده‌های ویژگی‌ها را برمی‌گرداند که شامل ویژگی‌های سمبلی و غیر قابل شمارش هم می‌شود.

## مهر و موم کردن شیء به طور کلی

توصیف‌کننده‌های ویژگی‌ها با ویژگی‌های جداگانه کار می‌کنند.

متدهایی هم هستند که دسترسی به *کل* شیء را محدود می‌کنند:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: اضافه کردن ویژگی جدید به شیء را ممنون می‌کند.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: اضافه/حذف کردن ویژگی را ممنون می‌کند. `configurable: false` را برای تمام ویژگی‌های موجود تنظیم می‌کند.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: اضافه/حذف/تغییر دادن ویژگی‌ها را ممنوع می‌کند. `configurable: false, writable: false` را برای تمام ویژگی‌های موجود تنظیم می‌کند.

همچنین آزمایش‌هایی هم برای آن‌ها وجود دارد:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: اگر اضافه کردن ویژگی ممنوع باشد `false` برمی‌گرداند، در غیر این صورت `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: اگر اضافه/حذف کردن ویژگی ممنوع باشد و تمام ویژگی‌های موجود `configurable: false` را داشته باشند `true` برمی‌گرداند.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: اگر اضافه/حذف/تغییر دادن ویژگی‌ها ممنوع باشد و تمام ویژگی‌ها `configurable: false, writable: false` را داشته باشند `true` برمی‌گرداند.

این متدها به ندرت در عمل استفاده می‌شوند.
