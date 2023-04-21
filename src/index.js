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
    printError(response['error-type']);
  }
}

// UI Logic

function printElements(response) {
  console.log(response);
  const countrySelect = document.querySelector('#country');
  const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
  console.log(selectedCountry);
  document.querySelector('#showResponse').innerText = `The currency is ${response['conversion_rates'][selectedCountry]}
  `;
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
