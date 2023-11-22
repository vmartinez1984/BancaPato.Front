export interface AhorroDto {   
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
}

export interface TipoDeCuentaDto{
    id: number
    nombre: string
}