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

<<<<<<< HEAD
توجه داشته باشید که پرانتزهای دور `age > 18` لازم نیست. برای خوانایی نوشته شده‌ند.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
