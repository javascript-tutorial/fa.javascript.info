
ترفند خاصی وجود ندارد. فقط `catch.` را با `try..catch` در داخل `demoGithubUser` جایگزین کنید و `async/await` را در جایی که نیاز است اضافه کنید:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// نام کاربری را می پرسد تا زمانی که گیت هاب یک کاربر معتبر برگرداند
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // خطایی رخ نداده است، از حلقه خارج می شود
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // حلقه بعد از alert ادامه می یابد
        alert("No such user, please reenter.");
      } else {
        // خطای ناشناخته، مجدد throw می شود
        throw err;
      }
    }      
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
```
