import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        return {
            categories: [
                {id: 1, name: 'Lazer', description:'Parques e tudo mais'},
                {id: 2, name: 'Esporte', description:'jogar bola'},
                {id: 3, name: 'Cinema', description:'filme do Pelé'},
                {id: 4, name: 'Corrida', description:'pé na estrada'},
                {id: 5, name: 'Cubo Mágico', description:'montagem'}
            ]
        };
    }
}