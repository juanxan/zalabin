export interface Municipality {
    countryCode?: string;
    departmentCode?: string;
    isActive?: boolean;
    default?: boolean;
    creationTime?: Date;
    code?: string;
    description: string;
    iconCode?: string;
}
export interface IParametric{
    isActive?: boolean;
    default?: boolean;
    creationTime?: Date;
    code: string;
    description: string;
    iconCode?: string
  }

export interface MunicipalityDTO  {
    state_code: string;
    city_code: string;
    city_name: string;
    country_name: string;
    state_name: string;
    country_code: string;
}