///Use Meta weather API to print then weather in a nice format for rendering write simply connecting...  (First with a standard location ex:'Cairo' then give the user the abilty to search for his own woeid)
import Weather from './modules/Weather';
import * as Budget from './modules/Budget';
import {elements} from './views/base';
import * as weatherView from './views/weatherView';
import * as budgetView from './views/budgetView';

/**
 * Global state variable
 */
let state = {};



/**
 * Weather Controller
 */
const controlWeather = async ()=>{
//1. woeid of the city
    let woeid = 1521894;
//2. Instantiate a new weather object
    if(!state.weather) state.weather = new Weather(woeid);
//3. Prepare UI for weather result
weatherView.loadingWeather();

//4. Get weather result
await state.weather.getWeather();

//5. Display weather on the UI
weatherView.displayWeather(state.weather.minTemp, state.weather.maxTemp);

};

/**
 * Budget Controller
 */
const ctrlAddItem = () =>{
    //1. Get input data
    let input = budgetView.getInput();
    if(input.description !== "" && !isNaN(input.value)){
        //2. Add to data structure
        let value = parseInt(input.value);
        const newItem = Budget.addItem(input.type, input.description, value);
        //3. Display on the UI
        budgetView.addListItem(newItem, input.type);
        budgetView.clearFields();

        //4. Calculate and update budget
       updateBudget();

       //5.Calculate and update percentages
       updatePercentages();

        
    }
};
const ctrlDeleteItem = (itemID)=> {
    //1. Delete item from data structure
    Budget.deleteItem(itemID);
    //2. Delete item from the UI
    budgetView.deleteListItem(itemID);
    //3. Update Budget
    updateBudget();
};

const updateBudget = ()=>{
    //1. Calculate Budget
    Budget.calculateBudget();
    //2. Get Budget
    const obj = Budget.getBudget();
    //3. Display budget
    budgetView.displayBudget(obj.budget, obj.totals.inc, obj.totals.exp, obj.percenatage);

};

const updatePercentages = () =>{
    //1. Calculate percentages
    Budget.calculatePercentages();
    //2. Get percentages
    const percentages = Budget.getPercentages();
    //3.Display percentages on the UI
    budgetView.displayPercentages(percentages);
}




/**
 * Event Listners
 */


const setupEventListner = () => {

    window.addEventListener('load', controlWeather);
    
    window.addEventListener('keypress', e =>{
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    })
    
    elements.inputButton.addEventListener('click', ctrlAddItem);

    elements.container.addEventListener('click', e=>{
        const itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            ctrlDeleteItem(itemID);
        }
    });
    elements.inputType.addEventListener('change', budgetView.changedType);
};

const init = () => {
    budgetView.displayDate();
    budgetView.displayBudget(0,0,0,0);
    setupEventListner();
};

init();
