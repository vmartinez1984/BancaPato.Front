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
}

export interface TipoDeCuentaDto{
    id: number
    nombre: string
}

export interface MovimientoDtoIn{    
    guid: string
    periodoId: number
    transaccionId: number
    presupuestoId: number
}

export interface MovimientoDto{
    id: number
    guid: string
    periodoId: number
    transaccionId: number
    presupuestoId: number
}