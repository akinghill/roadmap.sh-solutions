// Selecting all necessary DOM elements
const temperatureInput = document.getElementById('temperature');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertButton = document.getElementById('convertButton');
const resultDisplay = document.getElementById('result');

// Function to enable/disable convert button
function checkFields() {
  if (temperatureInput.value && fromUnit.value && toUnit.value) {
    convertButton.disabled = false;
  } else {
    convertButton.disabled = true;
  }
}

// Event listeners to check when all fields are filled
temperatureInput.addEventListener('input', checkFields);
fromUnit.addEventListener('change', checkFields);
toUnit.addEventListener('change', checkFields);

// Temperature conversion function
function convertTemperature(temp, from, to) {
  if (from === to) {
    return temp;
  }

  let convertedTemp;

  // Fahrenheit to other units
  if (from === 'Fahrenheit') {
    if (to === 'Celsius') {
      convertedTemp = (temp - 32) * 5 / 9;
    } else if (to === 'Kelvin') {
      convertedTemp = (temp - 32) * 5 / 9 + 273.15;
    }
  }

  // Celsius to other units
  else if (from === 'Celsius') {
    if (to === 'Fahrenheit') {
      convertedTemp = (temp * 9 / 5) + 32;
    } else if (to === 'Kelvin') {
      convertedTemp = temp + 273.15;
    }
  }

  // Kelvin to other units
  else if (from === 'Kelvin') {
    if (to === 'Fahrenheit') {
      convertedTemp = (temp - 273.15) * 9 / 5 + 32;
    } else if (to === 'Celsius') {
      convertedTemp = temp - 273.15;
    }
  }

  return convertedTemp;
}

// Event listener for convert button
convertButton.addEventListener('click', function (e) {
  e.preventDefault();

  const temperature = parseFloat(temperatureInput.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  const convertedValue = convertTemperature(temperature, from, to);
  resultDisplay.textContent = `Converted Temperature: ${convertedValue.toFixed(2)} ${to}`;
});