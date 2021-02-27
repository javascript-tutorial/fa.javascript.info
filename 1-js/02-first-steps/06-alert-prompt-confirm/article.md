# تعاملی:  آلِرت، پِرامت، کانفرم
همانطور که از مرورگر به عنوان محیط آزمایشی خودمان استفده می‌کنیم، بگذارید چندتایی تابع تعاملی را بررسی کنیم:  `alert`، `prompt` و `confirm`. 

## آلِرت

این یکی را قبلاً هم دیده‌ایم. یک پیغام نمایش می‌دهد و صبر می‌کند تا کاربر دکمهٔ «OK» را بزند.

برای مثال:

```js run
alert("Hello");
```

این پنجرهٔ کوچک همراه با پیغام یک *modal window* است. کلمهٔ «modal» به معنای آن است که بازدیدکننده نمی‌تواند با بقیهٔ صفحه تعامل کند، دکمه‌های دیگر را بزند و یا غیره، تا زمانی که با پنجرهٔ بازشده کارش تمام شده باشد. در این مورد خاص -- تا زمانی که دکمهٔ «OK» را بزند.

## پِرامت

تابع `primpt` دو پارامتر دارد:

```js no-beautify
result = prompt(title, [default]);
```

این تابع یک پنجرهٔ modal  همراه با یک پیغام، یک فیلد ورودی برای بازدیدکننده، و دکمه‌های «OK/Cancel» را نمایش می‌دهد.

`title`
: پیغامی که به کاربر نمایش داده می‌شود.

`default`
: یک پارامتر دوم اختیاری، مقدار اولیه برای فیلد ورودی.

```smart header="براکت های در سینتکس `[...]`"
براکت‌های اطراف `default`در سینتکس بالا اختیاری بودن پارامتر را مشخص می‌کند.
```

بازدیدکننده می‌تواند چیزی را در فیلد ورودی پِرامت تایپ کند و دکمهٔ «OK» را بزند. سپس ما متن را در `result` دریافت می‌کنیم. یا بازکننده می‌تواند با زدن دکمهٔ «Cancel» یا فشردن `key:Esc` ورودی را کنسل کند،

تابع `prompt` متن دریافتی از فیلد ورودی و یا `null` در صورت کنسل شدن را بر می‌گرداند.

برای مثال:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="در اینترنت اکسپلورر: همیشه `default` را تعریف کنید."
پارامتر دوم اختیاری است، اما اگر آن را تعریف نکنیم، اینترنت اکسپلورر متن `"undefined"` را درون آن قرار می‌دهد.

کد زیر را در اینترنت اکسپلورر اجرا کنید تا ببینید:

```js run
let test = prompt("Test");
```

پس، برای خوب به نظر رسیدن پِرامت‌ها در اینترنت اکسپلورر، ما پیشنهاد می‌کنیم همیشه پارامتر دوم را تعریف کنید:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## کانفرم

The syntax:

```js
result = confirm(question);
```

The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
