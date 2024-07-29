const container = document.querySelector('.container');
const search = document.querySelector('.search_box button');
const weatherBox = document.querySelector('.weather_box');
const weatherDetails = document.querySelector('.weather_details');
const error404 = document.querySelector('.not_found');
const cityHide = document.querySelector('.city_hide');

search.addEventListener('click', () => {
  const APIKey = '29a67ef309b90d3277c087a35f4548d4';
  const city = document.querySelector('.search_box input').value;
  if (city == '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then((response) => response.json()).then((json) => {

      if (json.cod == '404') {
        cityHide.textContent = city;
        container.style.height = '555px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      const image = document.querySelector('.weather_box img');
      const temperature = document.querySelector('.weather_box .temperature');
      const description = document.querySelector('.weather_box .description');
      const humidity = document.querySelector('.weather_details .humidity span');
      const wind = document.querySelector('.weather_details .wind span');

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = '620px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
          case 'clear':
            image.src = '/weatherApp/weather_app/clear.png';
            break;
          case 'Rain':
            image.src = '/weatherApp/weather_app/rain.png';
            break;
          case 'Snow':
            image.src = '/weatherApp/weather_app/snow.png';
            break;
          case 'Clouds':
            image.src = '/weatherApp/weather_app/cloud.png';
            break;
          case 'Mist':
            image.src = '/weatherApp/weather_app/mist.png';
            break;
          case 'Haze':
            image.src = '/weatherApp/weather_app/mist.png';
            break;

          default:
            image.src = '/weatherApp/weather_app/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector('.info_weather');
        const infoHumidity = document.querySelector('.info_humidity');
        const infoWind = document.querySelector('.info_wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone_info_weather';
        elCloneInfoWeather.classList.add('active_clone');

        elCloneInfoHumidity.id = 'clone_info_humidity';
        elCloneInfoHumidity.classList.add('active_clone');

        elCloneInfoWind.id = 'clone_info_wind';
        elCloneInfoWind.classList.add('active_clone');

        setTimeout(() => {
          infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
          infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
          infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info_weather.active_clone');
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll('.info_humidity.active_clone');
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll('.info_wind.active_clone');
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove('active_clone');
          cloneInfoHumidityFirst.classList.remove('active_clone');
          cloneInfoWindFirst.classList.remove('active_clone');

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }
      }
    });
});
