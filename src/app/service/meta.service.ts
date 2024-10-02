import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  httpCliente = inject(HttpClient);

  constructor() { }

  postarMeta(metaDto: any): Observable<any>{
    return this.httpCliente.post(API_URL + "/meta", metaDto);
  }

  listarMetas(): Observable<any>{
    return this.httpCliente.get(API_URL + "/metas");
  }
}
