importance: 5

---

# ویژگی تابع بعد از پیوند زدن

یک مقدار در ویژگی تابعی وجود دارد. آیا بعد از `bind` تغییر می‌کند؟ چرا یا چرا نه؟

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // خروجی چه خواهد بود؟ چرا؟
*/!*
```

