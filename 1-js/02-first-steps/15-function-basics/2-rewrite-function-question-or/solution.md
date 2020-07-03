با استفاده از یک عملگر علامت سوال `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

با استفاده از OR `||` (کوتاه‌ترین حالت)

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

توجه داشته باشید که پرانتزهای دور `age > 18` لازم نیست. برای خوانایی نوشته شده‌ند.
