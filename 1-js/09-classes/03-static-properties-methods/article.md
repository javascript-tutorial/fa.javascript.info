
# ویژگی و متدهای ایستا

ما می‌توانیم یک متد را به تمام کلاس اختصاص دهیم. چنین متدهایی *ایستا (static)* نامیده می‌شوند.

در یک کلاس، آن‌ها با کلمه کلیدی `static` استفاده می‌شوند، مثل این:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

این کار دقیقا مانند این است که به طور مستقیم یک ویژگی را مقداردهی کنیم:

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

مقدار `this` درون فراخوانی `User.staticMethod()` برابر با کلاس سازنده یعنی خود `User` است (قانون «شیء قبل از نقطه»).

معمولا، متدهای ایستا برای پیاده‌سازی تابع‌هایی که به کل کلاس تعلق دارند و نه به هر شیء خاصی از آن استفاده می‌شوند.

برای مثال، ما شیءهای کلاس  `Article` (به معنی مقاله) را داریم و به تابعی برای مقایسه آن‌ها نیاز داریم. 

یک راه‌حل طبیعی اضافه کردن متد ایستای  `Article.compare` است، مثلا اینگونه:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// کارایی
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

اینجا `Article.compare` در «بالای» مقاله‌ها (articles) قرار دارد، به عنوان روشی برای مقایسه آن‌ها. این متدی برای یک مقاله(article) نیست، بلکه برای کل کلاس است.

مثال دیگر متدی به نام "factory" (به معنی تولیدکننده) است. 

فرض کنید، ما به چند راه برای ایجاد یک مقاله نیاز داریم:

1. ساختن از طریق پارامترها (`title`، `date` و غیره).
2. ساختن یک مقاله خالی با تاریخ امروز.
3. ...یا به روشی دیگر.

اولین راه می‌تواند با استفاده از تابع سازنده پیاده‌سازی شود. و برای راه دوم می‌توانیم یک متد ایستا برای کلاس بسازیم.

مانند `Article.createTodays()` در اینجا:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // this = Article ،به یاد داشته باشید
    return new this("خلاصه‌ی امروز", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // خلاصه‌ی امروز
```

حالا هر بار که نیاز داشته باشیم یک خلاصه از امروز بسازیم، می‌توانیم `Article.createTodays()` را فراخوانی کنیم. یکبار دیگر هم می‌گوییم، این متدی از مقاله (article) نیست بلکه متدی از کل کلاس است.

متدهای ایستا همچنین در کلاس‌های مربوط به پایگاه داده (database) برای جست‌وجو/ذخیره/حذف ورودی‌ها از پایگاه داده هم استفاده می‌شوند، مثلا اینگونه:

```js
// کلاسی خاص برای مدیریت مقاله‌ها است Article با فرض اینکه
// :id متد ایستا برای حذف مقاله‌ها توسط
Article.remove({id: 12345});
```

````warn header="متدهای ایستا برای شیءها قابل دسترس نیستند"
متدهای ایستا بر روی کلاس‌های قابل فراخوانی هستند نه بر روی شیءها.

برای مثال، چنین کدی کار نخواهد کرد:

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

## ویژگی‌های ایستا

[recent browser=Chrome]

می‌توانیم ویژگی‌های ایستا هم داشته باشیم، آن‌ها مانند ویژگی‌های معمولی کلاس بنظر می‌رسند اما قبل از آن‌ها `static` وجود دارد:

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

درست مانند مقداردهی مستقیم به `Article` است:

```js
Article.publisher = "Ilya Kantor";
```

## ارث‌بری ویژگی‌ها و متدهای ایستا [#statics-and-inheritance]

ویژگی‌ها و متدهای ایستا به ارث برده می‌شوند.

برای مثال، در کد پایین `Animal.compare` و `Animal.planet` به ارث برده می‌شوند و به صورت `Rabbit.compare` و `Rabbit.planet` قابل دسترس هستند:

```js run
class Animal {
  static planet = "زمین";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} با سرعت ${this.speed} می‌دود.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Animal ارث‌بری از
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} قایم می‌شود!`);
  }
}

let rabbits = [
  new Rabbit("خرگوش سفید", 10),
  new Rabbit("خرگوش مشکی", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // خرگوش مشکی با سرعت 5 می‌دود

alert(Rabbit.planet); // زمین
```

حالا زمانی که `Rabbit.compare` را فراخوانی می‌کنیم، `Animal.compare` که به ارث برده شده فراخوانی خواهد شد.

این چگونه کار می‌کند؟ دوباره، با استفاده از پروتوتایپ‌ها. همانطور که ممکن است از قبل حدس زده باشید، `extends` به کلاس `Rabbit` ویژگی `[[Prototype]]` می‌دهد که به `Animal` رجوع می‌کند.

![](animal-rabbit-static.svg)

پس `Rabbit extends Animal` دو رجوع `[[Prototype]]` می‌سازد:

1. تابع `Rabbit` به صورت پروتوتایپی از تابع `Animal` ارث‌بری می‌کند.
2. ویژگی `Rabbit.prototype` به صورت پروتوتایپی از `Animal.prototype` ارث‌بری می‌کند.

به عنوان یک نتیجه، ارث‌بری هم برای متدهای معمولی کار می‌کند و هم برای متدهای ایستا.

بفرمایید، بیایید این موضوع را با استفاده از کد بررسی کنیم:

```js run
class Animal {}
class Rabbit extends Animal {}

// برای ایستاها
alert(Rabbit.__proto__ === Animal); // true

// برای متدهای معمولی
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## خلاصه

متدهای ایستا برای عملکردی استفاده می‌شوند که «به صورت کامل» به کلاس تعلق دارد. این موضوع به یک نمونه موجود از کلاس مربوط نمی‌شود.

برای مثال، متدی برای مقایسه `Article.compare(article1, article2)` یا یک متد تولیدکننده `Article.createTodays()`.

آن‌ها با کلمه `static` درون تعریف کلاس برچسب زده شده‌اند.

ویژگی‌های ایستا زمانی که ما می‌خواهیم داده‌هایی در سطح کلاس ذخیره کنیم و همچنین به یک نمونه از کلاس وابسته نباشند استفاده می‌شوند.

سینتکس آن:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

از لحاظ فنی، تعریف کردن به صورت ایستا درست مانند مقداردهی به خود کلاس است:

```js
MyClass.property = ...
MyClass.method = ...
```

ویژگی‌ها و متدهای ایستا به ارث برده می‌شوند.

برای `class B extends A` پروتوتایپ کلاس `B` خودش به `A` اشاره می‌کند: `B.[[Prototype]] = A`. پس اگر یک فیلد درون `B` پیدا نشد، جست‌وجو درون `A` ادامه می‌یابد.
