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
    county?:County;
    town?:string;
    occupancyStatus?:string;
}

export interface Client { 
    code?: string;
    loanNumber?: String;
}
export interface Investor { 
    code?: string;
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
    isContested?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
    contestedDate?: Date;
}

export interface CourtDate {
  id?: string;
  type?: string;
  createdBy?: string;
  createdDate?: Date;
  courtDate?: Date;
  courtTime?: string;
  outcome?: string;
}

export interface Hold {
  id?: string;
  type?: string;
  category?: string;
  start?: Date;
  end?: Date;
  resumeReason?: Date;
}
