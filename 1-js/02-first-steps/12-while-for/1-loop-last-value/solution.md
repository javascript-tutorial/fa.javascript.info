پاسخ: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

در هر بار تکرار حلقه متغیر `i` به مقدار `1` عدد کم میشود. عبارت `while(i)` وقتی به `i = 0` برسد متوقف میشود.

حالا گام های حلقه به این صورت است ("تشریح حلقه"):

```js
let i = 3;

alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// تمام. عبارت while(i) حلقه را خاتمه میدهد
```
