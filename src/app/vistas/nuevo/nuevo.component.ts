import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { FormGroup, FormControl, Validators } from "@angular/forms";

import { PacienteI } from "../../modelos/paciente.interface";

import { ResponseI } from '../../modelos/response.interface';

import { ApiService } from "../../servicios/api/api.service";

import { AlertasService } from "../../servicios/alertas/alertas.service";


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  nuevoForm = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl('')
  });
  constructor(private router: Router, private alerta: AlertasService, private api: ApiService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token': token
    })
  }

  postForm() {
    this.api.postPatient(<PacienteI>this.nuevoForm.value).subscribe(data => {
      console.log(data);
    });
  }

  salir() {
    this.router.navigate(['dashboard']);
  }
}
