import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialDeApartadosDto } from 'src/app/interfaces/historial-de-apartados-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HistorialDeApartadosService {
  obtenerTodos():Observable<HistorialDeApartadosDto[]> {
    return this.httpClient.get<HistorialDeApartadosDto[]>(this.url)
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + 'historial/'
}
