# مقداردهیِ تجزیه‌کننده‌ی ساختار

دو ساختار داده پر استفاده در جاوااسکریپت `Object` و `Array` هستند.

- شیءها به ما این امکان را می‌دهند تا چیزی بسازیم که المان‌های داده را به واسطه کلید ذخیره کند.
- آرایه‌ها به ما امکان جمع‌آوری المان‌های داده را در لیستی مرتب می‌دهند.

اگرچه، زمانی که ما آنها را به تابع می‌دهیم، ممکن است که نیازی به کل یک شیء/آرایه نباشد. ممکن است تنها قطعه‌های تکی نیاز باشد.
 
*مقداردهیِ تجزیه‌کننده‌ی ساختار (Destructuring assignment)* یک سینتکس خاص است که به ما امکان می‌دهد تا آرایه‌ها یا شیءها را درون چند متغیر «پخش کنیم» چون بعضی اوقات این موضوع کار را راحت‌تر می‌کند.

تخریب ساختار همچنین با تابع‌های پیچیده که تعداد زیادی پارامتر، مقدارهای پیش‌فرض و... دارند هم به خوبی کار می‌کند. به زودی آن را خواهیم دید.

## تجزیه ساختار آرایه

کد پایین یک مثال از چگونگی تبدیل یک آرایه به چند متغیر است:

```js
// ما یک آرایه شامل نام و نام خانوادگی داریم
let arr = ["John", "Smith"]

*!*
// مقداردهی تجزیه‌کننده‌ی ساختار
// را قرار می‌دهد firstName = arr[0]
// surname = arr[1] و
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

حالا ما می‌توانیم به جای اعداد آرایه با متغیرها کار کنیم.

زمانی که با `split` یا متدهای دیگری که آرایه برمی‌گردانند عالی بنظر می‌رسد:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

همانطور که می‌بینید، سینتکس ساده است. البته چند چیز ویژه در جزییات خود دارد. بیایید برای فهمیدن بهتر آن، مثال‌های بیشتری ببینیم.

````smart header="عبارت «تجزیه‌کننده‌ی ساختار» به معنی «مخرب» نیست."
این سینتکس «مقداردهی تجزیه‌کننده‌ی ساختار» نامیده می‌شود چون با کپی کردن المان‌ها در چند متغیر «ساختار را تغییر می‌دهد». اما خود آرایه تغییر نمی‌کند.

فقط یک راه کوتاه‌تر برای نوشتن است:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="از طریق استفاده از کاما المان‌ها را نادیده بگیرید"
المان‌هایی که که نمی‌خواهیم را می‌توان با یک کامای اضافه دور انداخت:

```js run
*!*
// به المان دوم نیاز نداریم
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

در کد بالا، از المان دوم آرایه گذشتیم، المان سوم به `title` تخصیص داده شد و بقیه المان‌های آرایه هم نادیده گرفته شدند (به دلیل اینکه متغیری برای ذخیره آنها وجود ندارد).
````

````smart header="با هر حلقه‌پذیری در سمت راست کار می‌کند"

...در واقع، ما می‌توانیم آن را با هر حلقه‌پذیری استفاده کنیم، نه فقط آرایه‌ها:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
این کار می‌کند چون از درون، یک مقداردهی تجزیه‌کننده‌ی ساختار با حلقه زدن در مقدار سمت راست کار می‌کند. برای فراخوانی `for..of` در مقدار سمت راست `=` و تخصیص دادن مقدارها، به نوعی خوش سینتکس است.
````


````smart header="در سمت چپ به هر چیزی تخصیص دهید"
ما می‌توانیم از «قابل مقداردهی‌ها» در سمت چپ استفاده کنیم.

برای مثال، یک ویژگی شیء:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="حلقه زدن با .entries()"
در فصل قبل ما متد [Object.entries(obj)](mdn:js/Object/entries) را دیدیم.

می‌توانیم آن را با تجزیه‌کننده‌ی ساختار برای حلقه زدن در کلیدها و مقدارهای یک شیء استفاده کنیم:

```js run
let user = {
  name: "John",
  age: 30
};

// حلقه زدن در کلیدها و مقدارها
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

کد مشابه برای `Map` ساده‌تر است چون حلقه‌پذیر است:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// حلقه می‌سازد، برای تجزیه‌کننده‌ی ساختار بسیار مناسب است [key, value] با جفت‌های Map
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // age:30 سپس name:John
}
```
````

````smart header="ترفند مبادله متغیرها"
یک ترفند معروف برای مبادله مقدارهای دو متغیر با استفاده از مقداردهی تجزیه‌کننده‌ی ساختار وجود دارد:

```js run
let guest = "Jane";
let admin = "Pete";

// guest=Pete، admin=Jane بیایید مقدارها را مبادله کنیم: کاری کنیم که
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (!با موفقیت مبادله شد)
```

اینجا ما یک آرایه موقتی از دو آرایه می‌سازیم و بلافاصله ساختار آن را نسبت به ترتیب مبادله تجزیه می‌کنیم.

می‌توانیم از این راه بیشتر از دو متغیر را مبادله کنیم.
````

### رِست '...'

معمولا، اگر آرایه طولانی‌تر از لیست سمت چپ باشد، المان‌های «اضافی» از قلم می‌افتند.

برای مثال، اینجا فقط دو المان دریافت می‌شود و بقیه نادیده گرفته می‌شوند:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// المان‌های بعدی جایی ذخیره نمی‌شوند
```

اگر بخواهیم تمام المان‌های بعدی را دریافت کنیم -- می‌توانیم یک پارامتر دیگر اضافه کنیم که با استفاده از `"..."` «بقیه المان‌ها» را دریافت کند:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// آرایه‌ای از المان‌ها است که از المان سوم شروع می‌شود rest
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```
 
مقدار `rest` آرایه‌ای از المان‌های باقی مانده است.

می‌توانیم از هر اسم دیگری به جای `rest` برای متغیر استفاده کنیم، فقط مطمئن شوید که قبل از آن سه نقطه وجود دارد و در انتهای مقداردهی تجزیه‌کننده‌ی ساختار قرار می‌گیرد.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// titles = ["Consul", "of the Roman Republic"] حالا داریم
```

### مقدارهای پیش‌فرض

اگر آرایه از لیست متغیرهای سمت چپ کوتاه‌تر باشد، هیچ اروری ایجاد نمی‌شود. مقدارهای ناموجود undefined در نظر گرفته می‌شوند:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

ما یک مقدار «پیش‌فرض» بخواهیم که جایگزین مقدار ناموجود شود، می‌توانیم با استفاده از `=` آن را فراهم کنیم:

```js run
*!*
// مقدارهای پیش‌فرض
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (از آرایه)
alert(surname); // Anonymous (مقدار پیش‌فرض استفاده شد)
```

مقدارهای پیش‌فرض می‌توانند عبارات پیچیده‌تر یا حتی فراخوانی تابع باشند. آنها فقط زمانی که مقدار وجود نداشته باشد ارزیابی می‌شوند.

برای مثال، اینجا ما از تابع `prompt` برای دو مقدار پیش‌فرض استفاده کردیم:

```js run
// اجرا می‌شود prompt تابع suname فقط برای
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (از آرایه)
alert(surname); // دریافت کند prompt هر چیزی که
```

لطفا در نظر داشته باشید: `prompt` فقط برای مقدار ناموجود (`surname`) اجرا می‌شود.

## تجزیه ساختار شیء

مقداردهی تجزیه‌کننده‌ی ساختار با شیءها هم کار می‌کند.

سینتکس ساده آن اینگونه است:

```js
let {var1, var2} = {var1:…, var2:…}
```

ما باید یک شیء موجود که می‌خواهیم آن را در چند متغیر پخش کنیم در سمت راست داشته باشیم. سمت چپ شامل یک «الگوی» شیء مانند برای ویژگی‌های متناظر می‌شود. در ساده‌ترین حالت، یک لیست از اسم‌های متغیر در `{...}` است.

برای مثال:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```
 
ویژگی‌های `options.title`، `options.width` و `options.height` به متغیرهای متناظر تخصیص داده شده‌اند.

ترتیب مهم نیست. اینگونه هم کار می‌کند:

```js
// تغییر دادیم let {...} ترتیب را در
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

الگوی سمت راست ممکن است پیچیده‌تر باشد و رابطه بین ویژگی‌ها و متغیرها را تعیین کند.

اگر ما بخواهیم که یک ویژگی را به یک متغیر با نامی دیگر تخصیص بدهیم، برای مثل، کاری کنیم که `options.width` در متغیری به نام `w` ذخیره شود، می‌توانیم اسم متغیر یا با استفاده از دو نقطه تنظیم کنیم:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

دو نقطه نشان می‌دهد که «چه چیزی : کجا ذخیره می‌شود». در مثال بالا ویژگی `width` درون `w`، ویژگی `height` درون `h` ذخیره و `title` به اسمی مشابه با خودش تخصیص داده می‌شود.

برای ویژگی‌هایی که ممکن است موجود نباشند ما می‌توانیم با استفاده از `"="` مقدار پیش‌فرض قرار دهیم، مثلا اینگونه:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

درست مانند آرایه‌ها یا پارامترهای تابع، مقدارهای پیش‌فرض می‌توانند هر عبارتی یا حتی فراخوانی تابع باشند. اگر مقدار موجود نباشد، آنها ارزیابی می‌شوند.

در کد زیر `prompt` برای `width` درخواست می‌کند اما برای `title` نه:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (باشد prompt هر چیزی که نتیجه)
```

همچنین ما می‌توانیم دو نقطه و برابر قرار دادن را با هم ترکیب کنیم:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

اگر ما یک شیء پیچیده با تعداد زیادی ویژگی داشته باشیم، می‌توانیم فقط چیزی که نیاز داریم را استخراج کنیم:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// را به عنوان متغیر استخراج کنید title فقط
let { title } = options;

alert(title); // Menu
```

### الگوی رست "..."

اگر شیء بیشتر از تعدادی که ما متغیر داریم ویژگی داشته باشد چه اتفاقی می‌افتد؟ آیا می‌توانیم بعضی از آنها را دریافت کنیم و «بقیه» را جایی دیگر ذخیره کنیم؟

می‌توانیم از الگوری رست استفاده کنیم، درست همانطور که با آرایه‌ها این کار را کردیم. این کار توسط بعضی از مرورگرهای قدیمی پشتیبانی نمی‌شود (IE، از Babel برای رفع این مشکل استفاده کنید) اما در مرورگرهای جدید کار می‌کند.

اینگونه بنظر می‌رسد:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = title ویژگی‌ای به اسم 
// rest = شیءای شامل بقیه ویژگی‌ها
let {title, ...rest} = options;
*/!*

// title="Menu" ،rest={height: 200, width: 100} حالا داریم
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="اگر `let` وجود نداشته باشد گرفتار می‌شویم"
در مثال‌های بالا متغیرها دقیقا درون مقداردهی تعریف شدند: `let {…} = {…}`. قطعا ما می‌توانستیم بدون `let`، از متغیرهای موجود هم استفاده کنیم. اما یک مشکل وجود دارد.

این کار نمی‌کند:
```js run
let title, width, height;

// در این خط ارور می‌گیریم
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

مشکل اینجاست که جاوااسکریپت در کد اصلی (نه درون یک عبارت دیگر) با `{...}` به عنوان یک بلوک کد رفتار می‌کند. چنین بلوک‌های کدی می‌توانند برای گروه‌بندی دستورات استفاده شوند، مثلا اینگونه:

```js run
{
  // یک بلوک کد
  let message = "سلام";
  // ...
  alert( message );
}
```

پس اینجا جاوااسکریپت فرض می‌کند که ما یک بلوک کد داریم و به همین دلیل است که ارور ایجاد می‌شود. به جای آن ما تجزیه ساختار می‌خواهیم.

برای اینکه به جاوااسکریپت نشان دهیم که این یک بلوک کد نیست، می‌توانیم عبارت را درون پرانتز `(...)` قرار دهیم:

```js run
let title, width, height;

// الان مناسب است
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Nested destructuring

If an object or an array contain other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern at the left side of the assignment has the same structure to extract values from them:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true   
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

All properties of `options` object except `extra` that is absent in the left part, are assigned to corresponding variables:

![](destructuring-complex.svg)

Finally, we have `width`, `height`, `item1`, `item2` and `title` from the default value.

Note that there are no variables for `size` and `items`, as we take their content instead.

## Smart function parameters

There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.

Here's a bad way to write such function:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

In real-life, the problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.

Like this?

```js
// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

That's ugly. And becomes unreadable when we deal with more parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into variables:

```js run
// we pass object to function
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...and it immediately expands it to variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

We can also use more complex destructuring with nested objects and colon mappings:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

The full syntax is the same as for a destructuring assignment:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

Then, for an object of parameters, there will be a variable `varName` for property `incomingProperty`, with `defaultValue` by default.

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:

```js
showMenu({}); // ok, all values are default

showMenu(); // this would give an error
```

We can fix this by making `{}` the default value for the whole object of parameters:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

In the code above, the whole arguments object is `{}` by default, so there's always something to destructurize.

## Summary

- Destructuring assignment allows for instantly mapping an object or array onto many variables.
- The full object syntax:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    This means that property `prop` should go into the variable `varName` and, if no such property exists, then the `default` value should be used.

    Object properties that have no mapping are copied to the `rest` object.

- The full array syntax:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    The first item goes to `item1`; the second goes into `item2`, all the rest makes the array `rest`.

- It's possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.
