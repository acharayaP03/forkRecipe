import { elements } from './base';

/**
 * @function
 * @return list Items 
 */

 export const renderItems = item =>{

    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count--value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
     `
     /**
      * @add 
      * berfore end on shoppingList
      */

      elements.shoppingList.insertAdjacentHTML('beforeend', markup);
 }

 export const deleteItem = id =>{
    /**
     * @params 
     * data-itemid will have reference to the id which then will be targeted to remove from parent
     */

     const item = document.querySelector(`[data-itemid="${id}"]`);

     if(item) item.parentElement.removeChild(item);
 }