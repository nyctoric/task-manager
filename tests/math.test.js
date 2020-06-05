const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math');

//THIS ONE ...
test('Should calculate total', () => {
  const total = calculateTip(10, .3);
  if (total !== 13) {
    throw new Error('Total tip should be 13.  Got ' + total);
  }
});

//IS EQUIVALENT TO THIS ONE -- using assertion expect().toBe()
test('Should calculate total', () => {
  const total = calculateTip(10, .3);
  expect(total).toBe(13);
});

test('Should convert 32 F to 0 C', () => {
  const celsiusOut = fahrenheitToCelsius(32);
  expect(celsiusOut).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
  const fahrenheitOut = celsiusToFahrenheit(0);
  expect(fahrenheitOut).toBe(32);
});



// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!
