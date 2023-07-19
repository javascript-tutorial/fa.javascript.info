راه‌های زیادی برای آن وجود دارد.

اینجا برخی از آن‌ها را می‌بینیم:

```js
// 1. جدول یا `id="age-table"`
let table = document.getElementById('age-table')

// 2. تمام عناصر label داخل آن جدول
table.getElementsByTagName('label')
// یا
document.querySelectorAll('#age-table label')

// 3. اولین td داخل آن جدول (با کلمه‌ی "Age")
table.rows[0].cells[0]
// یا
table.getElementsByTagName('td')[0]
// یا
table.querySelector('td')

// 4. form با نام "search"
// با فرض اینکه فقط یک element با نام "search" در document است. 
let form = document.getElementsByName('search')[0]
// یا به طور خاص،‌form
document.querySelector('form[name="search"]')

// 5. اولین input درون form
form.getElementsByTagName('input')[0]
// یا 
form.querySelector('input')

// 6. آخرین input در آن فرم
let inputs = form.querySelectorAll('input') // تمام inputها را پیدا می‌کند. 
inputs[inputs.length-1] // آخری را می‌گیرد
```
