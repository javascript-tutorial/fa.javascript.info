# حالت چند خطی anchors ^ $، پرچم "m"

حالت چند خطی با پرچم `pattern:m` فعال می شود.

فقط بر رفتار `^:pattern` و `$:pattern` تأثیر می گذارد.

در حالت چند خطی، نه تنها در ابتدا و انتهای رشته، بلکه در شروع/پایان خط نیز مطابقت دارند.

## جستجو در شروع خط ^

در مثال زیر متن دارای چندین خط است. الگوی `pattern:/^\d/gm` از ابتدای هر خط یک رقم می گیرد:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

بدون پرچم `pattern:m` تنها رقم اول مطابقت دارد:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/g) ); // 1
*/!*
```

دلیلش این است که به طور پیش‌ فرض یک `^:pattern` فقط در ابتدای متن و در حالت چند خطی - در ابتدای هر خط مطابقت دارد.

```smart
"شروع یک خط" به طور رسمی به معنای "بلافاصله پس از شکست خط" است: "^:pattern" آزمایشی در حالت چند خطی در همه موقعیت هایی که قبل از یک کاراکتر خط جدید "n\" قرار دارند مطابقت دارد.

و در شروع متن.
```

## جستجو در انتهای خط $
علامت دلار `$:pattern` رفتار مشابهی دارد.

عبارت منظم `$pattern:\d` آخرین رقم را در هر خط پیدا می کند

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d$/gm) ); // 1,2,3
```

بدون پرچم `pattern:m` و `$:pattern` دلاری فقط با انتهای کل متن مطابقت دارد، بنابراین فقط آخرین رقم پیدا می‌شود.

```smart
"پایان یک خط" به طور رسمی به معنای "بلافاصله قبل از شکست خط" است: تست "$:pattern" در حالت چند خطی در همه موقعیت‌هایی که توسط یک کاراکتر خط جدید "n\" جایگزین می‌شود، مطابقت دارد.

و در انتهای متن.
```

## Searching for \n instead of ^ $

To find a newline, we can use not only anchors `pattern:^` and `pattern:$`, but also the newline character `\n`.

What's the difference? Let's see an example.

Here we search for `pattern:\d\n` instead of `pattern:\d$`:

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/g) ); // 1\n,2\n
```

As we can see, there are 2 matches instead of 3.

That's because there's no newline after `subject:3` (there's text end though, so it matches `pattern:$`).

Another difference: now every match includes a newline character `match:\n`. Unlike the anchors `pattern:^` `pattern:$`, that only test the condition (start/end of a line), `\n` is a character, so it becomes a part of the result.

So, a `\n` in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.
