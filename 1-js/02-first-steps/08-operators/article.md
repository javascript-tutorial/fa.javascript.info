<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
# عملگرها
=======
# Basic operators, maths
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

ما عملگرهای مختلفی را از زمان مدرسه به خاطر داریم. مانند جمع +، تفریق -، ضرب *، تقسیم و دیگر عملگرها. 

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
در این بخش ما بر روی زوایایی از عملگرها متمرکز می‎شویم که در مدرسه نیاموخته‌ایم.
=======
In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

## اصطلاحات: unary (یونِری) – binary (باینری) – operand (اُپِرند)


پیش از ادامه بیایید مفهوم این اصطلاحات را بفهمیم.

- یک operand – همان چیزی است که عملگرها بر روی آنها اعمال می‌شوند. برای نمونه در ضرب 5 * 2 دو operand داریم. برخی آن را آرگمان (argument) نیز می‌خوانند.

- یک عملگر زمانی unary است که فقط یک operand داشته باشد. برای نمونه unary منفی کننده‌ی – که علامت یک عدد را برعکس می‌کند:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unary negation was applied
    ```
    - یک عملگر زمانی binary است که دو operand داشته باشد. همان عملگر منفی کننده در شکل binary هم وجود دارد:
    
    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus subtracts values
    ```

در اصل در اینجا ما در مورد دو عملگر مجزا صحبت کردیم. اولی عملگر unary منفی کننده (که علامت عدد را برعکس می‌کرد) و دیگری عملگر تفریق binary (تفریق دو عدد از هم).

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
## تلفیق رشته‌ها، عملگر + binary

=======
## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, a remainder of 5 divided by 2
alert( 8 % 3 ); // 2, a remainder of 8 divided by 3
```

### Exponentiation **

The exponentiation operator `a ** b` multiplies `a` by itself `b` times.

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 multiplied by itself 2 times)
alert( 2 ** 3 ); // 8  (2 * 2 * 2, 3 times)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2, 4 times)
```

Mathematically, the exponentiation is defined for non-integer numbers as well. For example, a square root is an exponentiation by `1/2`:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet features of JavaScript operators that are beyond school arithmetics.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

معمولا از عملگر + برای جمع اعداد استفاده می‌شود، اما زمانیکه این عملگر به رشته‌‌‌ها اعمال شود، آنها را ادغام می‌کند.

```js
let s = "my" + "string";
alert(s); // mystring
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
در نظر داشته باشید که اگر یکی از operand ها string باشد، دیگری نیز به string تبدیل می‌شود.
=======
Note that if any of the operands is a string, then the other one is converted to a string too.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

برای نمونه:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
همانطور که می‌بینید مهم نیست که operand ابتدا آمده باشد یا نه، قاعده ساده است: اگر هر کدام از operand ها string بود، دیگری نیز به string تبدیل می‌شود.

با این حال در نظر داشته باشید که عملیات از چپ به راست انجام می‌شود. اگر دو عدد در پیش از یک string آمده باشند، ابتدا آن دو عدد جمع می‌شوند و سپس به string تبدیل می‌شوند:
=======
See, it doesn't matter whether the first operand is a string or the second one.

Here's a more complex example:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
تبدیل و الصاق رشته‌ها یکی از ویژگی‌های خاص عملگر + است. دیگر عملگرهای ریاضیاتی فقط با اعداد کار می‌کنند و همیشه operand خود را به number تبدیل می‌کنند.

برای نمونه:
=======
Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = 41`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## تبدیل به عدد، عملگر unary +


علامت جمع + به دو شکل وجود دارد: به صورت عملگر binary که بالاتر از آن استفاده کردیم و به صورت عملگر unary.

عملگر + که به یک مقدار اعمال می‌شود، هیچ عملی رو اعداد انجام نمی‌دهد. اما اگر operand یک عدد نباشد، عملگر + آن را به عدد تبدیل می‌کند.

برای نمونه:

```js run
// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

در واقع این همان کاریست که `Number(...)` انجام می‌دهد ولی به شکلی کوتاه‌تر.

نیاز به تبدیل رشته‌ به عدد اغلب پیش می‌آید. برای نمونه اگر در حال دریافت مقادیری از اینپوت‌های HTML هستیم معمولا به این موضوع نیاز پیدا می‌کنیم. 

اگر خواستیم آنها را جمع ببندیم چطور؟

عملگر + به صورت رشته‌ای آنها را بهم اضافه می‌کند:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings
```

اگر خواستیم با آنها مانند عدد برخورد کنیم، آنها را به عدد تبدیل کرده و سپس آنها را جمع می‌کنیم:

```js run
let apples = "2";
let oranges = "3";

*!*
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

از دیدگاه یک ریاضی‌دان، تعدد علامت + ممکن است عجیب به نظر برسد، اما از دیدگاه یک برنامه‌نویس اینطور نیست.  unary plusهایی که در ابتدا آمده‌اند رشته‌ها را عدد تبدیل می‌کنند و سپس binary plus اعداد را با هم جمع می‌کند.

چرا unary plus ها پیش از binary plus ها اعمال شدند؟ به این دلیل که اولویت آنها بالاتر است.

## اولویت عملگرها

اگر در یک عبارت بیش از یک عملگر وجود داشته باشد، ترتیب اجرای آنها بر اساس تقدم آنها خواهد بود.

از زمان مدرسه همه ما می‌دانیم که در یک عمل ریاضی مانند 1 + 2 * 2 ابتدا عمل ضرب انجام می‌شود و سپس عمل جمع. این همان اولویت عملگرها است. اینکه عمل ضرب اولویت بالاتری نسبت به جمع دارد.

پرانتزها بر هر اولویتی، اولویت دارند و زمانی‌که از ترتیب قرارگیری عملگرها راضی نیستیم می‌توانیم با پرانتزها این اولویت را تغییر دهیم.

عملگرهای مختلفی در جاوا اسکریپت وجود دارد و هر کدام اولویت مربوط به خود را دارا می‌باشند. در جدول زیر عملگری که عدد بالاتری دارد اولویتش بالاتر است. همینطور اگر دو عملگر عدد یکسانی داشتند اولویت اجرا از چپ به راست (در کد) می‌باشد.


این یک قسمتی از [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) است. (نیاز نیست این جدول را حفظ باشید اما توجه داشته باشید که عملگرهای unary از دودویی‌های مربوطشان بالاتر هستند):

| اولویت | نام | علامت |
|------------|------|------|
| ... | ... | ... |
<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
| 16 | unary جمع | `+` |
| 16 | unary تفریق | `-` |
| 14 | ضرب | `*` |
| 14 | تقسیم | `/` |
| 13 | جمع | `+` |
| 13 | تفریق | `-` |
=======
| 17 | unary plus | `+` |
| 17 | unary negation | `-` |
| 16 | exponentiation | `**` |
| 15 | multiplication | `*` |
| 15 | division | `/` |
| 13 | addition | `+` |
| 13 | subtraction | `-` |
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md
| ... | ... | ... |
| 3 | مقدارده | `=` |
| ... | ... | ... |

همانطور که می‌بینیم unary + اولویت 16 دارد که از binary + با اولویت 13 بالاتر است. به همین دلیل است که در عبارت “+apples + +oranges” علامت‌های unary plus پیش از علامت جمع اجرا می‌شوند.

## مقداردهی

در نظر داشته باشید که مقداردهی با علامت = نیز یک عملگر است. در جدول اولویت‌ها با اولویت پایینی (3) قرار گرفته است.

به همین دلیل است که وقتی متغیری را مقدار دهی می‌کنیم، مانند x = 2 * 2 + 1 ، ابتدا عملیات محاسباتی انجام شده و سپس مقداردهی صورت می‌گیرد. 

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
همینطور زنجیر وار نوشتن مقداردهی ها امکان پذیر است:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

مقداردهی‌های زنجیر وار از سمت راست انجام می‌شوند. یعنی ابتدا 2 + 2 محاسبه می‌شود و در متغیر c سپس b و در آخر در a قرار می‌گیرد. عملا همه متغیرها یک مقدار دارای یک مقدار هستند.

````smart header="عملگر `\"=\"` یک مقدار را باز می‌گرداند"
یک عملگر همیشه مقداری را باز می‌گرداند. این موضوع در مورد عملگری چون جمع + یا ضرب * واضح است، اما برای عملگر = هم چنین قانونی وجود دارد.
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

Most operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

عبارت x = value ابتدا value را در x می‌نویسد و سپس آن را باز می‌گرداند.

در اینجا یک نمونه از مقداردهی به عنوان بخشی از یک عبارت پیچیده‌تر را داریم:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

در مثال بالا، مقدار (a = b + 1) مقداریست که در متغیر a نوشته قرار می‌گیرد (که برابر 3 است). سپس (در ادامه کد) از 3 کم می‌شود.

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
کد جالبی‌ست. ما باید طرز کار آن را یاد بگیریم تا زمانی که در کدهای کتابخانه‌های مختلف با آن روبرو می‌شویم بدانیم که چطور کار می‌کند. ولی نباید به این شکل برنامه‌نویسی کنیم چراکه کدهای ما را ناخوانا می‌کند.
````

## عملگر باقی مانده %


این عملگر بر خلاف ظاهرش، مربوط به درصد نمی‌باشد. 

نتیجه محاسبه‌ی a % b برابر خواهد بود با باقی‌مانده‌ی تقسیم عدد a بر b.

برای نمونه:
=======
Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
## عملگر توان **

این عملگر اخیرا به جاوا اسکریپت اضافه شد. 

برای عدد طبیعی b ، نتیجه محاسبه a ** b برابر خواهد بود با به تعداد b عدد a ضرب در خودش می‌شود.

برای نمونه:
=======
Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:

```js
c = 2 + 2;
b = c;
a = c;
```
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
این عملگر برای اعداد غیر صحیح نیز کار می‌کند.

برای نمونه:
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## عملگر افزایش/کاهش 


<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

این عملگرها جزو رایج‌ترین نمونه‌های موجود در کار با اعداد هستند.

بنابراین عملگرهای خاصی برای این موضوع وجود دارند:

- افزایش ++ که یک واحد به عدد اضافه می‌کند:


    ```js run no-beautify
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- کاهش -- که یک واحد از عدد کم می‌کند:

    ```js run no-beautify
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
    ```

```warn
این عملگرها فقط بر روی اعداد کار می‌کنند و برای نمونه 5++ با خطا مواجه خواهد شد.
```

عملگرهای ++ و – می‌توانند پیش و پس از متغیر قرار گیرند.

- وقتی پس از متغیر قرار بگیرد حالت پسوندی دارد counter++

- وقتی پیش از متغیر قرار گیرد حالت پیشوندی دارد ++counter


هردو گزاره، کار یکسانی می‌کنند. counter را یکی اضافه می‌کنند.

آیا تفاوتی بین آنها وجود دارد؟ بله، اما فقط با مشاهده‌ی مقدار باز گردانده شده از آن، می‌توانیم این تفاوت را دریابیم.

حالت پیشوندی مقدار جدید را باز می‌گرداند درحالیکه حالت پسوندی مقدار قبلی را باز می‌گرداند.

برای نمونه:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

در خط `(*)` حالت پیشوندی ++counter متغیر counter را یک واحد افزایش می‌دهد و مقدار 2 را باز می‌گرداند. در نتیجه alert مقدار 2 را نمایش می‌دهد:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

در خط `(*)‍` حالت پسوندی counter++ مقدار counter را یک واحد افزایش می‌دهد ولی مقدار قبلی این متغیر را باز می‌گرداند. در نتیجه alert مقدار 1 را نمایش می‌دهد.

در نتیجه:

- اگر مقدار بازگشتی از عملگرهای ++ و – مورد استفاده قرار نگیرد، تفاوتی در استفاده از آنها وجود ندارد:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
    - اگر می‌خواهیم مقداری را افزایش داده و بلافاصله از نتیجه عملگر استفاده نماییم، باید از حالت پیشوندی استفاده کنیم:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
    - اگر می‌خواهیم مقداری را افزایش داده و از مقدار قبلی آن استفاده نماییم باید از حالت پسوندی استفاده کنیم:
    
    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="عملگرهای افزایش و کاهش در بین دیگر عملگرها"
عملگرهای ++ و – در عبارات (expressions) قابل استفاده هستند. اولویت آنها از اکثر عملگرهای ریاضیاتی بالاتر است.

برای نمونه:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

در مقایسه با:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

با اینکه از نظر فنی مشکلی ندارد ولی چنین روشی خوانایی کد را کاهش می‌دهد. اینکه یک خط کارهای مختلفی انجام می‌دهد مناسب نیست.

در هنگام خواندن کدها، چشم به صورت عمودی و با سرعت کدها را می‌خوانند و چیزی مانند counter++ و افزایش مقدار counter به سادگی از چشم پنهان می‌ماند.

ما پیشنهاد می‌کنیم هر عمل را در یک خط بنویسید:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## عملگرهای بیتی

عملگرهای بیتی با آرگومان‌ها به شکل اعداد صحیح ۳۲ بیتی رفتار میکنند و در سطح نمایش دودویی با آنها کار میکنند. 

این عملگرها فقط برای جاوا اسکریپت نیستند و در اکثر زبان‌های برنامه نویسی پشتیبانی می‌شوند.

لیست عملگرها:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

<<<<<<< HEAD:1-js/02-first-steps/07-operators/article.md
این عملگرها به ندرت استفاده می‌شوند. برای درک آنها، باید به سطح زبان سیستم در نمایش اعداد برویم و اصلا این کار، کار بهینه‌ای در حال حاضر نیست و حتی به آنها هم در آینده‌ی نزدیک نیاز نداریم. اگر علاقه‌مند هستید میتوانید [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) را بخوانید. خیلی منطقی‌تر است که وقتی واقعا به آن نیازمند هستید آن را استفاده کنید. 
## تغییر در همان محل

ما اغلب نیاز داریم تا یک عملگر را روی متغیری اعمال کنیم و مقدار جدید را در همان متغیر ذخیره کنیم.

به عنوان مثال:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

عملگرها میتوانند به شکل خلاصه `*=` و `+=` نوشته شوند:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

این سبک عملگرها برای تمامی عملگرهای بیتی و ریاضی وجود دارند: `/=`، `-=` و غیره.

این عملگرها اولویت یکسانی با بقیه انواع مقداردهی‌ها دارند بنابراین بعد اکثر محاسبات اجرا می‌شوند:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```
=======
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN when a need arises.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/08-operators/article.md

## کاما

عملگر `,` یکی از نادرترین و غیرمعمول ترین عملگر‌هاست. بعضی اوقات، برای نوشتن کد کوتاه‌تر است پس ما نیاز داریم که متوجه بشویم که چه اتفاقی در حال رخ دادن است.

این عملگر به ما اجازه ارزیابی برخی عبارت را می‌دهد که با یک کاما از یکدیگر جدا می‌شوند. هر کدام از آنها هم محاسبه و ارزیابی می‌شود اما تنها جواب آخری برگردانده می‌شود.

به عنوان مثال:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```


اولین عبارت ۱ +‌ ۲ محاسبه می‌شود و جوابش دور ریخته می‌شود. سپس، ۳ + ۴ محاسبه می‌شود و به عنوان جواب بازگردانده می‌شود.
```smart header="کاما اولیویت بسیار کمی دارد"

توجه داشته باشید که عملگر کاما اولویت بسیار کمی دارد، کمتر از `=`، بنابراین پرانتزها در مثال بالا مهم هستند.

بدون آنها: `a = 1 + 2, 3 + 4` اول عملگر جمع را محاسبه می‌کند، یعنی نتیجه می‌شود `a = 3, 7`، سپس عملگر `=` باعث می‌شود که `a = 3` و در نهایت عدد بعد از کاما، یعنی هفت، پردازش نمی‌شود. 
```

چرا عملگری نیاز داریم که هرچیزی را به جز قسمت آخر دور میریزد؟

بعضی اوقات، در ساختارهای پیچیده برای انجام عمل‌های متعددی در یک خط استفاده می‌شود.

برای نمونه:

```js
// سه عملگر در یک خط
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

چنین عملیاتی در frameworkهای جاوا اسکریپت خیلی استفاده می‌شوند. به همین علت است که آنهارا توضیح داد. اما عموما، خوانایی کد را بهبود نمی‌بخشند بنابراین قبل از استفاده کردن آنها باید فکر کنیم.
