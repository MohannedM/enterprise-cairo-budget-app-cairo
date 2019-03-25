import { elements } from './base';

export const loadingWeather = ()=>{
    elements.weatherLabel.textContent = 'Connecting...';
}

export const displayWeather = (minTemp, maxTemp) =>{
    const min = Math.round(minTemp);
    const max = Math.round(maxTemp);
    elements.weatherLabel.textContent = `${min} C° and ${max} C°`;
}