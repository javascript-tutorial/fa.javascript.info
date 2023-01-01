importance: 5

---

# چه مشکلی در تست(آزمون) وجود دارد؟

تست `pow` که در زیر آمده چه مشکلی دارد؟

```js
it("Raises x to the power n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```
از نظر سینتکس(نحوی) تست درست است و قبول می شود.
