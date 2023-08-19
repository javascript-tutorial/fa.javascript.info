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
input.value = "New value";
textarea.value = "New text";

input.checked = true; // radio button یا checkbox برای یک
```

```warn header="Use `textarea.value`, نه `textarea.innerHTML`"
.به آن دسترسی داشته باشیم `textarea.innerHTML` تو در تو حفظ می‌کند اما ما هرگز نباید از طریق HTML مقدار خود را به عنوان `<textarea>...</textarea>` لطفا توجه کنید که با اینکه

.که در ابتدا در صفحه بوده را ذخیره می‌کند، نه مقدار فعلی را HTML آن فقط
```

### select and option

:مهم دارد property سه `<select>` element یک

1. `select.options` -- `<option>` subelements مجموعه‌ای از 
2. `select.value` -- در حال حاضر انتخاب شده `<option>` *مقدار*
3. `select.selectedIndex` -- در حال حاضر انتخاب شده `<option>` *تعداد* 

:عرضه می‌کنند `<select>` کردن یک مقدار برای set آن‌ها سه راه مختلف برای

1. Find the corresponding `<option>` element (e.g. among `select.options`) and set its `option.selected` to `true`.
2. If we know a new value: set `select.value` to the new value.
3. If we know the new option number: set `select.selectedIndex` to that number.

Here is an example of all three methods:

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // all three lines do the same thing
  select.options[2].selected = true; 
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. This attribute is rarely used, though.

For multiple selected values, use the first way of setting values: add/remove the `selected` property from `<option>` subelements.

Here's an example of how to get selected values from a multi-select:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock  
</script>
```

The full specification of the `<select>` element is available in the specification <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

In the [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) there's a nice short syntax to create an `<option>` element:

```js
option = new Option(text, value, defaultSelected, selected);
```

This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:

- `text` -- the text inside the option,
- `value` -- the option value,
- `defaultSelected` -- if `true`, then `selected` HTML-attribute is created,
- `selected` -- if `true`, then the option is selected.

The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`, while `selected` sets whether the option is selected or not.

In practice, one should usually set _both_ values to `true` or `false`. (Or, simply omit them; both default to `false`.)

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
