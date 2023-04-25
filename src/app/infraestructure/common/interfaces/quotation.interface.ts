export interface Quotation{
    name: string;//"event-create-quote"
    ipaddres: string;
    tenant_data: {
        name: string,//"gran_titan.co.agentemotor.com",
        user_mail: string
    };
    data: {
        business_line: string,//"vehiculos",
        insurable_objects: [
            {
                type: string,//vehicle
                vehicle: {
                    plate: string,//placa
                    model?: number,
                    force?: string,
                    codification?:{
                        code?: string;
                    },
                    vehicle_risk: {
                        accesories_price?: string;
                        in_agency: boolean,
                        use_type: string,//"particular"
                        plate_type?: string,
                        commercial_price?: number
                    }
                }
            }
        ],
        parties: [
            {
                party_rol: string,//"Asegurado"
                party_type: string,//"person"
                person: {
                    identification_type: string,//CC
                    identification_number: string,//"1075661518"
                    firstname: string,//"Fredy
                    lastname: string,//"Guerrero"
                    gender: string,//"M"
                    birht_date: string,//"1990-07-02"
                    occupation: string,//"Profesional Dependiente"
                    educational_level: string,//"primary"
                    marital_status: string //"single"
                }
            }
        ],
        ubication: {
            place: {
                city_code: string,//"76001"
                country_code: string //"170"
            }
        }
    };
}