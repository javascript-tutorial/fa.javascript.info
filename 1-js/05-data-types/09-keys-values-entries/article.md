
# متدهای Object.keys، values، entries

بیایید از ساختار داده‌های منحصر به فرد دور شویم و درباره حلقه‌زدن در آنها حرف بزنیم.

در فصل قبل ما متدهای `map.keys()`، `map.values()`، `map.entries()` را دیدیدم.

این متدها کلی هستند و یک توافق عمومی برای استفاده از آنها در ساختارهای داده وجود دارد. اگر ما هر زمان بخواهیم ساختار داده‌ی خودمان را بسازیم، باشد آنها را نیز پیاده‌سازی کنیم.

این‌ها برای ساختارهای زیر پشتیبانی می‌شوند:

- `Map`
- `Set`
- `Array`

شیءهای ساده هم متدهای مشابه را پشتیبانی می‌کنند اما سینتکس آن کمی فرق دارد.

## متدهای Object.keys، values، entries

برای شیءهای ساده، متدهای زیر موجود هستند:

- [Object.keys(obj)](mdn:js/Object/keys) -- آرایه‌ای از کلیدها برمی‌گرداند.
- [Object.values(obj)](mdn:js/Object/values) -- آرایه‌ای از مقدارها برمی‌گرداند.
- [Object.entries(obj)](mdn:js/Object/entries) -- آرایه‌ای از `[key, value]` برمی‌گرداند.

لطفا تفاوت‌ها را در نظر داشته باشید (برای مثال در مقایسه با map):

|             | Map              | شیء       |
|-------------|------------------|--------------|
| سینتکس فراخوانی | `map.keys()`  | `Object.keys(obj)`، اما `obj.keys()` نه |
| برمی‌گرداند     | حلقه‌پذیر    | آرایه «واقعی»                     |

اولین تفاوت این است که ما باید `Object.keys(obj)` را صدا بزنیم نه `obj.keys()`.

اما چرا؟ دلیل اصلی آن انعطاف‌پذیری است. به یاد داشته باشید، شیءها پایه تمام ساختارهای پیچیده در جاوااسکریپت هستند. پس ما می‌توانیم خودمان یک شیء مانند `data` داشته باشیم که متد `data.keys()` خودش را پیاده‌سازی کند. و ما همچنان می‌توانیم `Object.values(data)` را برای آن فراخوانی کنیم.

تفاوت دوم این است که متدهای `Object.*` شیءهای «واقعی» آرایه را برمی‌گردانند نه فقط یک حلقه‌پذیر. این موضوع دلایل تاریخی دارد.

برای مثال:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

اینجا یک مثال از استفاده کردن از `Object.values` برای حلقه‌زدن درون مقدارهای ویژگی‌ها داریم:

```js run
let user = {
  name: "John",
  age: 30
};

// حلقه‌زدن در مقدارها
for (let value of Object.values(user)) {
  alert(value); // سپس 30 ،John
}
```

```warn header="متد Object.keys/values/entries ویژگی‌های سمبلی را نادیده می‌گیرد"
درست مانند یک حلقه `for..in`، این متدها ویژگی‌هایی که از `Symbol(...)` به عنوان کلید استفاده می‌کنند را نادیده می‌گیرند.

معمولا این موضوع مشکلی ایجاد نمی‌کند. اما اگر ما کلیدهای سمبلی را هم بخواهیم، یک متد جداگانه [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) هم وجود دارد که یک آرایه از کلیدهای سمبلی را برمی‌گرداند. همچنین یک متد [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) وجود دارد که *تمام* کلیدها را برمی‌گرداند.
```


## Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we'd like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`, to transform these key/value pairs.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.
