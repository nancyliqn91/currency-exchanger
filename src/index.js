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
  const countrySelect = document.querySelector('#country');
  const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
  const enteredAmount = parseFloat(document.getElementById('usd').value);
  const currency = parseFloat(response['conversion_rates'][selectedCountry]);
  const money = parseInt(enteredAmount * currency * 1000) /1000;
  document.querySelector('#showResponse').innerText = `The currency is ${currency}, the money is ${money}.`;
  // countrySelect.value = null;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  getCurrency();
}

// not loadend
window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
