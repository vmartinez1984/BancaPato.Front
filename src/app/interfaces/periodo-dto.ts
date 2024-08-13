import { PresupuestoDto, VersionDto } from "./version-dto"

export interface PeriodoDto {
    id: number
    guid: string
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    versionId: number
    version?: VersionDto
}

export interface PeriodoDtoIn {
    guid?: string
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    versionId: number
}

export interface TipoDeCuentaDto {
    id: number
    nombre: string
}

export interface MovimientoDtoIn {
    guid: string    
    presupuestoId: number
    cantidad: number      
}

export interface MovimientoDto {
    id: number
    cantidad: number
    guid: string   
    fechaDeRegistro: Date
}

export interface MovimientoPresupuesto {
    movimiento?: MovimientoDto
    presupuesto: PresupuestoDto
    tipoDeAhorro?: string
}