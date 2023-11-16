import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AhorroDto, AhorroDtoIn } from 'src/app/interfaces/ahorro-dto';
import { DepositoDto } from 'src/app/interfaces/deposito-dto';
import { RetiroDto } from 'src/app/interfaces/retiro-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {

  retirar(ahorroId: string, retiro: RetiroDto): Observable<any> {
    return this.httpClient.post(this.url + ahorroId + "/retiros", retiro)
  }

  depositar(ahorroId: string, deposito: DepositoDto): Observable<any> {
    return this.httpClient.post(this.url + ahorroId + "/depositos", deposito)
  }

  obtenerTodos(): Observable<AhorroDto[]> {
    return this.httpClient.get<AhorroDto[]>(this.url)
  }

  agregar(ahorro: AhorroDtoIn): Observable<any> {
    return this.httpClient.post(this.url, ahorro)
  }

  constructor(private httpClient: HttpClient) { }

  url = environment.url + "Cuentas/"
}
