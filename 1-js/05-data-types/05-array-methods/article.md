# متدهای آرایه

آرایه‌ها متدهای زیادی را فراهم می‌کنند. برای ساده‌سازی، در این فصل متدها به چند گروه تقسیم شده‌اند.

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

این چیز طبیعی است چون `delete obj.key` یک مقدار را با استفاده از `key` حذف می‌کند. به طور کلی کارش همین است. برای شیءها مناسب است. اما برای آرایه‌ها ما معمولا می‌خواهیم که بقیه المان‌ها پخش شوند و فضای آزاد شده را اشغال کنند. توقع داریم که الان آرایه‌ای کوتاه‌تر داشته باشیم.

بنابراین متدهای خاص باید استفاده شوند.

متد [arr.splice](mdn:js/Array/splice) یک شمشیر ارتشی سوئیسی برای آرایه‌ها است. می‌تواند هر کاری کند: اضافه کند، حذف کند و المان‌ها را جایگزین کند.

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

در مثال بعد ما 3 المان را حذف و آنها را با دو المان جایگزین می‌کنیم:

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

متد `splice` همچنین قادر به اضافه کردن المان بدون هیچ حذفیاتی است. برای این کار باید `deleteCount` را `0` بگذاریم:

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

متد [arr.slice](mdn:js/Array/slice) از متد `arr.splice` که از لحاظ ظاهری شبیه به آن است بسیار ساده‌تر است.

سینتکس اینگونه است:

```js
arr.slice([start], [end])
```

این متد یک آرایه جدید که تمام المان‌ها را از ایندکس `start` تا `end` (شامل خود `end` نمی‌شود) کپی می‌کند، برمی‌گرداند. `start` و `end` هر دو می‌توانند منفی باشند، که در این صورت موقعیت از انتهای آرایه حساب می‌شود.

این متد شبیه متد رشته `str.slice` است، اما به جای زیر رشته، زیر آرایه ایجاد می‌کند.

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
  // ... با المان کاری انجام دهید
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

متدهای [arr.indexOf](mdn:js/Array/indexOf)، [arr.lastIndexOf](mdn:js/Array/lastIndexOf) و [arr.includes](mdn:js/Array/includes) سینتکس مشابه دارند و اساسا همان کار همتایان خود در رشته‌ها را انجام می‌دهند، اما به جای کاراکترها با المان‌ها کار دارند:

- `arr.indexOf(item, from)` -- با شروع از ایندکس `from` به دنبال `item` می‌گردد و ایندکسی که المان در آن پیدا شد را برمی‌گرداند، در غیر این صورت `1-`.
- `arr.lastIndexOf(item, from)` -- شبیه متد بالا، اما از راست به چپ جستجو می‌کند.
- `arr.includes(item, from)` -- با شروع از ایندکس `from` به دنبال `item` می‌گردد، اگر پیدا کند `true` را برمی‌گرداند.

برای مثال:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

توجه داشته باشید که متدها از مقایسه `===` استفاده می‌کنند. پس اگر ما به دنبال `false` باشیم، متد دقیقا `false` را پیدا می‌کند و نه صفر را.

اگر ما می‌خواهیم شامل بودن را بررسی کنیم و به دنبال ایندکس دقیق نیستیم، پس `arr.includes` ترجیح داده می‌شود.

همچنین، یک تفاوت بسیار کوچک `includes` این است که این متد به درستی `NaN` را کنترل می‌کند، درست برعکس `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (کار نمی‌کند NaN باید 0 باشد، اما برابری === برای)
alert( arr.includes(NaN) );// true (درست است)
```

### متدهای find and findIndex

تصور کنید که یک آرایه‌ای از شیءها داریم. چگونه باید یک شیء با شرطی مشخص را پیدا کنیم؟

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

اگر `true` برگرداند، جستجو متوقف می‎شود، `item` برگردانده می‌شود. اگر چیزی پیدا نشود، `undefined` برگردانده می‌شود.

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

در واقعیت، آرایه‌هایی از شیءها چیز متداولی است، پس متد `find` بسیار مفید است.

توجه داشته باشید که در مثال بالا ما تابع `item => item.id == 1` را همراه با یک آرگومان برای `find` در نظر گرفتیم. این چیز معمولی است، بقیه آرگومان‌های این تابع به ندرت استفاده می‌شوند.

متد [arr.findIndex](mdn:js/Array/findIndex) اساسا یکسان است، اما به جای خود المان ایندکسی که المان در آن پیدا شد را برمی‌گرداند و اگر چیزی پیدا نشد `1-` را برمی‌گرداند.

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

### sort(fn)

The call to [arr.sort()](mdn:js/Array/sort) sorts the array *in place*, changing its element order.

It also returns the sorted array, but the returned value is usually ignored, as `arr` itself is modified.

For instance:

```js run
let arr = [ 1, 2, 15 ];

// the method reorders the content of arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Did you notice anything strange in the outcome?

The order became `1, 15, 2`. Incorrect. But why?

**The items are sorted as strings by default.**

Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed `"2" > "15"`.

To use our own sorting order, we need to supply a function as the argument of `arr.sort()`.

The function should compare two arbitrary values and return:
```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

For instance, to sort as numbers:

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

Now it works as intended.

Let's step aside and think what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.

The `arr.sort(fn)` method implements a generic sorting algorithm. We don't need to care how it internally works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) or [Timsort](https://en.wikipedia.org/wiki/Timsort) most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.

By the way, if we ever want to know which elements are compared -- nothing prevents from alerting them:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.

````smart header="A comparison function may return any number"
Actually, a comparison function is only required to return a positive number to say "greater" and a negative number to say "less".

That allows to write shorter functions:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Arrow functions for the best"
Remember [arrow functions](info:arrow-functions-basics)? We can use them here for neater sorting:

```js
arr.sort( (a, b) => a - b );
```

This works exactly the same as the longer version above.
````

````smart header="Use `localeCompare` for strings"
Remember [strings](info:string#correct-comparisons) comparison algorithm? It compares letters by their codes by default.

For many alphabets, it's better to use `str.localeCompare` method to correctly sort letters, such as `Ö`.

For example, let's sort a few countries in German:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
````

### reverse

The method [arr.reverse](mdn:js/Array/reverse) reverses the order of elements in `arr`.

For instance:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

It also returns the array `arr` after the reversal.

### split and join

Here's the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?

The [str.split(delim)](mdn:js/String/split) method does exactly that. It splits the string into an array by the given delimiter `delim`.

In the example below, we split by a comma followed by space:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

The `split` method has an optional second numeric argument -- a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Split into letters"
The call to `split(s)` with an empty `s` would split the string into an array of letters:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

The call [arr.join(glue)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items joined by `glue` between them.

For instance:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

When we need to iterate over an array -- we can use `forEach`, `for` or `for..of`.

When we need to iterate and return the data for each element -- we can use `map`.

The methods [arr.reduce](mdn:js/Array/reduce) and [arr.reduceRight](mdn:js/Array/reduceRight) also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array.

The syntax is:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

The function is applied to all array elements one after another and "carries on" its result to the next call.

Arguments:

- `accumulator` -- is the result of the previous function call, equals `initial` the first time (if `initial` is provided).
- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.

As function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of `reduce`.

Sounds complicated?

The easiest way to grasp that is by example.

Here we get a sum of an array in one line:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

The function passed to `reduce` uses only 2 arguments, that's typically enough.

Let's see the details of what's going on.

1. On the first run, `sum` is the `initial` value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the function result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element to it, and so on...

The calculation flow:

![](reduce.svg)

Or in the form of a table, where each row represents a function call on the next array element:

|   |`sum`|`current`|result|
|---|-----|---------|---------|
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|

Here we can clearly see how the result of the previous call becomes the first argument of the next one.

We also can omit the initial value:

```js run
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

The result is the same. That's because if there's no initial, then `reduce` takes the first element of the array as the initial value and starts the iteration from the 2nd element.

The calculation table is the same as above, minus the first row.

But such use requires an extreme care. If the array is empty, then `reduce` call without initial value gives an error.

Here's an example:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);
```

So it's advised to always specify the initial value.

The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same, but goes from right to left.


## Array.isArray

Arrays do not form a separate language type. They are based on objects.

So `typeof` does not help to distinguish a plain object from an array:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

...But arrays are used so often that there's a special method for that: [Array.isArray(value)](mdn:js/Array/isArray). It returns `true` if the `value` is an array, and `false` otherwise.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Most methods support "thisArg"

Almost all array methods that call functions -- like `find`, `filter`, `map`, with a notable exception of `sort`, accept an optional additional parameter `thisArg`.

That parameter is not explained in the sections above, because it's rarely used. But for completeness we have to cover it.

Here's the full syntax of these methods:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
```

The value of `thisArg` parameter becomes `this` for `func`.

For example, here we use a method of `army` object as a filter, and `thisArg` passes the context:

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
// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

If in the example above we used `users.filter(army.canJoin)`, then `army.canJoin` would be called as a standalone function, with `this=undefined`, thus leading to an instant error.

A call to `users.filter(army.canJoin, army)` can be replaced with `users.filter(user => army.canJoin(user))`, that does the same. The latter is used more often, as it's a bit easier to understand for most people.

## Summary

A cheat sheet of array methods:

- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` deletes `deleteCount` elements and inserts `items`.
  - `slice(start, end)` -- creates a new array, copies elements from index `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.

- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.

- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce/reduceRight(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

- Additionally:
  - `Array.isArray(arr)` checks `arr` for being an array.

Please note that methods `sort`, `reverse` and `splice` modify the array itself.

These methods are the most used ones, they cover 99% of use cases. But there are few others:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) check the array.

  The function `fn` is called on each element of the array similar to `map`. If any/all results are `true`, returns `true`, otherwise `false`.

  These methods behave sort of like `||` and `&&` operators: if `fn` returns a truthy value, `arr.some()` immediately returns `true` and stops iterating over the rest of items; if `fn` returns a falsy value, `arr.every()` immediately returns `false` and stops iterating over the rest of items as well.

  We can use `every` to compare arrays:
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copies its elements from position `start` till position `end` into *itself*, at position `target` (overwrites existing).

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) create a new flat array from a multidimensional array.

For the full list, see the [manual](mdn:js/Array).

From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that's much easier.

Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don't know how -- come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you'll automatically remember the methods, without specific efforts from your side.
