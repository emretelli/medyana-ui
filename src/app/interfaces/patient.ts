export interface Patient{
    id : number,
    polyclinicCode : string,
    doctorRegistryCode : string,
    doctorName : string,
    doctorSurname : string,
    name : string,
    surname : string,
    dateOfBirth : Date,
    gender : Gender,
    citizenshipNumber : number,
    telephoneNumber : number,
    visitationDate : Date,
    nextVisitationDate? : Date,
    doctorNote? : string
}

export enum Gender{
    Kadın = 1,
    Erkek = 2,
    Belirtilmemiş = 3
}