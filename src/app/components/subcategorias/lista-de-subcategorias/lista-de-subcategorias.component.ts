import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SubcategoriaDto } from 'src/app/interfaces/subcategoria-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-subcategorias',
  templateUrl: './lista-de-subcategorias.component.html',
  styleUrls: ['./lista-de-subcategorias.component.css']
})
export class ListaDeSubcategoriasComponent {
  subcategorias: SubcategoriaDto[] = []
  estaCargando = false
  balance = 0
  totalDePrimarios = 0
  subcategoria!: SubcategoriaDto
  categorias: string[] = ['Entradas', 'Gastos', 'Apartados', 'Primarios', 'Gastos y apartado']
  valores!: number[]  

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>()

  constructor(private repo: RepositorioService) {
    this.estaCargando = true
    this.repo.subcategoria.obtenerTodos().subscribe({
      next: (subcategorias) => {
        console.log(subcategorias)
        this.subcategorias = subcategorias
        this.estaCargando = false
        this.calcularCantidades()
      }
    })
  }

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true
    }
  }

  calcularCantidades() {
    var entradas = 0
        var gastos = 0
        var apartados = 0
        this.balance=0
        this.totalDePrimarios= 0
        this.subcategorias.forEach(item => {
          if (item.categoria.id == 1)
            this.balance += item.presupuesto
          else
            this.balance -= item.presupuesto
          if(item.esPrimario)
            this.totalDePrimarios += item.presupuesto
          switch (item.categoria.id) {
            case 1:
              entradas += item.presupuesto
              break
            case 2:
              gastos += item.presupuesto
              break
            case 3:
              apartados += item.presupuesto
              break
          }
        })
        this.valores = [entradas, gastos, apartados, this.totalDePrimarios, (gastos + apartados)]
  }

  editar(subcategoria: SubcategoriaDto) {
    this.subcategoria = subcategoria    
  }

  actualizar(subcategoriaDto: SubcategoriaDto) {
    var index = this.subcategorias.findIndex(x => x.id == subcategoriaDto.id)
    //console.log(this.subcategorias[index])
    this.subcategorias[index].presupuesto = subcategoriaDto.presupuesto
    this.subcategorias[index].cantidadMeta = subcategoriaDto.cantidadMeta
    this.subcategorias[index].categoria = subcategoriaDto.categoria
    this.subcategorias[index].esPrimario = subcategoriaDto.esPrimario
    this.subcategorias[index].estaActivo = subcategoriaDto.estaActivo
    //this.subcategorias[index].guid = subcategoriaDto.guid
    this.subcategorias[index].nombre = subcategoriaDto.nombre
    this.subcategorias[index].nota = subcategoriaDto.nota
    //console.log(this.subcategorias)
    this.calcularCantidades()   
  }
  
}