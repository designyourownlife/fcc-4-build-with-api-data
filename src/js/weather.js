
function success(pos) {

  const apiUrl = `/.netlify/functions/weatherapi?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric`
  
  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('data: ', data)
      document.querySelector('#city').textContent = data.name;
      document.querySelector('#temp').textContent = data.main.temp + ' °C';
      document.querySelector('#main').textContent = data.weather[0].main;
      document.querySelector('#desc').textContent = data.weather[0].description;
      document.querySelector('.sk-circle').classList.add('hidden');
      //document.querySelector('.weatherData').classList.remove('hidden');
      document.querySelector('.weatherData').classList.add('animate');
     
    })
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
}