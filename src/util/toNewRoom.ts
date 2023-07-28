import { NewRoom } from "../models/rooms";
import { amenitiesValidation, numberValidation, stringValidation } from "./validators";

export default function toNewRoom(body: any): NewRoom {
    return {
        name: stringValidation(body.name),
        bed_type: stringValidation(body.bed_type),
        photo: stringValidation(body.bed_type),
        description: stringValidation(body.bed_type),
        amenities: amenitiesValidation(body.amenities),
        rate: numberValidation(body.rate),
        offer: numberValidation(body.offer),
        status: stringValidation(body.status)
    }
}