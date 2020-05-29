# تبدیل نوع داده 

بیشتر مواقع عملگرها و فانکشن‌ها به طور خودکار مقادیری که آنها داده می‌شود را به نوع صحیح تبدیل می‌کنند. به این عمل "تبدیل نوع داده" گفته می‌شود.

برای نمونه فانکشن `alert` مقدار ورودی خود را به نوع داده‌ی string تبدیل می‌کند. عملگرهای ریاضیاتی مقادیر را به نوع number تبدیل می‌کنند.

همینطور شرایطی وجود دارد که ما نیاز داریم مقدار را به نوع مورد نظرمان تبدیل کنیم.

<<<<<<< HEAD:1-js/02-first-steps/06-type-conversions/article.md

```smart header="هنوز در مورد object ها صحبت نکرده‌ایم"
در این بخش در مورد object ها صحبت نمی‌کنیم. بجای آن ابتدا انواع اولیه را خواهیم آموخت. بعدتر زمانی که در مورد object ها آموختیم، در مورد چگونگی تبدیل object ها صحبت خواهیم کرد.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now we'll just be talking about primitives.

Later, after we learn about objects, in the chapter <info:object-toprimitive> we'll see how objects fit in.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/07-type-conversions/article.md
```

## تبدیل به string

تبدیل به string زمانی رخ می‌دهد که ما به بخش رشته کاراکترهای یک مقدار نیاز داریم.

برای نمونه `alert(value)` تبدیل به string را برای نمایش، انجام می‌دهد.

همینطور می‌توانیم با صدا زدن `String(value)` تبدیل یک مقدار به string را انجام دهیم.


```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // now value is a string "true"
alert(typeof value); // string
*/!*
```

تبدیل به string عموما واضح است. `false` به `"false"` ، `null` به `"null"` و برای بقیه مقادیر هم به همین ترتیب انجام می‌شود.

## تبدیل به number

تبدیل به number در فانکشن‌ها و عبارات ریاضیاتی به طور خودکار انجام می‌شود.

برای نمونه وقتی تقسیم `/` بر روی مقادیر غیر عددی رخ می‌دهد :


```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```

برای تبدیل یک مقدار به عدد بطور مشخص، می‌توانیم از فانکشن `Number(value)` استفاده کنیم.

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number
```

معمولا زمانی که مقداری را از یک منبع متنی (string based) مانند input های فرم دریافت می‌کنیم، در حالیکه نیاز به ورود مقدار عدد داشته‌ایم، باید آن مقدار را بطور مشخص به عدد تبدیل کنیم.

اگر نتیجه عدد معتبری نبود، نتیجه تبدیل `NaN` خواهد بود.


```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

قواعد تبدیل به number :

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | فاصله‌های خالی ابتدا و انتها حذف می‌شوند. اگر رشته‌ی باقی مانده خالی باشد نتیجه `0` خواهد بود. در غیر اینصورت عدد موجود در رشته کاراکترها خوانده خواهد شد. همینطور اگر خطایی رخ دهد نتیجه `NaN` خواهد بود. |

Examples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

لطفا در نظر داشته باشید که `null` و `undefined` در اینجا متفاوت عمل می‌کنند. `Null` به `0` تبدیل می‌شود و `undefined` به `NaN` تبدیل می‌شود.

````smart header="عملگر '+' رشته‌ها را بهم می‌چسباند"
تقریبا همه‌ی عملگرهای ریاضیاتی، مقادیر را به عدد (number) تبدیل می‌کنند. تنها یک استثنا وجود دارد و آن `+` است. اگر یکی از مقادیر string باشد، بقیه مقادیر نیز به string تبدیل می‌شوند.

سپس string ها را بهم  می‌چسباند:


```js run
alert( 1 + '2' ); // '12' (string to the right)
alert( '1' + 2 ); // '12' (string to the left)
```

این مورد فقط زمانی روی میدهد که حداقل یکی از مقادیر string باشد، در غیر اینصورت تمام مقادیر به number تبدیل می‌شوند.
````

## تبدیل به boolean

تبدیل به boolean آسان‌ترین حالت است.

این مورد در عملیات منطقی (مانند عبارات شرطی که با آنها در بخش‌های بعدی آشنا خواهیم شد) رخ می‌دهد. همینطور به صورت مشخص نیز می‌توان با فانکشن `Boolean(value)` اینکار را انجام داد.

قاعده تبدیل :

- مقادیری که در ظاهر "خالی" هستند، مانند `0` ، `string` خالی ، `null` ، `undefined` و `NaN` به `false` تبدیل می‌شوند.
- بقیه مقادیر به `true` تبدیل می‌شوند.

برای نمونه :


```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="توجه داشته باشید که string حاوی 0 یعنی `0` برابر با `true` خواهد بود"
برخی زبان‌ها (مانند PHP) با `"0"` به عنوان `false` برخورد می‌کنند. اما در جاوا اسکریپت هر string ـی که خالی نباشد `true` خواهد بود.
```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)
```
````


## خلاصه

سه نوع تبدیل نوع داده، که بطور گسترده مورد استفاده قرار می‌گیرد، تبدیل به string ، تبدیل به number و تبدیل به boolean است.

**`تبدیل به string`** - زمانی که می‌خواهیم خروجی‌ای داشته باشم رخ می‌دهد. از طریق `String(value)` قابل انجام است. تبدیل به string معمولا وقتی مقدار از انواع اولیه داده است، واضح خواهد بود.

**`تبدیل به number`** – در عملگرهای ریاضیاتی رخ می‌دهد. از طریق `Number(value)` قابل انجام است.

این تبدیل از این قوانین پیروی می‌کند :


| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | فاصله‌های خالی ابتدا و انتها حذف می‌شوند. اگر رشته‌ی باقی مانده خالی باشد نتیجه `0` خواهد بود. در غیر اینصورت عدد موجود در رشته کاراکترها خوانده خواهد شد. همینطور اگر خطایی رخ دهد نتیجه `NaN` خواهد بود. |

**`تبدیل به boolean`** – در عملگرهای  منطقی رخ می‌دهد. از طریق `Boolean(value)` قابل انجام است.

این تبدیل از این قوانین پیروی می‌کند :


| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|any other value| `true` |

اکثر این قوانین آسان بوده و ساده به خاطر می‌مانند. استثناهایی که معمولا در آن اشتباه می‌کنیم :

- `undefined` به عنوان number برابر `NaN` خواهد بود و `0` نخواهد بود.

- `"0"` و string حاوی جای خالی `"  "` به عنوان `boolean` برابر true خواهند بود.

در اینجا در مورد تبدیل object ها صحبت نکردیم و در بخش‌های بعدی به آنها خواهیم پرداخت. 

