
# بازنویسی با استفاده از async/await

مثال کد زیر از بخش <info:promise-chaining> با استفاده از `async/await` بجای `then/catch.` بازنویسی کنید:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
```
