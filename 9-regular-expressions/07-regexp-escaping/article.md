
# Escaping, special characters

<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
As we've seen, a backslash `"\"` is used to denote character classes. So it's a special character.
=======
As we've seen, a backslash `pattern:\` is used to denote character classes, e.g. `pattern:\d`. So it's a special character in regexps (just like in regular strings).
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches.

Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember it -- when we deal with each of them separately, you'll know it by heart automatically.

<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
## Escaping
=======
Let's say we want to find literally a dot. Not "any character", but just a dot.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md

To use a special character as a regular one, prepend it with a backslash.

That's also called "escaping a character".

For instance, we need to find a dot `pattern:'.'`. In a regular expression a dot means "any character except a newline", so if we really mean "a dot", let's put a backslash before it: `pattern:\.`.

```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

If we're looking for a backslash `\`, then we should double it:

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## A slash

The slash symbol `'/'` is not a special character, but in JavaScript it is used to open and close the regexp: `pattern:/...pattern.../`, so we should escape it too.

Here's what a search for a slash `'/'` looks like:

```js run
alert( "/".match(/\//) ); // '/'
```

<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
From the other hand, the alternative `new RegExp` syntaxes does not require escaping it:

```js run
alert( "/".match(new RegExp("/")) ); // '/'
=======
On the other hand, if we're not using `pattern:/.../`, but create a regexp using `new RegExp`, then we don't need to escape it:

```js run
alert( "/".match(new RegExp("/")) ); // finds /
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md
```

## new RegExp

If we are creating a regular expression with `new RegExp`, then we need to do some more escaping.

For instance, consider this:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
```

<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
It doesn't work, but why?

The reason is string escaping rules. Look here:
=======
The similar search in one of previous examples worked with `pattern:/\d\.\d/`, but `new RegExp("\d\.\d")` doesn't work, why?

The reason is that backslashes are "consumed" by a string. As we may recall, regular strings have their own special characters, such as `\n`, and a backslash is used for escaping.

Here's how "\d\.\d" is preceived:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md

```js run
alert("\d\.\d"); // d.d
```

<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
Backslashes are used for escaping inside a string and string-specific special characters like `\n`. The quotes "consume" and interpret them, for instance:
=======
String quotes "consume" backslashes and interpret them on their own, for instance:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `pattern:\d` or `\z`, then the backslash is simply removed.

<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
So the call to `new RegExp` gets a string without backslashes.
=======
So `new RegExp` gets a string without backslashes. That's why the search doesn't work!
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md

To fix it, we need to double backslashes, because string quotes turn `\\` into `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correct now)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```
<<<<<<< HEAD:9-regular-expressions/04-regexp-escaping/article.md
=======

## Summary

- To search for special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with a backslash `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string `new RegExp`, we need to double backslashes `\\`, cause string quotes consume one of them.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1:9-regular-expressions/07-regexp-escaping/article.md
