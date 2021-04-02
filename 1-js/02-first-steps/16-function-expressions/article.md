# Function expressions

در جاوااسکریپت، تابع یک "ساختار جادویی زبان" نیست، بلکه یک نوع خاصی از مقدار است.

سینتکسی که ما قبلا استفاده کردیم یک *Function Declaration* نامیده می‌شود:

```js
function sayHi() {
  alert( "سلام" );
}
```

یک سینتکس دیگر هم برای ساخت تابع وجود دارد که *Function Expression* نامیده می‌شود.

اینطور به نظر می‌رسد:

```js
let sayHi = function() {
  alert( "سلام" );
};
```

اینجا، تابع ساخته شده و مثل هر مقدار دیگری، صراحتا به متغیر تخصیص داده شده است. فرقی ندارد که تابع چگونه تعریف شده، تابع فقط یک مقدار است که داخل متغیر `sayHi` ذخیره شده است.

معنی این مثال‌های کد یکسان است: "یک تابع بساز و آن را داخل متغیر `sayHi` بگذار".

ما حتی می‌توانیم آن مقدار را با استفاده از `alert` چاپ کنیم:

```js run
function sayHi() {
  alert( "سلام" );
}

*!*
alert( sayHi ); // کد تابع را نشان می‌دهد
*/!*
```

لطفا در نظر داشته باشید که آخرین خط تابع را اجرا نمی‌کند، چون هیچ پرانتزی بعد از `sayHi` وجود ندارد. زبان‌های برنامه نویسی‌ای وجود دارند که هر اشاره‌ای به اسم تابع سبب اجرا شدن آن می‌شود، اما جاوااسکریپت اینطور نیست.

در جاوااسکریپت، تابع یک مقدار است، پس ما می‌توانیم مثل یک مقدار با آن رفتار کنیم. کد بالا نمایش رشته‌ای آن را انجام می‌دهد، که همان کد منبع است.

مسلما، تابع یک مقدار خاص است، به همین دلیل ما می‌توانیم آن را مثل `sayHi()` صدا بزنیم.

اما تابع همچنان یک مقدار است. پس ما می‌توانیم با آن مثل انواع دیگر مقدارها کار کنیم.

ما می‌توانیم یک تابع را در یک متغیر دیگر کپی کنیم:

```js run no-beautify
function sayHi() {   // (1) ساختن
  alert( "سلام" );
}

let func = sayHi;    // (2) کپی کردن

func(); // سلام     // (3) کپی را اجرا می‌کنیم (کار می‌کند!)
sayHi(); // سلام    //     هنوزم کار می‌کند (چرا نکند)
```

چیزی که بالا اتفاق می‌افتد با جزییات اینجا هست:

1. Function Declaration `(1)` تابع را می‌سازد و آن را داخل متغیر `sayHi` قرار می‌دهد.
2. خط `(2)` آن را داخل متغیر `func` کپی می‌کند. لطفا دوباره در نظر داشته باشید: هیچ پرانتزی بعد از `sayHi` وجود ندارد. اگر وجود داشت، سپس `func = sayHi()` *نتیجه صدا زدن* `sayHi()` را در `func` می‌نوشت، نه خود *تابع* `sayHi`.
3. حالا تابع می‌تواند با `sayHi()` و `func()` صدا زده شود.

همچنین توجه داشته باشید که ما می‌توانستیم از یک Function Expression برای تعریف `sayHi` در خط اول، استفاده کنیم:

```js
let sayHi = function() {
  alert( "سلام" );
};

let func = sayHi;
// ...
```

همه چیز به همان شکل کار خواهد کرد.


````smart header="چرا یک نقطه ویرگول در انتها وجود دارد؟"
شاید برای شما سوال باشد، چرا Function Expression در انتها نقطه ویرگول `;` دارد، اما Function Declaration ندارد:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

جواب ساده است:
- هیچ نیازی به `;` در انتهای بلوک‌های کد و ساختارهای سینتکس که از آنها مثل `if { ... }`، `for {  }`، `function f { }` و... استفاده می‌شود نیست.
- یک Function Expression به عنوان یک مقدار، در داخل دستور استفاده می‌شود: `let sayHi = ...;`.این یک بلوک کد نیست، بلکه یک تخصیص دادن است. نقطه ویرگول `;` در انتهای دستورها پیشنهاد می‌شود، بدون توجه به اینکه مقدار چه چیزی باشد. پس نقطه ویرگول در اینجا به خود Function Expression مربوط نیست، فقط دستور را به پایان می‌رساند.
````

## Callback functions

بیایید به مثال‌های بیشتری درباره استفاده کردن از تابع ها به عنوان مقدار و استفاده کردن از function expressions نگاه کنیم.

ما یک تابع `ask(question, yes, no)` با سه پارامتر می‌نویسیم:

`question`
: متن سوال

`yes`
: تابعی برای اجرا کردن اگر جواب "Yes" باشد

`no`
: تابعی برای اجرا کردن اگر جواب "No" باشد

تابع باید `question` را بپرسد، و بر اساس جواب کاربر، `yes()` یا `no()` را صدا بزند:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "شما موافقت کردید." );
}

function showCancel() {
  alert( "شما اجرا شدن را لغو کردید." );
}

// نحوه استفاده: تابع‌های showOk، showCancel به عنوان آرگومان به ask داده شده‌اند
ask("آیا موافق هستید؟", showOk, showCancel);
```

در عمل، چنین تابع هایی بسیار مفید هستند. تفاوت اصلی بین یک `ask` در زندگی واقعی و مثال بالا در این است که تابع‌ها در زندگی واقعی از راه‌های پیچیده‌تری نسبت به یک `confirm` ساده برای تعامل با کاربر استفاده استفاده می کنند. در مرورگر، چنین تابع‌هایی معمولا یک پنچره سوال زیبا را طرح می‌کنند. اما آن یک داستان دیگر است.

**آرگومان‌های `showOk` و `showCancel` داخل `ask` *callback functions* یا فقط *callbacks* نامیده می‌شوند.**

ایده اینطور است که ما یک تابع را می‌دهیم و از آن توقع داریم که بعدا اگر نیاز شد "دوباره صدا زده شود". در مورد ما، `showOk` تبدیل به callback برای جواب "yes" می‌شود، و `showCancel` برای چواب "no".

ما می توانیم از Function Expressions برای نوشتن بسیار کوتاه‌تر همان تابع استفاده کنیم:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "آیا موافق هستید؟",
  function() { alert("شما موافقت کردید."); },
  function() { alert("شما اجرا شدن را لغو کردید."); }
);
*/!*
```

اینجا، تابع‌ها دقیقا درون صدا زدن `ask(...)` تعریف شده اند. آنها هیچ اسمی ندارند، و بنابراین *anonymous* نامیده می شود. چنین تابع هایی بیرون از `ask` قابل دسترسی نیستند (چون آنها به متغیری تخصیص داده نشده اند)، اما این چیزی است که ما اینجا می‌خواهیم.

چنین کدی در اسکریپت‌های ما به طور طبیعی نمایان می شوند، این در ذات جاوااسکریپت است.

```smart header="یک تابع مقداری است که یک \"عمل\" را نمایش می‌دهد"
مقدارهای معمولی مثل رشته‌ها یا عددها *داده* را نمایش می‌دهند.

یک تابع می‌تواند به عنوان یک *عمل* درک شود.

ما می‌توانیم آن را بین متغیرها رد و بدل کنیم و هر زمان که بخواهیم اجرا کنیم.
```


## Function Expression vs Function Declaration

Let's formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the "assignment expression" `=`:

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

The more subtle difference is *when* a function is created by the JavaScript engine.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

...If it were a Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
*!*
welcome(); // Error: welcome is not defined
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
