import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesDeCuentaComponent {

  calcularCantidadEsperada(): number {
    // var interes  = this.ahorro?.interes == undefined ? 0: this.ahorro.interes
    // var balance = this.ahorro?.balance == undefined ? 0: this.ahorro.balance    
    // var resultado = ((balance * interes /100)/365 * 1) + balance
    
    // return resultado
    var index = this.ahorro?.calculos?.length == undefined? 0: this.ahorro?.calculos?.length - 2
    return this.ahorro?.calculos == undefined? 0: this.ahorro?.calculos[index].total
  }
  ahorro?: AhorroDto

  constructor(
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((data) => {
      //console.log(data)      
      this.obtenerAhorro(data['id'])
    })
  }

  obtenerAhorro(ahorroId: number) {
    this.repo.ahorro.obtener(ahorroId).subscribe({
      next: (ahorro) => {
        this.ahorro = ahorro
        console.log(this.ahorro)
      }
    })
  }

}
