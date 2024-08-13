import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AhorroDto, AhorroDtoIn } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';
import { FormularioCuentaComponent } from '../formulario-cuenta/formulario-cuenta.component';
import { Toast } from 'src/app/helpers/Toast';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.css']
})
export class AgregarCuentaComponent {
  @ViewChild('formulario') formulario!: FormularioCuentaComponent

  constructor(private repo: RepositorioService, private router: Router) { }

  guardar(ahorro: AhorroDto) {
    var ahorroIn: AhorroDtoIn = {
      clabe: ahorro.clabe,
      interes: ahorro.interes == undefined || ahorro.interes.toString() == '' ? 0 : ahorro.interes,
      nombre: ahorro.nombre,
      nota: ahorro.nota,
      fechaFinal: ahorro.fechaFinal,
      fechaInicial: ahorro.fechaInicial,
      tipoDeCuentaId: ahorro.tipoDeCuenta.id,
      cuentaDeReferenciaId: ahorro.cuentaDeReferenciaId == undefined ? 0 : parseInt(ahorro.cuentaDeReferenciaId?.toString())
    }
    console.log(ahorroIn)
    this.formulario.cargando(true)
    this.repo.ahorro.agregar(ahorroIn).subscribe({
      next: (data) => {
        //alert("datos registrados")
        this.router.navigate(['ahorros'])
        this.formulario.cargando(false)
      },
      error: (data) => {
        Toast.error()
        console.log(data)
        this.formulario.cargando(false)
      }
    })
  }
}
