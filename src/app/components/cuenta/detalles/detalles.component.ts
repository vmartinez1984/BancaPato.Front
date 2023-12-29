import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'src/app/helpers/Toast';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesDeCuentaComponent {
  ahorro?: AhorroDto
  estaCargando: boolean = false

  calcularCantidadEsperada(): number {  
    var fecha = this.obtenerFecha()
    var index = this.ahorro?.calculos?.findIndex(x => x.fecha.toString().substring(0, 10) == fecha)    
    index = index == undefined || index == -1 ? 0 : index    

    return this.ahorro?.calculos == undefined ? 0 : this.ahorro?.calculos[index].total
  }

  obtenerFecha() {
    var fecha = new Date()
    var anio = fecha.getFullYear()
    var mes = (fecha.getMonth() + 1) < 10 ? "0" + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)
    var dia = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()

    return anio + "-" + mes + "-" + dia
  }

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
    this.estaCargando = true
    this.repo.ahorro.obtener(ahorroId).subscribe({
      next: (ahorro) => {
        this.ahorro = ahorro
        //console.log(this.ahorro)
        this.estaCargando = false
      }, error: (error)=>{
        console.log(error)
        Toast.error()
      }
    })
  }

}
