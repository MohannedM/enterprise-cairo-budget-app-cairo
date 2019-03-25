class Income{
    constructor(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
};

class Expense{
    constructor(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percenatage = -1;
    }
    calcPercentage(){
        if(data.totals.inc > 0){
            this.percenatage = Math.round((this.value/data.totals.inc) * 100)
        } else {
            this.percenatage = -1;
        }
    }
};

const data = {
    items: {
        inc:[],
        exp:[]
    },
    totals: {
        inc: 0,
        exp: 0
    },
    budget: 0,
    percenatage: -1
}; 

export const addItem = (type, description, value) => {

    let newItem, ID;
    if(data.items[type].length > 0){
        ID = data.items[type][data.items[type].length - 1].id + 1;
    }else{
        ID = 0;
    }
    if(type === 'inc'){
       newItem = new Income(ID, description, value);
    }else if(type === 'exp'){
        newItem = new Expense(ID, description, value);
    }
    data.items[type].push(newItem);
    return newItem;   

};

const calculateTotal = type => {

    const total = data.items[type].reduce((acc, cur)=>{
        return acc + cur.value;
    },0);

    data.totals[type] = total;

};

export const calculateBudget = () => {

    //1. Calculate total income
    calculateTotal('inc');

    //2. Calculate total exp
    calculateTotal('exp');

    //3. Calculate Budget
    const budget = data.totals.inc - data.totals.exp;
    //4. Assign caculated budget to data structure
    data.budget = budget;
    //5. Calculate Percentage
    if(data.totals.inc > 0){
        data.percenatage = Math.round((data.totals.exp/data.totals.inc) * 100);
    } else {
        data.percenatage = -1;
    }

};

export const getBudget = () =>{
    return data;
};
export const deleteItem = itemID => {
    //Spilt the item to have id and type
    const splitArr = itemID.split('-');
    //Find item and deleteit from data structure
    const type = splitArr[0];
    const id = parseInt(splitArr[1]);
    const index = data.items[type].findIndex(el => el.id === id);
    data.items[type].splice(index, 1);

};

export const calculatePercentages = ()=>{
    data.items.exp.forEach(el => {
        el.calcPercentage();
    });
};
export const getPercentages = ()=>{
    const percArr =  data.items.exp.map(cur =>{
        return cur.percenatage;
    });
    return percArr;
}