libs:
  - lodash

---

# بستن توابع

وقتی که متدهای اشیا را به عنوان فراخوان استفاده میکنیم٬‌ برای مثال در `setTimeout` یک مشکل بوجود می آید: " از دست دادن `this`".

در این بخش راه های حل کردن این مشکل را میبینیم.

## از دست دادن "this"

ما مثال های از دست دادن `this` را دیدیم. وقتی که یک متد شی را جدا از شی اش استفاده کنیم. -- `this` را از دست میدهیم.

این چگونگی اتفاق افتادن در `setTimeout` است.

```js run
let user = {
  firstNmae: "John",
  sayHI() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

همانطور که میبینید٬ خروجی "John" را برای `this.firstNmae` برنگردانده٬ بلکه `undefined` را داده است!

به این علت اتفاق افتاده که `setTimeout`٬ `user.sayHi` را جدا از شی اش به عنوان تابع گرفته است. خط آخر این گونه نیز میتواند نوشته شود:

```js
let f = user.sayHi;
setTimeout(f, 1000); // محتوای user را از دست میرود
```

متد `setTimeout` در مرورگر کمی خاص است: این `this=window` را تنظیم میکند(ولی در node.js `this` به شی تایمر اشاره میکند٬ که در اینجا مهم نیست). پس `this.firstName` تلاش میکند که `window.firstName` را بگیرد٬ درحالیکه وجود ندارد. در موارد مشابه `this` به صورت `undefined` برمیگردد.

این کار کاملا عادی است -- ما میخواهیم یک متد از شی را در جایی دیگر استفاده کنیم(اینجا -- در زمانبندی) که در آنجا صدا زده میشود. چگونه مطمعن شویم که این با محتوای درستی صدا زده میشود؟

## راه حل اول:‌ پوشه

ساده ترین راه این است که آن را در یک تابع دربرگرینده استفاده کنیم:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

حال کار میکند٬ چون که `user` را از محیط لغوی بیرونی میگیرد٬ سپس متد را به صورت عادی صدا میزند.

راه مشابه٬ ولی کوتاهتر: 

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

خوب بنظر میرسد٬ ولی یک ضعف کوچک در ساختار کدمان ساخته میشود.

اگر قبل از اینکه `setTimeout` به کار بیفتاد‌(یک وقفه دیگر وجود داشته باشد!) و مقدارها تغییر کنند چه؟ سپس٬ ناگهان٬ شی اشتباهی را صدا میکند.


```js run
let user = {
  firstNmae: "John",
  sayHi() {
    alert(`Hello, ${this.fistName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ... مقدار شی user در یک ثانیه تغییر میکند
user = {
  sayHi() { alert("Another user in setTimeout!")}
};

// Another user in setTimeout!
```

را حل بعدی تضمین کند که این مشکل بوجود نیاید.

## راه حل دوم: بستن

توابع یک متد درونی دارند [bind](mdn:js/Function/bind) که اجازه میدهد مشکل `this` را حل کنیم.

نوشتار ساده این چنینن است:‌

```js
// نوشتار پیچیده تر کمی جلوتر خواهیم دید
let boundFunc = func.bind(context);
```

نتیجه `func.bind(context)` یک مشابه-تابع خاص "شیی خارجی" است ٬ که به صورت یک تابع قابل فراخوانی است که شفافا فراخوانی را به `func` با تنظیم کردن `this=context` برمیگرداند.

به عبارت دیگر٬ صدا زدن `boundFunc` مانند صدا زدن `func` با `this=user` است.

برای مثال٬ در اینجا `funcUser` یک فراخوان به `func` با `this=user` میزند: 

```js run
let user = {
  firstNmae: "John"
};

function func() {
  alert(this.firstName);
};

*!*
let funcUser = func.bind(user);
funcUser(); // John
*/!*
```

در اینجا `func.vin(user)` یک نسخه بسته شده از `func`است با `this=user` درست شده.

تمام آرگومان ها به `func` اصلی همانطور که هستند داده میشوند. بطور مثال: 

```js run
let user = {
  firstName: "John"
};

functoin func(phrase) {
  alert(phrase + ', ' + this.firstName);
};

// بستن به user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (آرگومان "Hello" داده شده و همچنین this=user)
*/!*
```

حال اجازه دهید همینکار را یک متد از اشیا انجام دهیم:‌


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

// میتوانیم آن را بدون شی اجرا کنیم
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// اگر در یک ثانیه مقدار های user تغییر کند
// sayHi مقدار از پیش بسته شده که به مقدار قبلی شی است را استفاده میکند
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

در خط `(*)` متد `user.sayHi` را گرفتیم و آن را به `user` بستیم. `sayHi` یک تابع `bound` است که میتواند به تنهایی صدا زده شود یا به `setTimeout` داده شود -- و مهم نیست که محتوا خواهد بود.

همانطور که در اینجا میتوانیم ببینیم آرگومان ها "همانطور که هستند" داده میشوند و فقط `this` با `bind` درست میشود:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}~`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John! ("Hello" به عنوان آرگومان داده شده است)
say("Bye"); // Bye, John! ("Bye" داده شده است)
```

````smart header="متد راحتتر: `bindAll`"
اگر یک شی چند متد داشته باشد و ما بخواهیم فعالانه همه آنها را استفاده کنیم. میتوانیم آنها را در یک حلقه برای بستن بگذاریم:

```js
for (let key in user) {
  if (typeof user[key] == "function") {
    user[key] = user[key].bind(user);
  }
}
```

همچنین کتابخانه های جاوااسکریپتی برای انجام چندین بستن توابعی را آماده کرده اند٬ مثلا [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) در lodash.


## توابع جزیی

تا الان ما فقط درباره بستن `this` حرف زدیم. اجازه دهید پیشتر برویم.

ما فقط نمیتوانیم `this` را ببندیم٬ بلکه میتوانیم آرگومان ها را نیز ببندیم. این واقعا منسوخ شده است٬ ولی گاهی اوقات میتواند مفید باشد.

نوشتار کامل `bind` به این صورت است:‌

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

این به ما اجازه میدهد که `this` را ببندیم و از آرگومان اول تابع شروع میشود.

برای مثال٬ یک تابع ضرب داریم `mul(a, b)`:

```js run
function mul(a, b) {
  return a * b;
}
```

اجازه دهید از `bind` برای ساختن یک تابع `double` استفاده کنیم:

```js run
function mul(a, b) {
  return a * b;
};

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

صدا زدن `mul.bind(null, 2)` یک تابع جدید به نام `double` میسازد یک فراخوان به `mul` میزند٬ که `null` را به عنوان محتوا و `2` را به عنوان اولین آرگومان میگذارد. باقی آرگومان ها "همانطور که هستند" داده میشوند.

به این [برنامه نویسی با توابع جزیی](https://en.wikipedia.org/wiki/partial_application) میگویند -- یک تابع جدید را ثابت کردن برخی پارامتر ها از یک تابع موجود میسازیم.

خواهشا دقت کنید که ما درواقع از `this` استفاده نکردیم. .لی `bind` آن را میخواهد٬ پس باید چیزی در آن بگذاریم مثلا `null`.

تابع `triple` در قطعه کد زیر مقادیر را سه برابر میکند:

```js run
functoin mul(a, b) {
  return a * b;
};

*!*
let triple = mel.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

چرا معمولا از توابع جزیی استفاده میکنیم؟

مزیت اینکار این است که میتوانیم یک تابع مستقل با یک نام خوانا بسازیم(`double`, `triple`). ما میتوانیم از آن استفاده کنیم و آرگومان اول را هر بار به آن ندهیم به دلیل اینکه `bind` ثابت شده است.

در موارد دیگر٬ برنامه های جزیی کاربردی هستند زمانیکه یک تابع خیلی کلی داریم و نسخه های کمی از آنها را برای راحتی در نوشتن میخواهیم.

برای مثال٬ یک تابع `send(from, to, text)` داریم٬ که در شی `user` ممکن است بخواهیم یک نسخه جزیی از آن داشته باشیم: `sendTo(to, text)` که از همان کاربر میفرستد.

## جزیی کردن بدون محتوا

حال اگر بخواهیم فقط بعضی آرگومان ها را ثابت کنیم٬ ولی بدون محتوای `this` چه؟ برای مثال٬ برای یک متد از شی.

`bind` بومی این اجازه را به ما نمیدهد. ما میتواینم فقط محتوا را حذف کنیم و به آرگومان ها بپریم.

خوشبختانه٬ یک تابع `partial` برای بستن فقط آرگومان ها به سادگی پیاده سازی میشود.

به اینصورت:

```js run
*!*
function partial(func, ...argsBound) {
  return function(..args) { // (*) 
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

// استفاده:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstNmae}: ${phrase}!`);
  }
};

// اضافه کردن یک متد جزیی با زمان ثابت
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinuts());

user.sayNow("Hello");
// چیزی مانند:
// [10:00] John: Hello!
```

خروجی `partial(func[, arg1, arg2...])` یک پوشه `(*)` است که `func` را صدا میزند با:
  - `this` مشابه آن چیزی که گرفته است (برای `user.sayNow`٬ `user` است)
  - سپس به آن `...argsBound` را میدهد. -- آرگومان ها از صدا زدن `partial` (`"10:00"`)
  - سپس `...args` را به آن میدهد -- آرگومان ها به پوشه میدهد ("Hello")

خیلی ساده است که با نوشتار گسترشی `...` این کار را انجام بدهیم. درست است؟

هم چنین یک نسخه [_.partial](https://lodash.com/docs#partial) در کتابخانه lodash آماده است.

## خلاصه

متد `func.bind(context, ...args)` یک "نسخه بسته شده" از تابع `func` که در آن محتوای `this` و اولین آرگومان ها را ثابت میکند.

معمولا ما از `bind` برای درست کردن `this` برای متد شی استفاده میکنیم٬ که بتوانیم آن را در جاهای مختلف استفاده کنیم٬ مثلا در `setTimeout`.

زمانیکه برخی آرگومان های تابع موجود را ثابت میکنیم٬ نتیجه (کد کمتر) یک تابع *جزیی*‌ نامیده میشوند.

جزها راحت هستند زمانیکه بخواهیم از تکرار آرگومان های تکراری جلوگیری کنیم. مثلا یک `send(from, to)` داریم که `from` همیشه برای کار ما باید مشابه باشد٬ پس میتوانیم یک جز برای آن بسازیم.
