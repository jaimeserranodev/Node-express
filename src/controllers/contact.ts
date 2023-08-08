import { Request, Response } from 'express';

import { Contact, NewContact } from '../models/contact';
import { NewContactModel, ContactModel } from '../services/contact';


const getContacts = async (_: Request, res: Response) => {
    try {
        const contacts = await ContactModel.find().exec();
        return res.status(200).json(contacts);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const getContactById = async (req: Request<{ id: string }, Contact>, res: Response) => {
    try {
        const contact = await ContactModel.findById(req.params.id).exec();
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json(contact);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const createContact = async (req: Request<{}, Contact, NewContact>, res: Response) => {
    try {
        const newContact = new NewContactModel(req.body);
        const savedContact = await newContact.save();
        return res.status(201).json(savedContact);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const updateContact = async (req: Request<{ id: string }, Contact, NewContact>, res: Response) => {
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json(updatedContact);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const deleteContact = (req: Request<{ id: string }, string>, res: Response) => {
    try {
        const deletedContact = ContactModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json(deletedContact);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


export { getContacts, getContactById, createContact, updateContact, deleteContact }