برای پیدا کردن واروواژه‌ها، بیایید هر کلمه را به حروف آن تقسیم کنیم و مرتبش کنیم. زمانی که حروف مرتب شوند، تمام واروواژه‌ها یکسان هستند.

برای مثال:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

ما از کلمه‌هایی که حروف آنها مرتب شده‌اند به عنوان کلید map استفاده می‌کنیم تا فقط یک مقدار را به ازای یک کلید ذخیره کنیم:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // کلمه را به حروف آن تقسیم می‌کنیم، آنها را مرتب می‌کنیم و به یکدیگر متصل می‌کنیم
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

ترتیب‌بندی حروف با زنجیره‌ای از فراخوانی‌ها در خط `(*)` انجام می‌شود.

برای اینکه بهتر شود بیایید آن را به چندین خط تقسیم کنیم:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

دو کلمه متفاوت `'PAN'` و `'nap'` کلمه یکسان `'anp'` که حروف آن مرتب شده است را دریافت می‌کنند.

خط بعدی کلمه را درون map قرار می‌دهد:

```js
map.set(sorted, word);
```

اگر ما هر زمانی دوباره کلمه‌ای با شکل یکسانی از حروف مرتب شده آن را ببینیم، سپس جایگزین مقدار قبلی می‌شود که کلید یکسانی در map دارد. پس ما همیشه حداکثر یک کلمه به ازای شکل مرتب شده آن داریم.

در پایان `Array.from(map.values())` یک حلقه‌پذیر از مقدارهای map دریافت می‌کند (ما به کلیدها در نتیجه احتیاجی نداریم) و یک آرایه از آنها برمی‌گرداند.

اینجا ما می‌توانستیم به جای `Map` از شیء ساده هم استفاده کنیم چون کلیدها رشته هستند.

راه حل ما اینگونه به نظر می‌رسد:

```js run
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
