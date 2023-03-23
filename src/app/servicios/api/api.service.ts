import { Injectable } from '@angular/core';

import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { ListaPacientesI } from "../../modelos/listapacientes.interface";

import { PacienteI } from "../../modelos/paciente.interface";
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

  getSinglePactient(id:any):Observable<PacienteI[]>{
    let direccion = this.url+"pacientes?id="+id;
    return this.http.get<PacienteI[]>(direccion);
  }

  putPatient(paciente:PacienteI):Observable<ResponseI>{
    let direccion = this.url+"pacientes";
    return this.http.put<ResponseI>(direccion, paciente);
  }

  deletePatient(paciente:PacienteI):Observable<ResponseI>{
    let direccion = this.url+ "pacientes";
    let Options={
      headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:paciente
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  postPatient(paciente:PacienteI):Observable<ResponseI>{
    let direccion = this.url+ "pacientes";
    return this.http.post<ResponseI>(direccion, paciente);
  }
}
