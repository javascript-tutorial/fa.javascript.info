# متدهای آرایه

<<<<<<< HEAD
آرایه‌ها متدهای زیادی را فراهم می‌کنند. برای ساده‌سازی، در این فصل متدها به چند گروه تقسیم شده‌اند.
=======
Arrays provide a lot of methods. To make things easier, in this chapter, they are split into groups.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

## اضافه/حذف کردن عضوها

ما از قبل متدهایی که در آغاز یا انتهای آرایه چیزی را حذف یا اضافه می‌کنند را می‌شناسیم:

- `arr.push(...items)` -- المان‌ها را به انتها اضافه می‌کند،
- `arr.pop()` -- یک المان را از انتها خارج می‌کند،
- `arr.shift()` -- یک المان را از آغاز خارج می‌کند،
- `arr.unshift(...items)` -- یک المان را به آغاز اضافه می‌کند.

اینجا چند متد دیگر داریم.

### متد splice

چطور یک المان را از آرایه حذف کنیم؟

آرایه‌ها شیء هستند، پس می‌توانیم از `delete` استفاده کنیم:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // "go" حذف

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

المان حذف شد، اما آرایه هنوز هم 3 عضو دارد که می‌توانیم آن را با `arr.length == 3` ببینیم.

<<<<<<< HEAD
این چیز طبیعی است چون `delete obj.key` یک مقدار را با استفاده از `key` حذف می‌کند. به طور کلی کارش همین است. برای شیءها مناسب است. اما برای آرایه‌ها ما معمولا می‌خواهیم که بقیه المان‌ها پخش شوند و فضای آزاد شده را اشغال کنند. توقع داریم که الان آرایه‌ای کوتاه‌تر داشته باشیم.
=======
That's natural, because `delete obj.key` removes a value by the `key`. It's all it does. Fine for objects. But for arrays we usually want the rest of the elements to shift and occupy the freed place. We expect to have a shorter array now.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

بنابراین متدهای خاص باید استفاده شوند.

<<<<<<< HEAD
متد [arr.splice](mdn:js/Array/splice) یک شمشیر ارتشی سوئیسی برای آرایه‌ها است. می‌تواند هر کاری کند: اضافه کند، حذف کند و المان‌ها را جایگزین کند.
=======
The [arr.splice](mdn:js/Array/splice) method is a Swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

سینتکس آن اینگونه است:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

این متد `arr` را از ایندکس `start` تغییر می‌دهد: به تعداد `deleteCount` المان حذف می‌کند و سپس `elem1, ..., elemN` را در مکان خودشان اضافه می‌کند. آرایه‌ای از المان‌های حذف شده را برمی‌گرداند.

این متد را با مثال به راحتی متوجه می‌شوید.

بیایید با حذف کردن شروع کنیم:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // از ایندکس 1 به تعداد 1 المان حذف کن
*/!*

alert( arr ); // ["I", "JavaScript"]
```

راحت است، نه؟ از ایندکس `1` به تعداد `1` المان حذف کرد.

<<<<<<< HEAD
در مثال بعد ما 3 المان را حذف و آنها را با دو المان جایگزین می‌کنیم:
=======
In the next example, we remove 3 elements and replace them with the other two:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// سه المان ابتدایی را حذف کن و آنها را با المان‌های دیگر جایگزین کن
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now [*!*"Let's", "dance"*/!*, "right", "now"]
```

اینجا می‌بینیم که `splice` آرایه‌ای از المان‌های حذف شده را برمی‌گرداند:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// دو المان اول را حذف کن
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements
```

<<<<<<< HEAD
متد `splice` همچنین قادر به اضافه کردن المان بدون هیچ حذفیاتی است. برای این کار باید `deleteCount` را `0` بگذاریم:
=======
The `splice` method is also able to insert the elements without any removals. For that, we need to set `deleteCount` to `0`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let arr = ["I", "study", "JavaScript"];

// از ایندکس 2
// به تعداد 0 حذف کن
// را اضافه کن "language" و "complex" سپس
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="ایندکس‌های منفی مجاز هستند"
اینجا و در دیگر متدهای آرایه، ایندکس‌های منفی قابل استفاده هستند. آنها موقعیت را از انتهای آرایه مشخص می‌کنند، مثل اینجا:

```js run
let arr = [1, 2, 5];

// از ایندکس 1- (یک قدم قبل از انتها)
// به تعداد 0 المان حذف کن،
// سپس 3 و 4 را اضافه کن
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### متد slice

<<<<<<< HEAD
متد [arr.slice](mdn:js/Array/slice) از متد `arr.splice` که از لحاظ ظاهری شبیه به آن است بسیار ساده‌تر است.
=======
The method [arr.slice](mdn:js/Array/slice) is much simpler than the similar-looking `arr.splice`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

سینتکس اینگونه است:

```js
arr.slice([start], [end])
```

این متد یک آرایه جدید که تمام المان‌ها را از ایندکس `start` تا `end` (شامل خود `end` نمی‌شود) کپی می‌کند، برمی‌گرداند. `start` و `end` هر دو می‌توانند منفی باشند، که در این صورت موقعیت از انتهای آرایه حساب می‌شود.

<<<<<<< HEAD
این متد شبیه متد رشته `str.slice` است، اما به جای زیر رشته، زیر آرایه ایجاد می‌کند.
=======
It's similar to a string method `str.slice`, but instead of substrings, it makes subarrays.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

برای مثال:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (کپی کردن از 1 تا 3)

alert( arr.slice(-2) ); // s,t (کپی کردن از 2- تا انتها)
```

همچنین می‌توانیم آن را بدون آرگومان هم صدا بزنیم: `arr.slice()` که یک کپی از `arr` می‌سازد. معمولا از این روش برای ایجاد یک کپی با هدف اینکه تغییرات آینده روی آرایه اصلی تاثیری نگذارد استفاده می‌کنند.

### متد concat

متد [arr.concat](mdn:js/Array/concat) یک آرایه جدید می‌سازد که حاوی مقدارهای آرایه‌های دیگر و المان‌های اضافی است.

سینتکس آن اینگونه است:

```js
arr.concat(arg1, arg2...)
```

این متد به هر تعدادی آرگومان می‌پذیرد -- چه آرایه باشند چه مقدار.

نتیجه آن یک آرایه جدید حاوی المان‌های `arr`، سپس `arg1`، `arg2` و غیره.

اگر آرگومان `argN` یک آرایه باشد، سپس تمام المان‌های آن کپی می‌شود. در غیر این صورت، خود آرگومان کپی می‌شود.

برای مثال:

```js run
let arr = [1, 2];

// و [3,4] arr :ساخت یک آرایه از
alert( arr.concat([3, 4]) ); // 1,2,3,4

// و [3,4] و [5,6] arr :ساخت یک آرایه از
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// و [3,4]، سپس اضافه کردن مقدارهای 5 و 6 arr :ساخت یک آرایه از
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

به طور معمول، این متد فقط المان‌ها را از آرایه‌ها کپی می‌کند. بقیه شیءها، حتی اگر شبیه آرایه باشند، به طور کلی اضافه می‌شوند:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

...اما اگر یک شیء شبیه به آرایه یک ویژگی `Symbol.isConcatSpreadable` داشته باشد، سپس `concat` با آن به عنوان یک آرایه رفتار می‌کند: در عوض المان‌های آن اضافه می‌شوند:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## حلقه زدن: forEach

متد [arr.forEach](mdn:js/Array/forEach) به ما این امکان را می‌دهد که یک تابع را روی تمام المان‌های آرایه اجرا کنیم.

سینتکس اینگونه است:
```js
arr.forEach(function(item, index, array) {
<<<<<<< HEAD
  // ... با المان کاری انجام دهید
=======
  // ... do something with an item
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
});
```

برای مثال، این کد هر المان آرایه را نشان می‌دهد:

```js run
// را صدا بزن alert برای هر المان
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

و این کد درباره موقعیت آنها در آرایه مورد نظر جزئیات بیشتری دارد:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

نتیجه تابع (اگر چیزی برگرداند) نادیده گرفته و دور ریخته می‌شود.


## جستجو در آرایه

حال بیایید متدهایی را بخوانیم که در آرایه جستجو می‌کنند.

### متدهای indexOf/lastIndexOf and includes

متدهای [arr.indexOf](mdn:js/Array/indexOf) و [arr.includes](mdn:js/Array/includes) سینتکس مشابه دارند و اساسا همان کار همتایان خود در رشته‌ها را انجام می‌دهند، اما به جای کاراکترها با المان‌ها کار دارند:

- `arr.indexOf(item, from)` -- با شروع از ایندکس `from` به دنبال `item` می‌گردد و ایندکسی که المان در آن پیدا شد را برمی‌گرداند، در غیر این صورت `1-`.
- `arr.includes(item, from)` -- با شروع از ایندکس `from` به دنبال `item` می‌گردد، اگر پیدا کند `true` را برمی‌گرداند.

<<<<<<< HEAD
معمولا این متدها تنها با یک آرگومان استفاده می‌شوند: المانی (`item`) که جستجو برای آن انجام می‌شود. به طور پیش‌فرض، جستجو از ابتدا انجام می‌شود.
=======
Usually, these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

برای مثال:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

توجه داشته باشید که متدها از مقایسه `===` استفاده می‌کنند. پس اگر ما به دنبال `false` باشیم، متد دقیقا `false` را پیدا می‌کند و نه صفر را.

<<<<<<< HEAD
اگر ما بخواهیم بررسی کنیم که `item` درون آرایه وجود دارد یا نه و به دنبال ایندکس دقیق نیستیم، پس `arr.includes` ترجیح داده می‌شود.
=======
If we want to check if `item` exists in the array and don't need the index, then `arr.includes` is preferred.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

متد [arr.lastIndexOf](mdn:js/Array/lastIndexOf) مانند `indexOf` است اما از راست به چپ جستجو می‌کند.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( arr.indexOf('Apple') ); // 0 (Apple اولین)
alert( arr.lastIndexOf('Apple') ); // 2 (Apple آخرین)

````smart header="متد `includes` مقدار `NaN` را به درستی مدیریت می‌کند"
یک تفاوت بسیار کوچک `includes` این است که این متد به درستی `NaN` را کنترل می‌کند، درست برعکس `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (اشتباه است، باید 0 باشد)
alert( arr.includes(NaN) );// true (درست است)
```
<<<<<<< HEAD
به این دلیل که `includes` بسیار بعدتر به جاوااسکریپت اضافه شد و از درون از الگوریتم‌های مقایسه بروزتری استفاده می‌کند.
=======
That's because `includes` was added to JavaScript much later and uses the more up-to-date comparison algorithm internally.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

### متدهای find و findIndex/findLastIndex

<<<<<<< HEAD
تصور کنید که یک آرایه‌ای از شیءها داریم. چگونه باید یک شیء با شرطی مشخص را پیدا کنیم؟
=======
Imagine we have an array of objects. How do we find an object with a specific condition?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

اینجاست که متد [arr.find(fn)](mdn:js/Array/find) بدرد می‌خورد.

سینتکس آن اینگونه است:
```js
let result = arr.find(function(item, index, array) {
  // برگردانده شود، المان برگردانده می‌شود و حلقه‌ی تکرار متوقف می‌شود true اگر مقدار
  // برگردانده می‌شود undefined مقدار falsy برای سناریوهای
});
```

تابع برای المان‌های آرایه، یکی پس از دیگری، صدا زده می‌شود:

- `item` المان است.
- `index` ایندکس آن است.
- `array` خود آرایه است.

<<<<<<< HEAD
اگر `true` برگرداند، جستجو متوقف می‎شود، `item` برگردانده می‌شود. اگر چیزی پیدا نشود، `undefined` برگردانده می‌شود.
=======
If it returns `true`, the search is stopped, the `item` is returned. If nothing is found, `undefined` is returned.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

برای مثال، ما یک آرایه‌ای از کاربران داریم، که هر کدام دارای `id` و `name` هستند. بیایید کاربری که `id == 1` داشته باشد را پیدا کنیم:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

<<<<<<< HEAD
در واقعیت، آرایه‌هایی از شیءها چیز متداولی است، پس متد `find` بسیار مفید است.
=======
In real life, arrays of objects are a common thing, so the `find` method is very useful.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

توجه داشته باشید که در مثال بالا ما تابع `item => item.id == 1` را همراه با یک آرگومان برای `find` در نظر گرفتیم. این چیز معمولی است، بقیه آرگومان‌های این تابع به ندرت استفاده می‌شوند.

<<<<<<< HEAD
متد [arr.findIndex](mdn:js/Array/findIndex) سینتکس یکسانی دارد اما به جای خود المان ایندکسی که المان در آن پیدا شد را برمی‌گرداند. اگر چیزی پیدا نشد مقدار `1-` برگردانده می‌شود.
=======
The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

متد [arr.findLastIndex](mdn:js/Array/findLastIndex) مانند `findIndex` است اما مانند `lastIndexOf` از راست به چپ جستجو می‌کند.

اینجا یک مثال داریم:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// را پیدا کن John ایندکس اولین
alert(users.findIndex(user => user.name == 'John')); // 0

// را پیدا کن John ایندکس آخرین
alert(users.findLastIndex(user => user.name == 'John')); // 3
```

### متد filter

متد `find` برای یک (اولین) المان که باعث شود تابع `true` برگرداند، جستجو می‌کند.

اگر ممکن باشد تعداد بیشتری موجود باشند، می‌توانیم از [arr.filter(fn)](mdn:js/Array/filter) استفاده کنیم.

سینتکس آن مشابه `find` است اما `filter` یک آرایه از المان‌های منطبق را برمی‌گرداند:

```js
let results = arr.filter(function(item, index, array) {
  // باشد المان به نتیجه‌ها اضافه می‌شود و حلقه تکرار ادامه پیدا می‌کند true اگر
  // اگر چیزی پیدا نشود یک آرایه خالی برمی‌گرداند
});
```

برای مثال:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// آرایه شامل دو کاربر اول را برمی‌گرداند
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## تغییر شکل دادن آرایه

بیایید به سراغ متدهایی برویم که یک آرایه را تغییر شکل و نظم دوباره می‌دهند.

### متد map

متد [arr.map](mdn:js/Array/map) یکی از پرکاربردترین و متدوال‌ترین متدهاست.

این متد یک تابع را برای هر المان آرایه صدا می‌زند و آرایه‌ای از نتیجه را برمی‌گرداند.

سینتکس آن اینگونه است:

```js
let result = arr.map(function(item, index, array) {
  // به جای المان، مقدار جدید را برمی‌گرداند
});
```

برای مثال، ما هر المان را به طول آن تغییر می‌دهیم:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### متد sort(fn)

صدازدن [arr.sort()](mdn:js/Array/sort) آرایه را *در محل* با تغییر دادن ترتیب المان‌ها، مرتب می‌کند.

همچنین این متد آرایه مرتب شده را برمی‌گرداند، اما همانطور که خود `arr` تغییر داده می‌شود، مقدار برگردانده شده معمولا نادیده گرفته می‌شود.

برای مثال:

```js run
let arr = [ 1, 2, 15 ];

// را دوباره ترتیب بندی می‌کند arr این متد
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

چیز عجیبی را در نتیجه متوجه شدید؟

ترتیب المان‌ها `1, 15, 2` شد. این اشتباه است. اما چرا؟

**المان‌ها به صورت پیشفرض به عنوان رشته مرتب می‌شوند.**

به طور کلی، تمام المان‌ها برای انجام مقایسه به رشته تبدیل می‌شوند. برای رشته‌ها، ترتیب‌بندی لفت‌نامه‌ای اعمال می‌شود و در این صورت `"2" > "15"` است.

برای استفاده از ترتیب‌بندی خودمان، ما نیاز داریم که یک تابع را به عنوان آرگومان `arr.sort()` قرار دهیم.

تابع باید دو مقدار دلخواه را مقایسه کند و چیزی را برگرداند:
```js
function compare(a, b) {
  if (a > b) return 1; // اگر مقدار اول بزرگتر از دومی باشد
  if (a == b) return 0; // اگر مقدارها برابر باشند
  if (a < b) return -1; // اگر مقدار اول کمتر از دومی باشد
}
```

برای مثال، برای مرتب کردن به عنوان اعداد:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

حالا همانطور که انتظار می‌رفت کار می‌کند.

<<<<<<< HEAD
بیایید کمی عقب بمانیم و ببینیم چه چیزی در حال اتفاق افتادن است. `arr` می‌تواند آرایه‌ای از هر چیزی باشد نه؟ ممکن است شامل اعداد یا رشته‌ها یا شیءها یا هرچیز دیگری باشد. ما دسته‌ای از *چیزها* داریم. برای مرتب کردن آن، ما به یک *تابع مرتب‌کننده* که می‌داند چگونه المان‌های دسته را مقایسه کند، نیاز داریم. ترتیب رشته‌ای پیش‌فرض است.
=======
Let's step aside and think about what's happening. The `arr` can be an array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

متد `arr.sort(fn)` یک الگوریتم مرتب‌سازی کلی را پیاده‌سازی می‌کند. ما نیازی نداریم که بدانیم درون آن چه اتفاقی می‌افتد (اکثر اوقات از یک [مرتب‌سازی سریع](https://fa.wikipedia.org/wiki/مرتب%E2%80%8Cسازی_سریع) یا [Timsort](https://fa.wikipedia.org/wiki/مرتب%E2%80%8Cسازی_تیم) بهینه‌شده استفاده می‌شود). این متد آرایه را طی می‌کند، المان‌های آن را با استفاده از تابع فراهم شده مقایسه می‌کند و آنها را مرتب می‌کند، تمام آن چیزی که ما نیاز داریم این است که یک `fn` فراهم کنیم که مقایسه را انجام دهد.

<<<<<<< HEAD
راستی، اگر ما بخواهیم بدانیم که کدام المان‌ها مقایسه می‌شوند -- چیزی ما را از alert کردن آنها متوقف نمی‌کند:
=======
By the way, if we ever want to know which elements are compared -- nothing prevents us from alerting them:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

الگوریتم ممکن است یک المان را با چند المان دیگر در حین فرایند مقایسه کند، اما تلاش می‌کند که تا جایی که می‌تواند مقایسه‌های کمی انجام دهد.

````smart header="یک تابع مقایسه می‌تواند هر عددی برگرداند"
در واقع یک تابع مقایسه فقط نیاز دارد که یک عدد مثبت را برای اینکه بگوید «بزرگتر» است برگرداند و یک عدد منفی را برای گفتن «کمتر» است.

این ویژگی سبب می‌شود که تابع‌های کوتاه‌تری نوشته شود:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="توابع پیکانی بهترین‌اند"
[تابع‌های پیکانی](info:arrow-functions-basics) را به یاد دارید؟ ما می‌توانیم از آنها برای مرتب‌سازی تمیزتر استفاده کنیم:

```js
arr.sort( (a, b) => a - b );
```

این کد دقیقا مانند نسخه طولانی‌تر بالایی کار می‌کند.
````

````smart header="برای رشته‌ها از `localeCompare` استفاده کنید"
الگوریتم مقایسه [رشته‌ها](info:string#correct-comparisons) را به یاد دارید؟ این الگوریتم به صورت پیش‌فرض حروف را با کدهای آنها مقایسه می‌کند.

برای بساری از حروف الفبا، بهتر است از متد `str.localeCompare` برای مرتب‌کردن صحیح حروف استفاده شود، مانند `Ö`.

برای مثال، بیایید چند کشور را به زبان آلمانی مرتب کنیم:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (اشتباه است)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (درست است!)
```
````

### متد reverse

متد [arr.reverse](mdn:js/Array/reverse) ترتیب المان‌ها را `arr` برعکس می‌کند.

برای مثال:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

همچنین این متد ارایه `arr` را بعد از برعکس شدن برمی‌گرداند.

### متدهای split and join

یک موقعیت در زندگی واقعی را می‌گوییم. ما در حال نوشتن یک برنامه پیام‌رسان هستیم و شخص لیستی از دریافت کنندگان که با کاما جدا شده‌اند را وارد می‌کند: `John, Pete, Mary`. اما یک آرایه‌ای از اسم‌ها بسیار راحت‌تر از یک رشته خواهد بود. چگونه آن را دریافت کنیم؟

متد [str.split(delim)](mdn:js/String/split) دقیقا همین کار را انجام می‌دهد. این متد رشته را با استفاده از جداکننده‌ی داده شده `delim` به یک آرایه تقسیم می‌کند.

<<<<<<< HEAD
در مثال بالا، ما توسط یک کاما که بعد آن space می‌آید رشته را جدا می‌کنیم:
=======
In the example below, we split by a comma followed by a space:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (و بقیه اسم‌ها)
}
```

متد `split` یک آرگومان اختیاری دوم هم دارد -- یک محدودیت برای طول آرایه. اگر این آرگومان اضافه شود، سپس المان‌های دیگر نادیده گرفته می‌شوند. گرچه در عمل به ندرت استفاده می‌شود:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="جداکردن به حروف"
صدا زدن `split(s)` با یک `s` خالی رشته را به آرایه‌ای از حروف جدا می‌کند:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

صدا زدن [arr.join(glue)](mdn:js/Array/join) عمل برعکس `split` را انجام می‌هد. این متد یک رشته از `arr` می‌سازد که توسط `glue` المان‌ها متصل شده‌اند.

برای مثال:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // آرایه را با استفاده از ; به یک رشته تبدیل کنید

alert( str ); // Bilbo;Gandalf;Nazgul
```

### متد reduce/reduceRight

زمانی که ما نیاز داشته باشیم که در یک آرایه حلقه بزنیم، می‌توانیم از `forEach`، `for` یا `for..of` استفاده کنیم.

زمانی که ما نیاز داشته باشیم در المان‌ها حلقه بزنیم و داده را برای هر المان برگردانیم، می‌توانیم از `map` استفاده کنیم.

متدهای [arr.reduce](mdn:js/Array/reduce) و [arr.reduceRight](mdn:js/Array/reduceRight) همچنین به این دسته تعلق دارند، اما کمی پیچیده‌تر هستند. آنها برای محاسبه یک مقدار بر اساس آرایه، استفاده می‌شوند.

سینتکس اینگونه است:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

تابع روی تمام المان‌های آرایه اعمال می‌شود و نتیجه خود را به فراخوانی بعدی «منتقل می‌کند».

آرگومان‌ها:

- `accumulator` -- نتیجه قبلی فراخوانی تابع است، دفعه اول با `initial` برابر است (اگر `initial` وجود داشته باشد).
- `item` -- المان کنونی آرایه است.
- `index` -- موقعیت آن است.
- `array` -- آرایه است.

<<<<<<< HEAD
همانطور که تابع اعمال می‌شود، نتیجه فراخوانی قبلی به عنوان آرگومان اول به فراخوانی بعدی منتقل می‌شود.

بنابراین، اولین آرگومان اساسا همان حافظه‌ای است که نتیجه ترکیب شده تمام فراخوانی‌های قبلی را ذخیره کرده است. و در پایان تبدیل به نتیجه `reduce` می‌شود.
=======
As the function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end, it becomes the result of `reduce`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

بنظر پیچیده می‌آید؟

راحت‌ترین راه برای فهمیدن این قضیه، توسط مثال است.

اینجا ما حاصل جمع یک آرایه را در یک خط می‌گیریم:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

تابعی که به `reduce` داده شد تنها از 2 آرگومان استفاده می‌کند که معمولا کافی است.

بیایید جزئیات چیزی که در حال انجام است را ببینیم.

1. در اجرای اول، `sum` برابر با مقدار `initial` است (آخرین آرگومان `reduce`)، که برابر با `0` است، و `current` اولین المان آرایه است، که برابر با `1` است. پس نتیجه تابع `1` است.
2. در اجرای دوم، `sum = 1`، که ما المان دوم آرایه (`2`) را به آن اضافه و برمی‌گردانیم.
3. در اجرای سوم، `sum = 3` و ما یک المان دیگر به آن اضافه می‌کنیم و...

گردش محاسبه:

![](reduce.svg)

یا به شکل یک جدول که هر ردیف نشان‌دهنده یک فراخوانی تابع روی المان بعدی آرایه است:

|   |`sum`|`current`|نتیجه|
|---|-----|---------|---------|
|فراخوانی اول|`0`|`1`|`1`|
|فراخوانی دوم|`1`|`2`|`3`|
|فراخوانی سوم|`3`|`3`|`6`|
|فراخوانی چهارم|`6`|`4`|`10`|
|فراخوانی پنجم|`10`|`5`|`15`|

اینجا ما می‌توانیم به صورت شفاف ببینیم که نتیجه فراخوانی قبلی به اولین آرگومان فراخوانی بعدی تبدیل می‌شود.

ما همچنین می‌توانیم مقدار اولیه را حذف کنیم:

```js run
let arr = [1, 2, 3, 4, 5];

// حذف شد (بدون 0) reduce مقدار اولیه از
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

نتیجه یکسان است. به دلیل اینکه اگر مقدار اولیه‌ای وجود نداشته باشد، سپس `reduce` اولین المان آرایه را به عنوان مقدار اولیه انتخاب می‌کند و حلقه‌زدن را از دومین المان شروع می‌کند.

جدول محاسبات مانند بالا است، منتها ردیف اول را ندارد.

اما استفاده کردن به این صورت به دقت بسیار بالایی نیاز دارد. اگر آرایه خالی باشد، سپس فراخوانی `reduce` بدون مقدار اولیه ارور می‌دهد.

یک مثال اینجا داریم:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// .آن را برای آرایه خالی برمی‌گرداند reduce ،اگر مقدار اولیه وجود داشت
arr.reduce((sum, current) => sum + current);
```

بنابراین توصیه می‌شود همیشه مقدار اولیه را تعیین کنید.

<<<<<<< HEAD
متد [arr.reduceRight](mdn:js/Array/reduceRight) کار یکسان را انجام می‌هد، اما از راست به چپ.
=======
The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same but goes from right to left.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3


##متد Array.isArray

آرایه‌ها شکل جدیدی از انواع داده را شکل نمی‌دهند. آنها بر اساس شیءها هستند.

بنابراین `typeof` برای تشخیص یک شیء ساده از آرایه کمکی نمی‌کند:

```js run
alert(typeof {}); // object
alert(typeof []); // object (یکسان)
```

...اما آرایه‌ها به دلیل اینکه اغلب اوقات استفاده می‌شوند، یک متد خاص برای این کار دارند: [Array.isArray(value)](mdn:js/Array/isArray). این متد اگر `value` یک آرایه باشد `true` برمی‌گرداند و در غیر این صورت `false`.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## اکثر متدها از "thisArg" پشتیبانی می‌کنند

تقریبا تمام متدهای آرایه که تابعی را صدا می‌زنند -- مانند `find`، `filter`، `map`، همچنین یک استثنا از `sort`، پارامتر اختیاری اضافی `thisArg` را قبول می‌کنند.

<<<<<<< HEAD
این پارامتر به دلیل اینکه به ندرت استفاده می‌شود، در قسمت‌های بالایی گفته نشد. اما برای کامل بودن ما باید آن را پوشش دهیم.
=======
That parameter is not explained in the sections above, because it's rarely used. But for completeness, we have to cover it.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

سینتکس کامل این متدها در زیر آمده است:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// آرگومان اختیاری آخر است thisArg
```

مقدار `thisArg` برای `func` برابر با `this` خواهد بود.

برای مثال، اینجا ما از متد شیء `army` به عنوان یک فیلتر استفاده می‌کنیم، و `thisArg` محتوا را رد و بدل می‌کند:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// برمی‌گرداند را پیدا کن true به ازای آنها army.canJoin هایی کهuser
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

اگر در مثال بالا ما از `users.filter(army.canJoin)` استفاده می‌کردیم، سپس `army.canJoin` به عنوان یک تابع جداگانه صدا زده می‌شد که `this=undefined`، بنابراین درجا به یک ارور برمی‌خوردیم.

صدازدن `users.filter(army.canJoin, army)` می‌تواند با `users.filter(user => army.canJoin(user))` جایگزین شود، که هردو یکسان هستند. نوع دوم بیشتر استفاده می‌شود، چون برای اکثر مردم مقداری قابل فهم‌تر است.

## خلاصه

برگ تقلبی از متدهای آرایه:

<<<<<<< HEAD
- برای اضافه/حذف کردن المان‌ها:
  - `push(...items)` -- المان‌ها را به آخر اضافه می‌کند،
  - `pop()` -- یک المان را از آخر حذف می‌کند،
  - `shift()` -- یک المان را از آغاز حذف می‌کند،
  - `unshift(...items)` -- المان‌هایی را به آغاز اضافه می‌کند.
  - `splice(pos, deleteCount, ...items)` -- در ایندکس `pos` به تعداد `deleteCount` المان حذف و `items` را اضافه می‌کند.
  - `slice(start, end)` -- با ساختن یک آرایه جدید، المان‌ها را از ایندکس `start` تا `end` (شامل نمی‌شود) در آن کپی می‌کند.
  - `concat(...items)` -- یک آرایه جدید را برمی‌گرداند: تمام عضوهای آرایه کنونی را کپی می‌کند و `items` را به آن اضافه می‌کند. اگر هر کدام از `items` آرایه باشد، سپس المان‌های آن اضافه می‌شوند.
=======
- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, and return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

- برای جستجو در بین المان‌ها:
  - `indexOf/lastIndexOf(item, pos)` -- با شروع از موقعیت `pos` به دنبال `item` می‌گردد، ایندکس آن را برمی‌گرداند و در صورتی که پیدا نشود `1-` را برمی‌گرداند.
  - `includes(value)` -- اگر آرایه دارای `value` باشد، مقدار `true` را برمی‌گرداند در غیر این صورت `false`.
  - `find/filter(func)` -- المان‌ها را از طریق تابع فیلتر می‌کند، اولین/تمام مقدارهایی که سبب می‌شوند تابع `true` برگرداند را برمی‌گرداند.
  - `findIndex` مانند `find` است اما به جای مقدار ایندکس را برمی‌گرداند.

- برای حلقه زدن در یک آرایه:
  - `forEach(func)` -- برای تمام المان‌ها تابع `func` را صدا می‌زند، چیزی را برنمی‌گرداند.

- برای تغییر شکل یک آرایه:
  - `map(func)` -- از نتایج صدازدن `func` برای هر المان، یک آرایه جدید می‌سازد.
  - `sort(func)` -- آرایه را در محل مرتب می‌کند، سپس آن را برمی‌گرداند.
  - `reverse()` -- آرایه را در محل برعکس می‌کند، سپس آن را برمی‌گرداند.
  - `split/join` -- یک رشته را به آرایه تبدیل می‌کند و برعکس.
  - `reduce/reduceRight(func, initial)` -- با صدا زدن `func` برای هر المان و رد و بدل کردن یک نتیجه واسطه بین هر فراخوانی، یک مقدار مفرد را در آرایه محاسبه می‌کند.

- علاوه بر این:
  - `Array.isArray(arr)` بررسی می‌کند که `arr` یک آرایه باشد و اگر بود مقدار `true` را برمی‌گرداند در غیر این صورت `false`.

لطفا در نظر داشته باشید که متدهای `sort`، `reverse` و `splice` خود آرایه را تغییر می‌دهند.

متدهای ذکر شده بیشترین استفاده را دارند، آنها 99% موارد استفاده را پوشش می‌دهند. اما چند متد دیگر هم هست:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) آرایه را بررسی می‌کنند.

  تابع `fn` رو تمام المان‌های آرایه صدا زده می‌شود درست شبیه `map`. اگر تمام نتایج `true` بود، مقدار `true` را برمی‌گرداند، در غیر این صورت `false`.

  این متدها تقریبا شبیه عملگرهای `||` و `&&` رفتار می‌کنند: اگر `fn` مقدار truthy را برگرداند، `arr.some()` درجا `true` را برمی‌گرداند و حلقه زدن روی بقیه المان‌ها را متوقف می‌کند؛ اگر `fn` یک مقدار falsy برگرداند، `arr.every()` فورا `false` را برمی‌گرداند و حلقه زدن در بقیه المان‌ها را متوقف می‌کند.

  ما می‌توانیم از `every` برای مقایسه آرایه‌ها استفاده کنیم
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- آرایه را با مقدار تکرار شونده `value` از ایندکس `start` تا `end` پر می‌کند.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- المان‌های خود را از موقعیت `start` تا موقعیت `end` در *خودش* و در موقعیت `target` کپی می‌کند (جایگزین المان موجود می‌شود).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) آرایه‌ای یک دست را از آرایه‌ای چند بعدی می‌سازند.

برای دیدن لیست کامل، از [راهنما](mdn:js/Array) استفاده کنید.

<<<<<<< HEAD
با اولین نگاه ممکن است به نظر برسد که متدهای بسیار زیادی وجود دارد و به حافظه سپردن آنها مشکل است. اما در واقع بسیار آسان‌تر است.
=======
At first sight, it may seem that there are so many methods, quite difficult to remember. But actually, that's much easier.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

برای داشتن شناخت از آنها به برگه تقلب نگاه بیاندازید. سپس تکلیف‌های این فصل را برای تمرین انجام دهید تا نسبت به متدهای آرایه تجربه بدست بیاورید.

پس از آن هر موقع که نیاز داشتید با یک آرایه کاری انجام دهید، و نمی‌دانید چگونه، به این صفحه بیایید، به برگه تقلب نگاهی بیاندازید و متد مناسب را پیدا کنید. مثال‌ها به شما در نوشتن درست آن کمک می‌کنند. به زودی به طور خودکار شما متدها را به حافظه می‌سپارید، بدون تلاش خاصی از جانب خودتان.