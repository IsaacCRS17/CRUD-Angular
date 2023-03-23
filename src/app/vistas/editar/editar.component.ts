import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { PacienteI } from "../../modelos/paciente.interface";

import { ResponseI } from '../../modelos/response.interface';

import { ApiService } from "../../servicios/api/api.service";

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Token } from '@angular/compiler';

import { AlertasService } from "../../servicios/alertas/alertas.service";


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit{

  constructor(private router:Router, private activerouter:ActivatedRoute, private api:ApiService, private formBuilder:FormBuilder, private alertas:AlertasService){}

  datosPaciente!:PacienteI;
  editarForm = new FormGroup({
    nombre: new FormControl(''),
    correo : new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl('')
});

  

ngOnInit(): void {
  let id = this.activerouter.snapshot.paramMap.get('id');
  let token = this.getToken();
  this.api.getSinglePactient(id).subscribe(data  =>{
       this.datosPaciente = data[0];
       this.editarForm.setValue({
          'nombre': this.datosPaciente?.Nombre,
          'correo': this.datosPaciente?.Correo,
          'dni': this.datosPaciente?.DNI,
          'direccion': this.datosPaciente?.Direccion,
          'codigoPostal': this.datosPaciente?.CodigoPostal,
          'genero': this.datosPaciente?.Genero,
          'telefono': this.datosPaciente?.Telefono,
          'token': token,
          'pacienteId': id,
          'fechaNacimiento': this.datosPaciente?.FechaNacimiento
       });
       console.log(this.editarForm.value);
  })
}

  getToken(){
    return localStorage.getItem('token');
  }

  postForm(){
    this.api.putPatient(<PacienteI>this.editarForm.value).subscribe(data => {
          let respuesta:ResponseI=data;
          if(respuesta.status=="ok"){
              this.alertas.showSuccess('Datos modificados', 'Hecho');
          }else {
            this.alertas.showError(respuesta.result.error_msg, 'Error');
          }
      });
  }
  
  eliminar(){
    this.api.deletePatient(<PacienteI>this.editarForm.value).subscribe(data=>{
      let respuesta:ResponseI=data;
          if(respuesta.status=="ok"){
              this.alertas.showSuccess('Paciente Eliminado', 'Hecho');
              this.router.navigate(['dashboard']);
          }else {
            this.alertas.showError(respuesta.result.error_msg, 'Error');
          }
    })
  }
  salir(){
    this.router.navigate(['dashboard']);
  }

}
