import { elements} from './base';


//this will capture users input  
export const getInput = () => elements.searchInput.value;

//clear input once the search is completed
export const clearInput = () =>{
    elements.searchInput.value = "";
}

//shorten long title algorythem

const shotenRecipeTitle = (title, limit=17) => {
    /**
     * eg. title =  " Pasta with tamato and goat cheese"
     * limit is the word count
     * here the we dont want to break word but we will show ... after certain words
     * experiment yourself how many words you want to show
     * array.reduce method is the best way we can acheive this. 
     * 
     */
    //first create a new title
     const newTitle = [];
     if(title.length > limit){
         //lets split the title and turn it to arr of words, and apply array reduce method, which the returns acc and index 
         title.split(" ").reduce((acc, currentElement) =>{
           // accumulator start with 0 first
           // when we start reducing, currentElement is "pasta" of length 5 and is less than limit of 17
           // so it will be pushed to netitle array
           // acc: 0 -> acc + currentElement.length -push to newTitle = ['Pasta']
           // acc: 5 -> acc + currentElement.length -push to newTitle = ['Pasta', 'with']
           // acc: 9 -> acc + currentElement.length -push to newTitle = ['Pasta', 'with', 'tomato']
           // acc: 15 -> acc + currentElement.length -push to newTitle =  ['Pasta', 'with', 'tomato']
           // acc: 19 -> acc + currentElement.length -push to newTitle = ['Pasta', 'with', 'tomato', 'and']
           // reduce will stop pushing title here since it passed limit
           if (acc + currentElement.length <= limit) {
                newTitle.push(currentElement);
            }
            return acc + currentElement.length;
         }, 0)
     }

     //get the newtitle and join it with ...
     return `${newTitle.join(' ')}...`;
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
                    <h4 class="results__name">${shotenRecipeTitle(title, 15)}</h4>
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
    