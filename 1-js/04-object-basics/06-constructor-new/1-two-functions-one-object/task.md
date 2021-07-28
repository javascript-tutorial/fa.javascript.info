importance: 2

---

# دو تابع - یک شیء

<<<<<<< HEAD
آیا امکان دارد که تابع های `A` و `B` را به گونه ای ساخت که `new A()==new B()`؟
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // درست
```

اگر امکان دارد، پس یک مثال از کدهایشان تهیه کنید. 
