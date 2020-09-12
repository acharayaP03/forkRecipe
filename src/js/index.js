
import axios from 'axios';


async function  getResults(params) {
    const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${params}`);

    console.log(res);
}

getResults();
// Global app controller
//https://forkify-api.herokuapp.com/api/search

