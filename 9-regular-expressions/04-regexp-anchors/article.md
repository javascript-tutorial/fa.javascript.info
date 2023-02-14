# لنگرها: رشته شروع ^ و پایان $

کاراکترهای `pattern:^` و دلار `pattern:$` معنای خاصی در یک regexp دارند. به آنها "لنگر" می گویند.

The caret `pattern:^` matches at the beginning of the text, and the dollar `pattern:$` -- at the end.
`pattern:^` در ابتدای متن و `pattern:$` دلاری -- در پایان متن مطابقت دارد.

به عنوان مثال، بیایید آزمایش کنیم که آیا متن با `Mary` شروع می شود یا خیر:
```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // درست
```

الگوی `pattern:^Mary` به معنای "شروع رشته و سپس Mary" است.

مشابه این، می‌توانیم با استفاده از `pattern:snow$` آزمایش کنیم که آیا رشته به `snow` ختم می‌شود:

```js run
let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // درست
```

در این موارد خاص، می‌توانیم به جای آن از روش‌های رشته‌ای `startsWith/endsWith` استفاده کنیم. برای تست های پیچیده تر باید از عبارات منظم استفاده شود.

## تست برای یک مسابقه کامل

هر دو لنگر با هم `$...^:pattern` اغلب برای آزمایش اینکه آیا یک رشته کاملاً با الگو مطابقت دارد یا نه استفاده می شود. به عنوان مثال، برای بررسی اینکه آیا ورودی کاربر در قالب مناسب است یا خیر.

بیایید بررسی کنیم که آیا یک رشته زمان در قالب `12:34` است یا خیر. یعنی: دو رقم، سپس یک دونقطه، و سپس دو رقم دیگر.

در زبان عبارات معمولی `pattern:\d\d:\d\d` است:
```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // درست
alert( regexp.test(badInput) ); // نادرست
```

در اینجا تطبیق `pattern:\d\d:\d\d` باید دقیقاً بعد از ابتدای متن `^:pattern` شروع شود و انتهای `$:pattern` باید بلافاصله دنبال شود.

کل رشته باید دقیقاً در این قالب باشد. اگر انحراف یا یک کاراکتر اضافی وجود داشته باشد، نتیجه `نادرست` است.

Anchors behave differently if flag `pattern:m` is present. We'll see that in the next article.

```smart header="Anchors have \"zero width\""
Anchors `pattern:^` and `pattern:$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
```
