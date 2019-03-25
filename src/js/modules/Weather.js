import axios from 'axios';
export default class{
    constructor(woeid){
        this.woeid = woeid;
    }

    //	1521894
    async getWeather(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try{
            const res = await axios(`${proxy}https://www.metaweather.com/api/location/${this.woeid}/`);

            this.minTemp = res.data.consolidated_weather[0].min_temp;
            this.maxTemp = res.data.consolidated_weather[0].max_temp;


        }catch(error){
            console.log(`Error in getting the weather! ${error}`);
        }
    }
}