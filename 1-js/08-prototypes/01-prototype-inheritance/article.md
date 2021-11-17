# وراثت پروتوتایپی

در برنامه‌نویسی، اغلب اوقات ما می‌خواهیم که چیزی را دریافت کنیم و آن را گسترش دهیم.

برای مثال، ما یک شیء `user` همراه با ویژگی‌ها و متدهای آن داریم و می‌خواهیم `admin` و `guest` را به عنوان نمونه‌هایی از آن که تغییر کمی دارند بسازیم. ما می‌خواهیم چیزی را که در `user` داریم را دوباره استفاده کنیم، نه اینکه متدهای آن را کپی/دوباره پیاده‌سازی کنیم، فقط یک شیء جدید را بر اساس آن بسازیم.

*وراثت پروتوتایپی(prototypal inheritance)* یک ویژگی زبان است که به این موضوع کمک می‌کند.

## ویژگی [[Prototype]]

در جاوااسکریپت، شیءها یک ویژگی پنهانی `[[Prototype]]` (دقیقا همانطور که در مشخصات زبان نام‌گذاری شده) دارند که یا `null` است یا به شیء دیگر رجوع می‌کند. آن شیء «یک پروتوتایپ» نامیده می‌شود:

![prototype](object-prototype-empty.svg)

زمانی که ما یک شیء را از `object` می‌خوانیم و وجود ندارد، جاوااسکریپت به طور خودکار آن را از پروتوتایپ دریافت می‌کند. در برنامه‌نویسی، به این کار «وراثت پروتوتایپی» می‌گویند. و به زودی ما مثال‌های زیادی از چنین وراثتی را خواهیم دید، درست مانند خصوصیت‌های خفن‌تر زبان که بر اساس آن ساخته شده‌اند.

ویژگی `[[Prototype]]` درونی و پنهان است اما راه‌هایی برای مقداردهی آن وجود دارد.

یکی از آن راه‌ها استفاده از نام خاص `__proto__` است، مثلا اینگونه:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // را تنظیم می‌کند rabbit.[[Prototype]] = animal
*/!*
```

حالا اگر ما ویژگی‌ای را از `rabbit` بخوانیم و وجود نداشته باشد، جاوااسکریپت به طور خودکار آن را از `animal` دریافت می‌کند.

برای مثال:

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// پیدا کنیم rabbit حالا می‌توانیم هر دو ویژگی را در
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

اینجا خط `(*)` شیء `animal` را به عنوان پروتوتایپ `rabbit` تنظیم می‌کند.

سپس زمانی که `alert` سعی می‌کند تا ویژگی `rabbit.eats` `(**)` را بخواند، درون `rabbit` نیست پس جاوااسکریپت مرجع `[[Prototype]]` را دنبال می‌کند و ویژگی را درون `animal` پیدا می‌کند (از پایین به بالا نگاه کنید):

![](proto-animal-rabbit.svg)

اینجا می‌توانیم بگوییم که "`animal`" پروتوتایپ `rabbit` است یا "`rabbit`" به صورت پروتوتایپی از `animal` ارث‌بری کرده است.

بنابراین اگر `animal` تعداد زیادی ویژگی و متد مفید داشته باشد، سپس آن‌ها به طور خودکار درون `rabbit` هم موجود می‌شوند. چنین ویژگی‌هایی را «موروث یا به ارث‌رسیده» می‌گویند.

اگر ما یک متد درون `animal` داشته باشیم، می‌تواند با `rabbit` هم فراخوانی شود:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("جانور راه می‌رود");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// از پروتوتایپ برداشته شده است walk
*!*
rabbit.walk(); // جانور راه می‌رود
*/!*
```

متد به طور خودکار از پروتوتایپ دریافت می‌شود، به این صورت:

![](proto-animal-rabbit-walk.svg)

زنجیره‌ی پروتوتایپ می‌تواند طولانی‌تر باشد:

```js run
let animal = {
  eats: true,
  walk() {
    alert("جانور راه می‌رود");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// از رنجیره‌ی پروتوتایپ برداشته شده است walk
longEar.walk(); // جانور راه می‌رود
alert(longEar.jumps); // true (rabbit از)
```

![](proto-animal-rabbit-chain.svg)

حالا اگر ما چیزی را از `longEar` بخوانیم و وجود نداشته باشد، جاوااسکریپت درون `rabbit` و سپس درون `animal` به دنبال آن می‌گردد.

فقط دو محدودیت وجود دارد:

1. مرجع‌ها نمی‌توانند درون دایره قرار بگیرند. اگر ما تلاش کنیم که `__proto__` را درون یک دایره مقداردهی کنیم، جاوااسکریپت ارور ایجاد می‌کند.
2. مقدار `__proto__` می‌تواند شیء یا `null` باشد. انواع دیگر داده نادیده گرفته می‌شوند.

همچنین ممکن است واضح باشد اما باز هم: فقط یک `[[Prototype]]` می‌تواند وجود داشته باشد. یک شیء نمی‌تواند از دو شیء دیگر ارث‌بری کند.


```smart header="ویژگی `__proto__` یک getter/setter قدیمی برای `[[Prototype]]` است"
این یک اشتباه توسعه‌دهندگان تازه‌وارد است که تفاوت میان این دو را ندانند.

لطفا توجه کنید که `__proto__` با ویژگی درونی `[[Prototype]]` *یکسان نیست*. این ویژگی یک getter/setter برای `[[Prototype]]` است. بعدا ما موقعیت‌هایی را خواهیم دید که این موضوع اهمیت دارد، اما چون فهم خود را از زبان جاوااسکریپت می‌سازیم، بیایید فقط این را در ذهن خود داشته باشیم.

ویژگی `__proto__` کمی منسوخ شده است. بنا به دلایلی مربوط به گذشته هنوز وجود دارد، جاوااسکریپت مدرن پیشنهاد می‌کند که ما باید از تابع‌های `Object.getPrototypeOf/Object.setPrototypeOf` به جای آن دریافت/مقداردهی کردن پروتوتایپ استفاده کنیم. این تابع‌ها را هم در آینده پوشش می‌دهیم.

بر اساس مشخصات زبان، `__proto__` فقط باید توسط مرورگرها پشتیبانی شود. اگرچه در واقع تمام محیط‌ها شامل سمت سرور از `__proto__` پشتیبانی می‌کند، پس ما برای استفاده از آن به مشکلی بر نخواهیم خورد.

به دلیل اینکه نشان `__proto__` از لحاظ درک کردن کمی بیشتر واضح است، در مثال‌ها از آن استفاده می‌کنیم.
```

## نوشتن از پروتوتایپ استفاده نمی‌کند

پروتوتایپ فقط برای خواندن ویژگی‌ها استفاده می‌شود.

عمل‌های نوشتن/حذف کردن به صورت مستقیم با شیء کار می‌کنند.

در مثال پایین، ما متد `walk` را در خود `rabbit` مقداردهی می‌کنیم:

```js run
let animal = {
  eats: true,
  walk() {
    /* استفاده نخواهد شد rabbit این متد توسط */
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

از این پس، فراخوانی `rabbit.walk()` بدون اینکه از پروتوتایپ استفاده کند، بلافاصله متد را در شیء پیدا و آن را اجرا می‌کند:

![](proto-animal-rabbit-walk-2.svg)

ویژگی‌های اکسسر استثنا هستند، مقداردهی توسط تابع setter انجام می‌شود. پس نوشتن در چنین ویژگی‌ای در واقع با فراخوانی تابع یکسان است.

به همین دلیل `admin.fullName` در کد پایین به درستی کار می‌کند:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected
```

اینجا در خط `(*)` ویژگی `admin.fullName` در پروتوتایپ `user` دارای یک getter است، پس این تابع فراخوانی می‌شود. و در خط `(**)` ویژگی در پروتوتایپ دارای یک setter است پس این تابع فراخوانی می‌شود.

## The value of "this"

An interesting question may arise in the example above: what's the value of `this` inside `set fullName(value)`? Where are the properties `this.name` and `this.surname` written: into `user` or `admin`?

The answer is simple: `this` is not affected by prototypes at all.

**No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.**

So, the setter call `admin.fullName=` uses `admin` as `this`, not `user`.

That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.

For instance, here `animal` represents a "method storage", and `rabbit` makes use of it.

The call `rabbit.sleep()` sets `this.isSleeping` on the `rabbit` object:

```js run
// animal has methods
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

The resulting picture:

![](proto-animal-rabbit-walk-3.svg)

If we had other objects, like `bird`, `snake`, etc., inheriting from `animal`, they would also gain access to methods of `animal`. But `this` in each method call would be the corresponding object, evaluated at the call-time (before dot), not `animal`. So when we write data into `this`, it is stored into these objects.

As a result, methods are shared, but the object state is not.

## for..in loop

The `for..in` loop iterates over inherited properties too.

For instance:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// Object.keys only returns own keys
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// for..in loops over both own and inherited keys
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

So we can filter out inherited properties (or do something else with them):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
```

Here we have the following inheritance chain: `rabbit` inherits from `animal`, that inherits from `Object.prototype` (because `animal` is a literal object `{...}`, so it's by default), and then `null` above it:

![](rabbit-animal-object.svg)

Note, there's one funny thing. Where is the method `rabbit.hasOwnProperty` coming from? We did not define it. Looking at the chain we can see that the method is provided by `Object.prototype.hasOwnProperty`. In other words, it's inherited.

...But why does `hasOwnProperty` not appear in the `for..in` loop like `eats` and `jumps` do, if `for..in` lists inherited properties?

The answer is simple: it's not enumerable. Just like all other properties of `Object.prototype`, it has `enumerable:false` flag. And `for..in` only lists enumerable properties. That's why it and the rest of the `Object.prototype` properties are not listed.

```smart header="Almost all other key/value-getting methods ignore inherited properties"
Almost all other key/value-getting methods, such as `Object.keys`, `Object.values` and so on ignore inherited properties.

They only operate on the object itself. Properties from the prototype are *not* taken into account.
```

## Summary

- In JavaScript, all objects have a hidden `[[Prototype]]` property that's either another object or `null`.
- We can use `obj.__proto__` to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by `[[Prototype]]` is called a "prototype".
- If we want to read a property of `obj` or call a method, and it doesn't exist, then JavaScript tries to find it in the prototype.
- Write/delete operations act directly on the object, they don't use the prototype (assuming it's a data property, not a setter).
- If we call `obj.method()`, and the `method` is taken from the prototype, `this` still references `obj`. So methods always work with the current object even if they are inherited.
- The `for..in` loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.
