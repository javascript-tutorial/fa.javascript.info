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

### Default values

If the array is shorter than the list of variables at the left, there'll be no errors. Absent values are considered undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

If we want a "default" value to replace the missing one, we can provide it using `=`:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

Default values can be more complex expressions or even function calls. They are evaluated only if the value is not provided.

For instance, here we use the `prompt` function for two defaults:

```js run
// runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```

Please note: the `prompt` will run only for the missing value (`surname`).

## Object destructuring

The destructuring assignment also works with objects.

The basic syntax is:

```js
let {var1, var2} = {var1:…, var2:…}
```

We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.

For instance:

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

Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables. 

The order does not matter. This works too:

```js
// changed the order in let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

The pattern on the left side may be more complex and specify the mapping between properties and variables.

If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:

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

The colon shows "what : goes where". In the example above the property `width` goes to `w`, property `height` goes to `h`, and `title` is assigned to the same name.

For potentially missing properties we can set default values using `"="`, like this:

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

Just like with arrays or function parameters, default values can be any expressions or even function calls. They will be evaluated if the value is not provided.

In the code below `prompt` asks for `width`, but not for `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (whatever the result of prompt is)
```

We also can combine both the colon and equality:

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

If we have a complex object with many properties, we can extract only what we need:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// only extract title as a variable
let { title } = options;

alert(title); // Menu
```

### The rest pattern "..."

What if the object has more properties than we have variables? Can we take some and then assign the "rest" somewhere?

We can use the rest pattern, just like we did with arrays. It's not supported by some older browsers (IE, use Babel to polyfill it), but works in modern ones.

It looks like this:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Gotcha if there's no `let`"
In the examples above variables were declared right in the assignment: `let {…} = {…}`. Of course, we could use existing variables too, without `let`. But there's a catch.

This won't work:
```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

The problem is that JavaScript treats `{...}` in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

So here JavaScript assumes that we have a code block, that's why there's an error. We want destructuring instead.

To show JavaScript that it's not a code block, we can wrap the expression in parentheses `(...)`:

```js run
let title, width, height;

// okay now
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
