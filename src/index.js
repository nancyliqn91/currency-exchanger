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
  const countrySelect = document.querySelector('#country');
  const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
  console.log(selectedCountry);

  const customInput = document.querySelector('#custom').value.toUpperCase();
  console.log(customInput);
  // const currency = parseFloat(response['conversion_rates'][selectedCountry]);

  if (selectedCountry != undefined) {
    const currency = response['conversion_rates'][selectedCountry];
    console.log(currency);
    const money = parseInt(enteredAmount * currency * 1000) /1000;
    document.querySelector('#showResponse').innerText = `The currency is ${currency}, the money is ${money}.`;
  }

  if (customInput != undefined) {
    let currencyArray = response['conversion_rates'];
    if (currencyArray.hasOwnProperty(customInput)) { 
      const customCurrency = response['conversion_rates'][customInput];
      const money = parseInt(enteredAmount * customCurrency * 1000) /1000;
      document.querySelector('#showResponse').innerText = `The currency is ${customCurrency}, the money is ${money}.`;
    } else {
      printCurrencyError()
    }
  }
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data: 
  ${error}.`
}

function printCurrencyError() {
  document.querySelector('#currencyResponse').innerText = `There was an error accessing the currency data: 
  ${customInput} in question doesn't exist.`;;
}

function handleFormSubmission(event) {
  event.preventDefault();
  getCurrency();
  // countrySelect.value = null;
}

// not loadend
window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
