export type BookingStatus = 'Check In' | 'Check Out' | 'In Progress';

export interface Booking {
    id: number;
    guest: string | undefined;
    guest_id: string;
    photo: string | undefined;
    order_date: Date;
    check_in: Date;
    check_out: Date;
    room_type: string | undefined;
    special_request: string | undefined;
    status: BookingStatus;
}


export interface NewBooking {
    guest: string | undefined;
    photo: string | undefined;
    check_in: Date;
    check_out: Date;
    room_type: string | undefined;
    special_request: string | undefined;
    status: BookingStatus;
}
