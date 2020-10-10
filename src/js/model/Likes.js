/**
 * @Model Likes
 */

 export default class Likes{

    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        this.persistData();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    //Save recipe to the localStorage.
    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        /**
         * @localStorage will return null if there is no likes stored 
         * @solution check if likes are stored before call it 
         */
        if(storage) this.likes = storage;
    }
 }