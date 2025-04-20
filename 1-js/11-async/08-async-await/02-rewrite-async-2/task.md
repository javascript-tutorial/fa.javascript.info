
# بازنویسی "rethrow" با async/await

در زیر ما مثالی از "rethrow" پیدا می کنیم. آن را با استفاده از ‍`async/await` بجای `then/catch.` بازنویسی کنید.

و از حالت بازگشتی در `demoGithubUser` خلاص شوید: با استفاده از `async/await` بسیار آسان می شود.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// نام کاربری را می پرسد تا زمانی که گیت هاب یک کاربر معتبر برگرداند
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
