import Likes from '../model/Likes';
import {elements} from '../views/base';

export default class LikesController {
    constructor(){

        this.state = {};
    }
    controlLikes() {
     
        const {likes, recipe} = this.state;
        const currentId = recipe.id;

        if(!likes) likes = new Likes();

        //if user has not liked current recipe yet.
        if(!likes.isLiked(currentId)){

            // add like to the state
            const newLikes = likes.addLike(currentId, recipe.title, recipe.author, recipe.img);
            console.log(state.likes);
        }else{

        }
    }
}

