(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{L1EO:function(e,t,n){},QfWi:function(e,t,n){"use strict";n.r(t);n("L1EO"),n("JBxO"),n("FdtR");var o="http://api.weatherstack.com",i="/current",c="?access_key=a2f4a19b05175ece9e4162c1948e6ca4";n("D/wG");var r={weatherSection:document.getElementById("weather"),icon:document.querySelector(".icon"),location:document.querySelector('span[data-field="location"]'),temp:document.querySelector('span[data-field="temp"]'),humidity:document.querySelector('span[data-field="humidity"]'),wind:document.querySelector('span[data-field="wind"]'),conditions:document.querySelector('span[data-field="conditions"]')};var a,d=document.getElementById("spinner"),u={show:function(){d.classList.remove("is-hidden")},hide:function(){d.classList.add("is-hidden")}},s=n("dIfx");n("IlkV"),n("Anew");function l(e,t){u.show(),function(e){return fetch(o+i+c+"&query="+e).then(function(e){if(e.ok)return e.json();throw new Error("Place is not found")}).catch(function(e){throw e})}(e).then(function(e){!function(e){r.icon.src=e.current.weather_icons[0],r.location.textContent=e.location.name,r.temp.textContent=e.current.temperature,r.humidity.textContent=e.current.humidity,r.wind.textContent=e.current.wind_speed,r.conditions.textContent=e.current.weather_descriptions,r.weatherSection.classList.remove("is-hidden")}(e),u.hide()}).catch(function(e){console.log(e),s.a.error(t),u.hide()})}s.a.defaults.styling="material",s.a.defaults.icons="material",s.a.defaults.delay=3e3,(a={maximumAge:18e5,timeout:5e3},new Promise(function(e,t){navigator.geolocation.getCurrentPosition(e,t,a)})).then(function(e){var t=e.coords.latitude,n=e.coords.longitude;l(t+","+n,"Не удалось определить ваше местонахождения.")}).catch(function(e){return s.a.notice("Нет прав доступа к геопозиции, используйте поиск по имени города.")}),document.getElementById("search-form").addEventListener("submit",function(e){e.preventDefault(),l(e.currentTarget.children.city.value,"Введите правильное имя города.")})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.90a935b31468fa0eda26.js.map