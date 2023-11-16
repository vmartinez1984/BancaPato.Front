import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VersionDto } from 'src/app/interfaces/version-dto';

@Component({
  selector: 'app-formulario-version',
  templateUrl: './formulario-version.component.html',
  styleUrls: ['./formulario-version.component.css']
})
export class FormularioVersionComponent {
  formGroup: FormGroup

  @Input() version!: VersionDto
  @Output() eventEmmiter = new EventEmitter<VersionDto>()

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
    })
  }

  ngOnChanges() {
    if (this.version != undefined) {
      this.formGroup.patchValue({
        id: this.version.id,
        nombre: this.version.nombre,
        fechaInicial: this.version.fechaInicial.toString().substring(0, 10),
        fechaFinal: this.version.fechaFinal.toString().substring(0, 10)
      })
    }
  }

  guardar() {
    if (this.formGroup.valid) {
      var version: VersionDto = {
        id: this.version.id,
        nombre: this.formGroup.get('nombre')?.value,
        fechaInicial: this.formGroup.get('fechaInicial')?.value == '' ? null : this.formGroup.get('fechaInicial')?.value,
        fechaFinal: this.formGroup.get('fechaFinal')?.value == '' ? null : this.formGroup.get('fechaFinal')?.value,
      }
      //console.log(version)
      this.eventEmmiter.emit(version)
    } else {
      console.log("Complete los datos")
    }
  }
}
