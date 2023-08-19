# Form properties و methods

فرم‌ها و control elementها مثل `<input>` دارای prperty و eventهای ویژه‌ای هستند.

وقتی فرم‌ها را یاد بگیریم، کار کردن با آن‌ها بسیار راحت‌تر می‌شود.

## Navigation: form and elements

فرم‌های document از اعضای مجموعه‌ی ویژه‌ی `document.forms` هستند.

این به اصطلاح یک مجموعه‌ی نام‌گذاری شده است: هم نام‌گذاری شده و هم ترتیب‌دار شده است. برای دسترسی به فرم می‌توانیم هم از نام آن و هم از شماره‌ی آن در document استفاده کنیم.


```js no-beautify
document.forms.my; // "my" = فرم با نام
document.forms[0]; // document اولین فرم در
```

وقتی یک فرم داریم،‌ در این صورت هر elementای در مجموعه‌ی نام‌گذاری شده با `form.elements` قابل دسترسی است.

برای مثال:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // form گرفتن
  let form = document.forms.my; // <form name="my"> element

  // element گرفتن
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

ممکن است elementهای زیادی با نام یکسان وجود داشته باشند. این در مورد radio buttonها و checkboxها معمول است.

در آن صورت، `form.elements[name]` یک *مجموعه*‌است. برای مثال:‌

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

این navigation propertyها به tag structure وابستگی ندارند. تمام control elementها، فرقی ندارد چقدر در فرم عمیق باشند، در `form.elements` قابل دسترسی هستند.


````smart header="Fieldsets as \"subforms\""
.را درون خود فهرست می‌کنند form controls دارند که `elements` property در خودش داشته باشد. آن‌ها همچنین `<fieldset>` elements یک فرم ممکن است یک یا چند

For instance:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // .دریافت کنیم fieldset و هم از form را با نام هم از input ما می‌توانیم
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="نماد کوتاه‌تر: `form.name`"
.دسترسی داشته باشیم element به `form[index/name]` کوتاه‌تر هم وجود دارد: ما می‌توانیم با notation یک

به عبارت دیگر، به جای `form.elements.login` می‌توانیم بنویسیم `form.login`. 

آن هم کار می‌کند، ولی یک مشکل جزئی وجود دارد: اگر به یک element دسترسی داشته باشیم، و بعد `name` آن را تغییر بدهیم، آنگاه آن هنوز با نام قدیمی قابل دسترسی است (همچنین با نام جدید)

آسان‌تر است که آن را در یک مثال ببینیم:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, همان <input>

  form.login.name = "username"; // را تغییر می‌دهد input نام

  // می‌کند update را name، forms.elements
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // را مجاز می‌کند: هم جدید و هم قدیمی name فرم هر دو 
  alert(form.username == form.login); // true
*/!*
</script>
```

با این حال، این معمولا یک مشکل نیست، چون ما به ندرت نام elementهای فرم را تغییر می‌دهیم.

````

## Backreference: element.form

برای هر elementای، فرم به عنوان `element.form` قابل دسترسی است. بنابراین یک فرم به همه‌ی elementها ارجاع می‌دهد و elementها هم به فرم ارجاع می‌دهند.

این هم تصویرش است:

![](form-navigation.svg)

برای مثال:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Form elements

.صحبت کنیم form controls بیایید درباره‌ی 

### input and textarea

.به مقدار آن‌ها دسترسی داشته باشیم radio buttons و checkboxes برای `input.value` (string) یا `input.checked` (boolean) ما می‌توانیم با

مثل این:

```js
input.value = "جدید value";
textarea.value = "جدید text";

input.checked = true; // radio button یا checkbox برای یک
```

```warn header="Use `textarea.value`, نه `textarea.innerHTML`"
.به آن دسترسی داشته باشیم `textarea.innerHTML` تو در تو حفظ می‌کند اما ما هرگز نباید از طریق HTML مقدار خود را به عنوان `<textarea>...</textarea>` لطفا توجه کنید که با اینکه

.که در ابتدا در صفحه بوده را ذخیره می‌کند، نه مقدار فعلی را HTML آن فقط
```

### select و option

:مهم دارد property سه `<select>` element یک

1. `select.options` -- `<option>` subelements مجموعه‌ای از 
2. `select.value` -- در حال حاضر انتخاب شده `<option>` *مقدار*
3. `select.selectedIndex` -- در حال حاضر انتخاب شده `<option>` *تعداد* 

:عرضه می‌کنند `<select>` کردن یک مقدار برای set آن‌ها سه راه مختلف برای

1. .قرار می‌دهد `true` آن را برابر `option.selected` و مقدار (برای مثال `select.options`) متناظر را پیدا می‌کند `<option>` عنصر 
2. .را برابر آن مقدار جدید قرار می‌دهد `select.value` اگر یک مقدار جدید را بدانیم:
3. .را برابر آن عدد قرار می‌دهد `select.selectedIndex` جدید را بدانیم: مقدار option number اگر

:اینجا مثالی از هر سه متد می‌بینیم

```html run
<select id="select">
  <option value="apple">سیب</option>
  <option value="pear">گلابی</option>
  <option value="banana">موز</option>
</select>

<script>
  // تمام سه خط کار یکسانی انجام می‌دهند
  select.options[2].selected = true; 
  select.selectedIndex = 2;
  select.value = 'banana';
  // .option از صفر شروع می‌شوند، پس اندیس دو یعنی سومین options :لطفا دقت داشته باشید
</script>
```

.به ندرت استفاده می‌شود attribute به طور همزمان انتخاب شوند. با این حال، این option داشته باشد، اجازه می‌دهد که چند attribute `چند` `<select>` های دیگر اگرcontrol برعکس بیشتر

.حذف/به آن اضافه کنید `<option>` subelements را از `selected` property برای چندین مقدار انتخاب شده، از روش اول برای تنظیم مقادیر استفاده کنید

:مقدار انتخاب‌شده را به دست آوریم ،multi-select اینجا یک مثال داریم از اینکه چگونه از یک

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // multi-select گرفتن تمام مقادیر انتخاب‌شده از
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

.موجود است <https://html.spec.whatwg.org/multipage/forms.html#the-select-element> در مشخصات `<select>` element مشخصات کامل

### جدید Option

:وجود دارد <option>` element کوتاه و زیبا برای ایجاد یک syntax یک [مشخصات](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) در

```js
option = new Option(text, value, defaultSelected, selected);
```

:را به صورت دستی مقداردهی کنیم. با این حال،‌ ممکن است کوتاه‌تر باشد پس اینجا پارامترها وجود دارند attributes استقاده کنیم و `document.createElement('option')` اختیاری است، ما می‌توانیم از syntax این

- `text` -- option متن درون,
- `value` -- option مقدار,
- `defaultSelected` -- ایجاد می‌شود `selected` HTML-attribute باشد `true` اگر
- `selected` -- انتخاب می‌شود option باشد `true` اگر

.انتخاب شده است یا نه option مشخص می‌کند که آیا `selected` در حالی که (آن را بگیریم `option.getAttribute('selected')` که ما می‌توانیم با) می‌کند set را HTML-attribute مقدار `defaultSelected` در این است که `selected` و `defaultSelected` تفاوت بین

(`false` یا به سادگی حذف شوند، مقدار پیش‌فرض هر دو) .باشند `false` یا `true` در عمل باید معمولا _هر دو_ مقدار

For instance, here's a new "unselected" option:

```js
let option = new Option("Text", "value");
// creates <option value="value">Text</option>
```

The same option, but selected:

```js
let option = new Option("Text", "value", true, true);
```

Option elements have properties:

`option.selected`
: Is the option selected.

`option.index`
: The number of the option among the others in its `<select>`.

`option.text`
: Text content of the option (seen by the visitor).

## References

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.

## Summary

Form navigation:

`document.forms`
: A form is available as `document.forms[name/index]`.

`form.elements`  
: Form elements are available as `form.elements[name/index]`, or can use just `form[name/index]`. The `elements` property also works for `<fieldset>`.

`element.form`
: Elements reference their form in the `form` property.

Value is available as `input.value`, `textarea.value`, `select.value`, etc. (For checkboxes and radio buttons, use `input.checked` to determine whether a value is selected.)

For `<select>`, one can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

These are the basics to start working with forms. We'll meet many examples further in the tutorial.

In the next chapter we'll cover `focus` and `blur` events that may occur on any element, but are mostly handled on forms.
