# Forms: event و method submit

معمولا `submit` event زمانی فعال می‌شود که یک فرم submit می‌شود. معمولا برای اعتبارسنجی فرم قبل از اینکه به سمت سرور فرستاده شود یا لغو و پردازش آن در JavaScript استفاده می‌شود.  

متد `form.submit()` اجازه می‌دهد که فرستادن فرم از JavaScript آغاز شود. ما می‌توانیم از آن استفاده کنیم که به صورت پویا فرم‌های خودمان را ایجاد کنیم و به سرور بفرستیم.

بیایید جزئیات بیشتری از آن‌ها ببینیم.

## Event: submit

دو راه اصلی برای submit کردن یک فرم وجود دارد. 

1. اولی -- کلیک کردن `<input type="submit">` یا `<input type="image">`.
2. دومی -- فشار دادن `key:Enter` روی یک input field.

هر دو کار باعث `submit` event روی فرم می‌شوند. Handler می‌تواند داده را چک کند، و اگر خطاییی باشد، آن‌ها را نشان دهد و `event.preventDefault()` را فراخوانی کند، آنگاه فرم به سمت سرور ارسال نخواهد شد.

در فرم زیر:
1. به text field بعدی بروید و `key:Enter` را فشار دهید. 
2. روی `<input type="submit">` کلیک کنید. 

هر دو فعالیت `alert` را نمایش می‌دهند و فرم به دلیل `return false` به هیچ جا فرستاده نمی‌شود: 

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  را بزنید enter ،input field  در <input type="text" value="text"><br>
  را کلیک کنید "submit" دوم: <input type="submit" value="Submit">
</form>
```

````smart header="`click` و `submit` ارتباط میان"
.فعال می‌شود `<input type="submit">` روی `click` event فرستاده می‌شود یک `key:Enter` با input field وقتی که یک فرم در یک

این نسبتا خنده‌دار است زیرا هیچ کلیکی اصلا وجود نداشته است.

در اینجا نسخه‌ی نمایشی هست:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="اینجا فوکوس کنید">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Method: submit

برای اینکه یک فرم را به صورت دستی submit کنیم، می‌توانیم `form.submit()` را فراخوانی کنیم.

آنگاه `submit` event ایجاد نمی‌شود. تصور می‌شود که اگر برنامه‌نویس `form.submit()` را فراخونی کند، آنگاه script خودش تمام پردازش‌های مربوطه را انجام می‌دهد.

Sometimes that's used to manually create and send a form, like this:
گاهی اوقات معمول ایت است که یک فرم را با این روش ایجاد و ارسال کنند.

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// شود submit باشد تا document فرم باید در
document.body.append(form);

form.submit();
```
