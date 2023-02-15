`use strict`;
const la = document.querySelector(".lat");
const lo = document.querySelector(".long");
const temp = document.querySelector(".degree");
const description = document.querySelector(".temperature-description");
const current = document.querySelector(".current");
const wind = document.querySelector(".wind");
const cont = document.querySelector(".container");
const cloud_cover = document.querySelector(".cloudcover");
const iconday = document.querySelector(".predict-day");
const dew = document.querySelector(".dew");
const hum = document.querySelector(".humidity");
const uv = document.querySelector(".uvindex");
const pre = document.querySelector(".pressure");
const o = document.querySelector(".ozone");
const vis = document.querySelector(".visibility");
const windb = document.querySelector(".windbearing");
const windg = document.querySelector(".windgust");
const winds = document.querySelector(".windspeed");
const at = document.querySelector(".apparant");
const stamp = document.querySelector(".timestamp");
const git = document.querySelector(".git-icon");
const loc = document.querySelector(".location");
const no = document.querySelector(".no-load");
no.setAttribute("class", ".no-load");
window.addEventListener("load", () => {
  no.setAttribute("class", ".while-load");
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      la.innerHTML = `<p>Latitude:${lat}</p>`;
      lo.innerHTML = `<p>Longitude:${long}</p>`;
      fetch(
        `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${lat}&lng=${long}&filter=minutely`,
        {
          method: "GET",
          headers: {
            "x-api-key":
              "ea888ed1fdea683547b2b1cba52458831b46e4ec774e7fa9f783bdf9ff3fb7a5",
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data1) => {
          const {
           apparentTemperature,
            cloudCover,
            dewPoint,
            humidity,
            icon,
            ozone,
            pressure,
            temperature,
            uvIndex,
            visibility,
            windBearing,
            windGust,
            windSpeed,
            time,
          } = data1.data;

          temp.innerHTML = `<h2 class="degree">
          Temp:${(((temperature - 32) * 5) / 9).toFixed(3)}
          <span class="unit"><sup>0</sup>C</span>`;
          cloud_cover.innerHTML = `Cloud:${cloudCover}`;
          iconday.innerHTML = `Day-Prediction:${icon}`;
          dew.innerHTML = `DewPoint:${dewPoint}`;
          hum.innerHTML = `Humidity:${humidity}`;
          uv.innerHTML = `UV-Index:${uvIndex}`;
          pre.innerHTML = `Pressure:${pressure}mb`;
          o.innerHTML = `Ozone-Level:${ozone}`;
          vis.innerHTML = `Visibility:${visibility}`;
          windb.innerHTML = `WindBearing:${windBearing}<sup>0</sup>`;
          windg.innerHTML = `WindGust:${windGust}km/h`;
          winds.innerHTML = `WindSpeed:${windSpeed}km/h`;
          at.innerHTML = `Apparent Temp:${(
            ((apparentTemperature - 32) * 5) /
            9
          ).toFixed(3)}<sup>0</sup>C`;

          stamp.innerHTML = `TimeStamp:${time}`;
          if (icon == `clear-night`) {
            cont.setAttribute("class", "cont-man");
            loc.setAttribute("class", "location-night");
          }
          if (icon == `partly-cloudy-day`) {
            cont.setAttribute("class", "partly-cloudy");
          }
          if (icon == `partly-cloudy-night`) {
            cont.setAttribute("class", "partly-cloudy-night");
            loc.setAttribute("class", "location-night");
          }
         if (icon == `rain`) {
            cont.setAttribute("class", "rain");
            loc.setAttribute("class", "location-night");
          }
        });
    });
  } else {
  }
  git.onclick = function () {
    window.open("https://github.com/Parthib25");
  };
});
window.addEventListener("load", () => {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data1) => {
          const { continent, countryName, principalSubdivision, locality } =
            data1;

          loc.innerHTML = `<h2>Station Address-info:</h2><ol><li class="list-items">Continent:${continent}</li><li class="list-items">Country:${countryName}</li><li class="list-items">PrincipalSubdivision(generally a state):${principalSubdivision}</li><li class="list-items">District:${data1.localityInfo.administrative[2].name}</li><li class="list-items">Locality:${locality}</li></ol>`;
        });
    });
  }
});
