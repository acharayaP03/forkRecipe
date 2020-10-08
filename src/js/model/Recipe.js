import axios from 'axios';

export default class Recipe{

    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get`, {
                params:{
                    rId: this.id
                }
            });
            //console.log(res)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

            //console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = [ 'tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [ ...unitsShort, 'kg', 'g']

        //now we assing a new array maping on this.ingredients
        const newIngedients = this.ingredients.map( el =>{
            //replacing unitsLong with unitsShort
            let ingredients = el.toLowerCase();
            unitsLong.forEach( (unit, i) =>{
                ingredients = ingredients.replace(unit, unitsShort[i]);
            })

            //if there any parenthesis then remove import PropTypes from 'prop-types'
            ingredients = ingredients.replace(/ *\([^)]*\) */g, " ");

            //parse ingredients into cont, unit and ingredients
            const arrIng = ingredients.split(' ');
            //since we do not know the index, indexOf() will not work, instead we use findIndex method.
            const unitIndex = arrIng.findIndex( currElement => units.includes(currElement));

            //now we will retun as an object 
            let objIng;
            if (unitIndex > -1){
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.lenght){
                    count = eval(arrIng[0].replace('-', '+'));
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredients: arrIng.slice(unitIndex + 1).join(' ')
                }
            }else if (parseInt(arrIng[0], 10)){
                objIng ={
                    count : parseInt(arrIng[0], 10),
                    unit: '',
                    ingredients: arrIng.slice(1).join(' ')
                }
            }else if(unitIndex === -1){
                objIng ={
                    count: 1,
                    unit: '',
                    ingredients
                }
            }
            return objIng;
        })
        this.ingredients = newIngedients;    
    }

    updateServings(type){
        //servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        this.ingredients.forEach(ing =>{
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}