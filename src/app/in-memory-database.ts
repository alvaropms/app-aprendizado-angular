import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){const categories: Category[] = [
        { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
        { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
        { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
        { id: 4, name: 'Salário', description: 'Recebimento de Salário'},
        { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'}
      ];
  
      const entries: Entry[] = [
        { id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, description: 'Gás'},
        { id: 2, name: 'Suplementos', categoryId: categories[1].id, description: 'Sup'},
        { id: 3, name: 'Salário na Empresa X', categoryId: categories[3].id, description: 'Dinheiro'},
        { id: 4, name: 'Aluguel de Filme', categoryId: categories[2].id, description: 'Locadora cara'},
        { id: 14, name: 'Pagamento Pelo Projeto XYZ', categoryId: categories[4].id, description: 'Projeto loco'}
      ]
  
      return { categories, entries }
    }
}