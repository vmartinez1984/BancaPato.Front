import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionDto, VersionDtoIn } from 'src/app/interfaces/version-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  actualizar(id: number, version: VersionDtoIn): Observable<any> {
    //console.log(version)
    return this.httpClient.put(this.url + id, version)
  }
  obtenerTodos(): Observable<VersionDto[]> {
    return this.httpClient.get<VersionDto[]>(this.url)
  }

  borrar(versionId: number,): Observable<any> {
    return this.httpClient.delete(this.url + versionId)
  }

  agregar(version: VersionDtoIn): Observable<any> {
    return this.httpClient.post(this.url, version)
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "Versiones/"
}
