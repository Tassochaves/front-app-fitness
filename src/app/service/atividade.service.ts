import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  httpCliente = inject(HttpClient);

  constructor() { }

  postarAtividade(atividadeDto: any): Observable<any>{
    return this.httpCliente.post(API_URL + "/atividade", atividadeDto);
  }

  listarAtividade(): Observable<any>{
    return this.httpCliente.get(API_URL + "/obterAtividades");
  }

}
