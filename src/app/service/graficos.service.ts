import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  httpCliente = inject(HttpClient);

  constructor() { }

  listarDadosGrafico(): Observable<any>{
    return this.httpCliente.get(API_URL + "/graficos");
  }
}
