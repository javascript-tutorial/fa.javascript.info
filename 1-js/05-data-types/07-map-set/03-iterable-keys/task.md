importance: 5

---

# کلیدهای حلقه‌پذیر

ما می‌خواهیم یک آرایه از `map.keys()` را دورن یک متغیر دیافت کنیم و سپس متدهای مخصوص آرایه را روی آن اعمال کنیم مانند `.push`.

اما کار نمی‌کند:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: numbers.push is not a function
keys.push("بیشتر");
*/!*
```

چرا؟ چگونه می‌توانیم کد را درست کنیم تا `keys.push` کار کند؟
