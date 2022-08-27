importance: 5

---

# فراخوانی محتوای یک آرایه

نتیجه چه خواهد بود؟ چرا؟

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```