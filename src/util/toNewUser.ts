import { NewUser } from "../models/User";
import { emailValidation, phoneValidation, stateValidation, stringValidation } from "./validators";

export default function toNewUser(body: any): NewUser {
    return {
        full_name: stringValidation(body.full_name),
        description: stringValidation(body.description),
        email: emailValidation(body.email),
        password: stringValidation(body.password),
        photo: stringValidation(body.photo),
        position: stringValidation(body.photo),
        state: stateValidation(body.state),
        username: stringValidation(body.username),
        phone: phoneValidation(body.phone)
    }
}