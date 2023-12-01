import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { Guid } from 'src/app/helpers/Guid';
import { HistorialDeApartadosDto } from 'src/app/interfaces/historial-de-apartados-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-historial',
  templateUrl: './lista-de-historial.component.html',
  styleUrls: ['./lista-de-historial.component.css']
})
export class ListaDeHistorialComponent {
  historial: HistorialDeApartadosDto[] = []
  historial1: HistorialDeApartadosDto[] = []
  historial2: HistorialDeApartadosDto[] = []
  historial3: HistorialDeApartadosDto[] = []
  
  chart!: Chart
  id: string = "chart"// Guid.newGuid()
  etiquetas: string[] = []
  valores: number[] = []
  estaCargando= false

  constructor(private repo: RepositorioService) {
    this.estaCargando = true
    this.repo.historial.obtenerTodos().subscribe({
      next: (historial) => {
        this.historial = historial
        //console.log(this.historial)
        historial.forEach(x => {
          if (x.cuentaId == 1045)
            this.historial1.push(x)
        })
        historial.forEach(x => {
          if (x.cuentaId == 1044)
            this.historial2.push(x)
        })
        historial.forEach(x => {
          if (x.cuentaId == 1046)
            this.historial3.push(x)
        })
        this.inicializarGrafica(this.historial)
        this.estaCargando = false
      }, 
      error:(error)=>{
        this.estaCargando = false
      }
    })
  }

  inicializarGrafica(historial: HistorialDeApartadosDto[]) {
    var valoresCetes: number[] = []
    var valoresBbva: number[] = []
    var valoresTechero: number[] = []
    var valoresTotal: number[] = []
    this.historial.forEach(item => {
      var etiqueta = item.fechaDeRegistro.toString().substring(5, 10)
      var index = this.etiquetas.findIndex(x => x == etiqueta)
      //if (index == -1)      
      this.etiquetas.push(item.fechaDeRegistro.toString().substring(5, 10))
      if (item.cuentaId == 1045) {
        valoresCetes.push(item.cantidad)
      } else
        valoresCetes.push(valoresCetes[(valoresCetes.length - 1)])
      if (item.cuentaId == 1044) {
        valoresBbva.push(item.cantidad)
      } else
        valoresBbva.push(valoresBbva[(valoresBbva.length - 1)])
      if (item.cuentaId == 1046) {
        valoresTechero.push(item.cantidad)
      } else
        valoresTechero.push(valoresTechero[(valoresTechero.length - 1)])
    })
    const data = {
      labels: this.etiquetas,
      datasets: [
        {
          label: 'Cetes',
          data: valoresCetes,
        },
        {
          label: 'Bbva',
          data: valoresBbva
        },
        {
          label: 'Techero',
          data: valoresTechero
        },
        // {
        //   label: 'Total',
        //   data: valoresTotal
        // }
      ]
    };
    // Creamos la gráfica
    this.chart = new Chart(this.id, {
      type: 'line' as ChartType, // tipo de la gráfica 
      data,
      // options: {
      //   indexAxis: 'y'
      // }
    }
    )
  }

}