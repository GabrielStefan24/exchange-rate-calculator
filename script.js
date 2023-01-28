const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch the exch rate and update DOM
function exchange() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch("https://open.exchangerate-api.com/v6/latest")
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountTwo.value = (amountOne.value * rate).toFixed(3);
    });
}

// Event list
currencyOne.addEventListener("change", exchange);
amountOne.addEventListener("input", exchange);
currencyTwo.addEventListener("change", exchange);
amountTwo.addEventListener("input", exchange);
swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  exchange();
});
exchange();
