# آرایه‌ها

شیءها به شما اجازه می‌دهند که مجموعه‌ای کلیددار از مقدارها را ذخیره کنید. این چیز خوبی است.

اما بسیار پیش می‌آید که ما به یک *مجموعه‌ی مرتب* نیاز داشته باشیم، که دارای یک المان اول، دوم، سوم و غیره باشیم. برای مثال، ما نیاز داریم که یک لیست از چیزی را ذخیره کنیم: کاربران، کالاها، المان‌های HTML و غیره.

اینکه اینجا از یک شیء استفاده کنیم خوب نیست، چون هیچ روشی برای کنترل کردن ترتیب المان‌ها فراهم نمی‌کند. ما نمی‌توانیم یک ویژگی جدید را «بین» ویژگی‌های جدید اضافه کنیم. شیءها برای چنین موردی ساخته نشده‌اند.

یک ساختار داده خاص به نام `Array` وجود دارد که برای ذخیره مجموعه‌های مرتب استفاده می‌شود.

## تعریف کردن

برای ساخت یک آرایه خالی دو سینتکس وجود دارد:

```js
let arr = new Array();
let arr = [];
```

تقریبا همیشه، سینتکس دوم استفاده می‌شود. ما می‌توانیم المان‌هایی اولیه را درون براکت‌ها قرار دهیم:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

المان‌های آرایه عددگذاری شده‌اند که از صفر شروع می‌شود.

ما می‌توانیم یک المان را با استفاده از عددش درون براکت‌ها دریافت کنیم:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

می‌توانیم یک المان را جایگزین کنیم:

```js
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
```

...یا یک المان جدید را به آرایه اضافه کنیم:

```js
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
```

تعداد کل المان‌های درون آرایه در `length` آن است:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

همچنین ما می‌توانیم از `alert` برای نشان دادن کل آرایه استفاده کنیم.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

یک آرایه می‌تواند المان‌هایی از هر نوع را ذخیره کند.

برای مثال:

```js run no-beautify
// ترکیبی از مقدارها
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// آن name دریافت شیء در ایندکس 1 و سپس نمایش
alert( arr[1].name ); // John

// دریافت تابع در ایندکس 3 و اجرا کردن آن
arr[3](); // hello
```


````smart header="کامای دنباله‌دار"
یک آرایه، درست مانند یک شیء، می‌تواند با یک کاما پایان یاید:
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

سبک «کامای دنباله‌دار» اضافه/حذف کردن المان را آسان‌تر می‌کند، چون همه خطوط مشابه می‌شوند.
````


## متدهای pop/push، shift/unshift

یک [صف](https://fa.wikipedia.org/wiki/صف_(نوع_داده_انتزاعی)) یکی از متداول‌ترین استفاده‌ها از یک آرایه است. در علوم کامپیوتر، آرایه به معنای یک مجموعه مرتب‌شده از المان‌ها است که دو عملیات را پشتیبانی می‌کند:

- `push` یک المان را به آخر اضافه می‌کند.
- `shift` یک المان را از آغاز برمی‌دارد، صف را پیش می‌برد، پس المان دوم به المان اول تبدیل می‌شود.

![](queue.svg)

آرایه‌ها هر دو عملیات را پشیبانی می‌کنند.

خیلی پیش می‌آید که در عمل به آن نیاز داشته باشیم. برای مثال، یک صف از پیام‌ها که باید روی صفحه نمایش داده شوند.

آرایه‌ها یک مورد استفاده دیگر هم دارند که یک ساختار داده به نام [پشته](https://fa.wikipedia.org/wiki/پشته) است.

پشته دو عملیات را پشتیبانی می‌کند:

- `push` یک المان را به آخر اضافه می‌کند.
- `pop` یک المان را از آخر برمی‌دارد.

پس المان‌های جدید یا اضافه می‌شوند یا همیشه از «آخر» برداشته می‌شوند.

یک پشته معمولا به عنوان یک بسته‌ای از کارت‌ها فرض می‎شود: کارت‌های جدید به بالا اضافه می‌شوند یا از بالا برداشته می‌شوند:

![](stack.svg)

برای پشته‌ها، آخرین چیزی که اضافه شده باشد اول دریافت می‌شود، همچنین به آن LIFO (Last-In-First-Out) هم گفته می‌شود. برای صف‌ها، ما FIFO (First-In-First-Out) را داریم.

آرایه‌ها در جاوااسکریپت می‌توانند هم به عنوان یک صف و هم به عنوان یک پشته کار کنند. آنها به شما اجازه می‌دهند که المان‌ها را به/از آغاز یا پایان اضافه/حذف کنید.

در علوم کامپیوتر ساختار داده‌ای که همچنین چیزی را ممکن می‌کند، [صف دو طرفه](https://en.wikipedia.org/wiki/Double-ended_queue) نامیده می‌شود.

**متدهایی که با انتهای آرایه کار می‌کنند:**

`pop`
: آخرین المان از آرایه را خارج می‌کند و آن را برمی‌گرداند:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // می‌کند alert را حذف می‌کند و آن را "Pear"

    alert( fruits ); // Apple, Orange
    ```

`push`
: المان را به انتهای آرایه اضافه می‌کند:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    صدا زدن `friuts.push(...)` برابر است با `fruits[fruits.length] = ...`.

**متدهایی که با آغاز آرایه کار می‌کنند:**

`shift`
: اولین المان آرایه را خارج می‌کند و آن را برمی‌گرداند:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // می‌کند alert را حذف می‌کند و آن را "Apple"

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: المان را به آغاز آرایه اضافه می‌کند:

    ```js run
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

متدهای `push` و `unshift` می‌توانند چند المان را یک جا اضافه کنند:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## اجزای داخلی

یک آرایه نوع خاصی از یک شیء است. براکت‌ها که برای دسترسی به یک ویژگی `arr[0]` استفاده می‌شوند در واقع از سینتکس شیء آمده‌اند. اساسا شبیه به `obj[key]` است، که در آن `arr` شیء است، درحالی که اعداد به عنوان کلیدها استفاده می‌شوند.

آنها شیءها را با فراهم کردن متدهای خاصی برای کارکردن با مجموعه‌های مرتب شده‌ی داده و ویژگی `length` گسترده می‌کنند. اما در ریشه و ذات هنوز یک شیء هستند.

به یاد داشته باشید، فقط 8 نوع داده ساده در جاوااسکریپت وجود دارد (برای اطلاعات بیشتر فصل [انواع داده](info:types) را ببینید). آرایه یک شیء است و به همین دلیل مانند یک شیء عمل می‌کند.

برای مثال، آرایه توسط مرجع کپی می‌شود:

```js run
let fruits = ["موز"]

let arr = fruits; کپی شدن توسط مرجع (دو متغیر به آرایه مشابهی رجوع می‌کنند)

alert( arr === fruits ); // true

arr.push("گلابی"); // تغییر دادن آرایه با استفاده از مرجع

alert( fruits ); // حال دارای 2 المان است - موز، گلابی
```

اما چیزی که باعث می‌شود آرایه‌ها خاص باشند نمایش داخلی آنها است. موتور سعی می‌کند که المان‌های آرایه را در ناحیه‌ای پیوسته در حافظه ذخیره کند، یکی پس از دیگری، درست همانطور که در تصاویر این فصل  نشان داده شد، و بهینه‌سازی‌هایی هم وجود دارد، برای اینکه آرایه‌ها را بسیار سریع کنند.

اما اگر ما از کار کردن با آرایه به عنوان یک «مجموعه مرتب شده» دست بکشیم و شروع به کار کردن به عنوان یک شیء معمولی کنیم، بهینه‌سازی‌ها متوقف می‌شوند.

برای مثال، به طور فنی می‌توانیم همچین کاری کنیم:

```js
let fruits = []; // یک آرایه بسازیم

fruits[99999] = 5; // مقداردهی به یک ویژگی با ایندکسی بسیار بیشتر از طول آرایه

fruits.age = 25; // ساخت یک ویژگی با یک اسم دلخواه
```

این کار قابل انجام است، چون آرایه‌ها در ذات خود شیء هستند. ما می‌توانیم هر ویژگی‌ای را به آنها اضافه کنیم.

اما موتور خواهد دید که ما با آرایه به عنوان یک شیء معمولی کار می‌کنیم. بهینه‌سازی‌های مخصوص آرایه برای چنین موارد استفاده‌ای مناسب نیستند و غیر فعال خواهند شد و فواید آنها هم از بین خواهند رفت.

راه‌های استفاده نامناسب با یک آرایه:

- اضافه کردن یک ویژگی غیر عددی مانند `arr.test = 5`.
- ایجاد فضای خالی، مانند: اضافه کردن `arr[0]` و سپس `arr[1000]` (اضافه نکردن چیزی بین آنها).
- پر کردن آرایه با ترتیب برعکس، مثل `arr[1000]`، `arr[999]` و غیره.

لطفا به آرایه‌ها به عنوان یک ساختار خاص برای کارکردن با *داده مرتب شده* نگاه کنید. آنها متدهای خاصی را برای این موضوع فراهم می‌کنند. آرایه‌ها با حساسیت به داخل موتورهای جاوااسکریپت برای کارکردن با داده مرتب شده‌ی متوالی راه یافته‌اند، لطفا از آنها در همین راه استفاده کنید. اگر به کلیدهای دلخواه نیاز دارید، به احتمال زیاد شما در واقع به یک شیء معمولی `{}` احتیاج دارید.

## Performance

Methods `push/pop` run fast, while `shift/unshift` are slow.

![](array-speed.svg)

Why is it faster to work with the end of an array than with its beginning? Let's see what happens during the execution:

```js
fruits.shift(); // take 1 element from the start
```

It's not enough to take and remove the element with the number `0`. Other elements need to be renumbered as well.

The `shift` operation must do 3 things:

1. Remove the element with the index `0`.
2. Move all elements to the left, renumber them from the index `1` to `0`, from `2` to `1` and so on.
3. Update the `length` property.

![](array-shift.svg)

**The more elements in the array, the more time to move them, more in-memory operations.**

The similar thing happens with `unshift`: to add an element to the beginning of the array, we need first to move existing elements to the right, increasing their indexes.

And what's with `push/pop`? They do not need to move anything. To extract an element from the end, the `pop` method cleans the index and shortens `length`.

The actions for the `pop` operation:

```js
fruits.pop(); // take 1 element from the end
```

![](array-pop.svg)

**The `pop` method does not need to move anything, because other elements keep their indexes. That's why it's blazingly fast.**

The similar thing with the `push` method.

## Loops

One of the oldest ways to cycle array items is the `for` loop over indexes:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

But for arrays there is another form of loop, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
```

The `for..of` doesn't give access to the number of the current element, just its value, but in most cases that's enough. And it's shorter.

Technically, because arrays are objects, it is also possible to use `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

But that's actually a bad idea. There are potential problems with it:

1. The loop `for..in` iterates over *all properties*, not only the numeric ones.

    There are so-called "array-like" objects in the browser and in other environments, that *look like arrays*. That is, they have `length` and indexes properties, but they may also have other non-numeric properties and methods, which we usually don't need. The `for..in` loop will list them though. So if we need to work with array-like objects, then these "extra" properties can become a problem.

2. The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it's still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.

Generally, we shouldn't use `for..in` for arrays.


## A word about "length"

The `length` property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one.

For instance, a single element with a large index gives a big length:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Note that we usually don't use arrays like that.

Another interesting thing about the `length` property is that it's writable.

If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible, here's the example:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return
```

So, the simplest way to clear the array is: `arr.length = 0;`.


## new Array() [#new-array]

There is one more syntax to create an array:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

It's rarely used, because square brackets `[]` are shorter. Also there's a tricky feature with it.

If `new Array` is called with a single argument which is a number, then it creates an array *without items, but with the given length*.

Let's see how one can shoot themself in the foot:

```js run
let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2
```

To avoid such surprises, we usually use square brackets, unless we really know what we're doing.

## Multidimensional arrays

Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 5, the central element
```

## toString

Arrays have their own implementation of `toString` method that returns a comma-separated list of elements.

For instance:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Also, let's try this:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Arrays do not have `Symbol.toPrimitive`, neither a viable `valueOf`, they implement only `toString` conversion, so here `[]` becomes an empty string, `[1]` becomes `"1"` and `[1,2]` becomes `"1,2"`.

When the binary plus `"+"` operator adds something to a string, it converts it to a string as well, so the next step looks like this:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Don't compare arrays with ==

Arrays in JavaScript, unlike some other programming languages, shouldn't be compared with operator `==`.

This operator has no special treatment for arrays, it works with them as with any objects.

Let's recall the rules:

- Two objects are equal `==` only if they're references to the same object.
- If one of the arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter <info:object-toprimitive>.
- ...With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn't convert types. 

So, if we compare arrays with `==`, they are never the same, unless we compare two variables that reference exactly the same array.

For example:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

These arrays are technically different objects. So they aren't equal. The `==` operator doesn't do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`. 

Then the comparison process goes on with the primitives, as described in the chapter <info:type-conversions>:

```js run
// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```

So, how to compare arrays?

That's simple: don't use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

## Summary

Array is a special kind of object, suited to storing and managing ordered data items.

- The declaration:

    ```js
    // square brackets (usual)
    let arr = [item1, item2...];

    // new Array (exceptionally rare)
    let arr = new Array(item1, item2...);
    ```

    The call to `new Array(number)` creates an array with the given length, but without elements.

- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
- If we shorten `length` manually, the array is truncated.

We can use an array as a deque with the following operations:

- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds `items` to the beginning.

To loop over the elements of the array:
  - `for (let i=0; i<arr.length; i++)` -- works fastest, old-browser-compatible.
  - `for (let item of arr)` -- the modern syntax for items only,
  - `for (let i in arr)` -- never use.

To compare arrays, don't use the `==` operator (as well as `>`, `<` and others), as they have no special treatment for arrays. They handle them as any objects, and it's not what we usually want.

Instead you can use `for..of` loop to compare arrays item-by-item.

We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter <info:array-methods>.
