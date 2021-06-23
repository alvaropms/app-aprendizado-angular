import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/category.model';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string = "";
  entryForm: FormGroup = new FormGroup({});
  pageTitle: string = "";
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  entry: Entry = new Entry();
  id: number = 0;
  error: boolean = false;
  categories: Category[] = [];

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) { 

  }

  ngOnInit(): void {
    this.setCurrentAction(),
    this.buildEntryForm(),
    this.loadEntry(),
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories as Category[],
      error => alert('Erro ao carregar a lista!')
    )
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    /*this.categoryService.getById(this.entryForm.controls['categoryId'].value).subscribe(
      category => this.entryForm.controls['name'].setValue('nome'),
      error => alert('Erro ao carregar a lista!')
    )
    this.entryForm.controls['category'].value*/

    if(this.currentAction == 'new'){
      this.createEntry();
    }else{
      this.updateEntry();
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

  private buildEntryForm(){
    this.entryForm = this.formBuilder.group({
      id: null,
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: null,
      category: [null, [Validators.required]]
    });
  }

  private loadEntry(){
    if(this.currentAction == 'edit'){
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(params.get('id')))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          console.log(entry);
          this.entryForm.patchValue(entry);
        },
        (error) => alert('Erro no servidor!')
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Formulário de entradas'
    }else{
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editando entrada: ' + entryName;
    }
  }

  private createEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry)
    .subscribe(
      entry =>  this.actionsForSucess(entry),
      error => this.actionsForError(error)
    )

  }

  private updateEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry)
    .subscribe(
      entry =>  this.actionsForSucess(entry),
      error => this.actionsForError(error)
    )
  }

  private actionsForSucess(entry: Entry){
    this.toastr.success('Solicitação processada!','Sucesso!');
    this.error = false;

    this.router.navigateByUrl('entries', {skipLocationChange: true}).then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    );

  }

  private actionsForError(error: any){
    this.toastr.error('Não foi possível processar a solicitação', 'Erro!');

    this.submittingForm = false;

    this.error = true;

    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).error;
    }else{
      this.serverErrorMessages = ['Falha na comunicação com o servidor']
    }

  }
}
