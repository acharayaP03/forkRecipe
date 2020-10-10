import Search from '../model/Search';
import * as searchView from '../views/searchView';
import {
    elements,
    renderLoader,
    clearLoader
} from '../views/base';


//Search form event listener. since the Search model returns promise we need to await for ht results. hench the controlSearch function will be async await
export default class SearchController {

    constructor(){
        this.state = {}
    }
   async controlSearch () {
    
        //get the query from the view
        const query = searchView.getInput();
        //console.log(query)
        if (query) {
            // new search object and add to the state
            this.state.search = new Search(query);

            //Prepare for UI results.
            searchView.clearInput();
            searchView.clearRecipeList();
            renderLoader(elements.searchResult);

            try {
                // Search for recipes
                await this.state.search.getResults();

                // render results on UI
                clearLoader();
           
                searchView.renderResult(this.state.search.results);
                console.log(this.state.search.results)
            } catch (error) {
                console.log(error)
            }
        }
    }
}