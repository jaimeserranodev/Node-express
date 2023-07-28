export interface Room {
    id: number;
    name: string | undefined;
    bed_type: string | undefined;
    photo: string | undefined;
    description?: string | undefined;
    amenities: string[];
    rate: number;
    offer: number;
    status: string;
}

export interface NewRoom {
    name: string | undefined;
    bed_type: string | undefined;
    photo: string | undefined;
    description?: string | undefined;
    amenities: string[];
    rate: number;
    offer: number;
    status: string;
}