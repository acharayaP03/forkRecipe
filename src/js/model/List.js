import uniqid from 'uniqid';

export default class List {

    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id){
        /**
         * @returns mutatd original array.
         */

        //returns the index of the array element.
        const index = this.items.findIndex(el => el.id === id);

        //splice returns a original mutated array. 
        return this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        //
        /**
         * find the element and update its count
         * @param newCount 
         * will be assisgned a new count that will be muted from original arr
         */
        this.items.find(el => el.id === id).count = newCount;
    }
}