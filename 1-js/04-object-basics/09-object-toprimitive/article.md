
# تبدیل شیء به مقدار اصلی

زمانی که شیءها بهم اضافه شوند `obj1 + obj2`، از هم کم شوند `obj1 - obj2` یا با استفاده از `alert(obj)` چاپ شوند چه اتفاقی می‌افتد؟

جاوااسکریپت اجازه نمی‌دهد که چگونگی کار کردن عملگرها را شخصی‌سازی کنیم. بر خلاف بعضی از زبان‌های برنامه‌نویسی، مثل Ruby یا C++، ما نمی‌توانیم یک متد خاص شیء پیاده‌سازی کنیم تا اضافه کردن (یا بقیه عملگرها) را کنترل کند.

در صورت وجود چنین عملیاتی، شیءها به طور خودکار به مقدار اصلی تبدیل و سپس عملیات با این مقدارهای اصلی انجام می‌شوند و نتایج به شکل یک مقدار اصلی است.

این محدودیت مهمی است چون نتیجه `obj1 + obj2` نمی‌تواند شیء دیگری باشد!

برای مثال ما نمی‌توانیم کاری کنیم که شیءها بردارها یا ماتریس‌ها (یا دستاوردها یا هرچیزی) را نمایش دهند، آن‌ها را بهم اضافه کنند و توقع یک شیء «جمع‌شده» را به عنوان نتیجه داشته باشیم. چنین شاهکارهای معماری به طور خودکار «خارج از بحث» هستند.

پس چون نمی‌توانیم در این باره کار خاصی کنیم، در پروژه‌های واقعی شیءها همراه با ریاضیات استفاده نمی‌شوند. زمانی که اتفاق می‌افتد، معمولا بخاطر یک اشتباه کدنویسی است.

در این فصل ما چگونگی تبدیل یک شیء به مقدار اصلی و شخصی‌سازی آن را پوشش می‌دهیم.

ما دو هدف داریم:

1. این کار به ما اجازه می‌دهد که متوجه شویم در صورت بروز اشتباه‌های کدنویسی چه چیزی در حال رخ دادن است، زمانی که چنین عملیاتی به صورت تصادفی اتفاق افتاد.
2. استثناهایی وجود دارد که چنین عملیاتی مجاز هستند و خوب بنظر می‌رسند. مثلا تفریق یا مقایسه تاریخ‌ها (شیءهای `Date`). ما بعدا به سراغ آن می‌رویم.

## قوانین تبدیل

در فصل <info:type-conversions> ما قوانینی برای تبدیل عددی، رشته‌ای و بولین مقدارهای اصلی را دیدیم. اما ابهامی برای شیءها به جا گذاشتیم. حالا، چون درباره متدها و سمبل‌ها می‌دانیم این موضوع برای پوشش دادن آماده است.

1. در زمینه بولین تمام شیءها `true` هستند. فقط تبدیل عددی و رشته‌ای وجود دارد.
2. تبدیل عددی زمانی که ما شیءها را از هم کم می‌کنیم یا تابع‌های ریاضی را اعمال می‌کنیم اتفاق می‌افتد. برای مثال، شیءهای `Date` (در فصل <info:date> پوشش داده می‌شوند) می‌توانند از هم کم شوند و نتیجه `date1 - date2` برابر با تفاوت زمانی بین دو تاریخ است.
3. همینطور برای تبدیل رشته‌ای -- این تبدیل زمانی که ما یک شیء را خروجی می‌گیریم مثل `alert(obj)` و در زمینه‌های مشابه اتفاق می‌افتد.

می‌توانیم با استفاده از متدهای خاص شیء تبدیل رشته‌ای و عددی را تنظیم کنیم.

سه نوع تبدیل داده وجود دارد که در موقعیت‌های گوناگون اتفاق می‌افتد.

همانطور که در [مشخصات زبان](https://tc39.github.io/ecma262/#sec-toprimitive) گفته شده، به آن‌ها «جزء (hint)» می‌گویند:

`"string"`
: برای تبدیل شیء به رشته، زمانی که ما در حال انجام کاری روی شیءای هستیم که توقع یک رشته دارد، مثل `alert`:

    ```js
    // خروجی
    alert(obj);

    // استفاده از شیء به عنوان کلید ویژگی
    anotherObj[obj] = 123;
    ```

`"number"`
: برای تبدیل شیء به عدد، مثل زمانی که ما از ریاضی استفاده می‌کنیم:

    ```js
    // تبدیل واضح
    let num = Number(obj);

    // ریاضیات (به غیر از عملگر مثبت دوگانه)
    let n = +obj; // مثبت دوگانه
    let delta = date1 - date2;

    // مقایسه بزرگ‌تر/کمتر
    let greater = user1 > user2;
    ```

`"default"`
: در موارد کمیاب زمانی که عملگر «مطمئن نیست» که چه نوعی را دریافت می‌کند.

    برای مثال، عملگر مثبت دوگانه `+` هم می‌تواند با رشته‌ها کار کند (آن‌ها را ادغام کند) و هم با عددها (آن‌ها را اضافه می‌کند)، پس هم رشته‌ها و هم عددها قابل قبول هستند. پس اگر یک مثبت دوگانه شیءای را دریافت کند، از جزء `"default"` برای تبدیل آن استفاده می‌کند.

    همچنین، اگر شیءای با استفاده از `==` با یک رشته، عدد یا سمبل مقایسه شود، معلوم نیست که کدام تبدیل باید انجام شود پس جزء `"default"` استفاده می‌شود.

    ```js
    // استفاده می‌کند "default" مثبت دوگانه از جزء
    let total = obj1 + obj2;

    // استفاده می‌کند "default" از جزء obj == number
    if (user == 1) { ... };
    ```

    عملگرهای مقایسه کمتر و بزرگ‌تر، مانند `<` `>`، می‌توانند هم با رشته‌ها و هم با عددها کار کنند. با این حال، این عملگرها از جزء `"number"` استفاده می‌کنند نه `"default"` بنا به دلایلی مربوط به گذشته.

    اگرچه در عمل، ما نیازی به این جزئیات عجیب نداریم چون تمام شیءهای درون‌ساخت به جز یک مورد (شیء `Date`، بعدا آن را یاد خواهیم گرفت) تبدیل `"default"` را مانند `"number"` پیاده‌سازی می‌کنند. و ما می‌توانیم همین کار را کنیم.

```smart header="جزء `\"boolean\"` نداریم"
لطفا توجه کنید -- فقط 3 جزء داریم. به همین سادگی.

هیچ جزء "boolean" وجود ندارد (در زمینه بولین تمام شیءها `true` هستند) یا هر چیز دیگری. و اگر ما با `"default"` و `"number"` یکسان رفتار کنیم، مثل اکثر شیءهای درون‌ساخت، سپس فقط دو نوع تبدیل وجود دارد.
```

**برای انجام تبدیل‌ها، جاوااسکریپت سعی می‌کند که سه متد شیء را پیدا و فراخوانی کند:**

1. فراخوانی `obj[Symbol.toPrimitive](hint)` - متدی شامل کلید سمبلی `Symbol.toPrimitive` (سمبل سیستم)، اگر چنین متدی وجود داشته باشد،
2. در غیر این صورت اگر جزء `"string"` باشد
    - متد `obj.toString()` و `obj.valueOf()` را امتحان کن، هر کدام که وجود داشته باشد.
3. در غیر این صورت اگر جزء `"number"` یا `"default"` باشد
    - متد `obj.valueOf()` and `obj.toString()` را امتحان کن، هر کدام که وجود داشته باشد.

## متد Symbol.toPrimitive

بیایید از اولین متد شروع کنیم. یک سمبل درون‌ساخت به نام `Symbol.toPrimitive` وجود دارد که باید برای نام‌گذاری متد تبدیل استفاده شود، مثلا اینگونه:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // اینجا کدی برای تبدیل این شیء به مقدار اصلی قرار می‌گیرد
  // این کد باید یک مقدار اصلی برگرداند
  // "string" ،"number" ،"default" یکی از = hint
};
```

اگر متد `Symbol.toPrimitive` وجود داشته باشد، برای تمام جزءها استفاده می‌شود و متد دیگری نیاز نیست.

برای مثال، اینجا شیء `user` این متد را پیاده‌سازی می‌کند:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// دموی تبدیل کردن:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

همانطور که از کد می‌بینیم، با توجه به تبدیل `user` به رشته‌ای خودتعریف‌کننده یا مقداری پول تبدیل می‌شود. متد `user[Symbol.toPrimitive]` به تنهایی تمام موارد تبدیل را به عهده می‌گیرد.


## toString/valueOf

If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the "string" hint: `toString`, and if it doesn't exist, then `valueOf` (so `toString` has the priority for string conversions).
- For other hints: `valueOf`, and if it doesn't exist, then `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

### A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators)

The specification describes explicitly which operator uses which hint. There are very few operators that "don't know what to expect" and use the `"default"` hint. Usually for built-in objects `"default"` hint is handled the same way as `"number"`, so in practice the last two are often merged together.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.  

As for math operations, JavaScript doesn't provide a way to "override" them using methods, so real life projects rarely use them on objects.
