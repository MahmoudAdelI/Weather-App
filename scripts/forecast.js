const key = 'lUKRkhZP47ijx9uG6mQlc1f0wG6xwmYe'; //my apikey on the accuweather api 
//getting the current weather condition
const getWeather = async cityKey => {
    const base = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}`;
    const query = `?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0]; //to get the first matched result
}
//getting the city data(Key is what we need)
const getCity = async city => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0]; //to get the first matched result
}

