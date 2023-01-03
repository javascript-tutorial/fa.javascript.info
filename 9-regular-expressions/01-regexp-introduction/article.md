# الگو ها و پرچم ها (Patterns and flags)

عبارات باقاعده(Regular expressions) الگوهایی هستند که روشی قدرتمند برای جستجو و جایگزینی در متن ارائه می دهند.

در جاوا اسکریپت، آنها از طریق شیء [RegExp](mdn:js/RegExp) و همچنین به خوبی با متد های رشته ها ادغام می شوند.

## عبارات باقاعده (Regular Expressions)

عبارت باقاعده (همچنین "regexp"، یا فقط "reg") از یک *الگو(pattern)* و *پرچم(flags)* های اختیاری تشکیل شده است.

دو سینتکس وجود دارد که می توان از آنها برای ایجاد یک شیء عبارت باقاعده استفاده کرد.

سینتکس "طولانی":

```js
regexp = new RegExp("pattern(الگو)", "flags(پرچم)");
```

و سینتکس "کوتاه" نیز، استفاده از اسلش `"/"` می باشد.

```js
regexp = /pattern/; // بدون پرچم
regexp = /pattern/gmi; // با پرچم g, m, i (به زودی پوشش داده میشود)
```

اسلش های `pattern:/.../` به جاوا اسکریپت می گوید که ما در حال ایجاد یک عبارت باقاعده هستیم. آنها همان نقش کوتیشن('') را برای رشته ها بازی می کنند.

در هر دو مورد، `regexp` به یک نمونه از کلاس داخلی `RegExp` تبدیل می‌شود.

تفاوت اصلی بین این دو سینتکس در این است که الگو با استفاده از اسلش‌های `/.../`، اجازه درج عبارات را نمی دهد (مانند حروف الفبای قالب(template literals) رشته با `${...}`). آنها کاملا ساکن هستند.

اسلش ها زمانی استفاده می شوند که عبارت باقاعده را در زمان نوشتن کد بدانیم -- و این رایج ترین حالت است. در حالی که `new RegExp` بیشتر زمانی استفاده می شود که ما نیاز به ایجاد یک regexp "در حال پرواز" از یک رشته تولید شده به صورت پویا داشته باشیم. برای مثال:

```js
let tag = prompt("چه بر چسبی می خواهید پیدا کنید؟", "h2");

let regexp = new RegExp(`<${tag}>`); // مانند /<h2>/ اگر در اعلان بالا "h2" پاسخ داده شود
```

## پرچم ها (Flags)

عبارات باقاعده ممکن است دارای پرچم هایی باشند که بر جستجو تأثیر می گذارد.

در جاوا اسکریپت، فقط 6 مورد از آنها وجود دارد:

`pattern:i`
: با این پرچم، جستجو به حروف کوچک و بزرگ حساس نیست: تفاوتی بین `A` و `a` نمی گذارد (به مثال زیر مراجعه کنید).

`pattern:g`
: با این پرچم، جستجو برای همه موارد منطبق، بدون آن - فقط اولین موردی که هم خوانی دارد، برگردانده می شود.

`pattern:m`
: حالت چند خطی (در فصل <info:regexp-multiline-mode> پوشش داده شده است).

`pattern:s`
: حالت `dotall` را فعال می‌کند، که به یک نقطه `.:pattern` اجازه می‌دهد تا با کاراکتر خط جدید `n\` مطابقت داشته باشد (در فصل <info:regexp-character-classes> پوشش داده شده است).

`pattern:u`
: پشتیبانی کامل از یونیکد را فعال می کند. پرچم پردازش صحیح جفت های جایگزین را امکان پذیر می کند. اطلاعات بیشتر در مورد آن در فصل <info:regexp-unicode>.

`pattern:y`
: حالت `Sticky`: جستجو در موقعیت دقیق متن (در فصل <info:regexp-sticky> پوشش داده شده است)

```smart header="Colors"
از اینجا به بعد رنگ بندی به این صورت است:

- regexp -- `pattern:red`
- string (where we search) -- `subject:blue`
- result -- `match:green`
```

## جستجو: str.match

همانطور که قبلا ذکر شد، عبارات باقاعده با متدهای رشته ای ادغام می شوند.

متد `str.match(regexp)` همه مطابقت‌ های `regexp` را در رشته `str` پیدا می‌کند.

و دارای 3 حالت کار است:

1. اگر عبارت باقاعده دارای پرچم `pattern:g` باشد، آرایه‌ای از همه موارد مطابق را بر می‌ گرداند:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (آرایه ای از 2 رشته که مطابقت دارند)
    ```
    لطفاً توجه کنید که `match:We` و `match:we` نتیجه یکسانی میدهند، زیرا پرچم `pattern:i` باعث می‌شود که عبارت باقاعده به حروف بزرگ و کوچک حساس نباشد.

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to always be an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).

For instance:

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.

Full information about the methods is given in the article <info:regexp-methods>.

## Summary

- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
