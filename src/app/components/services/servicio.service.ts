import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Datos } from '../classes/Clase-datos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private baseUrl : string = 'http://localhost:3000/pdf' 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    form: FormGroup = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      edad: new FormControl(null)
    })
  constructor(private http: HttpClient) { }

  pdf(){
    return this.http.get('http://localhost:3000/factura/reportefactura/1', {responseType: 'blob'});
  }

  save(datos:Datos){  
    return this.http.post(this.baseUrl, datos);
  } 

  get():Observable<Datos[]>{
    return this.http.get<Datos[]>(`${this.baseUrl}`).pipe(
      map(response => response as Datos[])
    );
  }

  delete(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
