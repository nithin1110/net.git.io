const api={
    Key:"4d9bfbecd7a2fe9983ef83b55f45f050",
    baseurl:"https://openweathermap.org/"
}
const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);
function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
function getResults(query){
     fetch('${api.base}weather?=${query}&units=metric&APPID=${api.key}')
     .then(weather=>{
        return weather.json();
     }).then(displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city=document.querySelector('.location.city');
    city.innerText='${weather.name},${weather.sys.country}';

    let now=new Date();
    let date=document.querySelector(location.date);
    date.innerText=dateBuilder(now);
    let temp = document.querySelector('.current.temp');
    temp.innerHTML='${Math.round(weather.main.temp)}<span>*c</span>';
    let weather_el=document.querySelector('.current.weather');
    weather_el.innerText=weather.weather[0].main;
    let hilow=document.querySelector('hi-low');
    hilow.innerText='${Math.round(weather.main.temp_main)}*c/${weather.main.temp_max}*c';
}
function dateBuilder(d){
    let months=["january","february","march","april","may","june","july","august","september","october","november","december"];
    let days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month =months[d.getMonth()];
    let year = d.getFullYear();
    return '${day} ${date} ${month} ${year}';
}