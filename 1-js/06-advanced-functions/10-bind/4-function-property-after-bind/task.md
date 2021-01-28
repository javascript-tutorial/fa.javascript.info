importance: 5

---

# ویژگی تابع پس از بسته شدن

یک مقدار در ویژکی تابع وجود دارد. آیا پس از `bind` تغییر میکند؟‌چرا یا چرا نه؟

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // خروجی چیست؟‌چرا؟
*/!*
```

