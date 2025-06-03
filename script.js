class Location{
    constructor(city, temp, feelsLike, press,precip,description,winddir, windspeed){
        this.city = city.slice(0,1).toUpperCase() + city.slice(1);
        this.temp = {temp, feelsLike};
        this.press = press;
        this.precip = precip;
        this. description = description;
        this.wind = {winddir, windspeed};
    }
}
function getCity() {
  const city = prompt('enter a city: ')
  return city;
}

async function getWeather(city) {
  const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+city+'?key=N5LJURKTTKGJ6MFN2AWXVMW8B', {mode: 'cors'});
  const data = await response.json();
  const curLoc = new Location (
    data.address,
    data.currentConditions.temp,
    data.currentConditions.feelslike,
    data.currentConditions.pressure,
    data.currentConditions.precip,
    data.description,
    data.currentConditions.winddir,
    data.currentConditions.windspeed,

  )

console.log(curLoc);
  
  outputWeather(curLoc);
  
}

function outputWeather(city) {
  const output = document.querySelector('#output');
  output.innerHTML = '';
  const title = document.createElement('h3');
  title.textContent = city.city;
  output.appendChild(title);


  const subtitle = document.createElement('h4');
  subtitle.textContent = 'Current weather:';
  output.appendChild(subtitle);

  const description = document.createElement('p');
  description.textContent = ''+city.description+'';
  output.appendChild(description);

  const temperature = document.createElement('p');
  temperature.textContent = toCelcius(city.temp.temp)+' Celsius degree.';
  output.appendChild(temperature);

  const feelsLike = document.createElement('p');
  feelsLike.textContent = 'Feels like '+toCelcius(city.temp.feelsLike)+' Celsius degree.';
  output.appendChild(feelsLike);

  const pressure = document.createElement('p');
  pressure.textContent = 'The pressure is '+city.press+'';
  output.appendChild(pressure);

  const precipitation = document.createElement('p');
  precipitation.textContent = 'The precipitation: '+city.precip+'';
  output.appendChild(precipitation);

  const winddir = document.createElement('p');
  winddir.textContent = 'The wind direction: '+city.wind.winddir+'';
  output.appendChild(winddir);

  const windspeed = document.createElement('p');
  windspeed.textContent = 'The wind speed: '+city.wind.windspeed+'';
  output.appendChild(windspeed);


    // console.log(`The temperature in the ${town} is: `,weather, ' deg Celcius');
}

function toCelcius(temp){
    const celsius = Math.round(((temp - 32)/1.8)*10)/10;
    return celsius;
}

function checkWeather(){
    const city = document.querySelector('#city');
    getWeather(city.value);
city.value = '';
city.focus();
}
window.onload = ()=>{
    const city = document.querySelector('#city')
    city.value = '';
city.focus();
const output = document.querySelector('#output');
  output.innerHTML = '';

}
const button = document.querySelector('button');
button.addEventListener('click',checkWeather);
// const city = getCity();
// const weather =  getWeather(city);