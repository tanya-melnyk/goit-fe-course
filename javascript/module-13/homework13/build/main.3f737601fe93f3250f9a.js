(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{L1EO:function(t,e,n){},QfWi:function(t,e,n){"use strict";n.r(e);n("L1EO"),n("JBxO"),n("FdtR");var o="https://api.apixu.com/v1",i="/current.json",c="?key=4a502c918a8341f7b27123556192606";function r(t){return fetch(o+i+c+("&q="+t)).then(function(t){if(t.ok)return t.json();throw new Error}).catch(function(t){throw new Error})}n("D/wG");var a={weatherSection:document.getElementById("weather"),icon:document.querySelector(".icon"),location:document.querySelector('span[data-field="location"]'),temp:document.querySelector('span[data-field="temp"]'),humidity:document.querySelector('span[data-field="humidity"]'),wind:document.querySelector('span[data-field="wind"]'),conditions:document.querySelector('span[data-field="conditions"]')};function d(t){a.icon.src="https:"+t.current.condition.icon,a.location.textContent=t.location.name,a.temp.textContent=t.current.temp_c,a.humidity.textContent=t.current.humidity,a.wind.textContent=t.current.wind_kph,a.conditions.textContent=t.current.condition.text,a.weatherSection.classList.remove("is-hidden")}var u,s=document.getElementById("spinner"),l={show:function(){s.classList.remove("is-hidden")},hide:function(){s.classList.add("is-hidden")}},h=n("dIfx");n("IlkV"),n("Anew");h.a.defaults.styling="material",h.a.defaults.icons="material",h.a.defaults.delay=3e3,(u={maximumAge:18e5,timeout:5e3},new Promise(function(t,e){navigator.geolocation.getCurrentPosition(t,e,u)})).then(function(t){l.show();var e=t.coords.latitude,n=t.coords.longitude;r(e+","+n).then(function(t){l.hide(),d(t)}).catch(function(t){return h.a.error("Не удалось определить ваше местонахождения.")})}).catch(function(t){return h.a.notice("Нет прав доступа к геопозиции, используйте поиск по имени города.")}),document.getElementById("search-form").addEventListener("submit",function(t){t.preventDefault(),l.show(),r(t.currentTarget.children.city.value).then(function(t){l.hide(),d(t)}).catch(function(t){h.a.error("Введите правильное имя города."),l.hide()})})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.3f737601fe93f3250f9a.js.map