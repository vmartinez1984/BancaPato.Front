import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDeCuentaDto } from 'src/app/interfaces/ahorro-dto'
import { environment } from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class TipoDeCuentaService {
  obtenerTodos(): Observable<TipoDeCuentaDto[]> {
    return this.httpClient.get<TipoDeCuentaDto[]>(this.url)
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "TipoDeCuentas"
}
