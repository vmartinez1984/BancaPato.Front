import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AhorroDto, AhorroDtoIn } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.css']
})
export class AgregarCuentaComponent {

  constructor(private repo: RepositorioService, private router: Router) { }

  guardar(ahorro: AhorroDto) {
    var ahorroIn: AhorroDtoIn = {
      clabe: ahorro.clabe,
      interes: ahorro.interes == undefined || ahorro.interes.toString() == '' ? 0 : ahorro.interes,
      nombre: ahorro.nombre,
      nota: ahorro.nota,
      fechaFinal: ahorro.fechaFinal,
      fechaInicial: ahorro.fechaInicial,
      tipoDeCuentaId: ahorro.tipoDeCuentaId
    }
    console.log(ahorroIn)
    this.repo.ahorro.agregar(ahorroIn).subscribe({
      next: (data) => {
        //alert("datos registrados")
        this.router.navigate(['ahorros'])
      }
    })
  }
}
