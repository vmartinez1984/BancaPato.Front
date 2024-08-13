import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'

import { DataTablesModule } from 'angular-datatables'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarCuentaComponent } from './components/cuenta/agregar-cuenta/agregar-cuenta.component';
import { EditarCuentaComponent } from './components/cuenta/editar-cuenta/editar-cuenta.component';
import { FormularioCuentaComponent } from './components/cuenta/formulario-cuenta/formulario-cuenta.component';
import { ListaDeCuentasComponent } from './components/cuenta/lista-de-cuentas/lista-de-cuentas.component';
import { ListaDePresupuestoComponent } from './components/presupuesto/lista-de-presupuesto/lista-de-presupuesto.component';
import { FormularioPresupuestoComponent } from './components/presupuesto/formulario-presupuesto/formulario-presupuesto.component';
import { EditarPresupuestoComponent } from './components/presupuesto/editar-presupuesto/editar-presupuesto.component';
import { AgregarPresupuestoComponent } from './components/presupuesto/agregar-presupuesto/agregar-presupuesto.component';
import { AgregarPeriodoComponent } from './components/periodo/agregar-periodo/agregar-periodo.component';
import { EditarPeriodoComponent } from './components/periodo/editar-periodo/editar-periodo.component';
import { FormularioPeriodoComponent } from './components/periodo/formulario-periodo/formulario-periodo.component';
import { ListaDePeriodosComponent } from './components/periodo/lista-de-periodos/lista-de-periodos.component';
import { AgregarHistorialComponent } from './components/historial/agregar-historial/agregar-historial.component';
import { EditorialHistorialComponent } from './components/historial/editorial-historial/editorial-historial.component';
import { EditarHistorialComponent } from './components/historial/editar-historial/editar-historial.component';
import { ListaDeHistorialComponent } from './components/historial/lista-de-historial/lista-de-historial.component';
import { FooterComponent } from './templates/footer/footer.component';
import { MenuComponent } from './templates/menu/menu.component';
import { DepositoComponent } from './components/transaccion/deposito/deposito.component'
import { RetiroComponent } from './components/transaccion/retiro/retiro.component'
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component'
import { ListaDeVersionesComponent } from './components/version/lista-de-versiones/lista-de-versiones.component';
import { FormularioVersionComponent } from './components/version/formulario-version/formulario-version.component';
import { AgregarVersionComponent } from './components/version/agregar-version/agregar-version.component';
import { EditarVersionComponent } from './components/version/editar-version/editar-version.component';
import { VersionDetallesComponent } from './components/version/version-detalles/version-detalles.component';
import { FormularioSubcategoriaComponent } from './components/subcategorias/formulario-subcategoria/formulario-subcategoria.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { FormularioDeHistorialComponent } from './components/historial/formulario-de-historial/formulario-de-historial.component';
import { ListaDeTransaccionesComponent } from './components/transaccion/lista-de-transacciones/lista-de-transacciones.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DetallesDeCuentaComponent } from './components/cuenta/detalles/detalles.component';
import { DetallesDePeriodoComponent } from './components/periodo/detalles-de-periodo/detalles-de-periodo.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarCuentaComponent,
    EditarCuentaComponent,
    ListaDeCuentasComponent,
    ListaDePresupuestoComponent,
    FormularioPresupuestoComponent,
    EditarPresupuestoComponent,
    AgregarPresupuestoComponent,
    AgregarPeriodoComponent,
    EditarPeriodoComponent,
    FormularioPeriodoComponent,
    ListaDePeriodosComponent,
    AgregarHistorialComponent,
    EditorialHistorialComponent,
    EditarHistorialComponent,
    ListaDeHistorialComponent,
    FooterComponent,
    MenuComponent,
    FormularioCuentaComponent,
    DepositoComponent,
    RetiroComponent,
    ListaDeCuentasComponent,
    ListaDeVersionesComponent,
    FormularioVersionComponent,
    AgregarVersionComponent,
    EditarVersionComponent,
    VersionDetallesComponent,
    ListaDeSubcategoriasComponent,
    AgregarSubcategoriaComponent,
    EditarSubcategoriaComponent,
    FormularioSubcategoriaComponent,
    FormularioDeHistorialComponent,
    ListaDeTransaccionesComponent,
    DetallesDeCuentaComponent,
    DetallesDePeriodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
