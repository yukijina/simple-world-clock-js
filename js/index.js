let cityInput = document.querySelector('#city');
let cityContainerEl = '';
let mainContainerEl = document.querySelector('.main-container');

function displaySelectedCity(event) {
  console.log(event.target.value);
  cityContainerEl = '';
  displayDefaultLocations(event.target.value);
}

cityInput.addEventListener('change', displaySelectedCity);

function displayDefaultLocations(...locations) {
  // console.log(arguments.length);
  locations.forEach((location) => {
    let date = moment().tz(location).format('MMMM Do, YYYY');
    let time = moment().tz(location).format('h:mm');
    let seconds = moment().tz(location).format('ss');
    let ampm = moment().tz(location).format('A');
    let formattedLocation = location.replace('_', ' ').split('/')[1];

    if (location === 'America/New_York') {
      cityContainerEl = '';
    }

    cityContainerEl += `
    <div class="world-clock-container">
    <div class="current-left">
    <h2 class="current-city">${formattedLocation}</h2>
    <p class="current-date">${date}</p>
    </div>
    <div class="current-right">
    <span class="current-time">${time}</span>
    <span class="current-seconds">${seconds}</span>
    <span class="current-ampm">${ampm}</span>
    </div>
    </div>`;

    mainContainerEl.innerHTML = cityContainerEl;
  });
}

displayDefaultLocations(
  'America/New_York',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney'
);

// setInterval(
//   displayDefaultLocations,
//   1000,
//   'America/New_York',
//   'Europe/Paris',
//   'Asia/Tokyo',
//   'Australia/Sydney'
// );
