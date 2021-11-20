بیایید با دقت نگاه کنیم که در فراخوانی `speedy.eat("سیب")` چه اتفاقی می‌افتد.

1. متد `speedy.eat` درون پروتوتایپ (`=hamster`) پیدا شده، سپس با `this=speedy` اجرا می‌شود (شیء قبل از نقطه).

2. سپس `this.stomach.push()` باید ویژگی `stomach` را پیدا کند و `push` را روی آن فراخوانی کند. به نظر می‌رسد این متد درون `this` (`=speedy`) به دنبال `stomach` می‌گردد، اما چیزی پیدا نشد.

3. سپس زنجیره پروتوتایپ را دنبال می‌کند و `stomach` را درون `hamster` پیدا می‌کند.

4. سپس `push` را روی آن فراخوانی می‌کند، که غذا را به *stomach درون پروتوتایپ* اضافه می‌کند.

پس تمام همسترها شکم (stomach) یکسانی را به اشتراک می‌گذارند!

هم برای `lazy.stomach.push(...)` و `speedy.stomach.push()`، ویژگی `stomach` درون پروتوتایپ پیدا شده است (چون درون خود شیء وجود ندارد)، سپس داده جدید به داخل آن فرستاده می‌شود.

لطفا توجه کنید که در صورت وجود یک مقداردهی ساده `this.stomach=` چنین چیزی اتفاق نمی‌افتد:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // this.stomach.push به جای this.stomach برابر قرار دادن با
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// غذا را پیدا کرد Speedy همستر
speedy.eat("سیب");
alert( speedy.stomach ); // سیب

// خالی است Lazy شکم همستر
alert( lazy.stomach ); // <هیچی>
```

حالا همه چیز به درستی کار می‌کند، چون `this.stomach=` در جست و جوی `stomach` نیست. مقدار به صورت مستقیم درون شیء `this` نوشته می‌شود.

همچنین می‌توانیم با اطمینان از اینکه هر همستر stomach خودش را دارا می‌باشد از این مشکل جلوگیری کنیم:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// غذا را پیدا کرد Speedy همستر
speedy.eat("سیب");
alert( speedy.stomach ); // سیب

// خالی است Lazy شکم همستر
alert( lazy.stomach ); // <هیچی>
```

به عنوان یک راه‌حل عام، تمام ویژگی‌هایی که وضعیت یک شیء خاص را توصیف می‌کنند، مانند `stomach` بالا، باید درون همان شیء نوشته شوند. این کار از بروز مشکلات جلوگیری می‌کند.
