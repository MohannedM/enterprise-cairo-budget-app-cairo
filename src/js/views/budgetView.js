import { elements, DOMStrings } from './base';

export const getInput = () => {
    return{
        type : elements.inputType.value,
        description: elements.inputDescription.value,
        value: elements.inputValue.value
    }
};

const formatNumber = number => {
    let num, numArr, int, dec;
    num = Math.abs(number);
    num = num.toFixed(2);
    numArr = num.split('.');

    int = numArr[0];
    dec = numArr[1];

    if(int.length > 3){
        return `${int.slice(0, int.length - 3)},${int.slice(int.length - 3 , int.length)}.${dec}`;
    }

        return num;

};

export const addListItem = (item, type) => {
    let markup;
        if(type === 'inc'){
            markup = `    
            <div class="item clearfix" id="inc-${item.id}">
                <div class="item__description">${item.description}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${formatNumber(item.value)}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            elements.incomeList.insertAdjacentHTML('beforeend', markup);
        } else if(type === 'exp'){
            markup = `    
            <div class="item clearfix" id="exp-${item.id}">
                <div class="item__description">${item.description}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${formatNumber(item.value)}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            elements.expensesList.insertAdjacentHTML('beforeend', markup);
        }
}

export const clearFields = () =>{
    let fieldsArr;

    fieldsArr = Array.from(document.querySelectorAll(`${DOMStrings.inputValue}, ${DOMStrings.inputDescription}`));

    fieldsArr.forEach(e=>{
        e.value = '';
    });
    elements.inputDescription.focus();

};
export const displayBudget = (budget, inc, exp, perc) => {
    //1. Inital budget state
    elements.budgetLabel.textContent = `${budget > 0 ? '+' : '-'} ${formatNumber(budget)}`;
    elements.incomeLabel.textContent = `+ ${formatNumber(inc)}`;
    elements.expenseLabel.textContent = `- ${formatNumber(exp)}`;
    if(perc > 0){
        elements.percentageLabel.textContent = `${perc}%`;
    } else {
        elements.percentageLabel.textContent = `---`;
    }

};

export const deleteListItem = itemID => {
    const elementsArr = Array.from(document.querySelectorAll('.item'));
    elementsArr.forEach(el =>{
        if(el.id === itemID){
            el.parentNode.removeChild(el);
        }
    })
};

export const displayPercentages = (perc) =>{
    const elementsArr = Array.from(document.querySelectorAll('.item__percentage'));
    elementsArr.forEach((cur, index) => {
        if(perc[index] > 0){
            cur.textContent = `${perc[index]}%`;
        }else{
            cur.textContent = `---`;
        }
    });
};

export const changedType = ()=>{
    const elementsArr = Array.from(document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`));

    elementsArr.forEach(el => {
        el.classList.toggle('red-focus');
    });
    elements.inputButton.classList.toggle('red');
};

export const displayDate = () =>{
    let date, months, month, year;

    date = new Date();

    months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December" ];

    month = months[date.getMonth()];

    year = date.getFullYear();

    elements.dateLabel.textContent = `${month}, ${year}`;

};

