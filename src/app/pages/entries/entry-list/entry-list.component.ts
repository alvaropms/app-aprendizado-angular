import { Component, OnInit } from '@angular/core';
import { Category } from '../../categories/shared/category.model';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { CategoryService } from '../../categories/shared/category.service';

import { Observable, throwError } from 'rxjs';
 

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];
  categories: Category[] = [];

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Erro ao carregar a lista!')
    );
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista!')
    )
  }

  deleteEntry(entry: any){
    const mustDelete = confirm("Deseja deletar este item?");

    if(mustDelete){
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element =>  element != entry),
        () => alert("Erro ao excluir")
      )
    }
  }

  getCategory(categoryId: any): any{
    var invalid: Category = {
      name: "Categoria inválida",
      description:'Categoria inválida'
    };
    for(const key in this.categories){
      if(this.categories[key].id == categoryId){
        return this.categories[key] as Category
      }
    }
    return invalid;
  }

}
