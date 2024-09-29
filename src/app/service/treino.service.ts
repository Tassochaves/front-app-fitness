import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class TreinoService {

  httpCliente = inject(HttpClient);

  constructor() { }

  postarTreino(treinoDto: any): Observable<any>{
    return this.httpCliente.post(API_URL + "/treino", treinoDto);
  }
}
