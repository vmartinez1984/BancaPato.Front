import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoDto, MovimientoDtoIn, PeriodoDto, PeriodoDtoIn } from 'src/app/interfaces/periodo-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  obtener(periodoId: any): Observable<PeriodoDto> {
    return this.httpClient.get<PeriodoDto>(this.url + periodoId)
  }
  obtenerMovimientos(id: number): Observable<MovimientoDto[]> {
    return this.httpClient.get<MovimientoDto[]>(this.url + id + "/Movimientos");
  }

  agregarMovimiento(periodoId: number, movimiento: MovimientoDtoIn) {
    return this.httpClient.post(this.url + periodoId + "/Movimientos", movimiento)
  }

  agregar(periodo: PeriodoDtoIn): Observable<any> {
    return this.httpClient.post(this.url, periodo)
  }
  obtenerTodos(): Observable<PeriodoDto[]> {
    return this.httpClient.get<PeriodoDto[]>(this.url)
  }


  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "periodos/"
}
