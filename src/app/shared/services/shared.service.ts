import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, catchError, flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAll(apiPath: string, convert: any): Observable<any[]>{
    return this.http.get(apiPath).pipe(
      catchError(this.handleError),
      map(convert)
    )
  }

  getById(id:number, apiPath: string, convert: any): Observable<any>{
    const url = `${apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(convert)
    )
  }

  update(item: any, apiPath: string): Observable<any>{
    const url = `${apiPath}/${item.id}`;

    return this.http.put(url, item).pipe(
      catchError(this.handleError),
      map(() => item)
    )
  }

  delete(id: number, apiPath: string): Observable<any>{
    const url = `${apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  create(entry: any, apiPath: string, convert: any): Observable<any>{
    return this.http.post(apiPath, entry).pipe(
      catchError(this.handleError),
      map(convert)
    )
  }

  private handleError(error: any): Observable<any>{
    console.log('ERRO NA REQUISIÇÃO', error);
    return throwError(error);
  }
}
