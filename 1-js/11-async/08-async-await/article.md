# Async/await

یک روش خاص برای کار با Promise ها به شیوه راحتتر وجود دارد که به آن "async/await" گفته می شود. فهمیدن و استفاده از آن به شکل غافلگیر کننده راحت است.

## توابع Async

بیایید با کلیدواژه `async` شروع کنیم. این کلیدواژه قبل از یک تابع قرار می گیرد، مانند زیر:

```js
async function f() {
  return 1;
}
```

وجود کلمه "async" قبل از یک تابع یک معنی ساده می دهد: تابع همیشه یک Promise برمی گرداند. سایر مقادیر به صورت خودکار با یک Promise انجام شده در بر گرفته می شوند.

برای نمونه، این تابع یک Promise انجام شده با مقدار `1` را برمی گرداند؛ بیایید امتحان کنیم:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

... ما می‌توانیم به طور مستقیم یک Promise را برگردانیم، که همان خواهد بود:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

بنابراین، `async` تضمین می کند که تابع یک Promise برمی گرداند و قسمت های غیر Promise آن را در بر می گیرد. ساده است، نه؟ اما فقط این نیست. کلیدواژه دیگری به اسم `await` وجود دارد که فقط داخل توابع `async` کار می کند.

## Await

به شکل زیر استفاده می شود:

```js
// تنها در توابع async کار می کند
let value = await promise;
```

کلیدواژه `await` باعث می شود که جاوااسکریپت تا اجرا شدن آن Promise صبر کند و مقدار آن را برگرداند.

در اینجا مثالی از یک Promise داریم که در مدت ۱ ثانیه با موفقیت اجرا می شود:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // صبر می کند تا پرامیس با موفقیت اجرا شود (*)
*/!*

  alert(result); // "done!"
}

f();
```

اجرای تابع در خط `(*)` متوقف می شود و زمانی که Promise اجرا شد ادامه می یابد، به صورتی که ‍`result` نتیجه آن می شود. بنابراین قطعه کد بالا مقدار "!done" را طی یک ثانیه نمایش می دهد.

Let's emphasize: `await` literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn't cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

It's just a more elegant syntax of getting the promise result than `promise.then`. And, it's easier to read and write.

````warn header="Can't use `await` in regular functions"
If we try to use `await` in a non-async function, there would be a syntax error:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

We may get this error if we forget to put `async` before a function. As stated earlier, `await` only works inside an `async` function.
````

Let's take the `showAvatar()` example from the chapter <info:promise-chaining> and rewrite it using `async/await`:

1. We'll need to replace `.then` calls with `await`.
2. Also we should make the function `async` for them to work.

```js run
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Pretty clean and easy to read, right? Much better than before.

````smart header="Modern browsers allow top-level `await` in modules"
In modern browsers, `await` on top level works just fine, when we're inside a module. We'll cover modules in article <info:modules-intro>.

For instance:

```js run module
// we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
````

````smart header="Async class methods"
To declare an async class method, just prepend it with `async`:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
The meaning is the same: it ensures that the returned value is a promise and enables `await`.

````
## Error handling

If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.

This code:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...is the same as this:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

In real situations, the promise may take some time before it rejects. In that case there will be a delay before `await` throws an error.

We can catch that error using `try..catch`, the same way as a regular `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

If we don't have `try..catch`, then the promise generated by the call of the async function `f()` becomes rejected. We can append `.catch` to handle it:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
```

````smart header="`async/await` works well with `Promise.all`"
When we need to wait for multiple promises, we can wrap them in `Promise.all` and then `await`:

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````

## Summary

The `async` keyword before a function has two effects:

1. Makes it always return a promise.
2. Allows `await` to be used in it.

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:

1. If it's an error, an exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
