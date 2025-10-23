let search = document.getElementById("searchBar");
      let btn = document.getElementById("searchBtn");
      let locations = document.getElementById("locations");
      let dateTime = document.getElementById("datetime");
      let temprature = document.getElementById("temprature");
      let conditions = document.getElementById("condition");
      let icons = document.getElementById("imgs");
      let minMax = document.getElementById("minMaxTem");
      let Feelslike = document.getElementById("feelslike");
      let Wind = document.getElementById("wind");
      let Humidity = document.getElementById("humidity");
      let Presure = document.getElementById("presure");
      let errorMsg = document.getElementById("errorMsg");

      console.log(search.value);

      let displayNewData = (apiUrl) => {
        apiUrl =
          "https://api.weatherapi.com/v1/current.json?key=b2b412d2b70c490dae7130645252110&q=Saharanpur&aqi=no";
        fetchData(apiUrl);
      };
      let displaysearchData = (apiUrl) => {
        apiUrl = `https://api.weatherapi.com/v1/current.json?key=b2b412d2b70c490dae7130645252110&q=${search.value}&aqi=no`;
        fetchData(apiUrl);
      };
      // let displayCurrentLocationData=()=>{
      //  navigator.geolocation.getCurrentPosition(success);
      // function success(position) {
      //   let lat = position.coords.latitude;
      //   let lon = position.coords.longitude;
      //   let apiUrl = `https://api.weatherapi.com/v1/current.json?key=b2b412d2b70c490dae7130645252110&q=${lat},${lon}&aqi=no`;
      //   console.log(apiUrl);

      //   fetchData(apiUrl);
      // }
      //       }

      async function fetchData(apiUrl) {
        try {
          let resopnse = await fetch(apiUrl, {
            headers: {
              Accept: "application/json",
            },
          });

          let data = await resopnse.json();
          console.log(data);
          locations.innerText = `${data.location.name},${data.location.region}`;
          dateTime.innerText = `Time ${data.location.localtime}`;
          conditions.innerText = `${data.current.condition.text} `;

          icons.innerHTML = ` <img src="${data.current.condition.icon}"alt="">`;
          temprature.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
          minMax.innerHTML = `<h4>Min ${
            Math.floor(data.current.temp_c) - 1.3
          }<sup>o</sup>C                            Max ${
            data.current.temp_c + 2.2
          }<sup>o</sup>C</h4>`;
          Feelslike.innerHTML = `<h3>Feels Like <br> ${data.current.feelslike_c}<sup>o</sup>C </h3>`;
          Wind.innerHTML = `<h3>Wind <br> ${data.current.wind_kph} Kph</h3>`;
          Humidity.innerHTML = `<h3> Humidity <br> ${data.current.humidity} </h3>`;
          Presure.innerHTML = `<h3> Pressure <br> ${data.current.pressure_mb}mb</h3>`;
        } catch (error) {
          errorMsg.innerText = "*Please enter the correct city name";
          console.log(error);
        }
      }

      // displayCurrentLocationData()
      displayNewData();
      btn.addEventListener("click", (event) => {
        displaysearchData();
      });
   search.addEventListener("keypress", (e) => {
   if (e.key === "Enter") displaysearchData();
});
