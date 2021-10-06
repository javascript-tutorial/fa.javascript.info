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

### نیم‌فاصله
[نیم‌فاصله](https://fa.wikipedia.org/wiki/فاصله_مجازی) برای زیبایی متن استفاده می‌شود. لطفا در هنگام نوشتن متن به استفاده از آن توجه کنید. 
    
برای خوانایی بهتر لطفا از آن استفاده کنید اما اگر قصد انجام چنین کاری را ندارید، لطفا در هیچ کجای متن استفاده نکنید تا ترجمه یک‌دست باشد. 
    
استفاده از نیم‌فاصله در پلتفرم‌های مختلف (زبان کیبورد فارسی باشد):
- ویندوز: `(اعداد بالای کیبورد) ctrl + shift + 2` یا `(قسمت numpad) Alt + 0157`

</div>

## Running locally

You can run the tutorial server locally to see how the translation looks.

The server and install instructions are at <https://github.com/javascript-tutorial/server>. 
---  
