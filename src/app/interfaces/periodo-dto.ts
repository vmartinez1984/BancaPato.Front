import { PresupuestoDto } from "./version-dto"

export interface PeriodoDto {
    id: number
    guid: string
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    versionId: number
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
    nota: string
    presupuestoId: number
    cantidad: number
    ahorroId?: number
}

export interface MovimientoDto {
    id: number
    cantidad: number
    guid: string
    periodoId: number
    transaccionId: number
    presupuestoId: number
}

export interface MovimientoPresupuesto {
    movimiento?: MovimientoDto
    presupuesto: PresupuestoDto
    tipoDeAhorro?: string
}