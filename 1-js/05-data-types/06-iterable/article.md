
# حلقه‌پذیرها

شیءهای *حلقه‌پذیر* تعمیمی از آرایه‌ها هستند. این مفهومی است که به ما اجازه می‌دهد تا هر شیءای را در حلقه `for..of` قابل استفاده کنیم.

قطعا آرایه‌ها حلقه‌پذیر هستند. اما شیءهای درون‌ساخت دیگری هم هستند که حلقه‌پذیرند. برای مثال، رشته‌ها هم حلقه‌پذیرند.

اگر یک شیء به طور فنی آرایه نباشد، اما یک مجموعه (لیست یا دسته) از چیزها را نشان دهد، `for..of` یک سینتکس عالی برای حلقه‌زدن درون آن است، پس بیایید ببینیم چگونه چنین کاری را انجام دهیم.


## ویژگی Symbol.iterator

ما می‌توانیم به راحتی مفهوم حلقه‌پذیرها را با ایجاد حلقه‌پذیر خودمان درک کنیم.

برای مثال، ما یک شیء داریم که آرایه نیست، اما برای استفاده در `for..of` مناسب است.

مانند یک شیء `range` که بازه‌ای از اعداد را نشان می‌دهد:

```js
let range = {
  from: 1,
  to: 5
};

// :کار کند for..of می‌خواهیم که
// for(let num of range) ... num=1,2,3,4,5
```

برای اینکه شیء `range` را حلقه‌پذیر کنیم (و به این ترتیب بگذاریم `for..of` کار کند) ما نیاز داریم که یک متد به اسم `Symbol.iterator` را به شیء اضافه کنیم ( یک سمبل خاص درون ساخت که فقط برای این کار است).

1. زمانی که `for..of` شروع می‌شود، متد را یک بار صدا می‌زند (یا اگر پیدا نشود ارور می‌دهد). متد باید یک *حلقه‌زننده* را برگرداند -- شیءای که متد `next` را دارد.
2. همینطور رو به جلو، `for..of` *تنها با شیء برگردانده شده* کار می‌کند.
3. زمانی که `for..of` مقدار بعدی را نیاز دارد، روی آن شیء `next()` را صدا می‌زند.
4. نتیجه `next()` باید به شکل `{done: Boolean, value: any}` باشد که `done=true` به معنی پایان حلقه‌زدن است، در غیر این صورت `value` مقدار بعدی خواهد بود.

اینجا پیاده‌سازی کامل را برای `range` به همراه اظهارات داریم:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. ابتدا این متد صدا زده می‌شود for..of با استفاده از
range[Symbol.iterator] = function() {

  // :این متد شیء حلقه‌زننده را برمی‌گرداند...
  // 2. فقط با این حلقه‌زننده کار می‌کند، که از آن مقدار بعدی را درخواست می‌کند for..of ،همینطور رو به جلو
  return {
    current: this.from,
    last: this.to,      

    // 3. فراخوانی می‌شود for..of در هر دور حلقه توسط next()
    next() {
      // 4. برگرداند {done:..., value:...} این متد باید مقدار را به عنوان یک شیء
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// !حالا کار می‌کند
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

لطفا خاصیت اصلی حلقه‌پذیرها را در نظر داشته باشید: تفکیک وظایف.

- شیء `range` به خودی خود دارای متد `next()` نیست.
- به جای آن، شیء دیگری که به آن «حلقه‌زننده» هم می‌گویند با فراخوانی `range[Symbol.iterator]()` و متد `next()` آن، مقدارها را برای حلقه‌زدن ایجاد می‌کند.

بنابراین، شیء حلقه‌زننده از شیءای که در آن حلقه می‌زند جدا است.

به طور فنی، ما می‌توانیم آنها را ترکیب کنیم و از خود `range` به عنوان حلقه‌زننده استفاده کنیم تا کد ساده‌تر شود.

مانند این:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

حالا `range[Symbol.iterator]()` خود شیء `range` را برمی‌گرداند: این شیء دارای متد مورد نیاز `next()` است و فرایند کنونی حلقه‌زدن را در `this.current` به خاطر می‌سپارد. کوتاه‌تر است؟ بله. و گاهی اوقات این هم خوب است.

اما امتیازی منفی وجود دارد: حالا غیر ممکن است که دو حلقه `for..of` بتوانند به طور همزمان در شیء حلقه بزنند چون آنها وضعیت حلقه‌زدن را به اشتراک می‌گذارند و آن هم به دلیل اینکه تنها یک حلقه‌زننده وجود دارد -- خود شیءها. اما دو for-of همزمان به ندرت پیش می‌آید، حتی در سناریوهای async (همگام‌سازی).

```smart header="حلقه‌زننده‌های بی‌نهایت"
حلقه‌زننده‌های بی‌نهایت هم ممکن است ایجاد شوند. برای مثل، `range` به ازای `range.to = Infinity` بی‌نهایت می‌شود. یا ما می‌توانیم یک شیء حلقه‌پذیر را که یک دنباله بی‌نهایت از شبه اعداد ایجاد می‌کند بسازیم. می‌تواند مفید هم باشد.

هیچ محدودیتی برای `next` وجود ندارد، این متد می‌تواند مقدارهای بیشتر و بیشتری برگرداند و این عادی است.

قطعا، حلقه `for..of` درون چنین حلقه‌پذیری پایان‌ناپذیر خواهد بود. اما می‌توانیم آن را همیشه با `break` متوقف کنیم.
```


## String is iterable

Arrays and strings are most widely used built-in iterables.

For a string, `for..of` loops over its characters:

```js run
for (let char of "test") {
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
```

And it works correctly with surrogate pairs!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## Calling an iterator explicitly

For deeper understanding, let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":

```js run
let str = "Hello";

// does the same as
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
```

That is rarely needed, but gives us more control over the process than `for..of`. For instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

## Iterables and array-likes [#array-like]

Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.

- *Iterables* are objects that implement the `Symbol.iterator` method, as described above.
- *Array-likes* are objects that have indexes and `length`, so they look like arrays.

When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).

But an iterable may be not array-like. And vice versa an array-like may be not iterable.

For example, the `range` in the example above is iterable, but not array-like, because it does not have indexed properties and `length`.

And here's the object that is array-like, but not iterable:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.

For instance:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (method works)
```

`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.

The same happens for an iterable:

```js
// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion works)
```

The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
```js
Array.from(obj[, mapFn, thisArg])
```

The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.

For instance:

```js
// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Here we use `Array.from` to turn a string into an array of characters:

```js run
let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

Unlike `str.split`, it relies on the iterable nature of the string and so, just like `for..of`, correctly works with surrogate pairs.

Technically here it does the same as:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...But it is shorter.    

We can even build surrogate-aware `slice` on it:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
```


## Summary

Objects that can be used in `for..of` are called *iterable*.

- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.


Objects that have indexed properties and `length` are called *array-like*. Such objects may also have other properties and methods, but lack the built-in methods of arrays.

If we look inside the specification -- we'll see that most built-in methods assume that they work with iterables or array-likes instead of "real" arrays, because that's more abstract.

`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.
