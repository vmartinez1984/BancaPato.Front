import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcategoriaDto, SubcategoriaDtoIn } from 'src/app/interfaces/subcategoria-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  actualizar(id: number, subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.put(this.url + id, subcategoria)
  }
  agregar(subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.post(this.url, subcategoria)
  }
  obtenerTodos(): Observable<SubcategoriaDto[]> {
    return this.httpClient.get<SubcategoriaDto[]>(this.url)
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "subcategorias/"
}
