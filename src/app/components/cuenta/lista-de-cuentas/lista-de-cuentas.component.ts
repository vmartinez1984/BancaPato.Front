import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { Toast } from 'src/app/helpers/Toast';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-cuentas',
  templateUrl: './lista-de-cuentas.component.html',
  styleUrls: ['./lista-de-cuentas.component.css']
})
export class ListaDeCuentasComponent {
  estaCargando = false
  formGroup!: FormGroup
  ahorros: AhorroDto[] = []
  ahorrosFiltrados: AhorroDto[] = []

  constructor(private repo: RepositorioService, private formBuilder: FormBuilder) {
    this.obtenerTodosLosAhorros()
    this.inicializarFormulario()
    this.formGroup.valueChanges.subscribe({
      next: (data) => {
        //console.log(data)
        this.filtrar(data)
      }
    })
  }

  filtrar(data: any) {
    if (data.busqueda == '')
      this.ahorrosFiltrados = this.ahorros
    else
      this.ahorrosFiltrados = this.ahorrosFiltrados.filter(
        item => 
        item.nota.toLowerCase().indexOf(data.busqueda.toLowerCase()) !== -1
        ||
        item.nombre.toLowerCase().indexOf(data.busqueda.toLowerCase()) !== -1
      )
  }

  obtenerTodosLosAhorros() {
    this.estaCargando = true
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        this.ahorros = ahorros
        this.ahorrosFiltrados = ahorros
        this.estaCargando = false
      },
      error: (error) => {
        alert("Valio pepino")
        console.log(error)
        this.estaCargando = false
      }
    })
  }

  inicializarFormulario() {
    this.formGroup = this.formBuilder.group({
      busqueda: ''
    })
  }

  borrar(ahorro: AhorroDto) {
    if (confirm("¿Desea borrar " + ahorro.nombre + " " + ahorro.nota + "?")) {
      this.repo.ahorro.borrar(ahorro.id).subscribe({
        next: (data) => {
          var index = this.ahorros.findIndex(x => x.id == ahorro.id)
          this.ahorros.splice(index, 1)
        },
        error:(data)=>{
          Toast.error()
          console.log(data)
        }
      })
    }
  }

  limpiarFormulario(){
    this.formGroup.get('busqueda')?.setValue('')
    this.ahorrosFiltrados = this.ahorros
  }
}