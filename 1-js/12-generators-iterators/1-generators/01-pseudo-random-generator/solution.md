```js run demo

function* pseudoRandom(seed) {

  let value = seed;

  while(true) {

    value = value * 16807 % 2147483647;

    yield value;

  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807

alert(generator.next().value); // 282475249

alert(generator.next().value); // 1622650073

```


توجه داشته باشید که این کار را با توابع عادی هم می‌توان انجام داد:

```js run

function pseudoRandom(seed) {

  let value = seed;

  return function() {

    value = value * 16807 % 2147483647;

    return value;

  }

}

let generator = pseudoRandom(1);

alert(generator()); // 16807

alert(generator()); // 282475249

alert(generator()); // 1622650073

```


این گونه هم کار می‌کند. منتها قابلیت iterate کردن با `for..of` و generator composition از دست می‌رود که ممکن است جای دیگری مفید باشند.
