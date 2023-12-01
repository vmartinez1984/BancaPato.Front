import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AhorroDto, AhorroDtoIn } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent {
  ahorro!: AhorroDto
  constructor(
    private activatedRoute: ActivatedRoute,
    private repo: RepositorioService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(data => {
      console.log(data)
      this.obtenerAhorro(data['id'])
    })
  }

  obtenerAhorro(ahorroId: number) {
    this.repo.ahorro.obtener(ahorroId).subscribe({
      next:(ahorro)=>{
        //console.log(ahorro)
        this.ahorro= ahorro
      }
    })
  }

  actualizarAhorro(ahorroDto: AhorroDto){
    var ahorro : AhorroDtoIn= {
      clabe : ahorroDto.clabe,
      interes: ahorroDto.interes,
      nombre: ahorroDto.nombre,
      nota: ahorroDto.nota,
      tipoDeCuentaId: ahorroDto.tipoDeCuentaId,
      fechaFinal: ahorroDto.fechaFinal,
      fechaInicial: ahorroDto.fechaInicial,
      cuentaDeReferenciaId: ahorroDto.cuentaDeReferenciaId
    }
    //console.log(ahorro)
    this.repo.ahorro.actualizar(this.ahorro.id,ahorro).subscribe({
      next: (data)=>{
        this.router.navigate(['ahorros'])
      },
      error: (data)=>{
        alert('Valio pepino')
        console.log(data)
      }
    })
  }
}
