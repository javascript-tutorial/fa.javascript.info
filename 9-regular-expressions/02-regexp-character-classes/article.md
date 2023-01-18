# کلاس های کاراکتر (Character classes) 

یک تسک عملی را در نظر بگیرید -- ما یک شماره تلفن مانند `"67-45-123-(903)7+"` داریم و باید آن را به اعداد خالص تبدیل کنیم: `79031234567`.

برای انجام این تسک، می‌ توانیم هر چیزی را که عدد نیست پیدا و حذف کنیم. کلاس های کاراکتر می تواند در این مورد کمک کند.

*کلاس کاراکتر* نماد خاصی است که با هر نمادی از یک مجموعه خاص مطابقت دارد.

برای شروع، بیایید کلاس "digit" را بررسی کنیم. به صورت `pattern:\d` نوشته می‌ شود و با "هر رقمی" مطابقت دارد.

به عنوان مثال، بیایید اولین رقم را در شماره تلفن پیدا کنیم:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

بدون پرچم `pattern:g`، عبارت باقاعده فقط به دنبال اولین تطابق است. که اولین رقم `pattern:\d` می باشد.

بیایید پرچم `pattern:g` را اضافه کنیم تا همه ارقام را پیدا کنیم:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // آرایه ای از اعداد : 7,9,0,3,1,2,3,4,5,6,7

// بیایید شماره تلفن را به صورت رقمی بنویسیم:
alert( str.match(regexp).join('') ); // 79031234567
```

این یک کلاس کاراکتر برای ارقام بود. کلاس های کاراکتر های دیگری نیز وجود دارند.

بیشترین استفاده ها عبارتند از:

`pattern:\d` ("d" مخفف "digit(رقم)")
: رقم: کاراکتری از `0` تا `9`.

`pattern:\s` ("s" مخفف "space(فاصله)")
: یک علامت فاصله: شامل فاصله‌ها، تب ها `t\`، خطوط جدید `n\` و چند کاراکتر کمیاب دیگر، مانند `v\`، `f\` و `r\`.

`pattern:\w` ("w" is from "word")
: یک کاراکتر "کلمه ای": یا یک حرف الفبای لاتین یا یک رقم یا زیرخط `_`. حروف غیر لاتین (مانند سیریلیک یا هندی) به `pattern:\w` تعلق ندارند.

به عنوان مثال، `pattern:\d\s\w` به معنای یک `رقم` است که به دنبال آن یک `کاراکتر فاصله` و به دنبال آن یک `کاراکتر واژه‌ای` مانند `match:1 a`.

**یک regexp ممکن است شامل نمادهای معمولی و کلاس های کاراکتر باشد.**

برای مثال، `pattern:CSS\d` با رشته `Match:CSS` با یک رقم بعد از آن مطابقت دارد:

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

همچنین می توانیم از بسیاری از کلاس های کاراکتر استفاده کنیم:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

مطابقت (هر کلاس کاراکتر regexp دارای کاراکتر نتیجه مربوطه است):

![](love-html5-classes.svg)

## کلاس های معکوس (Inverse classes)

برای هر کلاس کاراکتر یک "کلاس معکوس" وجود دارد که با همان حرف مشخص می شود، اما با حروف بزرگ نشان داده می شود.

"معکوس" به این معنی است که با تمام کاراکتر های دیگر مطابقت دارد، به عنوان مثال:

`pattern:\D`
: غیر رقمی: هر کاراکتری به جز `pattern:\d`، به عنوان مثال یک حرف.

`pattern:\S`
: بدون فاصله: هر کاراکتری به جز `pattern:\s`، به عنوان مثال یک حرف.

`pattern:\W`
: کاراکتر غیرکلمه ای: هر چیزی جز `pattern:\w`، به عنوان مثال یک حرف غیر لاتین یا یک فاصله.

در ابتدای فصل دیدیم که چگونه از رشته ای مانند `subject:+7(903)-123-45-67` یک شماره تلفن تنها با اعداد بسازیم: همه ارقام را پیدا کنید و آنها را به هم متصل کنید.

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

یک راه جایگزین و کوتاهتر این است که `pattern:\D` غیر رقمی را پیدا کنید و آنها را از رشته حذف کنید:

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## نقطه، "هر کاراکتری" است

نقطه `.:pattern` یک کلاس کاراکتر ویژه است که با "هر کاراکتری به جز خط جدید" مطابقت دارد.

برای مثال:

```js run
alert( "Z".match(/./) ); // Z
```

یا در وسط یک regexp:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (فاصله نیز کاراکتر می باشد)
```

لطفاً توجه داشته باشید که نقطه به معنای "هر کاراکتری" است، اما نه "عدم وجود یک کاراکتر". باید کاراکتری وجود داشته باشد که با آن مطابقت داشته باشد:

```js run
alert( "CS4".match(/CS.4/) ); // null, منطبق نیست زیرا هیچ کاراکتری برای نقطه وجود ندارد
```

### نقطه به معنای واقعی کلمه به عنوان هر کاراکتر با پرچم "s" است.

به طور پیش فرض، یک نقطه با کاراکتر خط جدید `n\` مطابقت ندارد.

برای مثال، عبارت باقاعده `pattern:A.B` با `match:A` و سپس `match:B` با هر کاراکتری بین آنها، به جز خط جدید `n\` مطابقت دارد:

```js run
alert( "A\nB".match(/A.B/) ); // null (مطابقت ندارد)
```

موقعیت‌ های زیادی وجود دارد که می‌ خواهیم یک نقطه به معنای واقعی کلمه "هر کاراکتری" باشد و شامل خط جدید باشد.

این همان کاری است که flag `pattern:s` انجام می دهد. اگر یک regexp، آن را داشته باشد، یک نقطه `.:pattern` به معنای واقعی کلمه با هر کاراکتری مطابقت دارد:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (!مطابقت دارد)
```

````warn header="Not supported in IE"
The `pattern:s` flag is not supported in IE.

Luckily, there's an alternative, that works everywhere. We can use a regexp like `pattern:[\s\S]` to match "any character" (this pattern will be covered in the article <info:regexp-character-sets-and-ranges>).

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
```

The pattern `pattern:[\s\S]` literally says: "a space character OR not a space character". In other words, "anything". We could use another pair of complementary classes, such as `pattern:[\d\D]`, that doesn't matter. Or even the `pattern:[^]` -- as it means match any character except nothing.

Also we can use this trick if we want both kind of "dots" in the same pattern: the actual dot `pattern:.` behaving the regular way ("not including a newline"), and also a way to match "any character" with `pattern:[\s\S]` or alike.
````

````warn header="Pay attention to spaces"
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a hyphen:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Let's fix it adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
```

**A space is a character. Equal in importance with any other character.**

We can't add or remove spaces from a regular expression and expect it to work the same.

In other words, in a regular expression all characters matter, spaces too.
````

## خلاصه

کلاس های کاراکتر زیر وجود دارد:

- `pattern:\d` -- رقمی.
- `pattern:\D` -- غیر رقمی.
- `pattern:\s` -- نمادهای فاصله، تب ها، خطوط جدید.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- حروف لاتین، اعداد، خط زیر `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- هر کاراکتری اگر `regxp` با پرچم `'s'`، در غیر این صورت هر کاراکتری به جز خط جدید `n\`.

...اما این همه ماجرا نیست!

رمزگذاری یونیکد، که توسط جاوا اسکریپت برای رشته ها استفاده می شود، ویژگی های بسیاری را برای کاراکترها فراهم می کند، مانند: حروف به کدام زبان تعلق دارد (اگر حرف باشد)، آیا علامت نقطه گذاری است و غیره.

ما می توانیم بر اساس این ویژگی ها نیز جستجو کنیم. برای این کار باید`pattern:u` را علامت گذاری کنید که در مقاله بعدی پوشش داده شده است.
