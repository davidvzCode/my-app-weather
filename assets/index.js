

const country = null || document.getElementById('country');
const API = `http://api.weatherapi.com/v1/current.json?key=b2bfe98900e24d4fa7e22716221707&`;
const API_COUNTRY = `https://countriesnow.space/api/v0.1/countries`;

let params = {
    q: country.value || 'Ecuador',
    aqi: 'no'
}

const degress = null || document.getElementById('text_degrees');
const details = null || document.getElementById('details');
const weekdays = null || document.getElementById('weekdays');
const select_country = null || document.getElementById('country');

const btnGit = null || document.getElementById('btnGit');
const btnDiscord = null || document.getElementById('btnDiscord');
const btnTwiter = null || document.getElementById('btnTwiter');

btnGit.addEventListener('click', () =>{
    window.open("https://github.com/davidvzCode");
})

btnDiscord.addEventListener('click', () =>{
    window.open("https://github.com/davidvzCode");
})

btnTwiter.addEventListener('click', () =>{
    window.open("https://github.com/davidvzCode");
})

async function getCountry(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getWeather(url){
    let esc = encodeURIComponent;
    const query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

    const response = await fetch(url+query);
    const data = await response.json();
    return data;
}




country.addEventListener('change', (event) => {
    params.q = event.target.value;
    loadWeather();
});

async function loadWeather(){
    try {
        const weather = await getWeather(API);
        let title_degress = `
                <p class="text-degrees">${weather.current.temp_c}°C</p>
                <p class="text-degrees-description">${weather.current.condition.text}</p>
        `;
        let title_details= `
            <div class="container__weather-details-current">
                <p class="degrees-details">${weather.current.feelslike_c}</p>
                <p class="details-description" >RealFeel</p>
            </div>
            <div class="container__weather-details-current">
                <p class="degrees-details">${weather.current.humidity}%</p>
                <p class="details-description" >Humidity</p>
            </div>
            <div class="container__weather-details-current">
                <p class="degrees-details">${weather.current.vis_km}</p>
                <p class="details-description" >Vis mk</p>
            </div>
            <div class="container__weather-details-current">
                <p class="degrees-details">${weather.current.pressure_mb}hPa</p>
                <p class="details-description" >Presure</p>
            </div>
            `
        let title_weekdays = `
            <div class="container__weather-week-day">
                <p>${weather.location.tz_id}</p>
                <img src="${weather.current.condition.icon}" alt="">
                <p>${weather.location.localtime}</p>
            </div>
        `;
        degress.innerHTML = title_degress;
        weekdays.innerHTML = title_weekdays;
        details.innerHTML = title_details; 
    } catch (error) {
        console.log(err);  
    }
    
}

(async ()=> {
    try {
        const countries = await getCountry(API_COUNTRY);
        let countries_name = `${countries.data.map(c => `
            <option value=${c.country}>${c.country}</option>
        `).slice(0,50).join('')}
        `; 
        loadWeather();
        countries_name = '<option value="Ecuador" selected> Ecuador </option>' + countries_name;
        select_country.innerHTML = countries_name;
    } catch (error) {
        console.log(err);  
    }
})();

setTimeout(loadWeather,60000)