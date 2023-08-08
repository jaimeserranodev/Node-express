import { faker } from '@faker-js/faker';
import { User } from '../models/User';
import { NewUser } from '../models/User';
import { Contact } from '../models/contact';
import { NewContact } from '../models/contact';
import { Room } from '../models/rooms';
import { NewRoom } from '../models/rooms';
import { Booking } from '../models/bookings';
import { NewBooking } from '../models/bookings';
import fs from 'fs';
import { UserModel } from '../services/user';
import { ContactModel } from '../services/contact';
import { RoomModel } from '../services/room';
import { BookingModel } from '../services/booking';
import { connectDB, disconnectDB } from '../util/db';
import { BookingStatus } from '../models/bookings';





export const FakeBooking =  async (numberBookings: number) => {
    await BookingModel.deleteMany({});
const letters = ['A', 'B', 'C', 'D'];
    
    for (let i = 0; i < numberBookings; i++) {
        const letter = letters[i];
        
        const checkInDate = faker.date.past(); 
        const checkOutDate = faker.date.future(); 

        const booking = await new BookingModel({
            photo: faker.image.avatar(),
            guest: faker.person.fullName(),
            order_date: faker.date.past(),
            check_in: checkInDate,
            check_out: checkOutDate,
            room_type: `Deluxe ${letter}`,
            special_request: faker.lorem.paragraph(),
            status: faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress'] as BookingStatus[]),
        }).save();

        console.log(booking);
    }
};

const FakeNewBooking = (): NewBooking => {
    return {
        guest: faker.person.fullName(),
        photo: faker.image.avatar(),
        check_in: faker.date.past(),
        check_out: faker.date.future(),
        room_type: faker.lorem.words(),
        special_request: faker.lorem.paragraph(),
        status:  faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress'] as BookingStatus[]),
    };
}

export const NEW_BOOKINGS: NewBooking[] = Array.from({ length: 10 }, FakeNewBooking);


//-------------------------------------------------------------
export const FakeUser = async (numberUsers: number) => {
    try{
        await UserModel.deleteMany({});
        for (let i = 0; i < numberUsers; i++) {

        const user =  new UserModel({
            id: faker.number.int({ min: 50, max: 100 }),
            full_name: faker.person.fullName(),
            username: faker.internet.userName(),
            photo: faker.image.avatar(),
            phone: faker.phone.number(),
            position: faker.company.name(),
            description: faker.lorem.sentence(),
            email: faker.internet.email(),
            start_date: faker.date.past(),
            state: faker.word.words(),
            password: faker.internet.password(),
        });
        await user.save();
        console.log('User created');
    }
    } catch (error) {
        console.error('Error seeding DB:', error);
    }
    
};

const FakeNewUser = (): NewUser => {
    return {
        full_name: faker.person.fullName(),
        username: faker.internet.userName(),
        photo: faker.image.avatar(),
        phone: faker.phone.number(),
        position: faker.company.name(),
        description: faker.lorem.sentence(),
        email: faker.internet.email(),
        state: faker.string.alpha(),
        password: faker.internet.password(),
    };
}

export const NEW_USERS: NewUser[] = Array.from({ length: 10 }, FakeNewUser);

//-------------------------------------------------------------
export const FakeContact = async (numberContact: number) => {
    
        await ContactModel.deleteMany({});
        for (let i = 0; i < numberContact; i++) {

        const contact = await new ContactModel({
            
            date: String(faker.date.between({
                from: '2023-01-01',
                to: '2023-12-31',
            })),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number("+34 6#########"),
            subject: faker.lorem.sentence(),
            comment: faker.lorem.paragraph(),
            archived: false,
        }).save()
        console.log(contact);
    }
};
//-------------------------------------------------------------
const FakeNewContact = (): NewContact => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        subject: faker.lorem.sentence(),
        comment: faker.lorem.paragraph(),
        archived: faker.datatype.boolean(),
    };
}

export const NEW_CONTACTS: NewContact[] = Array.from({ length: 10 }, FakeNewContact);
//-------------------------------------------------------------
export const FakeRoom =  async (numberRooms: number) => {
    try {
        await RoomModel.deleteMany({});
        const letters = ['A', 'B', 'C', 'D'];
        const bedTypes = ["Single bed", "Double bed", "Suite", "Double Superior"];
        const amenitiesList = [
            "Wi-Fi",
            "TV",
            "Air conditioning",
            "Minibar",
            "Room service",
            "Safe",
            "Hair dryer",
            "Iron",
            "Coffee maker",
        ];
        const statusOptions = ["Available", "Booked"];

        for (let i = 0; i < numberRooms; i++) {
            const letter = letters[i];
            
            const room = await new RoomModel({
                photo: faker.image.urlLoremFlickr(),
                name: `Deluxe ${letter}`,
                bed_type: faker.helpers.arrayElement(bedTypes),
                amenities: faker.helpers.arrayElements(amenitiesList, 5),
                description: faker.lorem.paragraph(),
                rate: faker.number.int({min: 100, max: 350}),
                offer: faker.number.int(100),
                status: faker.helpers.arrayElement(statusOptions),
            }).save();
            console.log(room);
    }
    } catch (error) {
        console.error('Error seeding DB:', error);
    }
};
//-------------------------------------------------------------
const FakeNewRoom = (): NewRoom => {
    return {
        name: faker.lorem.words(),
        bed_type: faker.lorem.words(),
        photo: faker.image.urlLoremFlickr(),
        description: faker.lorem.paragraph(),
        //generate an array of 5 random words for this: amenities: string[];
        amenities: Array.from({ length: 5 }, () => faker.lorem.words()),
        rate: faker.number.float(),
        offer: faker.number.float(),
        status: faker.lorem.words(),
    };
};

export const NEW_ROOMS: NewRoom[] = Array.from({ length: 10 }, FakeNewRoom);








export async function seed(): Promise<void> {
    try {
        await connectDB();
        console.log('Connected to DB');
        await Promise.all([
            FakeUser(10),
            console.log('Users created'),
            FakeContact(10),
            console.log('Contacts created'),
            FakeRoom(10),
            console.log('Rooms created'),
            FakeBooking(10),
            console.log('Bookings created'),
        ]);
        await disconnectDB();
    } catch (error) {
        console.error('Error seeding DB:', error);
    }
};

// seed();


