# ساختار کد

اولین چیزی که خواهیم آموخت نحوه ساخت بلاکِ کد است.

## Statements

Statement ها دستورات و کدهایی هستند که باعث وقوع عملی می‌شوند.

پیش از این Statement ـی دیده‌ایم : `alert('Hello, world')` که پیام Hello, world را نمایش می‌داد.

ما به هر تعداد Statement ـی که بخواهیم می‌توانیم در کدهای خود داشته باشیم. Statement ها از طریق semicolon (سِمی‌کالِن) از هم تفکیک می‌شوند. ‌برای نمونه ما در اینجا می‌توانیم عبارت "Hello World" را در دو Alert داشته باشیم :

```js run no-beautify
alert('Hello'); alert('World');
```

معمولا Statement ها به منظور خوانایی کدها، در خطوط جداگانه نوشته می‌شوند :

```js run no-beautify
alert('Hello');
alert('World');
```

## Semicolons [#semicolon]

ممکن است Semicolon در انتهای یک Line Break حذف شود.

این کد کار خواهد کرد :

```js run no-beautify
alert('Hello')
alert('World')
```
در اینجا جاوا اسکریپت Line Break را به صورت ضمنی به عنوان یک Semicolon در نظر می‌گیرد، که به آن [درج خودکار semicolon](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) گفته می‌شود.

**در نظر داشته باشید که همیشه Line Break به معنی Semicolon نیست.**

به طور نمونه :

```js run no-beautify
alert(3 +
1
+ 2);
```

<<<<<<< HEAD
خروجی این کد `6` خواهد بود به این دلیل که جاوا اسکریپت Semicolon ـی در انتهای هر Line Break قرار نمی‌دهد. همانطور که مشخص است زمانیکه `"+"` در انتهای هر خط قرار می‌گیرد، عبارت کامل نمی‌شود و در نتیجه به Semicolon نیازی نیست.
=======
The code outputs `6` because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there would be incorrect. And in this case, that works as intended.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**اما شرایطی نیز وجود دارد که جاوا اسکریپت در تشخیص نیاز به Semicolon دچار خطا می‌شود.**

خطاهایی که در چنین شرایطی رخ می‌دهند به سختی پیدا می‌شود و قابل رفع هستند.

````smart header="نمونه‌ای از یک خطا"
اگر واقعا به دنبال دیدن چنین خطایی هستید کد زیر را آزمایش کنید :

```js run
alert("Hello");

[1, 2].forEach(alert);
```

<<<<<<< HEAD
فعلا نیازی نیست تا معنی [] و foreach را متوجه شوید. در آینده با آنها آشنا خواهیم شد. فعلا در نظر داشته باشید که نتیجه‌ی این کد نمایش عدد `1` و `2` است.

حال بیایید `alert` را پیش از این کد قرار دهیم و در انتهای آن semicolon قرار ندهیم.

=======
No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let's remove the semicolon after the `alert`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
```

<<<<<<< HEAD
حال اگر کد را اجرا کنیم فقط `alert` اول را خواهیم دید و سپس با خطا مواجه می‌شویم.

اما اگر انتهای `alert` اول یک semicolon قرار دهیم همه چیز دوباره درست کار خواهد کرد :

```js run
alert("All fine now");
=======
The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

If we run this code, only the first `Hello` shows (and there's an error, you may need to open the console to see it). There are no numbers any more.

<<<<<<< HEAD
دلیل وقوع این خطا آن است که جاوا اسکریپت پیش از براکت‌ها `[...]` semicolon در نظر نمی‌گیرد.
از آنجایی که semicolon به صورت خودکار در انتهای alert اول قرار داده نمی‌شود، تمام کد به عنوان یک Statement در نظر گرفته می‌شود. موتور جاوا اسکریپت کد را به این شکل خواهد دید :

=======
That's because JavaScript does not assume a semicolon before square brackets `[...]`. So, the code in the last example is treated as a single statement.

Here's how the engine sees it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

<<<<<<< HEAD
این خطا ممکن است در شرایط مشابه نیز بوجود آید.
=======
Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `alert` for the code to work correctly.

This can happen in other situations also.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

ما توصیه می‌کنیم که semicolon را در انتهای هر Statement قرار دهید، حتی اگر در خطوط جداگانه‌ای قرار دارند. این اصل به شکل گسترده‌ای در جامعه برنامه‌نویسان جاوا اسکریپت جا افتاده است.
یکبار دیگر تکرار می‌کنیم : این امکان وجود دارد که در اکثر مواقع semicolon را قرار ندهید. ولی قرار دادن آن امن‌تر است، مخصوصا برای تازه‌کارها.


## Comments [#code-comments]

هر چه به جلو می‌رویم برنامه ما پیچیده‌تر می‌شود و قرار دادن *comment* برای واضح‌تر شدن کد ضروری می‌شود.

Comment ها می‌توانند در هر جایی از اسکریپت قرار بگیرند و تاثیری در اجرای دستورات ندارند، چراکه به سادگی توسط موتور جاوا اسکریپت نادیده گرفته می‌شوند.

**Comment یک خطی با دو Forward Slash یعنی `//` شروع می‌شود.**

از محلی که `//` را قرار می‌دهیم، تا انتهای خط نادیده گرفته خواهد شد. همینطور Comment می‌تواند به دنبال یک Statement بیاید.

مانند :

```js run
// This comment occupies a line of its own
alert('Hello');

alert('World'); // This comment follows the statement
```

**Comment های چند خطی با یک /  و علامت * شروع شده و با علامت * و سپس / پایان می‌یابند.**

مانند :

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert('Hello');
alert('World');
```

همانطور که گفتیم دستوراتی که در Comment قرار می‌گیرند اجرا نمی‌شوند، از این رو گاهی اوقات از این روش برای غیر فعال کردن بخشی از کد می‌توان استفاده نمود.

```js run
/* Commenting out the code
alert('Hello');
*/
alert('World');
```

```smart header="از کلیدهای میان‌بُر استفاده کنید"
بعضی ویرایشگرها قابلیت Comment کردن کد از طریق کلیدهای میان‌بُر را دارند. معمولا `ctrl + /` در ویندوز Comment های تک خطی و `ctrl + shift + /` می‌تواند Comment چند خطی بوجود آورد (باید ابتدا بخشی از کد را انتخاب نمایید). همینطور در Mac می‌توانید از کلید `cmd` بجای `ctrl` استفاده نمایید. 
```

````warn header="Comment های تو در تو حساب نمی‌شوند"
امکان قرار دادن یک Comment داخل Comment ـی دیگر وجود ندارد.

این کد با خطا مواجه خواهد شد :

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

لطفا برای استفاده از Comment در کدهای خود مردد نباشید.

Comment ها حجم کد را افزایش می‌دهند، اما این اصلا اشکال نیست. ابزارهای گوناگونی وجود دارند که قبل از انتشار برنامه روی سروِر کدهای شما را کم حجم و Comment ها را حذف می‌کنند. بنابراین Comment ها روی خروجی نهایی تاثیری نخواهند داشت.

در ادامه آموزش در بخش <info:coding-style> نحوه بهتر نوشتن Comment ها را خواهیم آموخت.
