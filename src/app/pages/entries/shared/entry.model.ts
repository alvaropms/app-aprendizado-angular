import { Category } from "../../categories/shared/category.model";

export class Entry{
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public categoryId?: number
    ){}
}