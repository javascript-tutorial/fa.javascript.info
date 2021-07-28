
# ساختارهای Map و Set

تا حالا ما درباره ساختارهای داده پیچیده زیر آشنا شدیم:

- شیءها برای ذخیره‌سازی مجموعه‌های کلیددار استفاده می‌شوند.
- آرایه‌ها برای ذخیره‌سازی مجموعه‌های ترتیبی استفاده می‌شوند.

اما اینها در زندگی واقعی کافی نیستند. به همین دلیل است که `Map` و `Set` وجود دارند.

## ساختار Map

[Map](mdn:js/Map) مجموعه‌ای از داده‌های کلیددار است، درست مانند `Object`. اما تفاوت اصلی آنها این است که `Map` اجازه می‌دهد که کلیدها از هر نوعی باشند.

متدها و ویژگی‌های آن:

- `new Map()` -- map را می‌سازد.
- `map.set(key, value)` -- value را به واسطه key ذخیره می‌کند.
- `map.get(key)` -- مقدار را به واسطه key برمی‌گرداند، اگر `key` در map وجود نداشته باشد `undefined` برگردانده می‌شود.
- `map.has(key)` -- اگر `key` وجود داشته باشد `true` برگردانده می‌شود، در غیر این صورت `false`.
- `map.delete(key)` -- مقدار را به واسطه key حذف می‌کند.
- `map.clear()` -- همه چیز را از map حذف می‌کند.
- `map.size` -- تعداد المان‌های کنونی را برمی‌گرداند.

برای مثال:

```js run
let map = new Map();

map.set('1', 'str1');   // یک کلید رشته‌ای
map.set(1, 'num1');     // یک کلید عددی
map.set(true, 'bool1'); // boolean یک کلید

// شیء را به یاد دارید؟ شیء کلیدها را به رشته تبدیل می‌کرد
// :نوع را حفظ می‌کند، پس این دو تفاوت دارند Map
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

همانطور که می‌بینیم، برخلاف شیءها، کلیدها به رشته تبدیل نمی‌شوند. هر نوع از کلید امکان‌پذیر است.

```smart header="`map[key]` راه درستی برای استفاده از `Map` نیست"
اگرچه `map[key]` هم کار می‌کند، برای مثال ما می‌توانیم بنویسیم `map[key]` = 2`، این کار یعنی با `map` مانند یک شیء ساده جاوااسکریپت کار کنیم، پس باعث ایجاد تمام محدودیت‌های متناظر می‌شود (فقط کلیدهای رشته‌ای/سمبلی مجاز خواهد بود و دیگر محدودیت‌ها).

پس ما باید از متدهای `map` استفاده کنیم: `set`، `get` و...
```

**ساختار Map می‌تواند از شیءها هم به عنوان کلید استفاده کند.**

برای مثال:

```js run
let john = { name: "John" };

// بیایید برای هر کاربر تعداد دفعات بازدیدشان را ذخیره کنیم
let visitsCountMap = new Map();

// کلید است map برای john
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

استفاده از شیءها به عنوان کلید یکی از ویژگی‌های مهم و قابل توجه `Map` است. چنین چیزی برای `Object` ممکن نیست. رشته به عنوان کلید در `Object` مشکلی ندارد، اما ما نمی‌توانیم از یک `Object` دیگر به عنوان کلید در `Object` استفاده کنیم.

بیایید امتحان کنیم:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // استفاده از یک شیء

visitsCountObj[ben] = 234; // به عنوان کلید ben استفاده از شیء
visitsCountObj[john] = 123; // می‌شود ben به عنوان کلید که جایگزین شیء john استفاده از شیء

*!*
// !این چیزی است که نوشته شده
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

به دلیل این که `visitsCountObj` یک شیء است، تمام کلیدهای `Object` مانند `john` و `ben` در بالا را به رشته `"[object Object]"` تبدیل می‌کند. قطعا چیزی نیست که ما بخواهیم.

```smart header="چگونگی مقایسه کلیدها در `Map`"
برای آزمایش برابری کلیدها، `Map` از الگوریتم [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) استفاده می‌کند. این الگوریتم تقریبا با مقایسه برابری سخت‌گیرانه `===` یکسان است، اما تفاوت این است که `NaN` با `NaN` یکسان فرض می‌شود. پس `NaN` هم می‌تواند به عنوان کلید استفاده شود.

این الگوریتم نمی‌تواند تغییر داده یا شخصی‌سازی شود.
```

````smart header="زنجیره‌ای"
تمام `map.set`ها خود map را برمی‌گردانند، پس ما می‌توانیم فراخوانی‌ها را به صورت «زنجیره‌ای» انجام دهیم:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## حلقه زدن در Map

برای حلقه زدن در `map` 3 متد وجود دارد:

- `map.keys()` -- یک حلقه‌پذیر برای کلیدها برمی‌گرداند،
- `map.values()` -- یک حلقه‌پذیر برای مقدارها برمی‌گرداند،
- `map.entries()` -- یک حلقه‌پذیر برای برای اطلاعات به شکل `[key, value]` برمی‌گرداند که به صورت پیش‌فرض در `for..of` استفاده می‌شود.

برای مثال:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// در کلیدها حلقه بزن (سبزیجات)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// در مقدارها حلقه بزن (میزان آنها)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// حلقه بزن [key, value] در اطلاعات به شکل
for (let entry of recipeMap) { // recipeMap.entries() مشابه با
  alert(entry); // (و بقیه اطلاعات) cucumber,500
}
```

```smart header="ترتیب درج کردن استفاده می‌شود"
حلقه زدن با همان ترتیبی که مقدارها اضافه شده‌اند انجام می‌شود. برخلاف یک `Object` معمولی، `Map` این ترتیب را حفظ می‌کند.
```

علاوه بر آن، `Map` یک متد `forEach` درون‌ساخت هم دارد، درست شبیه به `Array`:

```js
// اجرا می‌شود (key,value) تابع برای هر جفت
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // و غیره cucumber: 500
});
```

## متد Object.entries: ایجاد Map از Object

زمانی که یک `Map` ساخته می‌شود، ما می‌توانیم برای مقداردهی اولیه، یک آرایه (یا هر حلقه‌پذیر دیگری) را با جفت‌های کلید/مقدار در آن بنویسیم، مثل اینجا:

```js run
// [key, value] آرایه‌ای از جفت‌های
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

اگر ما یک شیء ساده داریم و بخواهیم از آن یک `Map` بسازیم، می‌توانیم از متد درون‌ساخت [Object.entries(obj)](mdn:js/Object/entries) استفاده کنیم که برای یک شیء آرایه‌ای از جفت‌های کلید/مقدار را دقیقا در همان فرمت برمی‌گرداند.

بنابراین ما می‌توانیم به این صورت از شیء یک map بسازیم:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

اینجا `Object.entries` یک آرایه از جفت‌های کلید/مقدار برمی‌گرداند: `[ ["name","John"], ["age", 30] ]`. این چیزی است که `Map` نیاز دارد.


## متد Object.fromEntries: ایجاد Object از Map

ما به تازگی دیدیم که چگونه از یک شیء ساده با استفاده از `Object.entries(obj)` یک `Map` بسازیم.

متد `Object.fromEntries` کار برعکس آن را انجام می‌دهد: با دادن یک آرایه از جفت‌های `[key, value]` به آن، یک شیء از آنها می‌سازد:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// prices = { banana: 1, orange: 2, meat: 4 } حالا داریم

alert(prices.orange); // 2
```

می‌توانیم از `Object.fromEntries` برای ساخت یک شیء ساده از `Map` استفاده کنیم.

برای مثال ما داده را در یک `Map` دخیره می‌کنیم اما نیاز داریم که آن را به یک کد شخص ثالث بدهیم که یک شیء ساده را قبول می‌کند.

شروع می‌کنیم:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // ساخت یک شیء ساده (*)
*/!*

// !انجام شد
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

فراخونی `map.entries()` یک حلقه‌پذیر از جفت‌های کلید/مقدار برمی‌گرداند، دقیقا در شکل مناسب برای `Object.fromEntries`.

همچنین می‌توانیم خط `(*)` را کوتاه‌تر کنیم:
```js
let obj = Object.fromEntries(map); // را حذف کردیم .entries()
```

این دو یکسان هستند چون `Object.fromEntries` یک شیء حلقه‌پذیر را به عنوان آرگومان می‌پذیرد. نباید لزوما یک آرایه باشد. یک حلقه‌زدن استاندارد در `map` جفت‌های کلید/مقدار یکسان با `map.entries()` را برمی‌گرداند. بنابراین ما شیء ساده‌ای با کلید/مقدارهای یکسان با `map` دریافت می‌کنیم.

## ساختار Set

یک `Set` مجموعه‌ای خاص است - «دسته‌ای از مقدارها» (بدون کلید) که هر مقدار تنها یک بار در آن واقع می‌شود.

متدهای اصلی آن:

- `new Set(iterable)` -- set را ایجاد می‌کند و اگر یک شیء حلقه‌پذیر داده شود (معمولا یک آرایه)، مقدارها را از آن درون set کپی می‌کند.
- `set.add(value)` -- یک مقدار اضافه می‌کند و خود set را برمی‌گرداند.
- `set.delete(value)` -- مقدار را حذف می‌کند و اگر `value` هنگام فراخوانی وجود داشته باشد `true` را برمی‌گرداند، در غیر این صورت `false`.
- `set.has(value)` -- اگر مقدار در set وجود داشته باشد `true` را برمی‌گرداند، در غیر این صورت `false`.
- `set.clear()` -- همه چیز را از set حذف می‌کند.
- `set.size` -- برابر با تعداد المان‌ها است.

ویژگی اصلی این اصت که فراخوانی‌های پی‌در‌پی `set.add(value)` با مقداری یکسان، کاری انجام نمی‌دهد. به همین دلیل است که هر مقدار تنها یک بار در `Set` واقع می‌شوند.

برای مثال، ما بازدیدکنندگانی داریم و می‌خواهیم همه افراد را به یاد بسپاریم. اما بازدیدهای تکراری نباید حساب شوند. یک بازدیدکننده باید تنها یک بار «شمرده شود».

`Set` ساختار کاملا مناسبی برای این کار است:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// بازدیدها، بعضی از کاربران چندبار مراجعه می‌کنند
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// تنها مقدارهای یکتا را نگه می‌دارد set
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (Mary و Pete سپس)
}
```

جایگزین `Set` می‌تواند آرایه‌ای از کاربران و کدی برای بررسی تکراری بودن کاربر در هر بار اضافه کردن با استفاده از [arr.find](mdn:js/Array/find) باشد. اما عملکرد کد ممکن است بسیار بد باشد چون این متد تمام آرایه و هر المان را بررسی می‌کند. `Set` برای بررسی یکتا بودن از درون بسیار بهینه‌تر است.

## حلقه‌زدن در Set

ما می‌توانیم در set هم با `for..of` و هم با استفاده از `forEach` حلقه بزنیم:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// :forEach کار مشابه با استفاده از
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

یک چیز جالب را در نظر داشته باشید. تابعی که به `forEach` داده شده 3 آرگومان دارد: یک `value`، سپس *مقدار یکسان* `valueAgain` و سپس شیء مورد نظر. در واقع، مقداری یکسان دو بار در آرگومان ظاهر می‌شود.

این به دلیل سازگاری با `Map` است که تابع داده شده به `forEach` دارای 3 آرگومان است. قطعا کمی عجیب به نظر می‌رسد. اما می‌تواند به جایگزینی `Map` با `Set` و برعکس در بعضی موارد کمک کند.

همچنین متدهای مشابهی که `Map` هم برای حلقه‌زننده‌ها دارد، پشتیبانی می‌شوند:

- `set.keys()` -- یک شیء حلقه‌پذیر برای مقدارها را برمی‌گرداند،
- `set.values()` -- با `set.keys()` یکسان است، برای سازگاری با `Map`
- `set.entries()` -- یک شیء حلقه‌پذیر را برای اطلاعات به شکل `[value, value]` برمی‌گرداند، برای سازگاری با `Map` وجود دارد.

## Summary

`Map` -- is a collection of keyed values.

Methods and properties:

- `new Map([iterable])` -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- `map.set(key, value)` -- stores the value by the key, returns the map itself.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

`Set` -- is a collection of unique values.

Methods and properties:

- `new Set([iterable])` -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- `set.add(value)` -- adds a value (does nothing if `value` exists), returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
