export interface AhorroDto {
    tipoDeCuentaId: number   
    id: number
    guid: string
    nombre: string
    clabe: string
    nota: string
    interes: number
    balance: number
    fechaInicial?: Date
    fechaFinal?: Date
    tipoDeCuenta: TipoDeCuentaDto    
    cuentaDeReferenciaId?: number
}

export interface AhorroDtoIn {
    guid?: string
    nombre: string
    clabe: string
    nota: string
    interes: number
    fechaInicial?: Date
    fechaFinal?: Date    
    tipoDeCuentaId: number
    cuentaDeReferenciaId?: number
}

export interface TipoDeCuentaDto{
    id: number
    nombre: string
}

export interface TrasaccionDto{
    id: number
    guid: string
    cuentaId: number
    cantidad: number
    fechaDeRegistro: Date
    tipo: string
    concepto: string
    nota: string
}