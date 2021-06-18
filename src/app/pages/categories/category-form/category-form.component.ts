import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { switchMap } from 'rxjs/operators';
import {ToastrModule} from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = "teste";
  categoryForm: FormGroup = new FormGroup({});
  pageTitle: string = "";
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();
  id: number = 0;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.setCurrentAction(),
    this.buildCategoryForm(),
    this.loadCategory()
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == 'new'){
      this.createCategory();
    }else{
      this.updateCategory();
    }
  }

  //PRIVATE METHODS

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == 'new'){
      this.currentAction = 'new'
    }else{
      this.currentAction = 'edit'
    }
  }

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required, Validators.minLength(2)],
      description: [null]
    });
  }

  private loadCategory(){
    if(this.currentAction == 'edit'){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(params.get('id')))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category)
        },
        (error) => alert('Erro no servidor!')
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Formulário de categorias'
    }else{
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando categoria: ' + categoryName;
    }
  }

  private createCategory(){

  }

  private updateCategory(){

  }
}
