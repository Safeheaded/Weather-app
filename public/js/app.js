/* fetch("http://localhost:3000/weather?address=!").then(response =>
  response.json().then(data => console.log(data))
).catch(error => console.log(error)); */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementsByTagName("form")[0];
  const input = form.getElementsByTagName("input")[0];

  const firstMessage = document.getElementById('current-temperature');
  const secondsMessage = document.getElementById('feeling-temperature');
  const errorParagraph = document.getElementById('error');

  form.addEventListener("submit", e => {
    e.preventDefault();
    firstMessage.textContent = "Loading...";
    secondsMessage.textContent = "";
    const text = input.value; 
    fetch(`http://localhost:3000/weather?address=${text}`) 
    .then(response => response.json().then(({temperature: {temperature, apparentTemperature}}) => {
      firstMessage.textContent = temperature;
      secondsMessage.textContent = apparentTemperature;
    })).catch(error => errorParagraph.textValue = error)
    .catch(error => errorParagraph.textValue = error);
  }); 
}); 
 