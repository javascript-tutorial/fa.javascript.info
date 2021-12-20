
# ویژگی‌ها و متدهای شخصی و محافظت شده

یکی از مهم‌ترین قواعد برنامه‌نویسی شیءگرا -- محدود کردن رابط داخلی از رابط بیرونی است.

یعنی یک کارِ «بایدی» در توسعه هر چیزی پیچیده‌تر از یک برنامه "hello world".

برای فهمیدن این موضوع، بیایید از توسعه دور شویم و به دنیای واقعی نگاه کنیم.

معمولا، دستگاه‌هایی که ما استفاده می‌کنیم بسیار پیچیده هستند. اما محدود کردن رابط داخلی از رابط بیرونی به ما این امکان را می‌دهد که بدون مشکل از آن‌ها استفاده کنیم.

## یک مثال در زندگی واقعی

برای مثال، یک قهوه‌ساز. از بیرون ساده است: یک دکمه، یک نمایشگر، چند سوراخ...و قطعا، نتیجه -- یک قهوه عالی :)

![](coffee.jpg)

اما از درون... (تصویری از دفترچه راهنمای تعمیرات)

![](coffee-inside.jpg)

مقدار زیادی جزئیات. اما می‌توانیم بدون دانستن چیزی از آن استفاده کنیم.

قهوه‌سازها بسیار قابل اطمینان هستند نه؟ می‌توانیم برای سال‌ها از آن‌ها استفاده کنیم و اگر چیزی درست نبود -- آن را به تعمیراتی ببرید.

راز قابل اطمینان و ساده بودن یک قهوه‌ساز -- تمام جزئیات به خوبی تنظیم شده و درون آن *پنهان* است.

اگر ما پوشش حفاظتی را از قهوه‌ساز برداریم، سپس استفاده از آن پیچیده‌تر (کجا را فشار دهیم؟) و خطرناک‌تر (می‌تواند باعث برق گرفتگی شود) خواهد بود.

همانطور که خواهیم دید، در برنامه‌نویسی شیءها مانند قهوه‌سازها هستند.

اما برای مخفی‌سازی جزئیات درونی،ما از پوشش حفاظتی استفاده نمی‌کنیم، بلکه از سینتکس خاص زبان و قراردادها استفاده می‌کنیم.

## رابط درونی و بیرونی

در برنامه‌نویسی شیءگرا، ویژگی‌ها و متدها به دو گروه تقسیم می‌شوند:

- *رابط درونی* -- متدها و ویژگی‌ها، قابل دسترس از متدهای دیگر کلاس، اما نه از بیرون.
- *رابط بیرونی* -- متدها و ویژگی‌ها، قابل دسترس از بیرون از کلاس.

اگر ما مثال قهوه‌ساز را ادامه دهیم -- چیزی که درون آن است: یک مجرای بخار، المنت حرارت و غیره -- رابط درونی است.

یک رابط درونی برای اینکه شیء کار کند استفاده می‌شود، جزئیات آن از یکدیگر استفاده می‌کنند. برای مثال، یک مجرای بخار به المنت حرارت متصل شده است.

اما از بیرون یک قهوه‌ساز توسط پوشش محافظ بسته شده است پس کسی نمی‌تواند به آن‌ها دسترسی داشته باشد. جزئیات پنهان و غیر قابل دسترس شده‌اند. ما می‌توانیم از طریق رابط بیرونی از خصوصیات آن استفاده کنیم.

پس تمام چیزی که برای استفاده از یک شیء نیاز داریم این است که رابط بیرونی آن را بشناسیم. شاید کاملا از اینکه چگونه کار می‌کند و این عالی است.

این یک معرفی کلی بود.

در جاوااسکریپت، دو نوع فیلد شیء داریم (ویژگی‌ها و متدها):

- عمومی (public): قابل دسترس از هر جا. آن‌ها شامل رابط بیرونی می‌شوند. تا اینجا ما فقط از ویژگی‌ها و متدهای عمومی استفاده می‌کردیم.
- خصوصی (private): فقط درون کلاس قابل دسترس است. این‌ها برای رابط درونی هستند.

در بسیاری از زبان‌های دیگر فیلدهای «محافظت‌شده» (protected) هم وجود دارد: فقط از درون کلاس و کلاس‌هایی که آن را تعمیم می‌دهند قابل دسترس است (مانند نوع خصوصی اما قابل دسترس از کلاس‌های ارث‌بر). آن‌ها هم برای رابط درونی مفید هستند. آن‌ها در کل نسبت به نوع خصوصی بیشتر رایج هستند چون ما معمولا می‌خواهیم کلاس‌های ارث‌بر به آن‌ها دسترسی داشته باشند.

فیلدهای محافظت‌شده در جاوااسکریپت در سطح زبان پیاده‌سازی نشده‌اند اما در عمل بسیار مناسب هستند پس تقلید شده‌اند.

حالا در جاوااسکریپت یک قهوه‌ساز همراه با انواع ویژگی خواهیم ساخت. یک قهوه‌ساز جزئیات زیادی دارد، ما برای ساده بودن آن‌ها را مدل‌سازی نمی‌کنیم (اگرچه می‌توانستیم).

## فیلد "waterAmount" محافظت‌شده

بیایید یک کلاس ساده قهوه‌ساز ایجاد کنیم:

```js run
class CoffeeMachine {
  waterAmount = 0; // مقدار آب درون

  constructor(power) {
    this.power = power;
    alert( `یک قهوه‌ساز ایجاد کردیم، توان: ${power}` );
  }

}

// ایجاد قهوه‌ساز
let coffeeMachine = new CoffeeMachine(100);

// اضافه کردن آب
coffeeMachine.waterAmount = 200;
```

حالا ویژگی‌های `waterAmount` و `power` عمومی هستند. می‌توانیم به راحتی از بیرون آن‌ها را دریافت کنیم یا مقداردهی کنیم.

بیایید برای داشتن کنترل بیشتر ویژگی `waterAmount` را به محافظت‌شده تغییر دهیم. برای مثال، ما نمی‌خواهیم کسی آن را کمتر از صفر تنظیم کند.

**قبل از ویژگی‌های محافظت‌شده معمولا یک زیرخط (underscore) `_` می‌آید.**

این نوع در سطح زبان اجرایی نشده اما یک قرارداد شناخته‌شده بین برنامه‌نویسان وجود دارد که نباید از بیرون به چنین ویژگی‌ها و متدهایی دسترسی پیدا کرد.

پس ویژگی ما `_waterAmount` خواهد بود:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// ایجاد قهوه‌ساز
let coffeeMachine = new CoffeeMachine(100);

// اضافه کردن آب
coffeeMachine.waterAmount = -10; // -برابر با 0 خواهد بود نه 10 _waterAmount
```

حالا دسترسی تحت کنترل است پس تنظیم مقدار آب کمتر از صفر ممکن نیست.

## ویژگی "power" فقط‌خواندنی

بیایید ویژگی `power` را فقط‌خواندنی کنیم. گاهی اوقات یک ویژگی باید فقط زمان ایجاد کردن مقداردهی شود و دیگر هیچ‌وقت تغییر نکند.

این دقیقا برای قهوه‌ساز هم صدق می‌کند: توان (power) هیچ‌وقت تغییر نمی‌کند.

برای انجام این کار، ما فقط نیاز داریم که یک getter ایجاد کنیم اما setter را نه:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// ایجاد قهوه‌ساز
let coffeeMachine = new CoffeeMachine(100);

alert(`توان: ${coffeeMachine.power} وات`); // توان: 100 وات

coffeeMachine.power = 25; // (نداریم setter) ارور
```

````smart header="تابع‌های Getter/setter"
اینجا ما از سینتکس getter/setter استفاده کردیم.

اما اکثر اوقات تابع‌های `get.../set...` ترجیح داده می‌شوند، مثلا اینگونه:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

این کمی طولانی‌تر بنظر می‌رسد اما تابع‌ها بیشتر منعطف هستند. آن‌ها می‌توانند چند آرگومان دریافت کنند (حتی اگر ما همین الان به آن‌ها نیاز نداشته باشیم).

از سویی دیگر، سینتکس get/set` کوتاه‌تر است پس در نهایت هیچ قانونی وجود ندارد، تصمیم با شماست.
````

```smart header="فیلدهای محافظت‌شده به ارث برده می‌شوند"
اگر ما `class MegaMachine extends CoffeeMachine` را ارث‌بری کنیم، سپس چیزی جلوی ما را برای دسترسی به `this._waterAmount` یا `this._power` از متدهای کلاس جدید نمی‌گیرد.

پس فیلدهای محافظت‌شده به طور طبیعی قابل ارث‌بری هستند. برخلاف فیلدهای خصوصی که پایین خواهیم دید.
```

## فیلد "#waterLimit" خصوصی

[recent browser=none]

یک طرح پیشنهادی تمام شده جاوااسکریپت وجود دارد، تقریبا درون استاندارد وارد شده، که پشتیبانی برای ویژگی‌ها و متدهای خصوصی (private) را در سطح زبان فراهم می‌کند.

ویژگی‌ها خصوصی با `#` شروع می‌شوند. آن‌ها فقط از درون کلاس قابل دسترس هستند.

برای مثال، اینجا ویژگی خصوصی `#waterLimit` و متد خصوصی `#fixWaterAmount` را داریم:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// نمی‌توان بیرون از کلاس به خصوصی‌ها دسترسی پیدا کرد
coffeeMachine.#fixWaterAmount(123); // ارور
coffeeMachine.#waterLimit = 1000; // ارور
*/!*
```

در سطح زبان، `#` نمادی خاص است که یعنی فیلد خصوصی است. ما نمی‌توانیم از بیرون یا از کلاس‌های ارث‌بر به آن دسترسی داشته باشیم.

فیلدهای خصوصی با فیلدهای عمومی ناسازگار نیستند. می‌توانیم در یک زمان هم `#waterAmount` خصوصی داشته باشیم و هم `waterAmount` عمومی.

برای مثال، بیایید `waterAmount` را به عنوان اکسسر برای `#waterAmount` ایجاد کنیم:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // ارور
```

برخلاف محافظت‌شده‌ها، فیلدهای خصوصی در سطح خود زبان اجرایی شده‌اند. این چیز خوبی است.

اما اگر ما از `CoffeMachine` ارث‌بری کنیم، سپس دسترسی مستقیم به `#waterAmount` نداریم. باید به سراغ getter/setter برای `waterAmount` برویم:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // ممکن است CoffeMachine ارور: دسترسی فقط از
*/!*
  }
}
```

در بسیاری از سناریوها چنین محدودیتی خیلی سخت‌گیرانه است. اگر ما `CoffeMachine` را تعمیم دهیم، شاید دلایل قابل قبولی برای دسترسی به درون آن داشته باشیم. به همین دلیل فیلدهای محافظت‌شده اغلب اوقات استفاده می‌شوند حتی اگر آن‌ها توسط سینتکس زبان پشتیبانی نمی‌شوند.

````warn header="فیلدهای خصوصی به صورت this[name] در دسترس نیستند"
فیلدهای خصوصی خاص هستند.

همانطور که می‌دانیم، معمولا با استفاده از `this[name]` به فیلدها دسترسی پیدا می‌کنیم:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

این برای فیلدهای خصوصی غیر ممکن است: `this['#name']` کار نمی‌کند. این یک محدودیت سینتکسی است تا حریم اطمینان حاصل کند.
````

## Summary

In terms of OOP, delimiting of the internal interface from the external one is called [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).

It gives the following benefits:

Protection for users, so that they don't shoot themselves in the foot
: Imagine, there's a team of developers using a coffee machine. It was made by the "Best CoffeeMachine" company, and works fine, but a protective cover was removed. So the internal interface is exposed.

    All developers are civilized -- they use the coffee machine as intended. But one of them, John, decided that he's the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

    That's surely not John's fault, but rather the person who removed the protective cover and let John do his manipulations.

    The same in programming. If a user of a class will change things not intended to be changed from the outside -- the consequences are unpredictable.

Supportable
: The situation in programming is more complex than with a real-life coffee machine, because we don't just buy it once. The code constantly undergoes development and improvement.

    **If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.**

    If you're a developer of such class, it's great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.

    For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.

Hiding complexity
: People adore using things that are simple. At least from outside. What's inside is a different thing.

    Programmers are not an exception.

    **It's always convenient when implementation details are hidden, and a simple, well-documented external interface is available.**

To hide an internal interface we use either protected or private properties:

- Protected fields start with `_`. That's a well-known convention, not enforced at the language level. Programmers should only access a field starting with `_` from its class and classes inheriting from it.
- Private fields start with `#`. JavaScript makes sure we can only access those from inside the class.

Right now, private fields are not well-supported among browsers, but can be polyfilled.
