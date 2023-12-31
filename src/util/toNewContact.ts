import { NewContact } from "../models/contact";
import { booleanValidation, stringValidation } from "./validators";

export default function toNewContact(body: any): NewContact {
    return {
        name: stringValidation(body.name),
        email: stringValidation(body.email),
        phone: stringValidation(body.phone),
        subject: stringValidation(body.subject),
        comment: stringValidation(body.comment),
        archived: booleanValidation(body.archived)
    }
}