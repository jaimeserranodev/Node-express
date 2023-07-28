export interface Booking {
    id: number;
    guest: string | undefined;
    guest_id: string;
    photo: string | undefined;
    order_date: string;
    check_in: string;
    check_out: string;
    room_type: string | undefined;
    special_request: string | undefined;
    status: 'Check In' | 'In Progress' | 'Check Out';
}

export interface NewBooking {
    guest: string | undefined;
    photo: string | undefined;
    check_in: string;
    check_out: string;
    room_type: string | undefined;
    special_request: string | undefined;
    status: 'Check In' | 'In Progress' | 'Check Out';
}
