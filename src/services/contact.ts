import { Schema, Document, model } from 'mongoose';
import { Request, Response } from "express";
// import toNewContact from '../util/toNewContact';


export interface Contact extends Document {
    
    date: Date;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    subject: string | undefined;
    comment: string | undefined;
    archived: boolean;
}

const ContactSchema = new Schema<Contact>({
    
    date: { type: Date, default: Date.now },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    subject: { type: String },
    comment: { type: String },
    archived: { type: Boolean, default: false },
    
});

export const ContactModel = model<Contact>('Contact', ContactSchema);

export interface NewContact {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    subject: string | undefined;
    comment: string | undefined;
    archived: boolean;
}

const NewContactSchema = new Schema<NewContact>({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    subject: { type: String },
    comment: { type: String },
    archived: { type: Boolean, required: true },
});


export const NewContactModel = model<NewContact>('NewContact', NewContactSchema);

const getContacts = async (req: Request, res: Response) => {
    try {
        // Utilizar el modelo Contact para obtener todos los contactos
        const contacts = await ContactModel.find().exec();
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const getContactById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Utilizar el modelo Contact para buscar por id
        const contact = await ContactModel.findById(req.params.id).exec();
        return res.status(200).json(contact);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const createContact = async (req: Request<{}, {}, NewContact>, res: Response) => {
    try {
        // Utilizar el modelo Contact para crear un nuevo contacto
        const contact = await NewContactModel.create(req.body);
        return res.status(201).json(contact);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const updateContact = async (req: Request<{ id: string }, Contact, NewContact>, res: Response) => {
    try {
        // Utilizar el modelo Contact para actualizar un contacto
        // const validateContact = toNewContact(req.body);
        const updateContact = await ContactModel.findByIdAndUpdate(req.params.id,  { new: true }).exec();
        if (!updateContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json(updateContact);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}


const deleteContact = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Utilizar el modelo Contact para eliminar un contacto
        const contact = await ContactModel.findByIdAndDelete(req.params.id).exec();
        return res.status(200).json(contact);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

export { getContacts, getContactById, createContact, updateContact, deleteContact }