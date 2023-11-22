import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoDeCuentaDto, AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-movimiento',
  templateUrl: './formulario-movimiento.component.html',
  styleUrls: ['./formulario-movimiento.component.css']
})
export class FormularioMovimientoComponent {
  formGroup!: FormGroup
  tipoDeCuentas: TipoDeCuentaDto[] = []
  presupuestos: PresupuestoDto[] = []

  @Output() eventEmmiter = new EventEmitter<AhorroDto>()
  versionId: any;

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.inicializarFormgroup()
    this.repo.tipoDeCuenta.obtenerTodos().subscribe({
      next: (tipoDeCuentas) => {
        this.tipoDeCuentas = tipoDeCuentas
      }
    })
    this.activatedRoute.queryParams.subscribe(data=>{
      console.log("queryParams",data)
      this.versionId = data['versionId']
      this.obtenerPresupuestos(this.versionId)
    })
  }

  obtenerPresupuestos(versionId: any) {
    this.repo.presupuesto.obtenerTodos(versionId).subscribe({
      next: (presupuestos)=>{
        this.presupuestos = presupuestos
      }
    })
  }

  inicializarFormgroup() {
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],      
      nota: '',      
      presupuestoId: ['', Validators.required],
    })
  }

  guardar() {
    var ahorro: AhorroDto = {
      id: 0,
      balance: 0,
      clabe: this.formGroup.get('clabe')?.value,
      guid: '',
      interes: this.formGroup.get('interes')?.value,
      nota: this.formGroup.get('nota')?.value,
      nombre: this.formGroup.get('nombre')?.value,
      fechaInicial: this.formGroup.get('fechaInicial')?.value == '' ? null : this.formGroup.get('fechaInicial')?.value,
      fechaFinal: this.formGroup.get('fechaFinal')?.value == '' ? null : this.formGroup.get('fechaFinal')?.value,
      tipoDeCuenta: this.obtenerTipoDeCuenta(this.formGroup.get('tipoDeCuentaId')?.value),
    }
    console.log(ahorro)
    this.eventEmmiter.emit(ahorro)
  }

  obtenerTipoDeCuenta(id: number): TipoDeCuentaDto {
    var index = this.tipoDeCuentas.findIndex(x => x.id == id)

    return this.tipoDeCuentas[index]
  }
}
