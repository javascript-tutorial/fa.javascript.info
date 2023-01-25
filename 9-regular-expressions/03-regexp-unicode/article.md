# یونیکد: پرچم "u" و کلاس {...}p\

جاوااسکریپت از [رمزگذاری یونیکد](https://en.wikipedia.org/wiki/Unicode) برای رشته ها استفاده می کند. اکثر کاراکترها با 2 بایت کدگذاری می شوند، اما این امکان را برای نمایش حداکثر 65536 کاراکتر فراهم می کند.

این محدوده به اندازه کافی بزرگ نیست تا همه کاراکترهای ممکن را رمزگذاری کند، به همین دلیل است که برخی از کاراکترهای کمیاب با 4 بایت کدگذاری می شوند، به عنوان مثال مانند `𝒳` (X ریاضی) یا `😄` (لبخند)، برخی از هیروگلیف ها و غیره.

در اینجا مقادیر یونیکد برخی از کاراکترها آمده است:

| کاراکتر  | یونیکد | تعداد بایت یونیکد  |
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

بنابراین کاراکتر هایی مانند `a` و `≈` 2 بایت را اشغال می کنند، در حالی که کدهای `𝒳`، `𝒴` و `😄` طولانی تر هستند و 4 بایت دارند.

مدت ها پیش، زمانی که زبان جاوااسکریپت ایجاد شد، رمزگذاری یونیکد ساده تر بود: هیچ کاراکتر 4 بایتی وجود نداشت. بنابراین برخی از ویژگی های زبان را به اشتباه مدیریت می کردند.

به عنوان مثال، `length` فکر می کند که در اینجا دو کاراکتر وجود دارد:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...اما ما می توانیم ببینیم که فقط یکی وجود دارد، درست است؟ نکته این است که `length` آن را 4 بایت به عنوان دو کاراکتر 2 بایتی در نظر می گیرد. این نادرست است، زیرا آنها باید فقط با هم در نظر گرفته شوند(به اصطلاح "جفت جانشین"، می توانید در مورد آنها در مقاله <info:string> بخوانید).

By default, regular expressions also treat 4-byte "long characters" as a pair of 2-byte ones. And, as it happens with strings, that may lead to odd results. We'll see that a bit later, in the article <info:regexp-character-sets-and-ranges>.

Unlike strings, regular expressions have flag `pattern:u` that fixes such problems. With such flag, a regexp handles 4-byte characters correctly. And also Unicode property search becomes available, we'll get to it next.

## Unicode properties \p{...}

Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.

For instance, if a character has `Letter` property, it means that the character belongs to an alphabet (of any language). And `Number` property means that it's a digit: maybe Arabic or Chinese, and so on.

We can search for characters with a property, written as `pattern:\p{…}`. To use `pattern:\p{…}`, a regular expression must have flag `pattern:u`.

For instance, `\p{Letter}` denotes a letter in any language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgian and Korean.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
```

Here's the main character categories and their subcategories:

- Letter `L`:
  - lowercase `Ll`
  - modifier `Lm`,
  - titlecase `Lt`,
  - uppercase `Lu`,
  - other `Lo`.
- Number `N`:
  - decimal digit `Nd`,
  - letter number `Nl`,
  - other `No`.
- Punctuation `P`:
  - connector `Pc`,
  - dash `Pd`,
  - initial quote `Pi`,
  - final quote `Pf`,
  - open `Ps`,
  - close `Pe`,
  - other `Po`.
- Mark `M` (accents etc):
  - spacing combining `Mc`,
  - enclosing `Me`,
  - non-spacing `Mn`.
- Symbol `S`:
  - currency `Sc`,
  - modifier `Sk`,
  - math `Sm`,
  - other `So`.
- Separator `Z`:
  - line `Zl`,
  - paragraph `Zp`,
  - space `Zs`.
- Other `C`:
  - control `Cc`,
  - format `Cf`,
  - not assigned `Cn`,
  - private use `Co`,
  - surrogate `Cs`.


So, e.g. if we need letters in lower case, we can write `pattern:\p{Ll}`, punctuation signs: `pattern:\p{P}` and so on.

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. Ⅻ - a character for the roman number 12), plus some other symbols `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- ...And so on.

Unicode supports many different properties, their full list would require a lot of space, so here are the references:

- List all properties by a character: <https://unicode.org/cldr/utility/character.jsp>.
- List all characters by a property: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Short aliases for properties: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A full base of Unicode characters in text format, with all properties, is here: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Example: hexadecimal numbers

For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..9 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

### Example: Chinese hieroglyphs

Let's look for Chinese hieroglyphs.

There's a Unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list](https://en.wikipedia.org/wiki/Script_(Unicode)).

To look for characters in a given writing system we should use `pattern:Script=<value>`, e.g. for Cyrillic letters: `pattern:\p{sc=Cyrillic}`, for Chinese hieroglyphs: `pattern:\p{sc=Han}`, and so on:

```js run
let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Example: currency

Characters that denote a currency, such as `$`, `€`, `¥`, have Unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.

Let's use it to look for prices in the format "currency, followed by a digit":

```js run
let regexp = /\p{Sc}\d/gu;

let str = `Prices: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Later, in the article <info:regexp-quantifiers> we'll see how to look for numbers that contain many digits.

## Summary

Flag `pattern:u` enables the support of Unicode in regular expressions.

That means two things:

1. Characters of 4 bytes are handled correctly: as a single character, not two 2-byte characters.
2. Unicode properties can be used in the search: `\p{…}`.

With Unicode properties we can look for words in given languages, special characters (quotes, currencies) and so on.
