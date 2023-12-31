import { Request, Response } from 'express';
import contacts from '../data/contact';
import { Contact, NewContact } from '../models/contact';
import  toNewContact  from '../util/toNewContact';


const getContacts = (_: Request, res: Response) => {
    try {
        return res.send(contacts.getAll());
    } catch (err: any) {
        return res.sendStatus(500);
    }
}

const getContactById = (req: Request<{ id: string }, Contact>, res: Response) => {
    try {
        return res.send(contacts.getOne(req.params.id));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const createContact = (req: Request<{}, Contact, NewContact>, res: Response) => {
    try {
        const newContact = toNewContact(req.body);
        return res.status(201).send(contacts.create(newContact));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const updateContact = (req: Request<{ id: string }, Contact, NewContact>, res: Response) => {
    try {
        const validateContact = toNewContact(req.body);
        return res.send(contacts.update({ id: req.params.id, ...validateContact }));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const deleteContact = (req: Request<{ id: string }, string>, res: Response) => {
    try {
        return res.send(contacts.delete(req.params.id));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

export { getContacts, getContactById, createContact, updateContact, deleteContact }