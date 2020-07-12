برای این که یک `if` دقیقا مانند `switch` عمل کند باید از مقایسه `'==='` استفاده کند:

برای stringها یک مساوی معمولی `==` هم کفایت می‌کند

```js no-beautify
if (browser == "Edge") {
  alert("You've got the Edge!");
} else if (
  browser == "Chrome" ||
  browser == "Firefox" ||
  browser == "Safari" ||
  browser == "Opera"
) {
  alert("Okay we support these browsers too");
} else {
  alert("We hope that this page looks ok!");
}
```

دقت داشته باشید که این کدها `browser == 'Chrome' || browser == 'Firefox' …` برای خوانایی بیشتر به چند خط تقسیم شده‌اند:

ولی `switch` تمیزتر و بهتر است.
