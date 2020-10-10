

//for reusablility we will create all css class objects
export const elementClasses = {
  loader: "loader",
  search: "search",
  searchField: "search__field",
  searchResult: "results",
  searchResultList: "results__list",
  searchResPages: "results__pages",
  recipe: "recipe",
  shoppingList: 'shopping__list',
  recipeLike: 'recipe__love',
  likesMenu: 'likes__field',
  likesList: 'likes__list'
};


export const elements = {
  searchForm: document.querySelector(`.${elementClasses.search}`),
  searchInput: document.querySelector(`.${elementClasses.searchField}`),
  searchResultList: document.querySelector(`.${elementClasses.searchResultList}`),
  searchResult: document.querySelector(`.${elementClasses.searchResult}`),
  searchResPages: document.querySelector(`.${elementClasses.searchResPages}`),
  recipe: document.querySelector(`.${elementClasses.recipe}`),
  shoppingList: document.querySelector(`.${elementClasses.shoppingList}`),
  recipeLike: document.querySelector(`.${elementClasses.recipeLike}`),
  likesMenu: document.querySelector(`.${elementClasses.likesMenu}`),
  likesList: document.querySelector(`.${elementClasses.likesList}`)
};


export const renderLoader = parent =>{
    const loader = `
        <div class="${elementClasses.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () =>{
    //we need to redeclare this here becasue, the loder is not loaded when user first visits the page. 
    const loader = document.querySelector(`.${elementClasses.loader}`);
    //inorder to remove loader, we need to go one level up to the parent then remove child
    if (loader) loader.parentElement.removeChild(loader);
};