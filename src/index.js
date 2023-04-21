import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service';

// Business Logic

async function getCurrency(country) {
  const response = await CurrencyService.getCurrency(country);
  if (response.main) {
    printElements(response, country);
  } else {
    printError(response, country);
  }
}

// UI Logic

function printElements(response, country) {
  document.querySelector('#showResponse').innerText = `The currency in ${country} is ${response[conversion_rates].[${country}]}
  `;
}

function printError(error, country) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data for ${country}: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const country = document.getElementById('#country').value;
  document.getElementById('#country').value = null;
  getCurrency(country);
}

// not loadend
window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
