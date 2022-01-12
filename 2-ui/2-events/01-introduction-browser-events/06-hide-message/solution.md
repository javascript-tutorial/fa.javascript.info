
برای اضافه کردن دکمه می‌توانیم از `position:absoulute` (و روی pane از `position:relative` استفاده کنیم) یا اینکه از `float:right` استفاده کنیم. استفاده از `float:right` این مزیت را دارد که دکمه هیچ‌وقت روی متن قرار نمیگیرد. اما `position:absolute` ازادی عمل بیشتری در اختیار ما می‌گذار. انتخاب بر عهده شماست.

بعد برای هر پیام کد چیزی شبیه این خواهد بود:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

سپس `<button>` همان `pane.firstChild` می‌شود. پس می‌توانیم یک کنترل‌کننده به آن اختصاص دهیم. مانند زیر:

```js
pane.firstChild.onclick = () => pane.remove();
```
