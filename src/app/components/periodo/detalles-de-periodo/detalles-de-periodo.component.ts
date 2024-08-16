import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { Guid } from 'src/app/helpers/Guid';
import { MovimientoDtoIn, PeriodoDto } from 'src/app/interfaces/periodo-dto';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-detalles-de-periodo',
  templateUrl: './detalles-de-periodo.component.html',
  styleUrls: ['./detalles-de-periodo.component.css']
})
export class DetallesDePeriodoComponent {

  agregarMovimiento(presupuesto: PresupuestoDto) {
    console.log(presupuesto)
    this.presupuestoSelecciondo = presupuesto
  }

  periodoId: any
  periodo!: PeriodoDto
  balance = 0

  constructor(
    private activateRoute: ActivatedRoute,
    private repo: RepositorioService,
    private formbuilder: FormBuilder
  ) {
    this.activateRoute.params.subscribe(data => {
      //console.log(data)
      this.periodoId = data['id']
      this.obtenerPeriod(this.periodoId)
    })
    this.formGroup = this.formbuilder.group({
      cantidad: 0,      
    })
    this.obtenerAhorroFondeador()
  }

  obtenerPeriod(periodoId: any) {
    this.repo.periodo.obtener(periodoId).subscribe({
      next: (periodo) => {
        this.periodo = periodo
        console.log(this.periodo)
      }
    })
  }

  obtenerAhorroFondeador(){
    this.repo.ahorro.obtenerFondeador().subscribe({
      next:(data)=>{
        this.balance = data.balance
        console.log(data)
      }
    })
  }

  submitted: boolean = false
  estaCargando: boolean = false
  formGroup!: FormGroup
  get f() { return this.formGroup.controls }
  presupuestoSelecciondo?: PresupuestoDto
  @ViewChild('botonDeCerrar') botonDeCerrar?: ElementRef

  guardar() {
    const movimiento: MovimientoDtoIn = {
      cantidad: this.formGroup.value.cantidad,
      guid: Guid.newGuid(),      
      presupuestoId: parseInt(this.presupuestoSelecciondo?.id + "")
    }
    this.repo.periodo.agregarMovimiento(this.periodoId, movimiento).subscribe({
      next: (data)=>{
        console.log(data)
        this.botonDeCerrar?.nativeElement.click()
        this.obtenerAhorroFondeador()
        this.obtenerPeriod(this.periodoId)
        this.formGroup.patchValue({cantidad : 0})
      }
    })
  }
}
