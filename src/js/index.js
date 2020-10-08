/*************************************************************************
 * *************************** Global app controller**********************
 * ***********************************************************************/

import Search from './model/Search';
import Recipe from "./model/Recipe";
import List from "./model/List";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader, elementClasses } from './views/base';

//first lets save the state of the app,
/**
 * Global state of the app
 * - Search object 
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

 //when app starts, the state object will be empty
 const state = {};

 //Search form event listener. since the Search model returns promise we need to await for ht results. hench the controlSearch function will be async await
 const controlSearch = async () =>{
    //get the query from the view
    const query = searchView.getInput();
    //console.log(query)
    if(query){
        // new search object and add to the state
        state.search = new Search(query);

        //Prepare for UI results.
        searchView.clearInput();
        searchView.clearRecipeList();
        renderLoader(elements.searchResult);
       
        try {            
            // Search for recipes
            await state.search.getResults();
    
            // render results on UI
            clearLoader();
    
            searchView.renderResult(state.search.results);
            //console.log(state.search.results)
        } catch (error) {
            console.log(error)
        }
    }
 }

 elements.searchForm.addEventListener('submit', e =>{
     //prevent form from submitting on button click.
     e.preventDefault();
     controlSearch();
 });

 //let delegate event to the button container since the pagination buttons are not rendered in the dom when the page is loaded.

 elements.searchResPages.addEventListener('click', e =>{

    //we only want to delegate the event to button not on svg or text.
    const btn = e.target.closest('.btn-inline');

    if(btn){
        //since pagination button are dynamic, we have attahced the data-goto attr to it so that we can track the dynamic value.
        const gotoPage = parseInt(btn.dataset.goto, 10);
        //console.log(gotoPage)
        searchView.clearRecipeList();
        searchView.renderResult(state.search.results, gotoPage);
    }
 })

//Recipe controller

//get hashed id from the recipe list 

const controlRecipe = async () =>{

    //first get the recipe id from the link, replace # 
    const id = window.location.hash.replace('#', '');
    //console.log(id)

    //if id exist 
    if(id){
        //Prepare UI for changes
        //clear recipe if exist 
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight selected 
         if(state.search) searchView.highlightSelected(id);
        //create new recipe object
        state.recipe = new Recipe(id);
        try{
            // now get recipe 
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Calculate serving time
            state.recipe.calcTime()
            state.recipe.calcServings();
            //Render single recipe
            //console.log(state.recipe)
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(err){
            console.log(err)
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//Handling recipe button clicks 
elements.recipe.addEventListener('click',e =>{
    //.matches() accepts multiple css selector, so here we are selecting all the element within .btn-decrease selector with *.
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked 
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
        // increase button is clicked 
        state.recipe.updateServings("inc");
        recipeView.updateServingsIngredients(state.recipe);
    }
    //check if state.recipe is decreasing. 
    //console.log(state.recipe)
})

window.l = new List()
 