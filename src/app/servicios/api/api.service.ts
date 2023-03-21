import { Injectable } from '@angular/core';

import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { ListaPacientesI } from "../../modelos/listapacientes.interface";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost/API/";

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion, form);
  }

  getAllPatients(pagne:number):Observable<ListaPacientesI[]>{
    let direccion = this.url + "pacientes?page=" +pagne;
    return this.http.get<ListaPacientesI[]>(direccion);
  }
}
