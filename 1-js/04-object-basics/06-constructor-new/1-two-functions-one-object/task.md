importance: 2

---

# دو تابع - یک شیء

آیا امکان دارد که تابع های `A` و `B` را به گونه ای ساخت که `new A()==new B()`؟

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // درست
```

اگر امکان دارد، پس یک مثال از کدهایشان تهیه کنید. 
