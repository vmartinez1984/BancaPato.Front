import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDto } from 'src/app/interfaces/categoria-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  obtenerTodos(): Observable<CategoriaDto[]> {
    return this.httpClient.get<CategoriaDto[]>(this.url)
  }

  constructor(private httpClient: HttpClient) { }

  private url = environment.url + "categorias"
}
