
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


## متد toString/valueOf

اگر `Symbol.toPrimitive` وجود نداشته باشد، سپس جاوااسکریپت سعی می‌کند که متدهای `toString` و `valueOf`  را پیدا کند:

- برای جزء "string": `toString` و اگر این متد وجود نداشت، سپس `valueOf` (پس `toString` برای تبدیل‌های رشته‌ای اولویت دارد).
- برای بقیه جزءها: `valueOf` و اگر این متد وجود نداشت، سپس `toString` (پس `valueOf` برای ریاضیات اولویت دارد).

متدهای `toString` و `valueOf` از زمان‌های گذشته وجود دارند. آن‌ها سمبل نیستند (سمبل‌ها انقدر قدیمی نیستند) بلکه متدهای «معمولی» هستند که اسمی رشته‌ای دارد. آن‌ها راهی جایگزین که «سبک قدیمی» دارد را برای پیاده‌سازی تبدیل فراهم می‌کنند.

این متدها باید یک مقدار اصلی برگردانند. اگر `toString` یا `valueOf` یک شیء برگرداند، سپس این مقدار نادیده گرفته می‌شود (مثل این است که متدی وجود نداشته باشد).

به صورت پیش‌فرض، یک شیء ساده متدهای `toString` و `valueOf` پایین را دارد:

- متد `toString` رشته `"[object Object]"` را برمی‌گرداند.
- متد `valueOf` خود شیء را برمی‌گرداند.

اینجا یک دمو داریم:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

پس اگر ما سعی کنیم که از شیء به عنوان یک رشته استفاده کنیم، مثلا درون `alert` یا بقیه، سپس به صورت پیش‌فرض ما `[object Object]` را می‌بینیم.

متد `valueOf` پیش‌فرض فقط برای کامل بودن مطالب اینجا گفته شد تا از هر سردرگمی جلوگیری شود. همانطور که می‌بینید، خود شیء را برمی‌گرداند پس نادیده گرفته می‌شود. نپرسید چرا، دلیلش مربوط به گذشته است. پس ما می‌توانیم فرض کنیم که این متد وجود ندارد.

بیایید این متدها را برای شخصی‌سازی تبدیل پیاده‌سازی کنیم.

برای مثال، اینجا `user` با استفاده از ترکیب `toString` و `valueOf` به جای `Symbol.toPrimitive` کار یکسانی با کد بالا را انجام می‌دهد:

```js run
let user = {
  name: "John",
  money: 1000,

  // hint="string" به ازای
  toString() {
    return `{name: "${this.name}"}`;
  },

  // "default" یا hint="number" به ازای
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

همانطور که می‌بینیم، رفتار این کد با مثال قبل که شامل `Symbol.toPrimitive` بود یکسان است.

اغلب اوقات ما یک چیز «همه‌گیر» می‌خواهیم که تمام تبدیل‌های مقدار اصلی را کنترل کند. در این مورد، می‌توانیم فقط `toString` را پیاده‌سازی کنیم، مثلا اینگونه:

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

در نبود `Symbol.toPrimitive` و `valueOf`، متد `toString` تمام تبدیل‌های مقدار اصلی را به عهده می‌گیرد.

### یک تبدیل می‌تواند هر نوع مقدار اصلی را برگرداند

چیز مهمی که باید درباره تمام متدهای تبدیل به مقدار اصلی بدانیم این است که آن‌ها حتما مقدار اصلی «جزئی» را برنمی‌گردانند.

هیچ کنترلی بر روی اینکه `toString` دقیقا رشته برگرداند یا اینکه متد `Symbol.toPrimitive` برای جزء `"number"` حتما یک عدد برگرداند نیست.

تنها مورد الزامی: این متدها باید یک مقدار اصلی برگردانند نه یک شیء.

```smart header="نکاتی مربوط به قدیم"
بنا به دلایلی مربوط به گذشته، اگر `toString` یا `valueOf` یک شیء برگرداند، اروری ایجاد نمی‌شود، اما چنین مقداری نادیده گرفته می‌شود (انگار که متد وجود ندارد). به این دلیل که در گذشته مفهوم «ارور» مناسبی در جاوااسکریپت وجود نداشت.

در مقابل، `Symbol.toPrimitice` *باید* مقدار اصلی برگرداند، در غیر این صورت یک ارور خواهیم داشت.
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
