# The Modern JavaScript Tutorial in Persian (Farsi)

This repository hosts the translation of <https://javascript.info> in Persian (Farsi).

**That's how you can contribute:**

- See the [Persian (Farsi) Translate Progress](https://github.com/javascript-tutorial/fa.javascript.info/issues/1) issue.
- Choose an unchecked article you'd like to translate.
- Add a comment with the article title to the issue, e.g. `An Introduction to JavaScript`.
    - Our bot will mark it in the issue, for everyone to know that you're translating it.
    - Your comment should contain only the title.
- Fork the repository, translate and send a PR when done.
    - PR title should match article title, the bot will write it's number into the issue.

Please kindly allow maintainers to review and merge or request changes in your translation.
   
If maintainers do not respond, or if you'd like to become a maintainer, write us at the [main repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new).
    
**Let others know what you're translating, in message boards or chats in your language. Invite them to join!**

🎉 Thank you!

Your name and the contribution size will appear in the "About project" page when the translation gets published.

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.

The list of contributors is available at <https://javascript.info/about#contributors>.
The full list of languages can be found at <https://javascript.info/translate>.
## Structure

Every chapter, an article or a task resides in its own folder.

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

A file starts with the `# Title Header`, and then the text in Markdown-like format, editable in a simple text editor. 

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

Please keep line breaks and paragraphs "as is": don't add newlines and don't remove existing ones. Makes it easy to merge future changes from the English version into the translation. 

If you see that the English version can be improved – great, please send a PR to it.

### Terms

- Some specification terms are not to be translated, e.g. "Function Declaration" can be left "as is".
- For other terms like `resolved promise`, `slash`, `regexp`, and so on look a good glossary, hopefully there's one for your language already.
    - If there's no dictionary, look for translations in manuals, such as [MDN](https://developer.mozilla.org/en-US/).

### Text in Code Blocks

- Translate comments.
- Translate user-messages and example strings.
- Don't translate variables, classes, identifiers.
- Ensure that the code works after the translation :)

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### External Links

If an external link is to Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, and a version of that article exists in your language that is of decent quality, link to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, a partially translated version is ok.

If a linked article has no translated version, leave the link "as is".

### Metadata

Some files, usually tasks, have YAML metadata at the top, delimited by `---`:

```md
importance: 5

---
...
```

Please don't translate "importance" (and other top metadata).

### Anchors

Some headers have `[#anchor]` at the end, e.g.

```md
## Spread operator [#spread-operator]
```

Please don't translate or remove the `[#...]` part, it's for URL anchors.

<div dir="rtl">
    
## نکات ترجمهٔ فارسی
در این بخش، نکاتی مختص ترجمه به زبان فارسی را بررسی می‌کنیم. لطفاً قبل از خواندن این بخش، [نکات کلی ترجمه](#translation-tips) را مطالعه کنید.
    
### نیم‌فاصله
نیم‌فاصله، نویسه‌ای در استاندارد یونی‌کد است که برای حروفچینی کامپیوتری برخی خط‌ها همچون خط فارسی و خط‌های هندیک به‌کار می‌رود.[^1]
برای خوانایی بهتر متن لطفاً از آن استفاده کنید اما اگر قصد انجام چنین کاری را ندارید، لطفاً در هیچ کجای متن از آن استفاده نکنید تا ترجمه‌ای یک‌دست داشته باشیم. 

برای آشنایی با نحوهٔ استفاده از نیم‌فاصله، به صفحهٔ آن [^1] در ویکی‌پدیای فارسی مراجعه کنید.  
    
### ترجمۀ کامنت‌ها در کد
ترجمۀ کامنت‌ها می‌تواند کمی سخت باشد. کامنت‌ها دو حالت دارند:  

1. کامنت‌هایی که در ترجمۀ آن‌ها کلمۀ انگلیسی وجود ندارد.  
2. کامنت‌هایی که در ترجمۀ آن‌ها کلمۀ انگلیسی وجود دارد.  

کامنت‌های نوع اول خوانایی خود را در کد حفظ می‌کنند. اما به دلیل اینکه کد از چپ به راست نوشته و خوانده می‌شود، کامنت‌های نوع دوم خوانایی خوبی ندارند.  

ما اینجا روشی را معرفی می‌کنیم تا این کامنت‌ها به راحتی متن اصلی خوانده شوند.  

زمانی که نوشتن از چپ به راست است اگر شما به فارسی چیزی بنویسید، در صورت وجود کلمۀ انگلیسی، ترتیب خواندن جمله بهم می‌ریزد.  

بیایید با یک مثال این را نشان دهیم:

<div dir="ltr">
    
```
...code...

// امروز John را دیدم

...code...
```
</div>

همانطور که می‌بینید، ترتیب جمله بالا به دلیل وجود کلمه "John" تغییر کرده است. اگر به طور معمولی و از راست به چپ جمله را بخوانیم، اینگونه خواهد بود: «را دیدم John امروز».
اما در اصل جمله باید اینگونه خوانده شود: «امروز John را دیدم».  

حالا بیایید ترتیب جمله در کد را تغییر دهیم:  

<div dir="ltr">
    
```
...code...

// را دیدم John امروز

...code...
```
</div>

حالا می‌توانیم جمله را با ترتیب درست بخوانیم. بیایید به تغییرات دقت کنیم. در جمله بالایی «را دیدم» سمت راست بود اما حالا سمت چپ. موقعیت "John" تفاوتی نداشته اما «امروز» هم جابجا شده و سمت راست قرار گرفته است.  

بنابراین ما با جابجایی کلمات فارسی نسبت به کلمات انگلیسی، توانستیم جمله را خوانا کنیم. حالا بیایید یک مثال طولانی‌تر ببینیم:

<div dir="ltr">

```
...code...

// امروز John را همراه با Merry دیدم

...code...
```
</div>

برای اینکه ترتیب این جمله را درست کنیم، باید جمله را به طور برعکس بنویسیم؛ یعنی از سمت راست به چپ هر کلمه را دوباره بنویسیم:

<div dir="ltr">

```
...code...

// امروز John را همراه با Merry دیدم  
// دیدم Merry را همراه با John امروز

...code...
```
</div>

در مثال بالا با شروع از سمت راست جمله، اینگونه عمل کردیم:  

1. به کلمه «دیدم» رسیدیم و در خط پایین آن را نوشتیم.
2. سپس به کلمه "Merry" رسیدیم و آن را نوشتیم.
3. به عبارت «را همراه با» رسیدیم و آن را نوشتیم.
4. پس از آن "John" را نوشتیم.
5. و سرانجام «امروز».

در نهایت باید جمله بالایی را پاک کنیم پس نتیجه نهایی اینگونه است:

<div dir="ltr">

```
...code...

// دیدم Merry را همراه با John امروز

...code...
```
</div>

همانطور که می‌بینید، با نوشتن جملۀ بالایی به صورت برعکس، به جملۀ پایین با ترتیب درست رسیدیم.

این نحوۀ نوشتن ترجمۀ کامنت‌هایی است که کلمات انگلیسی دارند. با برعکس کردن ترتیب جملۀ ترجمه شده!

این روش ممکن است کمی دشوار به نظر برسد اما ارزش آن را دارد. فراموش نکنید خوانا بودن متن به فهم آن کمک زیادی می‌کند.

**توجه کنید که این روش تنها برای ترجمۀ کامنت‌ها استفاده می‌شود و متن اصلی به این روش نیازی ندارد.** متن اصلی مانند جملات بالایی و به صورت معمولی ترجمه می‌شود.
    
در صورتی که راه بهتری را برای ترجمۀ کامنت‌ها سراغ دارید ممنون می‌شویم با [ساختن یک issue](https://github.com/javascript-tutorial/fa.javascript.info/issues/new/choose)
آن را با ما در میان بگذارید.

### ترجمۀ ارورها در کامنت
در بعضی از کدهای موجود در این آموزش، ارورهایی که هنگام اجرای کد به آن‌ها برمی‌خوریم به صورت کامنت نوشته شده‌اند.  
    
لطفا قبل از ترجمۀ ارورها، کد مربوط به آن را اجرا کنید (برای این کار می‌توانید به صفحۀ انگلیسی مقاله در [javascript.info](https://javascript.info) مراجعه کنید). پس از اجرای کد به ارور نمایش داده شده دقت کنید: اگر ارور دقیقا همان چیزی بود که در کامنت نوشته شده بود آن را ترجمه نکنید، در غیر این صورت کامنت نیاز به ترجمه دارد.
    
### ترجمۀ رشته‌ها (string)
به طور کلی ترجمۀ رشته‌ها مشکلی ایجاد نمی‌کند. اما اینکه رشته درون مرورگر نمایش داده خواهد شد یا نه تاثیرگذار است.
    
زمانی که ترجمۀ رشته‌ای کلمۀ انگلیسی ندارد هم در کد خوانا است و هم زمان نمایش در مرورگر. اما رشته‌ای که حاوی کلمۀ انگلیسی باشد در کد خوانا نیست ولی در مرورگر به درستی و از راست به چپ نمایش داده می‌شود.   
    
پس لطفا زمان ترجمۀ رشته‌ها به این دقت کنید که رشته درون `alert` (یا تابع‌هایی که در مرورگر پیامی را نمایش می‌دهند) قرار می‌گیرد یا نه. در صورتی که رشته درون این تابع قرار داشت، ترجمۀ آن مانند متن اصلی است اما اگر خلاف این بود، ترجمۀ آن مانند [کامنت‌های درون کد](#ترجمۀ-کامنتها-در-کد) است یعنی با برعکس کردن جملۀ ترجمه شده.
</div>

[^1]: [نیم‌فاصله در ویکی‌پدیای فارسی](https://fa.wikipedia.org/wiki/%D9%81%D8%A7%D8%B5%D9%84%D9%87_%D9%85%D8%AC%D8%A7%D8%B2%DB%8C)

## Running locally

You can run the tutorial server locally to see how the translation looks.

The server and install instructions are at <https://github.com/javascript-tutorial/server>. 
---  
