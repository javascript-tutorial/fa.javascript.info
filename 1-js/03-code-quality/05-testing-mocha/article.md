# تست خودکار با موکا(Mocha)

تست خودکار در تسک های بعدی استفاده خواهد شد، و همچنین به طور گسترده در پروژه های واقعی استفاده می شود.

## چرا به تست نیاز داریم؟

وقتی یک تابعی را می نویسیم، معمولاً می توانیم تصور کنیم که چه کاری باید انجام دهد: کدام پارامترها چه نتایجی را ارائه می دهند.

در طول توسعه، میتوانیم تابعی را اجزا کرده و خروجی آن را با چیزی که انتظار داریم تابع به ما بدهد بررسی کنیم. به عنوان مثال، ما می توانیم این کار را در کنسول انجام دهیم.

اگر چیزی اشتباه باشد -- کد را تصحیح می کنیم، دوباره از اول اجرا می کنیم، نتیجه را بررسی می کنیم -- و به همین ترتیب تا زمانی که کد ما کار کند, این کار ها را انجام میدهیم.

اما چنین "re-runs"(اجرای مجدد) به صورت دستی ناقص می باشد.

**هنگام تست یک کد با اجرای مجدد(re-reuns) به صورت دستی، به راحتی می توان چیزی را از قلم بیاندازیم(فراموش کنیم).**

به عنوان مثال، ما یک تابع `f` ایجاد می کنیم. کدی مینویسیم و تست میکنیم: `f(1)` کار می کند، اما `f(2)` کار نمی کند. ما کد را اصلاح می کنیم و اکنون `f(2)` کار می کند. آیا الان تست ما کامل به نظر میرسد؟ اما فراموش کردیم `f(1)` را دوباره تست کنیم, که ممکن است به ارور برخورد کنیم.

این خیلی معمول(عادی) است. وقتی چیزی را توسعه می‌دهیم، کیس های احتمالی زیادی را در ذهن خود نگه میداریم, اما به سختی می توان انتظار داشت که یک برنامه نویس پس از هر تغییر، همه آنها را به صورت دستی بررسی کند. بنابراین اصلاح یک چیز و خراب کردن یک چیز دیگر آسان می شود.

**تست خودکار به این معنی است که تست ها علاوه بر کد, به طور جداگانه نوشته می شوند. آنها عملکرد(تابع) های ما را به روش های مختلف اجرا می کنند و نتایج به دست آمده را با آنچه انتظار می رود مقایسه می کنند.**

## توسعه ی رفتار محور (behavior driven development) (BDD)

بیایید با تکنیکی به نام [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) یا به طور خلاصه (BDD) شروع کنیم.

**این BDD سه قسمت دارد: تست ها, مستندات(داکیومنت ها) و مثال ها.**

برای درک بهتر BDD، یک مورد عملی از توسعه را بررسی خواهیم کرد.

## توسعه ی "pow": توضیح:

فرض کنید می‌خواهیم یک تابع `pow(x, n)` بسازیم که `x` را به توان یک عدد صحیح `n` برساند. ما فرض می کنیم که `n≥0`.

این تسک فقط یک مثال است: اپراتور `**` در جاوا اسکریپت وجود دارد که می تواند این کار را انجام دهد، اما در اینجا ما روی جریان توسعه تمرکز می کنیم که می تواند برای کارهای پیچیده تر نیز اعمال شود.

قبل از ایجاد کد `pow`، می‌توانیم تصور کنیم که تابع باید چه کاری انجام دهد و چگونه آن را توصیف کنیم.

چنین توصیفی یک *specification(مشخصات)* یا به طور خلاصه، یک spec نامیده می‌شود و حاوی توضیحاتی در مورد کیس(مورد) های همراه با تست هایی برای آنها است، مانند این:

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

یک spec دارای سه بلوک اصلی است که می توانید در بالا مشاهده کنید:

`describe("title", function() { ... })`
: چه عملکردی را توضیح می دهیم؟ در این کیس, ما تابع `pow` را توصیف می کنیم. برای گروه بندی "کارگران(workers)" -- بلوک های `it` استفاده می شود.

`it("use case description", function() { ... })`
: در تایتل(عنوان) `it` ما *به روشی قابل خواندن برای انسان* کیس مورد نظر را توصیف می کنیم، و آرگومان دوم تابعی است که آن را تست می کند.

`assert.equal(value1, value2)`
: کد داخل بلوک `it`، در صورتی که پیاده سازی آن صحیح باشد، باید بدون خطا(ارور) اجرا شود.

    توابع `*.assert` برای بررسی اینکه آیا `pow` همانطور که انتظار می رود کار می کند یا نه استفاده می شود. در اینجا ما از یکی از آنها استفاده می کنیم -- `assert.equal`، آرگومان ها را با هم مقایسه می کند و در صورتی که برابر نباشند، خطا می دهد. در اینجا بررسی می‌کند که نتیجه `pow(2، 3)` برابر `8` باشد. انواع دیگری از مقایسه و بررسی وجود دارد که بعداً اضافه خواهیم کرد.

در ابنجا specification را می توان اجرا کرد و تست مشخص شده در بلوک `it` را اجرا می کند. بعداً خواهیم دید.

## جریان توسعه

جریان توسعه معمولاً به این صورت است:

1. یک spec اولیه با تست هایی برای بنیادی(اساسی) ترین عملکرد نوشته شده است.
2. یک پیاده سازی اولیه ایجاد می شود.
3. برای بررسی اینکه آیا کار می کند یا نه، فریم ورک تست [Mocha] (https://mochajs.org/) (جزئیات بیشتر به زودی) را اجرا می کنیم که spec را اجرا می کند. تا زمانی که عملکرد ها کامل نیست، خطاها نمایش داده می شوند. ما اصلاحات را انجام می دهیم تا زمانی که همه چیز درست کار بکند
4. اکنون ما یک پیاده سازی اولیه با تست داریم.
5. کیس های بیشتری را به spec اضافه می کنیم که احتمالاً هنوز توسط پیاده سازی ها پشتیبانی نشده اند. تست ها به مشکل بر میخورند.
6. به شماره 3 برگردید و پیاده سازی ها را آپدیت کنید تا وقتی که تست ها خطایی ندهند.
7. مراحل 3-6 را تکرار کنید تا عملکرد ها آماده شود.

بنابراین، توسعه به معنای *تکرار کننده* می باشد. ما spec را می‌نویسیم، آن را پیاده‌سازی می‌کنیم، مطمئن می‌شویم که تست‌ها قبول شدند، سپس تست‌های بیشتری می‌نویسیم، مطمئن می‌شویم که کار می‌کنند و غیره.

بیایید این جریان توسعه را در مثال عملی خود ببینیم.

مرحله اول در حال حاضر کامل شده است: ما یک spec اولیه برای `pow` داریم. اکنون، قبل از پیاده سازی، بیایید از چند کتابخانه جاوا اسکریپت برای اجرای تست ها استفاده کنیم تا ببینیم که آنها کار می کنند (همه تست ها رد شدند).

## مشخصات(spec) در عمل

اینجا یعنی دوره آموزشی ما, از کتابخانه های جاوا اسکریپت زیر برای تست(آزمایش) استفاده خواهیم کرد:

- [Mocha](https://mochajs.org/) -- فریم ورک اصلی: توابع تستی رایج از جمله `spec` و `it` و تابع اصلی که تست ها را اجرا می‌کند را ارائه می‌کند.
- [Chai](https://www.chaijs.com/) -- کتابخانه ای با توابع فراوان که این اجازه را می دهد تا از بسیاری از توابع مختلف استفاده کنیم، در حال حاضر فقط به `assert.equal` نیاز داریم.
- [Sinon](https://sinonjs.org/) -- کتابخانه ای برای جاسوسی از توابع، شبیه سازی توابع(built-in) یا همان توابعداخلی و دیگر موارد، بعداً به آن نیاز خواهیم داشت.

این کتابخانه ها هم برای تست داخل مرورگر و هم برای تست سمت سرور مناسب هستند. در اینجا ما نوع مرورگر را در نظر خواهیم گرفت.

صفحه کامل HTML با این فریم ورک ها و `pow` spec:

```html src="index.html"
```

صفحه را می توان به پنج بخش تقسیم کرد:

1. قسمت `<head>` -- برای اضافه کردن کتاب خانه های خارجی و استایل های برای تست.
2. قسمت `<script>` با توابعی برای تست, که در مثال ما --با کد `pow`.
3. قسمت تست ها -- در مثال ما, اسکریپ خارجی `test.js` که تابع `describe("pow", ...)` را دارد(مانند مثال بالایی).
4. المان html مقابل: `<div id="mocha">` برای نمایش نتیجه, Mocha از این تگ استفاده میکند.
5. با کامند(دستور) `mocha.run()` تست ما شروع میشود.

نتیجه:

[iframe height=250 src="pow-1" border=1 edit]

As of now, the test fails, there's an error. That's logical: we have an empty function code in `pow`, so `pow(2,3)` returns `undefined` instead of `8`.

For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.

## Initial implementation

Let's make a simple implementation of `pow`, for tests to pass:

```js
function pow() {
  return 8; // :) we cheat!
}
```

Wow, now it works!

[iframe height=250 src="pow-min" border=1 edit]

## Improving the spec

What we've done is definitely a cheat. The function does not work: an attempt to calculate `pow(3,4)` would give an incorrect result, but tests pass.

...But the situation is quite typical, it happens in practice. Tests pass, but the function works wrong. Our spec is imperfect. We need to add more use cases to it.

Let's add one more test to check that `pow(3, 4) = 81`.

We can select one of two ways to organize the test here:

1. The first variant -- add one more `assert` into the same `it`:

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. The second -- make two tests:

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

The principal difference is that when `assert` triggers an error, the `it` block immediately terminates. So, in the first variant if the first `assert` fails, then we'll never see the result of the second `assert`.

Making tests separate is useful to get more information about what's going on, so the second variant is better.

And besides that, there's one more rule that's good to follow.

**One test checks one thing.**

If we look at the test and see two independent checks in it, it's better to split it into two simpler ones.

So let's continue with the second variant.

The result:

[iframe height=250 src="pow-2" edit border="1"]

As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.

## Improving the implementation

Let's write something more real for tests to pass:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

To be sure that the function works well, let's test it for more values. Instead of writing `it` blocks manually, we can generate them in `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

The result:

[iframe height=250 src="pow-3" edit border="1"]

## Nested describe

We're going to add even more tests. But before that let's note that the helper function `makeTest` and `for` should be grouped together. We won't need `makeTest` in other tests, it's needed only in `for`: their common task is to check how `pow` raises into the given power.

Grouping is done with a nested `describe`:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... more tests to follow here, both describe and it can be added
});
```

The nested `describe` defines a new "subgroup" of tests. In the output we can see the titled indentation:

[iframe height=250 src="pow-4" edit border="1"]

In the future we can add more `it` and `describe` on the top level with helper functions of their own, they won't see `makeTest`.

````smart header="`before/after` and `beforeEach/afterEach`"
We can setup `before/after` functions that execute before/after running tests, and also `beforeEach/afterEach` functions that execute before/after *every* `it`.

For instance:

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

The running sequence will be:

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
````

## Extending the spec

The basic functionality of `pow` is complete. The first iteration of the development is done. When we're done celebrating and drinking champagne -- let's go on and improve it.

As it was said, the function `pow(x, n)` is meant to work with positive integer values `n`.

To indicate a mathematical error, JavaScript functions usually return `NaN`. Let's do the same for invalid values of `n`.

Let's first add the behavior to the spec(!):

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

The result with new tests:

[iframe height=530 src="pow-nan" edit border="1"]

The newly added tests fail, because our implementation does not support them. That's how BDD is done: first we write failing tests, and then make an implementation for them.

```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](https://www.chaijs.com/) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](https://www.chaijs.com/api/assert/)
```

So we should add a couple of lines to `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Now it works, all tests pass:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## Summary

In BDD, the spec goes first, followed by implementation. At the end we have both the spec and the code.

The spec can be used in three ways:

1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.

With the spec, we can safely improve, change, even rewrite the function from scratch and make sure it still works right.

That's especially important in large projects when a function is used in many places. When we change such a function, there's just no way to manually check if every place that uses it still works right.

Without tests, people have two ways:

1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.

**Besides, a well-tested code has better architecture.**

Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.

To write tests, the code should be organized in such a way that every function has a clearly described task, well-defined input and output. That means a good architecture from the beginning.

In real life that's sometimes not that easy. Sometimes it's difficult to write a spec before the actual code, because it's not yet clear how it should behave. But in general writing tests makes development faster and more stable.

Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.

Writing tests requires good JavaScript knowledge. But we're just starting to learn it. So, to settle down everything, as of now you're not required to write tests, but you should already be able to read them even if they are a little bit more complex than in this chapter.
