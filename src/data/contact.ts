import { Contact, NewContact } from "../models/contact";

import fs from 'fs';


const contacts: Contact[] = JSON.parse(fs.readFileSync(__dirname + '/dataBase/contactListData.json').toString());

function saveJson() {
    const jsonData = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(__dirname + '/dataBase/contactListData.json', jsonData);
}

const getAll = () => contacts;

const getOne = (id: string) => {
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) {
    throw new Error('Contact not found');
    }
    
}

const create = (newContactInfo: NewContact) => {
    const newContact: Contact = {
        id: (Number(contacts[contacts.length-1].id) + 1).toString(),
        ...newContactInfo,
        date: new Date()
    }
    contacts.push(newContact);
    saveJson();
    return newContact;
}

const update = (updatedContact: Omit<Contact, 'date'>) => {
    for (let [idx, contact] of contacts.entries()) {
        if (contact.id === updatedContact.id) {
        contacts[idx] = {
            ...updatedContact,
            date: contact.date
        }
        saveJson();
        return contacts[idx];
        }
    }
    throw new Error('Contact not found');
}

const _delete = (id: string) => {
    for (const [idx, contact] of contacts.entries()) {
        if (contact.id === id) {
        contacts.splice(idx, 1);
        saveJson();
        return `Contact ${id} Deleted`;
        }
    }
    throw new Error('Contact not found');
}

export default { getAll, getOne, create, update, delete: _delete }