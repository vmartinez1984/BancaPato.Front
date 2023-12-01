import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodoDto } from 'src/app/interfaces/periodo-dto';
import { VersionDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-periodo',
  templateUrl: './formulario-periodo.component.html',
  styleUrls: ['./formulario-periodo.component.css']
})
export class FormularioPeriodoComponent {
  submitted: boolean = false
  estaCargando: boolean = false
  formGroup!: FormGroup

  @Output() eventEmitterPeriodo = new EventEmitter<PeriodoDto>()  
  @Input() periodo!: PeriodoDto

  versiones: VersionDto[] = []
  constructor(
    private formBuilder: FormBuilder,
    private repositorio: RepositorioService
  ) {
    this.inicializarFormGroup()
    this.ObtenerTodasVersiones()
  }

  ngOnChanges() {
    //console.log(this.periodo)
    if (this.periodo != undefined) {
      this.formGroup.patchValue({
        id: this.periodo.id,
        guid: this.periodo.guid,
        nombre: this.periodo.nombre,
        fechaInicial: this.periodo.fechaInicial.toString().substring(10, 0),
        fechaFinal: this.periodo.fechaFinal.toString().substring(10, 0),
        versionId: this.periodo.versionId
      })
    }
  }

  get f() { return this.formGroup.controls }

  inicializarFormGroup() {
    this.formGroup = this.formBuilder.group({
      id: 0,
      guid: '',
      nombre: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      versionId: ['', Validators.required],
    })
    this.submitted = false
  }

  ObtenerTodasVersiones() {
    this.estaCargando = true
    this.repositorio.version.obtenerTodos().subscribe({
      next: (versiones) => {
        this.versiones = versiones
        //console.log(versiones)
        this.estaCargando = false
      }, error: (data) => {
        //Toast.error()
        this.estaCargando = false
      }
    })
  }

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
      //console.log(this.formGroup.value)
      var periodo: PeriodoDto = {
        id: this.formGroup.get('id')?.value,
        fechaFinal: this.formGroup.get('fechaFinal')?.value,
        fechaInicial: this.formGroup.get('fechaInicial')?.value,
        guid: this.formGroup.get('guid')?.value,
        nombre: this.formGroup.get('nombre')?.value,
        versionId: this.formGroup.get('versionId')?.value,
      }
      this.eventEmitterPeriodo.emit(periodo)
    }
  }

  enviarVersion() {
    var versionId = this.formGroup.get('versionId')?.value
    var index = this.versiones.findIndex(x => x.id == versionId)
    //this.eventEmitterVersion.emit(this.versiones[index])
    console.log(this.versiones[index])
  }

  estaGuardando(estaGuardando: boolean) {
    this.estaCargando = estaGuardando
    this.habilitarFormulario(!estaGuardando)
    if (estaGuardando == false) {
      this.inicializarFormGroup()
      this.submitted = false
    }
  }

  private habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.controls['nombre'].enable()
      this.formGroup.controls['fechaInicial'].enable()
      this.formGroup.controls['fechaFinal'].enable()
      this.formGroup.controls['versionDelPresupuestoId'].enable()
    } else {
      this.formGroup.controls['nombre'].disable()
      this.formGroup.controls['fechaInicial'].disable()
      this.formGroup.controls['fechaFinal'].disable()
      this.formGroup.controls['versionDelPresupuestoId'].disable()
    }
  }
}