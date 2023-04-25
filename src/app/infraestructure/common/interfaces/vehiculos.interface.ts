export interface Vehiculos {
    placa: string;

}
export interface DTOVehiculosGet {
    placa: string;
    document_type: string;
    document_number: string;
    consultas: string[];    
}
export interface VehiculoData{
    plate?: string;
    model?: string;
    brand?: string;
    engine_number?: string;
    chassis_number?: string;
    vin?: string;
    type?: string;
    line: string;
    bodywork_type?: string;
    fuel?: string;
    vehicle_codification: {
        cilindraje: string;
        capacidad_pasajeros:string;
        peso: string;
    },
    vehicle_risk: {
        use_type: string;
    },
    lugar_registro?: {
        codigo_postal: string;
    },
    propietario?: {
        mensaje:string;
        identification_type: string[];
        identification_number: string[];
        es_propietario: boolean;
    },
    vehicle: {
        weight: number;
        model: number;
        plate: string;
        brand: string;
        vehicle_risk: {
            reference_price: number;
            commercial_price: number;
        },
        code: string;
        line?: string;
        codification?: {
            code: string;
        },
    }
}
export interface DTOVehicleRisk{
    reference_price: number;
    commercial_price: number;
    plate_type: string;
}
export interface Reference{
    marca: string;
    modelo: string;
}

export interface DTOReference extends Reference{
    reference: string;
}
export interface DTOVehicle {
    id: string;
    model: string;
    type: string;
    brand: string;
    line: string;
    cylinder: string;
    codification: DTOCodification;
    vehicle_risk : DTOVehicleRisk;
    imagen: DTOImagen;
}
export interface DTOCodification{
    code: string;
    brand_code: string;
    cylinder: string;
    number_passengers: string;
    weight: string;
}
export interface DTOVehiculoData{
    data: DTOData;
}

export interface DTOData{
    vehicle: DTOVehicle
}

export interface DTOImagen{
    codigo_foto: DTOCodigoFoto[];
}

export interface DTOCodigoFoto{
    id: number;
    nombre: string;
}

export interface DTOVehicleAdd{
    datatwo: {
        vehicle: {
            vehicle_risk: {
                reference_price: number,
                commercial_price: number
            },
            code: string,
            line: string,
            codification: {
                code: string
            },
            weight: number,
            model: number,
            plate: string,
            brand: string
        }
    },
    data: {
        vehicle: {
            plate: string,
            model: string,
            brand: string,
            engine_number: string,
            chassis_number: string,
            vin: string,
            type: string,
            line: string,
            vehicle_codification: {
                cilindraje: string,
                capacidad_pasajeros: string,
                peso: string
            },
            bodywork_type: string,
            fuel: string,
            vehicle_risk: {
                use_type: string
            },
            lugar_registro: {
                codigo_postal: string
            },
            propietario: {
                mensaje: string,
                identification_type: [
                    string
                ],
                identification_number: [
                    string
                ],
                es_propietario: boolean
            }
        }
    }
}