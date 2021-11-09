
# گیرنده و تنظیم‌کننده‌های ویژگی

ویژگی‌های شیء دو نوع هستند.

نوع اول *ویژگی‌های داده‌ای* هستند. ما از قبل می‌دانیم چگونه با آن‌ها کار کنیم. تمام ویژگی‌هایی که تا حالا استفاده می‌کردیم ویژگی‌های داده‌ای بودند.

نوع دوم ویژگی‌ها چیزی جدید است. این نوع *ویژگی‌های دسترسی* است. اساسا آن‌ها تابع‌هایی هستند که برای گرفتن و تنظیم‌کردن مقداری اجرا می‌شوند اما برای یک شیء خارجی مانند ویژگی‌های معمولی به نظر می‌رسند.

## گیرنده‌ها و تنظیم‌کننده‌ها

ویژگی‌های دسترسی توسط متدهای «گیرنده(getter)» و «تنظیم‌کننده(setter)» نمایش داده می‌شوند. در یک شیء لیترال، این متدها با `get` و `set` مشخص می‌شوند.

```js
let obj = {
  *!*get propName()*/!* {
    // اجرا می‌شود obj.propName گیرنده، کد آن برای دریافت
  },

  *!*set propName(value)*/!* {
    // اجرا می‌شود obj.propName = value تنظیم‌کننده، کد آن برای تنظیم
  }
};
```

گیرنده زمانی که `obj.propName` خوانده می‌شود کار می‌کند؛ تنظیم‌کننده زمانی که این ویژگی مقداردهی می‌شود.

برای مثال، ما یک شیء `user` حاوی `name` و `surname` داریم:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

حالا می‌خواهیم یک ویژگی `fullName` اضافه کنیم که باید `"John Smith"` باشد. قطعا، نمی‌توانیم اطلاعات موجود را کپی‌پِیست کنیم پس آن را به عنوان یک دسترسی پیاده‌سازی کنیم:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

از بیرون، یک ویژگی دسترسی مانند ویژگی‌ای معمولی به نظر می‌رسد. این ایده‌ی ویژگی‌های دسترسی است. ما `user.fullName` را به عنوان یک تابع *فراخوانی* نمی‌کنیم بلکه آن را به صورت عادی *دریافت* می‌کنیم:

از حالا به بعد، `fullName` فقط یک گیرنده دارد. اگر ما بخواهیم `user.fullName` را مقداردهی کنیم، ارور ایجاد می‌شود:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // ارور (ویژگی فقط گیرنده دارد)
*/!*
```

بیایید با اضافه کردن تنظیم‌کننده برای `user.fullName` این مشکل را برطرف کنیم:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// همراه با مقدار داده شده اجرا می‌شود set fullName
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

در نتیجه، ما یک ویژگی «مجازیِ» `fullName` داریم. هم قابل خواندن است و هم قابل نوشتن.

## Accessor descriptors

Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.

That is, an accessor descriptor may have:

- **`get`** -- a function without arguments, that works when a property is read,
- **`set`** -- a function with one argument, that is called when the property is set,
- **`enumerable`** -- same as for data properties,
- **`configurable`** -- same as for data properties.

For instance, to create an accessor `fullName` with `defineProperty`, we can pass a descriptor with `get` and `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.

If we try to supply both `get` and `value` in the same descriptor, there will be an error:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Smarter getters/setters

Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...
```

So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.


## Using for compatibility

One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...But sooner or later, things may change. Instead of `age` we may decide to store `birthday`, because it's more precise and convenient:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Now what to do with the old code that still uses `age` property?

We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let's keep it.

Adding a getter for `age` solves the problem:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age
```

Now the old code works too and we've got a nice additional property.
