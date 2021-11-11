
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

## توصیف‌کننده‌های دسترسی

توصیف‌کننده‌های ویژگی‌های دسترسی نسبت به توصیف‌کننده‌های ویژگی‌های داده‌ای تفاوت دارند.

برای ویژگی‌های دسترسی، `value` یا `writable` وجود ندارد اما به جای آن‌ها تابع‌های `get` و `set` وجود دارد.

یعنی اینکه یک توصیف‌کننده دسترسی ممکن است این‌ها را داشته باشد:

- متد **`get`** -- تابعی بدون آرگومان، زمانی که ویژگی‌ای خوانده شود کار می‌کند،
- متد **`set`** -- تابعی با یک آرگومان، زمانی که ویژگی تنظیم می‌شود فراخوانی می‌شود،
- ویژگی **`enumerable`** -- مشابه به ویژگی‌های داده‌ای،
- ویژگی **`configurable`** -- مشابه به ویژگی‌های داده‌ای،

برای مثال، برای ایجاد دسترسی `fullName` با استفاده از `defineProperty`، می‌توانیم توصیف‌کننده‌ای شامل `get` و `set` قرار دهیم:

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

لطفا در نظر داشته باشید که یک ویژگی یا می‌تواند دسترسی باشد (دارای متدهای `get/set` است) یا یک ویژگی داده‌ای (یک `value` دارد)، نه هر دو.

اگر ما تلاش کنیم که هم `get` و هم `value` را داخل یک توصیف‌کننده قرار دهیم، ارور ایجاد می‌شود:

```js run
*!*
// ارور: توصیف‌کننده غیر قابل قبول ویژگی
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## گیرنده/تنظیم‌کننده‌های هوشمندتر

گیرنده‌ها/تنظیم‌کننده‌ها می‌توانند به عنوان دربرگیرنده برای مقدار ویژگی‌های «واقعی» استفاده شوند تا کنترل بیشتری بر روی عملیات با آن‌ها داشته باشیم.

برای مثال، اگر ما بخواهیم اسم‌های خیلی کوتاه‌ها را برای `user` ممنوع کنیم، می‌توانیم یک تنظیم‌کننده `name` داشته باشیم و مقدار را درون ویژگی جداگانه‌ی `_name` ذخیره کنیم:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("اسم خیلی کوتاه است، حداقل به 4 کاراکتر نیاز دارد");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // ...اسم خیلی کوتاه است
```

پس اسم در ویژگی `_name` ذخیره شده است و دسترسی گرفتن توسط گیرنده و تنظیم‌کننده انجام می‌گیرد.

از لحاظ فنی، کد بیرونی می‌تواند به صورت مستقیم با استفاده از `user._name` به اسم دسترسی پیدا کند. اما یک قرارداد شناخته شده وجود دارد که ویژگی‌هایی که با یک زیرخط (underscore) `"_"` شروع می‌شوند، داخلی هستند و نباید بیرون از شیء به آن‌ها کاری داشت.


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
