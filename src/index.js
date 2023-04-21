import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service';

// Business Logic

async function getCurrency(country) {
  const response = await CurrencyService.getCurrency(city);
  if (response.main) {
    printElements(response, country);
  } else {
    printError(response, country);
  }
}

// UI Logic

function printElements(response, country) {
  document.querySelector('#showResponse').innerText = `The currency in ${country} is ${response.main.}.
  `;
}

function printError(error, country) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data for ${country}: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const country = document.querySelector('#country').value;
  document.querySelector('#country').value = null;
  getCurrency(country);
}

// not loadend
window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
