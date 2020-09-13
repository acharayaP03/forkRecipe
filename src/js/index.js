/*************************************************************************
 * *************************** Global app controller**********************
 * ***********************************************************************/

import Search from './model/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

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
       
        // Search for recipes
        await state.search.getResults();

        // render results on UI
        clearLoader();

        searchView.renderResult(state.search.results);
        console.log(state.search.results)
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



//https://forkify-api.herokuapp.com/api/search

