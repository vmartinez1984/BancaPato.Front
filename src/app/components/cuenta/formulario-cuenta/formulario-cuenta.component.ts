import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AhorroDto, TipoDeCuentaDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.component.html',
  styleUrls: ['./formulario-cuenta.component.css']
})
export class FormularioCuentaComponent {
  submitted: boolean = false
  get f() { return this.formGroup.controls }

  formGroup!: FormGroup
  tipoDeCuentas: TipoDeCuentaDto[] = []
  ahorros: AhorroDto[] = []
  estaCargando = false

  @Input() ahorro!: AhorroDto
  @Output() eventEmmiter = new EventEmitter<AhorroDto>()

  //@ViewChild('nombre') inputCantidad!:ElementRef

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService
  ) {
    this.inicializarFormgroup()
    this.repo.tipoDeCuenta.obtenerTodos().subscribe({
      next: (tipoDeCuentas) => {
        this.tipoDeCuentas = tipoDeCuentas
      }
    })
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        const concentradora = 3
        ahorros.forEach(item => {
          if (item.tipoDeCuenta.id == concentradora)
            this.ahorros.push(item)
        })
      }
    })
    // setTimeout(() => {
    //   this.inputCantidad.nativeElement.focus()
    // }, 500)
  }

  ngOnChanges() {
    if (this.ahorro != undefined) {
      //console.log(this.ahorro)
      this.formGroup.patchValue({
        nombre: this.ahorro.nombre,
        clabe: this.ahorro.clabe,
        nota: this.ahorro.nota,
        interes: this.ahorro.interes,
        fechaInicial: this.ahorro.fechaInicial?.toString().substring(0, 10),
        fechaFinal: this.ahorro.fechaFinal?.toString().substring(0, 10),
        tipoDeCuentaId: this.ahorro.tipoDeCuentaId,
        cuentaDeReferenciaId: this.ahorro.cuentaDeReferenciaId
      })
    }
  }

  inicializarFormgroup() {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      clabe: '',
      nota: '',
      interes: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      tipoDeCuentaId: ['', Validators.required],
      cuentaDeReferenciaId: ''
    })
  }

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
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
        tipoDeCuentaId: this.formGroup.get('tipoDeCuentaId')?.value,
        cuentaDeReferenciaId: this.formGroup.get('cuentaDeReferenciaId')?.value,
      }
      //console.log(ahorro)
      this.eventEmmiter.emit(ahorro)
    }
  }

  obtenerTipoDeCuenta(id: number): TipoDeCuentaDto {
    var index = this.tipoDeCuentas.findIndex(x => x.id == id)

    return this.tipoDeCuentas[index]
  }

  cargando(estaCargando: boolean) {
    this.estaCargando = estaCargando
    this.habilitarFormulario(estaCargando)
  }

  habilitarFormulario(habilitar: boolean) {
     if (habilitar) {
      this.formGroup.controls['nombre'].disable()
      this.formGroup.controls['clabe'].disable()
      this.formGroup.controls['nota'].disable()
      this.formGroup.controls['interes'].disable()
      this.formGroup.controls['fechaInicial'].disable()
      this.formGroup.controls['fechaFinal'].disable()
      this.formGroup.controls['tipoDeCuentaId'].disable()
      this.formGroup.controls['cuentaDeReferenciaId'].disable()
    } else {
      this.formGroup.controls['nombre'].enable()
      this.formGroup.controls['clabe'].enable()
      this.formGroup.controls['nota'].enable()
      this.formGroup.controls['interes'].enable()
      this.formGroup.controls['fechaInicial'].enable()
      this.formGroup.controls['fechaFinal'].enable()
      this.formGroup.controls['tipoDeCuentaId'].enable()
      this.formGroup.controls['cuentaDeReferenciaId'].enable()
    }
  }
}

function ViewChild(arg0: string): (target: FormularioCuentaComponent, propertyKey: "inputCantidad") => void {
  throw new Error('Function not implemented.');
}
