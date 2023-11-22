import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AhorroService } from './ahorro.service';
import { SubcategoriaService } from './subcategoria.service';
import { VersionService } from './version.service';
import { PresupuestoService } from './presupuesto.service';
import { CategoriaService } from './categoria.service';
import { HistorialDeApartadosService } from './historial-de-apartados.service';
import { TipoDeCuentaService } from './tipo-de-cuenta.service';
import { PeriodoService } from './periodo.service';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {
  ahorro : AhorroService
  subcategoria: SubcategoriaService;
  version: VersionService;
  presupuesto: PresupuestoService;
  categoria: CategoriaService;
  historial: HistorialDeApartadosService
  tipoDeCuenta: TipoDeCuentaService
  periodo: PeriodoService

  constructor(private httpClient: HttpClient) { 
    this.ahorro = new AhorroService(this.httpClient)
    this.subcategoria = new SubcategoriaService(this.httpClient)
    this.version = new VersionService(this.httpClient)
    this.presupuesto = new PresupuestoService(this.httpClient)
    this.categoria = new CategoriaService(this.httpClient)
    this.historial = new HistorialDeApartadosService(this.httpClient)
    this.tipoDeCuenta = new TipoDeCuentaService(this.httpClient)
    this.periodo = new PeriodoService(this.httpClient)
  }
}
