importance: 5

---

# تغییر "prototype"

در کد زیر `new Rabbit` را ایجاد می‌کنیم و سپس سعی می‌کنیم پروتوتایپ آن را تغییر دهیم.

در شروع، ما این کد را داریم:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


1. یک رشته دیگر اضافه کردیم (تاکید شده). اکنون `alert` چه چیزی را نشان می‌دهد؟

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...و اگر کد به این صورت باشد (یک خط جایگزین شده است)؟

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

3. و مثل این (یک خط جایگزین شده است)؟

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. آخرین نوع:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
