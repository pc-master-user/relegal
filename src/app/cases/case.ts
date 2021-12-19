export interface Case {
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    image?:string;
    rating?:number;
}

export interface Address {
    id?:string;
    streetNumber?:string;
    streetName?:string;
    city?:string;
    state?:string;
    zipCode?:number;
    county?:string;
    town?:string;
    occupancyStatus?:string;
}

export interface Client { 
    code?: string;
    loanNumber?: String;
}
export interface Investor { 
    name?: string;
    loanNumber?: String;
}
export interface County { 
    id: number;
    name: string;
    district: number;
    division: number;
}
export interface Matter{ 
    id?: string;
    caseType?: string;
    defendantName?: string;
    property?: Address;
    client?: Client;
    investor?: Investor;
    status?: string;
    attorney?: string;
    parallegal?: string;
    judge?: string;
    district?: string;
    division?: string;
    isContested?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
}