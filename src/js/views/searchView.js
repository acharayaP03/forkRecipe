import { elements } from './base';


//this will capture users input  
export const getInput = () => elements.searchInput.value;

//clear input once the search is completed
export const clearInput = () =>{
    elements.searchInput.value = "";
}

export const clearRecipeList = () =>{
    elements.searchResultList.innerHTML = "";
}

//render ui component 
const renderRecipe = recipe => {
    //once the search input is received, the recipe will be returned as an object. 
    //then we can destructure it as follows. 
    const { recipe_id ,image_url ,title ,publisher } = recipe;
    const markUp = `
        <li>
            <a class="results__link" href="${recipe_id}">
                <figure class="results__fig">
                    <img src="${image_url}" alt="${title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${title}</h4>
                    <p class="results__author">${publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markUp);
}

//loopover renderRecipe and show all the result with given markUp
export const renderResult = recipies =>{
    recipies.forEach(renderRecipe)
} 
    