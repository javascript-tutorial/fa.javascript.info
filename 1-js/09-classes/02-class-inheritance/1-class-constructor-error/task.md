importance: 5

---

# ارور در ساختن نمونه

اینجا کدی داریم که `Rabbit` کلاس `Animal` را تعمیم می‌دهد.

متاسفانه، شیءهای `Rabbit` نمی‌توانند ساخته شوند. چه چیزی اشتباه است؟ آن را درست کنید.
```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("خرگوش سفید"); // تعریف نشده است this :ارور
*/!*
alert(rabbit.name);
```
