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

[JSON](http://fa.wikipedia.org/wiki/جی%E2%80%8Cسان) (نشانه‌گذاری شیء جاوااسکریپت، جِی‌سان) یک فرمت کلی برای نمایش مقدارها و شیءها است. جِی‌سان در استاندارد [RFC 4627](http://tools.ietf.org/html/rfc4627) شرح داده شده است. در ابتدا برای جاوااسکریپت ساخته شد اما بسیاری از زبان‌های دیگر هم کتابخانه‌هایی برای بکاربردن آن دارند. پس هنگامی که سمت کاربر سایت از جاوااسکریپت و سمت سرور با زبان‌های Ruby/PHP/Java/یا هر چیز دیگر نوشته شده باشد، استفاده از جی‌سان برای رد و بدل کردن داده آسان است.

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
  wife: null
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
  "wife": null
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


## قالب‌بندی: فاصله خالی

آرگومان سوم `JSON.stringify(value, replacer, space)` تعداد فاصله خالی برای استفاده در قالب‌بندی شکیل است.

قبلا تمام شیءهایی که تبدیل به رشته شده بودند هیچ تورفتگی و فاصله اضافی نداشتند. اگر بخواهیم یک شیء را به یک شبکه بفرستیم این موضوع مشکلی ندارد. آرگومان `space` خصوصا برای یک خروجی زیبا استفاده می‌شود.

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

## Custom "toJSON"

Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available.

For instance:

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

Here we can see that `date` `(1)` became a string. That's because all dates have a built-in `toJSON` method which returns such kind of string.

Now let's add a custom `toJSON` for our object `room`:

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

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and when `room` is nested in another encoded object.


## JSON.parse

To decode a JSON-string, we need another method named [JSON.parse](mdn:js/JSON/parse).

The syntax:
```js
let value = JSON.parse(str, [reviver]);
```

str
: JSON-string to parse.

reviver
: Optional function(key,value) that will be called for each `(key, value)` pair and can transform the value.

For instance:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Or for nested objects:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the same JSON format.

Here are typical mistakes in hand-written JSON (sometimes we have to write it for debugging purposes):

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

Besides, JSON does not support comments. Adding a comment to JSON makes it invalid.

There's another format named [JSON5](http://json5.org/), which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.

The regular JSON is that strict not because its developers are lazy, but to allow easy, reliable and very fast implementations of the parsing algorithm.

## Using reviver

Imagine, we got a stringified `meetup` object from the server.

It looks like this:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...And now we need to *deserialize* it, to turn back into JavaScript object.

Let's do it by calling `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Whoops! An error!

The value of `meetup.date` is a string, not a `Date` object. How could `JSON.parse` know that it should transform that string into a `Date`?

Let's pass to `JSON.parse` the reviving function as the second argument, that returns all values "as is", but `date` will become a `Date`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // now works!
```

By the way, that works for nested objects as well:

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
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## Summary

- JSON is a data format that has its own independent standard and libraries for most programming languages.
- JSON supports plain objects, arrays, strings, numbers, booleans, and `null`.
- JavaScript provides methods [JSON.stringify](mdn:js/JSON/stringify) to serialize into JSON and [JSON.parse](mdn:js/JSON/parse) to read from JSON.
- Both methods support transformer functions for smart reading/writing.
- If an object has `toJSON`, then it is called by `JSON.stringify`.
