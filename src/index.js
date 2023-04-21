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
  const enteredAmount = parseFloat(document.getElementById('usd').value);

  const customInput = document.getElementById('#custom').value.toUpperCase();
  console.log(customInput);

  const countrySelect = document.querySelector('#country');
  const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
  console.log(selectedCountry);

  if (customInput != undefined) {
    let currencyObj = response['conversion_rates'];
    if (Object.prototype.hasOwnProperty.call(currencyObj, customInput)) { 
      const enteredAmount = parseFloat(document.getElementById('usd').value);
      const customCurrency = response['conversion_rates'][customInput];

      const money = parseInt(enteredAmount * customCurrency * 1000) /1000;
      document.querySelector('#showResponse').innerText = `The currency is ${customCurrency}, the money is ${money}.`;
    } else {
      printCurrencyError(customInput);
    }
  }

  if (selectedCountry != undefined) {
    const currency = response['conversion_rates'][selectedCountry];
    const money = parseInt(enteredAmount * currency * 1000) /1000;
    document.querySelector('#showResponse').innerText = `The currency is ${currency}, the money is ${money}.`;
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
  // countrySelect.value = null;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
