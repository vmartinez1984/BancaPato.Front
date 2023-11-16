import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AhorroDto, TipoDeCuentaDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.component.html',
  styleUrls: ['./formulario-cuenta.component.css']
})
export class FormularioCuentaComponent {
  formGroup: FormGroup
  tipoDeCuentas: TipoDeCuentaDto[] = []

  @Output() eventEmmiter = new EventEmitter<AhorroDto>()

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService
  ) {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      clabe: '',
      nota: '',
      interes: '',
      fechaInicial: '',
      fechaFinal: '',
      tipoDeCuentaId:''
    })
    this.repo.tipoDeCuenta.obtenerTodos().subscribe({
      next: (tipoDeCuentas) => {
        this.tipoDeCuentas = tipoDeCuentas
      }
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
      tipoDeCuentaId: this.formGroup.get('tipoDeCuentaId')?.value,
    }
    console.log(ahorro)
    this.eventEmmiter.emit(ahorro)
  }
}