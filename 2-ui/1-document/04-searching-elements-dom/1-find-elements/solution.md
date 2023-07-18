راه‌های زیادی برای آن وجود دارد.

اینجا برخی از آن‌ها را می‌بینیم:

```js
// 1. جدول یا `id="age-table"`
let table = document.getElementById('age-table')

// 2. تمام عناصر label داخل آن جدول
table.getElementsByTagName('label')
// or
document.querySelectorAll('#age-table label')

// 3. اولین td داخل آن جدول (با کلمه‌ی "Age")
table.rows[0].cells[0]
// or
table.getElementsByTagName('td')[0]
// or
table.querySelector('td')

// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
let form = document.getElementsByName('search')[0]
// or, form specifically
document.querySelector('form[name="search"]')

// 5. The first input in that form.
form.getElementsByTagName('input')[0]
// or
form.querySelector('input')

// 6. The last input in that form
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
```
