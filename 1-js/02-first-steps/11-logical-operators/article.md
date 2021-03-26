# عملگر های منطقی

چهار عملگر منطقی در جاوااسکریپت وجود دارد: `||` (OR)، `&&` (AND)، `!` (NOT)، `??` (Nullish Coalescing). اینجا ما سه تای اول را پوشش می دهیم، عملگر `??` در مقاله بعدی است.

با اینکه آنها "منطقی" نام برده می شوند، آنها می توانند روی هر نوع مقداری اعمال شوند، نه فقط نوع boolean. نتیجه آنها هم می تواند از هر نوعی باشد.

بیایید جزییات را ببینیم.

## || (OR یا)

عملگر "OR(یا)" با نماد دو خط عمود نمایش داده می شود:

```js
result = a || b;
```

در برنامه نویسی کلاسیک، عملگر منطقی OR تنها با مقدارهای boolean کار می کرد. اگر هر کدام از آرگومان های آن `true` باشد، `ture` بر می گرداند، در غیر این صورت `false` بر می گرداند.

در جاوااسکریپت، این عملگر مقداری فوت و فن و قدرت بیشتری دارد. اما اول، بیایید ببینیم با مقدارهای boolean چه اتفاقی می افتد.

چهار ترکیب احتمالی منطقی وجود دارد:

```js run
alert( true || true );   // true درست
alert( false || true );  // true درست
alert( true || false );  // true درست
alert( false || false ); // false اشتباه
```

همانطور که می بینیم، نتیجه همیشه `true` است به جز موقعی که هر دو عملوند `false` باشند.

اگر یک عملوند boolean نباشد، برای ارزیابی به boolean تبدیل می شود.

برای مثال، با عدد `1` مانند `true` رفتار می شود، با عدد `0` مانند `false`:

```js run
if (1 || 0) { // همانند if( true || false ) کار میکند
  alert( 'truthy!' );
}
```

اکثر اوقات، OR `||` به عنوان یک دستور `if` استفاده می شود تا بررسی شود که آیا *هر کدام* از شرط های داده شده `true` هست یا نه.

برای مثال:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'اداره بسته است.' );
}
```

ما می توانیم شرط های بیشتری قرار بدهیم:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // آخر هفته است
}
```

## OR "||" اولین مقدار truthy را پیدا می کند [#or-finds-the-first-truthy-value]

منطقی که بالا توصیف شد تا حدی کلاسیک است. الان، بیایید وارد ویژگی های "اضافه" جاوااسکریپت شویم.

الگوریتم قابل تعمیم به صورت زیر عمل می کند.

چند مقدار همراه با OR وارد می کنیم:

```js
result = value1 || value2 || value3;
```

عملگر OR `||` مراحل پایین را انجام می دهد:

- عملوند ها را از چپ به راست ارزیابی می کند.
- هر عملوند را، تبدیل به boolean می کند. اگر نتیجه `true` باشد، متوقف می شود و مقدار اصلی عملوند را بر می گرداند.
- اگر تمام عملوند ها ارزیابی شدند (یعنی تمام آنها `false` بودند)، عملوند آخر را بر می گرداند.

هر مقدار با شکل اصلی خود و بدون تبدیل بر گردانده می شود.

به عبارتی دیگر، یک زنجیره از OR `||` اولین مقدار truthy یا در صورتی که هیج مقدار truthy پیدا نشود آخرین مقدار را بر می گرداند.

برای مثال:

```js run
alert( 1 || 0 ); // 1 (1 truthy است)

alert( null || 1 ); // 1 (1 اولین مقدار truthy است)
alert( null || 0 || 1 ); // 1 (اولین مقدار truthy)

alert( undefined || null || 0 ); // 0 (همه falsy هستند، آخرین مقدار را بر می گرداند)
```

این باعث چند استفاده جالب نسبت به "OR خالص، کلاسیک، فقط-boolean" می شود.

1. **گرفتن اولین مقدار truthy از یک لیست متغیرها یا عبارت ها.**

    برای مثال، ما متغیر های `firstName`، `lastName` و `nickName` داریم، همه آنها اختیاری هستند (یعنی می توانند undefined یا مقدارهای falsy داشته باشند).

    بیایید با استفاده از OR `||` متغیری که دارای داده است را انتخاب کنیم و آن را نمایش دهیم (یا اگر چیزی تنظیم نشده باشد `Anonymous` را):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

    اگر تمام متغیرها falsy بودند، `"Anonymous"` نمایش داده می شد.

2. **ارزیابی گردش کوتاه.**

    یکی دیگر از ویژگی های اپراتور OR `||` به اصطلاح ارزیابی "گردش کوتاه" است.

    یعنی اینکه `||` روی آرگومان های خودش پردازش انجام می دهد تا زمانی که به اولین مقدار truthy برسد، و سپس آن مقدار بلافاصله بر گردانده می شود، بدون اینکه به بقیه آرگومان ها کاری داشته باشد.

    اهمیت این ویژگی زمانی آشکار می شود که یک عملوند فقط یک مقدار ساده نباشد، بلکه یک عبارت با یک اثر جانبی باشد، مثل تخصیص متغیر یا صدا زدن تابع.

    در مثال پایین، فقط پیام دوم چاپ می شود:

    ```js run no-beautify
    *!*true*/!* || alert("چاپ نمی شود");
    *!*false*/!* || alert("چاپ می شود");
    ```

    در خط اول، عملگر OR `||` به محض دیدن `true` ارزیابی را بلافاصله متوقف می کند، پس `alert` اجرا نمی شود.

    بعضی اوقات، افراد از این ویژگی استفاده می کنند تا دستوراتی را فقط اگر شرط سمت چپ falsy باشد اجرا کنند.

## && (AND)

The AND operator is represented with two ampersands `&&`:

```js
result = a && b;
```

In classical programming, AND returns `true` if both operands are truthy and `false` otherwise:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

An example with `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

Just as with OR, any value is allowed as an operand of AND:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND "&&" finds the first falsy value

Given multiple AND'ed values:

```js
result = value1 && value2 && value3;
```

The AND `&&` operator does the following:

- Evaluates operands from left to right.
- For each operand, converts it to a boolean. If the result is `false`, stops and returns the original value of that operand.
- If all operands have been evaluated (i.e. all were truthy), returns the last operand.

In other words, AND returns the first falsy value or the last value if none were found.

The rules above are similar to OR. The difference is that AND returns the first *falsy* value while OR returns the first *truthy* one.

Examples:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

We can also pass several values in a row. See how the first falsy one is returned:

```js run
alert( 1 && 2 && null && 3 ); // null
```

When all values are truthy, the last value is returned:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
The precedence of AND `&&` operator is higher than OR `||`.

So the code `a && b || c && d` is essentially the same as if the `&&` expressions were in parentheses: `(a && b) || (c && d)`.
````

````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".

For instance:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

The action in the right part of `&&` would execute only if the evaluation reaches it. That is, only if `(x > 0)` is true.

So we basically have an analogue for:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
````


## ! (NOT)

The boolean NOT operator is represented with an exclamation sign `!`.

The syntax is pretty simple:

```js
result = !value;
```

The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: `true/false`.
2. Returns the inverse value.

For instance:

```js run
alert( !true ); // false
alert( !0 ); // true
```

A double NOT `!!` is sometimes used for converting a value to boolean type:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

There's a little more verbose way to do the same thing -- a built-in `Boolean` function:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

The precedence of NOT `!` is the highest of all logical operators, so it always executes first, before `&&` or `||`.
