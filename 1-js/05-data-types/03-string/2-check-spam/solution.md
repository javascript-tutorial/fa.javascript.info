برای اینکه جستجو را به بزرگی یا کوچکی حرف حساس نکنیم، بیایید حروف رشته را کوچک کنیم و سپس جستجو کنیم:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

