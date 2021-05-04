فقط درون شیء حلقه بزنید تا اگر حداقل یک ویژگی وجود داشته باشد `return false` را انجام دهد.

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
