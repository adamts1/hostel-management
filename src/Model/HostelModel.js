import Parse from 'parse';
import RoomlModel from '../Model/RoomModel'
import RoomModel from '../Model/RoomModel'


export default class HostelModel {
    // #parseHostel      // storing the parseUser object as a private field (might need to use it)
    constructor(parseHostel) {
        this.id = parseHostel.id;
        this.hostelName = parseHostel.get("hostelName");
        this.hostelAddress = parseHostel.get("hostelAddress");
        this.numberOfRooms = parseHostel.get("numberOfRooms");
        this.parseHostel = parseHostel;
    }

    static HostelModel = null;

    async deleteHostel() {
        const hostel = this.parseHostel.destroy();
        return hostel;
    }

     static async updateHostel(name, address, numOfRooms, hostelId) {
        const HostelTable = Parse.Object.extend('Hostel');
        const query = new Parse.Query(HostelTable);
        // here you put the objectId that you want to delete
        const parseHostel = await query.get(hostelId);
        parseHostel.set('hostelAddress', address);
        parseHostel.set('numberOfRooms', numOfRooms);
        parseHostel.set('hostelName', name);
        const updatedHostel = parseHostel.save()
        return updatedHostel;
    }


    async getMyRooms() {
        const RoomTable = Parse.Object.extend('Room');
        const query = new Parse.Query(RoomTable);
        query.equalTo("hostelId", this.parseHostel);
        const parseRooms = await query.find();
        const rooms = parseRooms.map(parseRoom => new RoomModel(parseRoom));
        return rooms
    }


    async createRoom(roomNumber, pricePerDay, maxBed, notes) {
        const RoomTable = Parse.Object.extend('Room');
        const newRoom = new RoomTable();

        newRoom.set('roomNumber', roomNumber);
        newRoom.set('pricePerDay', pricePerDay);
        newRoom.set('maxBed', maxBed);
        newRoom.set('notes', notes);
        newRoom.set('hostelId', this.parseHostel);

        // myNewObject.set('hostelId', new Parse.Object("Hostel"));
        const parseRoom = await newRoom.save();
        const room = new RoomlModel(parseRoom);
        return room;
    }

  

}
