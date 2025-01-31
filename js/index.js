let cityInput = document.querySelector('#city');
let cityContainerEl = '';
let mainContainerEl = document.querySelector('.main-container');
let intervalId;

// When a user select a single city
function displaySelectedCity(event) {
  console.log(`passing here ${intervalId}`);

  //Stop current interval (reset)
  stopInterval();

  // If the value is user's local time zone
  if (event.target.value === 'local') {
    let localTime = moment.tz.guess();
    return (intervalId = setInterval(displayLocations, 1000, localTime));
  }

  intervalId = setInterval(displayLocations, 1000, event.target.value);
}

// Select city
cityInput.addEventListener('change', displaySelectedCity);

// display locations - single or multiple
function displayLocations(...locations) {
  locations.forEach((location) => {
    let date = moment().tz(location).format('MMMM Do, YYYY');
    let time = moment().tz(location).format('h:mm');
    let seconds = moment().tz(location).format('ss');
    let ampm = moment().tz(location).format('A');
    let formattedLocation = location.replace('_', ' ').split('/')[1];

    // clear content as interval keep adding div.
    if (location === 'America/New_York') {
      cityContainerEl = '';
    }

    // If user selected a single location, display back home button
    if (arguments.length === 1) {
      let backHomeEl = document.querySelector('.back-home');
      backHomeEl.innerHTML = `<a href="/">Back Home</a>`;

      //Clear container everytime as interval keep adding div.
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

// Call default locations with interval when the page is loaded
intervalId = setInterval(
  displayLocations,
  1000,
  'America/New_York',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney'
);

function stopInterval() {
  clearInterval(intervalId);
  console.log('stopped');
}
