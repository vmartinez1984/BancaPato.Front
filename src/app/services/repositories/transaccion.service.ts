import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrasaccionDto } from 'src/app/interfaces/ahorro-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  obtenerTodos(ahorroId: number): Observable<TrasaccionDto[]> {
    return this.httpClient.get<TrasaccionDto[]>(this.url + ahorroId + "/Transacciones")
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "cuentas/"
}
