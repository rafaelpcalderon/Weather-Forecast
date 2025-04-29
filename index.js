const input = document.querySelector('#location');
const containerAddInfo = document.querySelector('.second-container');
const container = document.querySelector('.search');
const errorContainer = document.querySelector('.error-container')
 
let weatherImg = document.getElementsByClassName('.img');
let temperature = document.querySelector('.temp-number');
let humidity = document.querySelector('.humid-percentage');
let wind = document.querySelector('.wind-speed');
let condition = document.querySelector('.clouds');


input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
})

document.querySelector('.search-btn').addEventListener('click', () =>{

    const location = input.value.trim();

    if(location === ''){
        containerAddInfo.style.display = 'none';
        errorContainer.style.display = 'none';
        container.classList.remove('margin-top');
        return;
    }
    accessData();
});
 

 
async function accessingCity(city) {
   try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d74341de55baeec3ed46bd1cadc5de13&units=metric`; 
        const answer = await fetch(url);
        const data = await answer.json();
        return data;
   } catch (error) {
        console.log(error, 'Error');
   }
}

async function accessData(){
    try {
        const city = input.value;
        const data = await accessingCity(city);
    
        if(data.cod === '404'){
            containerAddInfo.style.display = 'none';
            errorContainer.style.display = 'flex';
            container.classList.add('margin-top');
            return;
        }else{
            containerAddInfo.style.display = 'flex';
            errorContainer.style.display = 'none';
        }

        containerAddInfo.style.display = 'flex';
        container.classList.add('margin-top');

        temperature.innerHTML = Math.round(data.main.temp);
        humidity.innerHTML = data.main.humidity;
        wind.innerHTML = `${Math.round(data.wind.speed)}Km/h`;
        condition.innerHTML = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.querySelector('.img').src = iconUrl;
    } catch (error) {
        console.log(error, 'Error');
    }
    
}