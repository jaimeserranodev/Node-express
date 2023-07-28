import { NewBooking } from "../models/bookings";
import { bookingStatusValidation, stringValidation } from "./validators";

export default function toNewBooking(body: any): NewBooking {
    return {
        check_in: stringValidation(body.check_in),
        check_out: stringValidation(body.check_out),
        guest: stringValidation(body.guest),
        photo: stringValidation(body.photo),
        room_type: stringValidation(body.room_type),
        special_request: stringValidation(body.special_request),
        status: bookingStatusValidation(body.status)
    }
}