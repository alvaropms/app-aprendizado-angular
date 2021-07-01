import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {Entry} from '../../entries/shared/entry.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath: string = 'api/entries';

  constructor(private sharedService: SharedService) {

   }

   getAll(): Observable<Entry[]>{
     return this.sharedService.getAll(this.apiPath, this.jsonDataToEntries);
   }

   getById(id:any): Observable<Entry>{
     return this.sharedService.getById(id, this.apiPath, this.jsonDataToEntry);
   }

   create(entry: Entry): Observable<Entry>{
     return this.sharedService.create(entry, this.apiPath, this.jsonDataToEntry)
   }

   update(entry: Entry): Observable<Entry>{
     return this.sharedService.update(entry, this.apiPath);
   }

   delete(id: number): Observable<any>{
     return this.sharedService.delete(id, this.apiPath)
   }

   // PRRIVATE METHODS

    private jsonDataToEntries( jsonData: any[]): Entry[]{
      const entries: Entry[] = [];
      jsonData.forEach(element => entries.push( element as Entry));
      return entries;
    }

    private jsonDataToEntry( jsonData: any): Entry{
      return jsonData as Entry;
    }
}
