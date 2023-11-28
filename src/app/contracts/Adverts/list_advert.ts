import { GetUser } from "../User/get-user";

export class ListAdvert {
    objectId: number;
    caseType: string;
    caseDate: Date;
    price: number;
    city: string;
    address: string;
    district: string;
    casePlace: string;
    createdDate: Date;
    updatedDate: Date;
    description:string;
    user:GetUser;
}