```js run no-beautify
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// [john, mary, pete] :حالا آرایه مرتب شده به این شکل است
alert(arr[0].name); // John
alert(arr[2].name); // Pete
```
