# Quantifiers +, *, ? and {n}

Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested in not digits, but full numbers: `7, 903, 123, 45, 67`.

<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/article.md
A number is a sequence of 1 or more digits `\d`. The instrument to say how many we need is called *quantifiers*.
=======
A number is a sequence of 1 or more digits `pattern:\d`. To mark how many we need, we can append a *quantifier*.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/09-regexp-quantifiers/article.md

## Quantity {n}

The most obvious quantifier is a number in figure quotes: `pattern:{n}`. A quantifier is put after a character (or a character class and so on) and specifies exactly how many we need.

It also has advanced forms, here we go with examples:

<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/article.md
Exact count: `{5}`
=======
It has a few advanced forms, let's see examples:

The exact count: `pattern:{5}`
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/09-regexp-quantifiers/article.md
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.

    The example below looks for a 5-digit number:

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    We can add `\b` to exclude longer numbers: `pattern:\b\d{5}\b`.

<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/article.md
The count from-to: `{3,5}`
: To find numbers from 3 to 5 digits we can put the limits into figure brackets: `pattern:\d{3,5}`
=======
The range: `pattern:{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/09-regexp-quantifiers/article.md

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

    We can omit the upper limit. Then a regexp `pattern:\d{3,}` looks for numbers of `3` and more digits:

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

In case with the string `+7(903)-123-45-67` we need numbers: one or more digits in a row. That is  `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Shorthands

Most often needed quantifiers have shorthands:

`pattern:+`
: Means "one or more", the same as `pattern:{1,}`.

    For instance, `pattern:\d+` looks for numbers:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: Means "zero or one", the same as `pattern:{0,1}`. In other words, it makes the symbol optional.

    For instance, the pattern `pattern:ou?r` looks for `match:o` followed by zero or one `match:u`, and then `match:r`.

    So it can find `match:or` in the word `subject:color` and `match:our` in `subject:colour`:

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: Means "zero or more", the same as `pattern:{0,}`. That is, the character may repeat any times or be absent.

<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/article.md
    The example below looks for a digit followed by any number of zeroes:
=======
    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes (may be many or none):
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/09-regexp-quantifiers/article.md

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Compare it with `pattern:+` (one or more):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    ```

## More examples

Quantifiers are used very often. They are one of the main "building blocks" for complex regular expressions, so let's see more examples.

**Regexp for decimal fractions (a number with a floating point): `pattern:\d+\.\d+`**

In action:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Regexp for an "opening HTML-tag without attributes", such as `<span>` or `<p>`.**

1. The simplest one: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/article.md
    We look for character `pattern:'<'` followed by one or more English letters, and then  `pattern:'>'`.
=======
    The regexp looks for character `pattern:'<'` followed by one or more Latin letters, and then  `pattern:'>'`.

2. Improved: `pattern:/<[a-z][a-z0-9]*>/i`
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/09-regexp-quantifiers/article.md

    According to the standard, HTML tag name may have a digit at any position except the first one, like `<h1>`.

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

**Regexp "opening or closing HTML-tag without attributes": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

We added an optional slash `pattern:/?` near the beginning of the pattern. Had to escape it with a backslash, otherwise JavaScript would think it is the pattern end.

```js run
alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="More precise means more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

<<<<<<< HEAD:9-regular-expressions/07-regexp-quantifiers/article.md
For instance, HTML tags could use a simpler regexp: `pattern:<\w+>`.

Because `pattern:\w` means any English letter or a digit or `'_'`, the regexp also matches non-tags, for instance `match:<_>`. But it's much simpler than `pattern:<[a-z][a-z0-9]*>`.
=======
For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`. But as HTML has stricter restrictions for a tag name, `pattern:<[a-z][a-z0-9]*>` is more reliable.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/09-regexp-quantifiers/article.md

Can we use `pattern:<\w+>` or we need `pattern:<[a-z][a-z0-9]*>`?

In real life both variants are acceptable. Depends on how tolerant we can be to "extra" matches and whether it's difficult or not to remove them from the result by other means.
```
