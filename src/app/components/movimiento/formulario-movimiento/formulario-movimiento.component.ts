import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoDeCuentaDto } from 'src/app/interfaces/ahorro-dto';
import { MovimientoDtoIn } from 'src/app/interfaces/periodo-dto';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-movimiento',
  templateUrl: './formulario-movimiento.component.html',
  styleUrls: ['./formulario-movimiento.component.css']
})
export class FormularioMovimientoComponent {
  submitted: boolean = false
  estaCargando: boolean = false

  formGroup!: FormGroup
  tipoDeCuentas: TipoDeCuentaDto[] = []
  presupuestos: PresupuestoDto[] = []

  @ViewChild('cantidad') inputCantidad!: ElementRef;
  @Output() eventEmmiter = new EventEmitter<MovimientoDtoIn>()
  versionId: any;
  presupuestoId: any;
  ahorroId: any;

  get f() { return this.formGroup.controls }

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
    this.activatedRoute.queryParams.subscribe(data => {
      //console.log("queryParams", data)
      this.versionId = data['versionId']
      this.presupuestoId = data['presupuestoId']
      this.ahorroId = data['ahorroId']
      this.obtenerPresupuestos(this.versionId)
    })
    setTimeout(() => {
      this.inputCantidad.nativeElement.focus()
    }, 500)
  }

  ngOnInit() {
    setTimeout(() => {
      this.inputCantidad.nativeElement.focus()
    }, 500)
  }

  obtenerPresupuestos(versionId: any) {
    this.cargando(true)
    this.repo.presupuesto.obtenerTodos(versionId).subscribe({
      next: (presupuestos) => {
        this.presupuestos = presupuestos
        this.formGroup.patchValue({ presupuestoId: this.presupuestoId })
        this.cargando(false)
      }
    })
  }

  inicializarFormgroup() {
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      nota: '',
      presupuestoId: ['', Validators.required],
    })
    this.formGroup.get('presupuestoId')?.disable()
  }

  cargando(estaCargando: boolean) {
    this.estaCargando = estaCargando
    this.habilitarFormulario(estaCargando)
  }

  habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.controls['nota'].disable()
      this.formGroup.controls['cantidad'].disable()
    } else {
      this.formGroup.controls['nota'].enable()
      this.formGroup.controls['cantidad'].enable()
    }
  }

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
      var movimiento: MovimientoDtoIn = {
        guid: '',
        nota: this.formGroup.get('nota')?.value,
        presupuestoId: this.formGroup.get('presupuestoId')?.value,
        cantidad: this.formGroup.get('cantidad')?.value,
        ahorroId: this.ahorroId
      }
      //console.log(movimiento)
      this.eventEmmiter.emit(movimiento)
    }
  }

  obtenerTipoDeCuenta(id: number): TipoDeCuentaDto {
    var index = this.tipoDeCuentas.findIndex(x => x.id == id)

    return this.tipoDeCuentas[index]
  }
}
