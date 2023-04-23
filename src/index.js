import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service';

// Business Logic
async function getCurrency() {
  const response = await CurrencyService.getCurrency();
  if (response) {
    printElements(response);
  } else {
    printError(response);
  }
}

// UI Logic
function printElements(response) {
  const enteredAmount = parseInt(document.getElementById('usd').value);

  let customInput;
  if (document.getElementById('custom') != null) {
    customInput = document.getElementById('custom').value.trim();
    customInput = customInput !== '' ? customInput.toUpperCase() : undefined;
  } else {
    customInput = undefined;
  }

  const countrySelect = document.querySelector('#country');
  let selectedCountry;
  let inputCountry;
  if (countrySelect.selectedIndex !== 0) {
    selectedCountry = countrySelect.options[countrySelect.selectedIndex].value;
    inputCountry = countrySelect.options[countrySelect.selectedIndex].text;
  }

  if (customInput !== undefined && customInput !== '') {
    if (Object.prototype.hasOwnProperty.call(response['conversion_rates'], customInput)) {
      const customCurrency = response['conversion_rates'][customInput];
      const money = parseInt(enteredAmount * customCurrency * 1000) / 1000;
      document.querySelector('#showResponse').innerText = `The currency in ${customInput} is ${customCurrency}, the money is ${money}.`;
    } else {
      printCurrencyError(customInput);
    }
  } else {
    document.querySelector('#showResponse').innerText = '';
  }

  if (countrySelect != undefined && selectedCountry !== undefined) {
    const currency = response['conversion_rates'][selectedCountry];
    const money = parseInt(enteredAmount * currency * 1000) /1000;
    document.querySelector('#showResponse2').innerText = `The currency in ${inputCountry} is ${currency}, the money is ${money}.`;
  } else {
    document.querySelector('#showResponse2').innerText = '';
  }

}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data: ${error}.`;
}

function printCurrencyError(customInput) {
  document.querySelector('#currencyResponse').innerText = `There was an error accessing the currency data: ${customInput} in question doesn't exist.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  getCurrency();
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
})
