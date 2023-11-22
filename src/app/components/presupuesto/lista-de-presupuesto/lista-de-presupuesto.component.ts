import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-presupuesto',
  templateUrl: './lista-de-presupuesto.component.html',
  styleUrls: ['./lista-de-presupuesto.component.css']
})
export class ListaDePresupuestoComponent {
  @Input() versionId!: number

  presupuestos: PresupuestoDto[] = []

  constructor(
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute    
  ) { 
    this.activatedRoute.params.subscribe(data=>{
      //console.log(data)
      this.versionId = data['id']
    })
    this.repo.presupuesto.obtenerTodos(this.versionId).subscribe({
      next: (presupuestos) => {
        this.presupuestos = presupuestos
        //console.log(presupuestos)
      }
    })
  }
  
}