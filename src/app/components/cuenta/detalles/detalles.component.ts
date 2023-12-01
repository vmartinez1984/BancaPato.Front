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
  ahorro?: AhorroDto

  constructor(
    private repo : RepositorioService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe((data)=>{
      //console.log(data)      
      this.obtenerAhorro(data['id'])
    })  
  }

  obtenerAhorro(ahorroId: number) {
    this.repo.ahorro.obtener(ahorroId).subscribe({
      next:(ahorro)=>{
        this.ahorro = ahorro
        //console.log(this.ahorro)
      }
    })
  }

}
