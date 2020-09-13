/*************************************************************************
 * *************************** Global app controller**********************
 * ***********************************************************************/

import Search from './model/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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

        // Search for recipes
        await state.search.getResults();

        // render results on UI
        searchView.renderResult(state.search.results);
        //console.log(state.search.results)
    }
 }

 elements.searchForm.addEventListener('submit', e =>{
     //prevent form from submitting on button click.
     e.preventDefault();
     controlSearch();
 })



//https://forkify-api.herokuapp.com/api/search

