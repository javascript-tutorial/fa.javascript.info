<<<<<<< HEAD
``` js run

// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'number') {
      obj[key] *= 2;
    }
  }
}

alert(menu); 
```
=======
>>>>>>> 29a3c58d72b8f10f9f1f9ce5cf691d2ab44a9d01
