export interface Contact {
        id: string;
        date: Date;
        name: string | undefined;
        email: string | undefined;
        phone: string | undefined;
        subject: string | undefined;
        comment: string | undefined;
        archived: boolean;
    }
    
    export interface NewContact {
        name: string | undefined;
        email: string | undefined;
        phone: string | undefined;
        subject: string | undefined;
        comment: string | undefined;
        archived: boolean;
    }