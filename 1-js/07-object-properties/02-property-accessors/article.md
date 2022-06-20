
# متدهای getter و setter ویژگی

ویژگی‌های شیء دو نوع هستند.

نوع اول *ویژگی‌های داده‌ای* هستند. ما از قبل می‌دانیم چگونه با آن‌ها کار کنیم. تمام ویژگی‌هایی که تا حالا استفاده می‌کردیم ویژگی‌های داده‌ای بودند.

<<<<<<< HEAD
نوع دوم ویژگی‌ها چیزی جدید است. این نوع *ویژگی‌های اکسسر(accessor)* است. اساسا آن‌ها تابع‌هایی هستند که برای گرفتن و تنظیم‌کردن مقداری اجرا می‌شوند اما برای یک شیء خارجی مانند ویژگی‌های معمولی به نظر می‌رسند.
=======
The second type of property is something new. It's an *accessor property*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

## متدهای getter و setter

ویژگی‌های اکسسر توسط متدهای "getter" و "setter" نمایش داده می‌شوند. در یک شیء لیترال، این متدها با `get` و `set` مشخص می‌شوند.

```js
let obj = {
  *!*get propName()*/!* {
    // اجرا می‌شود obj.propName کد آن برای دریافت ،getter
  },

  *!*set propName(value)*/!* {
    // اجرا می‌شود obj.propName = value کد آن برای تنظیم ،setter
  }
};
```

متد getter زمانی که `obj.propName` خوانده می‌شود کار می‌کند؛ متد setter زمانی که این ویژگی مقداردهی می‌شود.

برای مثال، ما یک شیء `user` حاوی `name` و `surname` داریم:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

حالا می‌خواهیم یک ویژگی `fullName` اضافه کنیم که باید `"John Smith"` باشد. قطعا، نمی‌توانیم اطلاعات موجود را کپی‌پِیست کنیم پس می‌توانیم آن را به عنوان یک اکسسر پیاده‌سازی کنیم:

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

از بیرون، یک ویژگی اکسسر مانند ویژگی‌ای معمولی به نظر می‌رسد. این ایده‌ی ویژگی‌های اکسسر است. ما `user.fullName` را به عنوان یک تابع *فراخوانی* نمی‌کنیم بلکه آن را به صورت عادی *دریافت* می‌کنیم:

از حالا به بعد، `fullName` فقط یک getter دارد. اگر ما بخواهیم `user.fullName` را مقداردهی کنیم، ارور ایجاد می‌شود:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // (دارد getter ویژگی فقط) ارور
*/!*
```

بیایید با اضافه کردن setter برای `user.fullName` این مشکل را برطرف کنیم:

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

## توصیف‌کننده‌های اکسسر

توصیف‌کننده‌های ویژگی‌های اکسسز نسبت به توصیف‌کننده‌های ویژگی‌های داده‌ای تفاوت دارند.

برای ویژگی‌های اکسسر، `value` یا `writable` وجود ندارد اما به جای آن‌ها تابع‌های `get` و `set` وجود دارد.

یعنی اینکه یک توصیف‌کننده اکسسز ممکن است این‌ها را داشته باشد:

- متد **`get`** -- تابعی بدون آرگومان، زمانی که ویژگی‌ای خوانده شود کار می‌کند،
- متد **`set`** -- تابعی با یک آرگومان، زمانی که ویژگی مقداردهی می‌شود فراخوانی می‌شود،
- ویژگی **`enumerable`** -- مشابه به ویژگی‌های داده‌ای،
- ویژگی **`configurable`** -- مشابه به ویژگی‌های داده‌ای،

برای مثال، برای ایجاد اکسسر `fullName` با استفاده از `defineProperty`، می‌توانیم توصیف‌کننده‌ای شامل `get` و `set` قرار دهیم:

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

لطفا در نظر داشته باشید که یک ویژگی یا می‌تواند اکسسر باشد (دارای متدهای `get/set` است) یا یک ویژگی داده‌ای (یک `value` دارد)، نه هر دو.

اگر ما تلاش کنیم که هم `get` و هم `value` را داخل یک توصیف‌کننده قرار دهیم، ارور ایجاد می‌شود:

```js run
*!*
// ارور: توصیف‌کننده‌ی غیر قابل قبول ویژگی
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## متدهای getter/setter هوشمندتر

متدهای getter/setter می‌توانند به عنوان دربرگیرنده برای مقدار ویژگی‌های «واقعی» استفاده شوند تا کنترل بیشتری بر روی عملیات با آن‌ها داشته باشیم.

برای مثال، اگر ما بخواهیم اسم‌های خیلی کوتاه‌ها را برای `user` ممنوع کنیم، می‌توانیم یک setter `name` داشته باشیم و مقدار را درون ویژگی جداگانه‌ی `_name` ذخیره کنیم:

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

پس اسم در ویژگی `_name` ذخیره شده است و دسترسی گرفتن توسط getter و setter انجام می‌گیرد.

از لحاظ فنی، کد بیرونی می‌تواند به صورت مستقیم با استفاده از `user._name` به اسم دسترسی پیدا کند. اما یک قرارداد شناخته شده وجود دارد که ویژگی‌هایی که با یک زیرخط (underscore) `"_"` شروع می‌شوند، داخلی هستند و نباید بیرون از شیء به آن‌ها کاری داشت.


## استفاده برای سازگاری

یکی از بهترین کاربردهای اکسسرها این است که آن‌ها به ما اجازه می‌دهند که در هر زمان یک ویژگی داده‌ای «معمولی» را از طریق جایگزین کردن آن با یک getter و یک setter کنترل کنیم و رفتار آن را تغییر دهیم.

تصور کنید که ما شروع به پیاده‌سازی شیءهایی مربوط به کاربران کردیم که شامل ویژگی‌های داده‌ای `name` و `age` هستند:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...اما دیر یا زود، همه چیز ممکن است تغییر کند. به جای `age` ممکن است تصمیم بگیریم که `birthday` را ذخیره کنیم چون دقیق‌تر و مناسب‌تر است:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

حالا با کد قدیمی که هنوز هم از ویژگی `age` استفاده می‌کند چه کار کنیم؟

می‌توانیم چنین جاهایی را در کد پیدا و آن‌ها را درست کنیم اما این کار زمان‌بر است و اگر آن کد توسط افراد دیگری در حال استفاده باشد ممکن است این کار سخت شود. و همچنین، `age` چیز خوبی است که در `user` داشته باشیم نه؟

بیایید آن را نگه داریم.

اضافه کردن یک getter برای `age` مشکل را حل می‌کند:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // از تاریخ کنونی و تاریخ تولد محاسبه می‌شود age
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // قابل دسترس است birthday
alert( john.age );      // age درست مانند...
```

حالا کد قدیمی هم کار می‌کند و ما یک ویژگی اضافی خوب گرفتیم.
