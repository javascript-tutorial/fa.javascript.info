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

In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## Testing for a full match

Both anchors together `pattern:^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let's check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

In regular expressions language that's `pattern:\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

Here the match for `pattern:\d\d:\d\d` must start exactly after the beginning of the text `pattern:^`, and the end `pattern:$` must immediately follow.

The whole string must be exactly in this format. If there's any deviation or an extra character, the result is `false`.

Anchors behave differently if flag `pattern:m` is present. We'll see that in the next article.

```smart header="Anchors have \"zero width\""
Anchors `pattern:^` and `pattern:$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
```
