import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
    URL='https://portfolio-service-3.onrender.com/personas/';
    constructor(private http:HttpClient) {}
    public lista(): Observable<persona[]>{
      return this.http.get<persona[]>(this.URL+'lista');
    }
    public detail(id: number): Observable<persona>{
      return this.http.get<persona>(this.URL+`detail/${id}`);
    }
   /* public save(experiencia:Experiencia): Observable<any>{
      return this.httpClient.post<any>(this.expURL+ 'create',experiencia);
    
    }*/
    public update(id:number, Persona:persona):Observable<any>{
      return this.http.put<any>(this.URL+`update/${id}`,Persona);
    }
    public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.URL+`delete/${id}`);
    }
   }





