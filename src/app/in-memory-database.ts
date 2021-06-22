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
        { id: 1, name: 'Gás de Cozinha', category: categories[0]},
        { id: 2, name: 'Suplementos', category: categories[1]},
        { id: 3, name: 'Salário na Empresa X', category: categories[3]},
        { id: 4, name: 'Aluguel de Filme', category: categories[2]},
        { id: 5, name: 'Suplementos', category: categories[1]},
        { id: 6, name: 'Video Game da Filha', category: categories[2]},
        { id: 11, name: 'Uber', category: categories[1]},
        { id: 12, name: 'Aluguel', category: categories[2]},
        { id: 13, name: 'Gás de Cozinha', category: categories[1]},
        { id: 14, name: 'Pagamento Pelo Projeto XYZ', category: categories[4]},
        { id: 19, name: 'Aluguel de Filme', category: categories[2]},
        { id: 21, name: 'Video Game da Filha', category: categories[1]},
        { id: 22, name: 'Cinema', category: categories[2]},
        { id: 23, name: 'Jiu Jitsu', category: categories[1]},
        { id: 44, name: 'Uber', category: categories[2]},
        { id: 55, name: 'Cinema', category: categories[1]}
      ]
  
      return { categories, entries }
    }
}