import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service';

// Business Logic

async function getCurrency(country) {
  const response = await CurrencyService.getCurrency(country);
  if (response.main) {
    printElements(response);
  } else {
    printError(response);
  }
}

// UI Logic

function printElements(response) {
  document.querySelector('#showResponse').innerText = `The currency is ${response['conversion_rates'].country}
  `;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the currency data: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const country = document.getElementById('#country').value;
  console.log(country);
  document.getElementById('#country').value = null;
  getCurrency(country);
}

// not loadend
window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
