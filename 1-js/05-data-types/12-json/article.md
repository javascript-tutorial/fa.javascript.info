# متدهای JSON، toJSON

بیایید فرض کنیم یک شیء پیچیده داریم و می‌خواهیم آن را به رشته تبدیل کنیم تا آن را به یک شبکه بفرستیم یا فقط آن را به قصد ثبت کردن خروجی بگیریم.

به طور طبیعی، چنین رشته‌ای باید تمام ویژگی‌های مهم شیء را داشته باشد.

ما می‌توانیم این تبدیل را اینگونه پیاده‌سازی کنیم:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...اما در فرایند توسعه، ویژگی‌های جدید اضافه و ویژگی‌های قدیمی دوباره نامگذاری و حذف می‌شوند. بروزرسانی `toString` هر بار می‌تواند طاقت‌فرسا باشد. ما می‌توانیم در ویژگی‌های آن حلقه بزنیم اما اگر شیء پیچیده باشد و شیءهای تودرتو را در ویژگی‌ها داشته باشد چیکار کنیم؟ ما باید تبدیل آنها را هم پیاده‌سازی کنیم.

خوشبختانه نیازی به نوشتن کدی برای کنترل تمام اینها نیست. از قبل این مشکل حل شده است.

## متد JSON.stringify

<<<<<<< HEAD
[JSON](http://fa.wikipedia.org/wiki/جی%E2%80%8Cسان) (نشانه‌گذاری شیء جاوااسکریپت، جِی‌سان) یک فرمت کلی برای نمایش مقدارها و شیءها است. جِی‌سان در استاندارد [RFC 4627](http://tools.ietf.org/html/rfc4627) شرح داده شده است. در ابتدا برای جاوااسکریپت ساخته شد اما بسیاری از زبان‌های دیگر هم کتابخانه‌هایی برای بکاربردن آن دارند. پس هنگامی که سمت کاربر سایت از جاوااسکریپت و سمت سرور با زبان‌های Ruby/PHP/Java/یا هر چیز دیگر نوشته شده باشد، استفاده از جی‌سان برای رد و بدل کردن داده آسان است.
=======
The [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) is a general format to represent values and objects. It is described as in [RFC 4627](https://tools.ietf.org/html/rfc4627) standard. Initially it was made for JavaScript, but many other languages have libraries to handle it as well.  So it's easy to use JSON for data exchange when the client uses JavaScript and the server is written on Ruby/PHP/Java/Whatever.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

جاوااسکریپت متدهای زیر را دارد:

- `JSON.stringify` برای تبدیل شیءها به جی‌سان.
- `JSON.parse` برای تبدیل جی‌سان به یک شیء.

برای مثال، اینجا ما متد `JSON.stringify` را روی یک دانشجو اجرا می‌کنیم:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // !ما یک رشته داریم

alert(json);
*!*
/* :شیء کدگذاری شده جی‌سان
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

متد `JSON.stringify(student)`شیء را دریافت می‌کند و آن را به رشته تبدیل می‌کند.

رشته `json` حاصل را شیء *جی‌سان کدگذاری شده* یا *سریالی‌شده* یا *مرتب‌شده* می‌گویند. ما برای فرستادن آن به جایی یا قرار دادن آن در یک انبارِ داده آماده هستیم. 


لطفا در نظر داشته باشید که یک شیء جی‌سان کدگذاری شده با شیء لیترال چند تفاوت مهم دارد:

- رشته‌ها از کوتیشن دوتایی استفاده می‌کنند. کوتیشن‌های تکی یا backtickها در جی‌سان جایی ندارند. پس `'John'` به `"John"` تبدیل می‌شود.
- اسم ویژگی‌های شیء هم کوتیشن دوتایی می‌گیرند. این کار لازم است. پس `age:30` به `"age":30` تبدیل می‌شود.

متد `JSON.stringify` می‌تواند روی مقدارهای اولیه هم اجرا شود.

جی‌سان از انواع داده  زیر پشتیبانی می‌کند:

- شیءها `{ ... }`
- آرایه‌ها `[ ... ]`
- مقدارهای اولیه:
    - رشته‌ها،
    - اعداد،
    - مقدارهای boolean `true/false`،
    - `null`.

برای مثال:

```js run
// یک عدد در جی‌سان تنها یک عدد است
alert( JSON.stringify(1) ) // 1

// یک رشته در جی‌سان هنوز هم یک رشته است اما کوتیشن دوتایی می‌گیرد
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

جی‌سان مشخصه‌ای است که فقط با داده سر و کار دارد و از زبان مستقل است، پس بعضی از ویژگی‌های شیء مخصوص جاوااسکریپت توسط `JSON.stringify` نادیده گرفته می‌شوند.

برای مثال:

- ویژگی‌های تابعی (متدها).
- مقدارها و ویژگی‌های سمبلی (symbolic).
- ویژگی‌هایی که `undefined` را در خود ذخیره دارند.

```js run
let user = {
  sayHi() { // نادیده‌گرفته می‌شود
    alert("Hello");
  },
  [Symbol("id")]: 123, // نادیده‌گرفته می‌شود
  something: undefined // نادیده‌گرفته می‌شود
};

alert( JSON.stringify(user) ); // {} (شیء خالی)
```

معمولا این موضوع مشکلی ندارد. اگر این چیزی نیست که ما بخواهیم، به زودی خواهیم دید که چگونه فرایند را شخصی‌سازی کنیم.

یک چیز عالی این است که شیءهای تودرتو هم پشتیبانی و به طور خودکار تبدیل می‌شوند.

برای مثال:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* :تمام ساختار به رشته تبدیل شد
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

محدودیت مهم این است: نباید هیچ مرجع دایره‌ای وجود داشته باشد.

برای مثال:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // مراجعه می‌کند room به meetup
room.occupiedBy = meetup; // مراجعه می‌کند meetup به room

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

اینجا، فرایند تبدیل به دلیل مرجع دایره‌ای با شکست مواجه می‌شود: `room.occupiedBy` به `meetup` رجوع می‌کند و `meetup.place` به `room` رجوع می‌کند:

![](json-meetup.svg)


## مشمول نکردن و تغییر شکل دادن: تابع replacer

سینتکل کامل `JSON.stringify` اینگونه است:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: مقداری که کدگذاری می‌شود.

replacer
: یک آرایه از ویژگی‌هایی که باید کدگذاری شوند یا یک تابع `function(key, value)`.

space
: مقدار فاصله خالی که برای قالب‌بندی استفاده می‌شود.

اکثر اوقات، `JSON.stringify` تنها با آرگومان اول استفاده می‌شود. اما اگر ما بخواهیم که فرایند جایگزینی را بهتر کنیم، مثلا برای جداسازی مرجع‌های دایره‌ای، می‌توانیم از آرکومان دومِ `JSON.stringify` استفاده کنیم.

اگر یک آرایه از ویژگی‌ها را به آن بدهیم، تنها این ویژگی‌ها کدگذاری می‌شوند.

برای مثال:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // مراجعه می‌کند room به meetup
};

room.occupiedBy = meetup; // مراجعه می‌کند meetup به room

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

احتمالا اینجا ما بسیار سخت‌گیر هستیم. لیست ویژگی بر روی تمام ساختار شیء اعمال شده است. پس پس شیءهای درون `participants` خالی هستند چون `name` درون لیست نیست.

بیایید تمام ویژگی‌ها را به جز `room.occupiedBy` که باعث مرجع دایره‌ای است را اضافه کنیم:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // مراجعه می‌کند room به meetup
};

room.occupiedBy = meetup; // مراجعه می‌کند meetup به room

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

حالا همه چیز به جز `occupiedBy` سریالی شده‌اند. اما لیست ویژگی‌ها هنوز هم خیلی طولانی است.

خوشبختانه، ما می‌توانیم از یک تابع به جای آرایه استفاده کنیم مانند `replacer`.

تابع بر روی هر جفت `(key, value)` صدا زده می‌شود و باید مقدار «جایگزین شده» را برگرداند که به جای مقدار اصلی استفاده می‌شود. یا اگر مقدار قرار است نادیده گرفته شود، `undefined` را برگرداند.

در این مورد ما، می‌توانیم `value` را برای همه چیز به جز `occupiedby` «همانطور که هست» برگردانیم. برای نادیده گرفتن `occupiedBy`، کد پایین `undefined` را برمی‌گرداند:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // مراجعه می‌کند room به meetup
};

room.occupiedBy = meetup; // مراجعه می‌کند meetup به room

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* جفت‌های کلید:مقدار که جایگزین می‌شوند
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

لطفا در نظر داشته باشید که تابع `replacer` تمام جفت‌های کلید/مقدار شامل شیءهای تودرتو و المان‌های آرایه را دریافت می‌کند. این تابع به صورت بازگشتی اعمال می‌شود. مقدار `this` درون `replacer` شیءای است که ویژگی کنونی را در خود دارد.

اولین فراخوانی خاص است. این فراخوانی با استفاده از یک «شیء دربرگیرنده»: `{"":meetup}` ساخته می‌شود. به بیانی دیگر، اولین جفت `(key, value)` یک کلید خالی دارد و مقدار برابر با کل شیء مورد نظر است. به همین دلیل است که در مثال بالا، اولین خط `":[object Object]"` است.

ایده این موضوع این است که تا جایی که می‌شود به `replacer` قدرت داده شود: این تابع شانس این را دارد که اگر لازم بود حتی تمام شیء را تجزیه و تحلیل یا جایگزین کند/نادیده بگیرد.


## قالب‌بندی: space

آرگومان سوم `JSON.stringify(value, replacer, space)` تعداد فاصله خالی برای استفاده در قالب‌بندی شکیل است.

قبلا تمام شیءهایی که به رشته تبدیل شده بودند هیچ تورفتگی و فاصله اضافی نداشتند. اگر بخواهیم یک شیء را به یک شبکه بفرستیم این موضوع مشکلی ندارد. آرگومان `space` خصوصا برای یک خروجی زیبا استفاده می‌شود.

اینجا `space = 2` به جاوااسکریپت می‌گوید که شیءهای تودرتو را در چند خط و با 2 فاصله خالی تورفتگی درون یک شیء نشان بده:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* :با 2 فاصله خالی تورفتگی
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* :نتیجه، تورفتگی بیشتری خواهد داشت JSON.stringify(user, null, 4) برای
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

آرگومان سوم رشته هم می‌تواند باشد. در این صورت، به جای تعداد فاصله خالی، آن رشته برای اعمال تورفتگی استفاده می‌شود.

پارامتر `space` صرفا برای اهدافی مانند خروجی زیبا استفاده می‌شود.

## متد "toJSON" شخصی‌سازی شده

مانند `toString` برای تبدیل به رشته، یک شیء می‌تواند متد `toJSON` را برای تبدیل به جی‌سان داشته باشد. اگر این متد موجود باشد، `JSON.stringify` به طور خودکار آن را صدا می‌زند.

برای مثال:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

اینجا می‌بینیم که `date` `(1)` به رشته تبدیل شد. به این دلیل که تمام تاریخ‌ها یک متد درونی `toJSON` دارند که چنین رشته‌ای را برمی‌گرداند.

حالا بیایید یک `toJSON` شخصی‌ساز به شیء `room` اضافه کنیم:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

همانطور که می‌بینیم، `toJSON` هم برای فراخوانی مستقیم `JSON.stringify(room)` استفاده می‌شود و هم زمانی که `room` در یک شیء کدگذاری شده دیگر به صورت تودرتو وجود دارد.


## متد JSON.parse

برای برگرداندن کدگذاری یک رشته‌ی جی‌سان، ما به متد دیگری به نام [JSON.parse](mdn:js/JSON/parse) نیاز داریم.

سینتکس آن:
```js
let value = JSON.parse(str, [reviver]);
```

پارامتر str
: رشته‌ی جی‌سان برای تجزیه.

پارامتر reviver
: تابع اختیاری function(key,value) که برای هر جفت `(key, value)` فراخوانی می‌شود و می‌تواند مقدار را تغییر شکل دهد.

برای مثال:

```js run
// آرایه‌ای که رشته شده
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

یا برای شیءهای تودرتو:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

جی‌سان ممکن است در صورت لزوم پیچیده باشد و شیءها و آرایه‌ها شامل شیءها و آرایه‌های دیگری هم باشند. اما آنها باید از یک فرمت جی‌سان مشابه تابعیت کنند.

اینجا چند اشتباه رایج در جی‌سان دست نویس را آوردیم (گاهی اوقات باید برای رفع خطا (Debugging) آن را بنویسیم):

```js
let json = `{
  *!*name*/!*: "John",                     // اشتباه: اسم ویژگی بدون کوتیشن
  "surname": *!*'Smith'*/!*,               // اشتباه: مقدار، کوتیشن تکی دارد (باید دوتایی باشد)
  *!*'isAdmin'*/!*: false                  // اشتباه: کلید، کوتیشن تکی دارد (باشد دوتایی باشد)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // مجاز نیست، فقط مقدارهای خام مجازند "new" اشتباه: عملگر
  "friends": [0,1,2,3]              // اینجا همه چیز درست است
}`;
```

به علاوه، جی‌سان از کامنت پشتیبانی نمی‌کند. اضافه کردن کامنت به جی‌سان آن را نامعتبر می‌کند.

یک فرمت دیگر به نام [JSON5](http://json5.org/) وجود دارد که کلیدها بدون کوتیشن، کامنت و... را معتبر می‌داند. اما این جی‌سان یک کتابخانه مستقل است و در مشخصات زبان وجود ندارد.

دلیل اینکه جی‌سان معمولی انقدر سخت‌گیرانه است این نیست که توسعه دهندگان آن تنبل هستند، بلکه دلیلش این است که یک پیاده‌سازی آسان، مورد اطمینان و سریع از الگوریتم تجزیه را فراهم کند.

## استفاده از احیاکننده (reviver)

فرض کنید ما یک شیء `meetup` که به رشته تبدیل شده را از سرور گرفتیم.

این شیء اینگونه بنظر می‌رسد:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...و حالا ما نیاز داریم که آن را از *سریالی بودن* خارج کنیم تا دوباره به یک شیء جاوااسکریپت تبدیل شود.

بیایید با فراخوانی `JSON.parse` این کار را انجام دهیم:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // !ارور
*/!*
```

ای وای! یک ارور!

مقدار `meetup.date` یک رشته است، نه یک شیء `Date`. متد `JSON.parse` از کجا بداند که باید آن رشته را به یک `Date` تبدیل کند؟

بیایید به `JSON.parse` تابع احیاکننده (reviver) را به عنوان آرگومان دوم بدهیم که تمام مقدارهای را «همانطور که هستند» برگرداند اما `date` به یک شیء `Date` تبدیل خواهد شد:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // !حالا کار می‌کند
```

در ضمن برای شیءهای تودرتو هم کار می‌کند:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // !کار می‌کند
*/!*
```



## خلاصه

- جی‌سان یک فرمت داده است که برای بیشتر زبان‌های برنامه‌نویسی، استاندارد و کتابخانه‌های مستقل خود را دارد.
- جی‌سان از شیءهای ساده، آرایه‌ها، رشته‌ها، اعداد، بولین‌ها و `null` پشتیبانی می‌کند.
- جاوااسکریپت متدهای [JSON.stringify](mdn:js/JSON/stringify) برای سریالی کردن به جی‌سان و [JSON.parse](mdn:js/JSON/parse) برای خواندن از جی‌سان را فراهم می‌کند.
- هر دو متد از تابع‌های تغییر شکل دهنده برای خواندن/نوشتن هوشمندانه پشتیبانی می‌کنند.
- اگر یک شیء متد `toJSON` داشته باشد، سپس این متد توسط `JSON.stringify` فراخوانی می‌شود.
