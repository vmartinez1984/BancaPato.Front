import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';

@Component({
  selector: 'app-formulario-de-historial',
  templateUrl: './formulario-de-historial.component.html',
  styleUrls: ['./formulario-de-historial.component.css']
})
export class FormularioDeHistorialComponent {
  formGroup: FormGroup

  @Output() eventEmmiter = new EventEmitter<AhorroDto>()

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      clabe: '',
      nota: '',
      interes: '',
      fechaInicial: '',
      fechaFinal: ''
    })
  }

  guardar() {
    // var ahorro: AhorroDto = {
    //   id: 0,
    //   balance: 0,
    //   clabe: this.formGroup.get('clabe')?.value,
    //   guid: '',
    //   interes: this.formGroup.get('interes')?.value,
    //   nota: this.formGroup.get('nota')?.value,
    //   nombre: this.formGroup.get('nombre')?.value,
    //   fechaInicial: this.formGroup.get('fechaInicial')?.value == '' ? null : this.formGroup.get('fechaInicial')?.value,
    //   fechaFinal: this.formGroup.get('fechaFinal')?.value == '' ? null : this.formGroup.get('fechaFinal')?.value,
    // }
    // console.log(ahorro)
    // this.eventEmmiter.emit(ahorro)
  }
}
