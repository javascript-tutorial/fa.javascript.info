
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

```smart header="ارورها فقط در حالت سخت‌گیرانه ایجاد می‌شوند"
در حالت غیر سخت‌گیرانه، زمانی که ویژگی‌های غیر قابل نوشتن را تغییر و یا کاری مشابه انجام می‌دهیم اروری ایجاد نمی‌شود. اما همچنان این کار انجام نمی‌شود. در حالت غیر سخت‌گیرانه، کارهای نقص‌کننده‌ی پرچم بی سر و صدا نادیده گرفته می‌شوند.
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

## Non-configurable

The non-configurable flag (`configurable:false`) is sometimes preset for built-in objects and properties.

A non-configurable property can't be deleted, its attributes can't be modified.

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:

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
So, a programmer is unable to change the value of `Math.PI` or overwrite it.

```js run
Math.PI = 3; // Error, because it has writable: false

// delete Math.PI won't work either
```

We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
```

## Object.defineProperties

There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.

The syntax is:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

For instance:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

So, we can set many properties at once.

## Object.getOwnPropertyDescriptors

To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).

Together with `Object.defineProperties` it can be used as a "flags-aware" way of cloning an object:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normally when we clone an object, we use an assignment to copy properties, like this:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...But that does not copy flags. So if we want a "better" clone then `Object.defineProperties` is preferred.

Another difference is that `for..in` ignores symbolic properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic ones.

## Sealing an object globally

Property descriptors work at the level of individual properties.

There are also methods that limit access to the *whole* object:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.

And also there are tests for them:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.

These methods are rarely used in practice.
