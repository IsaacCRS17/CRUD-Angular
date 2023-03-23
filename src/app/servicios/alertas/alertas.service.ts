import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toastr:ToastrService) { }

  showSuccess(texto:any, titulo:any){
    this.toastr.success(texto, titulo);
  }

  showError(texto:any, titulo:any){
    this.toastr.error(texto, titulo);
  }
}
