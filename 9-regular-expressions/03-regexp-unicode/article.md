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

به‌ طور پیش‌ فرض، عبارات باقاعده نیز "کاراکتر های طولانی" 4 بایتی را به عنوان یک جفت 2 بایتی در نظر می‌ گیرند. همانطور که در مورد رشته ها اتفاق می افتد، ممکن است به نتایج عجیب و غریب منجر شود. این را کمی بعد، در مقاله <info:regexp-character-sets-and-ranges> خواهیم دید.

برخلاف رشته‌ها، عبارات باقاعده دارای پرچم `pattern:u` هستند که چنین مشکلاتی را برطرف می‌ کند. با چنین پرچمی، یک regexp کاراکترهای 4 بایتی را به درستی مدیریت می کند. همچنین جستجوی ویژگی یونیکد در دسترس قرار می گیرد. در ادامه به آن خواهیم پرداخت.

## ویژگی های یونیکد {...}p\

هر کاراکتر در یونیکد دارای ویژگی های زیادی است. آنها توصیف می کنند که کاراکتر به چه "رده ای" تعلق دارد و حاوی اطلاعات متفرقه در مورد آن است.

به عنوان مثال، اگر یک کاراکتر دارای ویژگی `Letter` باشد، به این معنی است که کاراکتر متعلق به الفبا (از هر زبان) است. خاصیت `Number` به این معنی است که یک رقم است: شاید عربی یا چینی و غیره.

می‌ توانیم کاراکترهایی را با یک ویژگی جستجو کنیم که به صورت `{…}pattern:\p` نوشته شده است. برای استفاده از `{…}pattern:\p`، یک عبارت باقاعده باید دارای پرچم `pattern:u` باشد.

برای مثال، `{Letter}p\` یک حرف در هر زبانی را نشان می‌دهد. همچنین می‌توانیم از `p{L}\` استفاده کنیم، زیرا `L` نام مستعار `Letter` است. تقریباً برای هر ویژگی نام مستعار کوتاه تری وجود دارد.

در مثال زیر سه نوع حرف وجود دارد: انگلیسی، گرجی و کره ای.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (بدون منطبق، \p بدون پرچم "u" کار نمی کند)
```

در اینجا دسته بندی کاراکتر های اصلی و زیر شاخه های آنها آمده است:

- حرف `L`:
  - حروف کوچک `Ll`
  - اصلاح کننده `Lm`,
  - عنوان `Lt`,
  - حروف بزرگ `Lu`,
  - سایر `Lo`.
- عدد `N`:
  - رقم اعشاری `Nd`,
  - شماره نامه `Nl`,
  - سایر `No`.
- نقطه گذاری `P`:
  - اتصال دهنده `Pc`,
  - خط تیره `Pd`,
  - نقل قول اولیه `Pi`,
  - نقل قول نهایی `Pf`,
  - باز `Ps`,
  - بسته `Pe`,
  - سایر `Po`.
- علامت `M` (لهجه ها و غیره):
  - ترکیب فاصله `Mc`,
  - محصور کردن `Me`,
  - بدون فاصله `Mn`.
- نماد `S`:
  - واحد پول `Sc`,
  - اصلاح کننده `Sk`,
  - ریاضی `Sm`,
  - سایر `So`.
- جداکننده `Z`:
  - خط `Zl`,
  - پاراگراف `Zp`,
  - فاصله `Zs`.
- سایر `C`:
  - کنترل `Cc`,
  - فرمت `Cf`,
  - اختصاص داده نشده `Cn`,
  - استفاده خصوصی `Co`,
  - جانشین `Cs`.


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
