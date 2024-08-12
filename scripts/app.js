const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const loader = document.querySelector('.loader');

//updating the ui with city info
const updateUI = data => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    // if data has keys the same name as your consts you can asign it this way
    const { cityDetails, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;c</span>
        </div>
    `
    //update the weather condition icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    //update the day/night img 
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'; //this is ternary operator
    // if (weather.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);

    //showing the details on submit
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}
//after user insert the city get the info about it
const updateCity = async city => {
    const cityDetails = await getCity(city); //to get city info
    const weather = await getWeather(cityDetails.Key); //to get city weather info
    return { cityDetails, weather } //this is a shorthand returning an object with keys&values with the same name
}


cityForm.addEventListener('submit', e => {
    //prevent dafault action
    e.preventDefault();
    //getting the caity name from the user
    const city = cityForm.city.value.trim();
    cityForm.reset();
    //hide the card and show the loader if there was a previous submit
    if (!card.classList.contains('d-none')) {
        card.classList.add('d-none');
    }
    loader.classList.remove('d-none'); // showing the loader before updating the data
    //.................................................................
    updateCity(city)
        .then(data => {
            loader.classList.add('d-none'); // hiding the loader again before updating the UI
            updateUI(data)
        })
        .catch(error => console.log(error));

    localStorage.setItem('city', city); //to store the city to the local storage
});

//if page has refreshed update the ui with the last submited city name stored in the local storage
if (localStorage.getItem('city')) {
    loader.classList.remove('d-none'); // showing the loader before updating the data
    updateCity(localStorage.getItem('city'))
        .then(data => {
            loader.classList.add('d-none'); // hiding the loader again before updating the UI
            updateUI(data);
        })
        .catch(error => console.log(error));
}