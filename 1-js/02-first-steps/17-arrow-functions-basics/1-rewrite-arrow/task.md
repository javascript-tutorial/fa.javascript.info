# Arrow functionها را بازنویسی کنید

در کد زیر function expressionها را با arrow functionها جایگزین کنید:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function () {
    alert("You agreed.");
  },
  function () {
    alert("You canceled the execution.");
  }
);
```
