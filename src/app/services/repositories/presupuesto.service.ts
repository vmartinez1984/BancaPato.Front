import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresupuestoDto, PresupuestoDtoIn } from 'src/app/interfaces/version-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  actualizar(presupuestoId: number, presupuesto: PresupuestoDtoIn):Observable<any> {
    return this.httpClient.put(this.url + presupuesto.versionId + "/Presupuestos/" +presupuestoId, presupuesto)
  }
  obtener(presupuestoId: string): Observable<PresupuestoDto> {
    return this.httpClient.get<PresupuestoDto>(this.url + "Presupuestos/" + presupuestoId)
  }
  agregar(versionId: number, presupuestoDtoIn: PresupuestoDtoIn): Observable<any> {
    return this.httpClient.post(this.url + versionId + "/Presupuestos", presupuestoDtoIn)
  }
  obtenerTodos(versionId: number): Observable<PresupuestoDto[]> {
    return this.httpClient.get<PresupuestoDto[]>(this.url + versionId + "/Presupuestos")
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "Versiones/"
}
