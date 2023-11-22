import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { HistorialDeApartadosDto } from 'src/app/interfaces/historial-de-apartados-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-de-historial',
  templateUrl: './formulario-de-historial.component.html',
  styleUrls: ['./formulario-de-historial.component.css']
})
export class FormularioDeHistorialComponent {
  formGroup: FormGroup
  ahorros: AhorroDto[] = []

  @Output() eventEmmiter = new EventEmitter<HistorialDeApartadosDto>()

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService
  ) {
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      interes: ['', Validators.required],
      nota: '',
      cuentaId: ['', Validators.required],
    })
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        this.ahorros = this.obtenerConcentradoras(ahorros)
      }
    })
  }

  obtenerConcentradoras(ahorros: AhorroDto[]): AhorroDto[] {
    var concentradoras: AhorroDto[] = []
    ahorros.forEach(item => {
      if (item.tipoDeCuenta.id == 3)
        concentradoras.push(item)
    })

    return concentradoras
  }

  guardar() {
    if (this.formGroup.valid) {
      var historial: HistorialDeApartadosDto = {
        id: 0,
        cantidad: this.formGroup.get('cantidad')?.value,
        cuentaId: this.formGroup.get('cuentaId')?.value,
        interes: this.formGroup.get('interes')?.value,
        fechaDeRegistro: new Date(),
        guid: '',
        nota: this.formGroup.get('nota')?.value
      }
      this.eventEmmiter.emit(historial)
    }
  }
}
